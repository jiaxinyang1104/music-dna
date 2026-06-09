const CORS_PROXIES = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
];

const NETEASE_SHORT_RE = /https?:\/\/163cn\.tv\/\S+/;
const NETEASE_FULL_RE = /music\.163\.com\/(?:#\/)?playlist\/(\d+)/;
const NETEASE_QUERY_RE = /music\.163\.com.*[?&]id=(\d+)/;

const WORKER_URL = 'https://music-dna-proxy.your-username.workers.dev';

export function extractUrls(text) {
  const urls = [];
  const shortMatch = text.match(NETEASE_SHORT_RE);
  if (shortMatch) {
    urls.push({ type: 'short', url: shortMatch[0].replace(/[)）\s]+$/, '') });
  }
  const queryMatch = text.match(NETEASE_QUERY_RE);
  if (queryMatch) {
    urls.push({ type: 'full', url: queryMatch[0].replace(/[)）\s]+$/, ''), id: queryMatch[1] });
  }
  const fullMatch = text.match(NETEASE_FULL_RE);
  if (fullMatch) {
    urls.push({ type: 'full', url: fullMatch[0].replace(/[)）\s]+$/, ''), id: fullMatch[1] });
  }
  return urls;
}

async function fetchViaProxy(url) {
  const results = await Promise.any(
    CORS_PROXIES.map(p => 
      fetch(p(url), { signal: AbortSignal.timeout(6000) })
        .then(r => r.ok ? r.text() : Promise.reject())
    )
  ).catch(() => null);
  return results;
}

async function fetchViaWorker(path) {
  try {
    const res = await fetch(`${WORKER_URL}${path}`, { signal: AbortSignal.timeout(5000) });
    if (res.ok) return await res.text();
  } catch {}
  return null;
}

export async function fetchNeteasePlaylist(url) {
  let playlistId = extractPlaylistId(url);

  if (!playlistId && url.includes('163cn.tv')) {
    const html = await fetchViaProxy(url);
    if (!html) return null;
    playlistId = extractPlaylistId(html);
    if (!playlistId) return null;
  }

  if (!playlistId) return null;

  const fromWorker = await fetchViaWorker(`/playlist?id=${playlistId}`);
  if (fromWorker) {
    const songs = parseSongsFromJson(fromWorker, true);
    if (songs && songs.length > 0) return songs;
  }

  const apiText = await fetchViaProxy(
    `https://music.163.com/api/v3/playlist/detail?id=${playlistId}`
  );
  if (!apiText) return null;

  const trackIds = extractTrackIds(apiText);
  if (!trackIds || trackIds.length === 0) return null;

  return fetchAllSongDetails(trackIds);
}

function extractPlaylistId(text) {
  const queryMatch = text.match(NETEASE_QUERY_RE);
  if (queryMatch) return queryMatch[1];
  const fullMatch = text.match(NETEASE_FULL_RE);
  if (fullMatch) return fullMatch[1];
  return null;
}

function extractTrackIds(jsonText) {
  try {
    const data = JSON.parse(jsonText);
    const ids = data?.playlist?.trackIds;
    if (ids && Array.isArray(ids)) {
      return ids.map(t => (typeof t === 'object' ? t.id : t)).filter(Boolean);
    }
  } catch {}
  return null;
}

function parseSongsFromJson(jsonText, isWorker) {
  try {
    const data = JSON.parse(jsonText);
    let tracks;
    if (isWorker && data.songs) {
      tracks = data.songs;
    } else {
      tracks = data?.playlist?.tracks || data?.songs || [];
    }
    if (!Array.isArray(tracks) || tracks.length === 0) return null;
    return tracks.map(t => ({
      name: t.name || '',
      artist: (t.artists || t.ar || []).map(a => a.name || '').join(', '),
    })).filter(s => s.name);
  } catch {
    return null;
  }
}

async function fetchAllSongDetails(trackIds) {
  const BATCH = 50;
  const batches = [];
  for (let i = 0; i < trackIds.length; i += BATCH) {
    batches.push(trackIds.slice(i, i + BATCH));
  }

  const results = await Promise.all(
    batches.map(async (batch) => {
      const c = JSON.stringify(batch.map(id => ({ id })));
      const url = `https://music.163.com/api/v3/song/detail?c=${encodeURIComponent(c)}`;

      const fromWorker = await fetchViaWorker(`/song/detail?c=${encodeURIComponent(c)}`);
      if (fromWorker) {
        const songs = parseSongsFromJson(fromWorker, true);
        if (songs) return songs;
      }

      const text = await fetchViaProxy(url);
      if (!text) return [];
      return parseSongsFromJson(text, false) || [];
    })
  );

  return results.flat().filter(s => s.name);
}