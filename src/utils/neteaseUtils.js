const CORS_PROXIES = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
];

const NETEASE_URL_RE = /https?:\/\/(?:y\.)?music\.163\.com\/(?:m\/)?(?:playlist|#\/playlist)\/?\??(?:id=)?(\d+)/;
const SHORT_URL_RE = /https?:\/\/163cn\.tv\/\S+/;

export function extractUrls(text) {
  const urls = [];
  const shortMatch = text.match(SHORT_URL_RE);
  if (shortMatch) urls.push({ type: 'short', url: shortMatch[0].replace(/[)）\s]+$/, '') });
  const fullMatch = text.match(NETEASE_URL_RE);
  if (fullMatch) urls.push({ type: 'full', url: fullMatch[0].replace(/[)）\s]+$/, ''), id: fullMatch[1] });
  return urls;
}

async function fetchViaProxy(url) {
  for (const proxy of CORS_PROXIES) {
    try {
      const res = await fetch(proxy(url), { signal: AbortSignal.timeout(8000) });
      if (res.ok) return await res.text();
    } catch {
      continue;
    }
  }
  return null;
}

function extractPlaylistId(text) {
  const match = text.match(NETEASE_URL_RE);
  return match ? match[1] : null;
}

export async function fetchNeteasePlaylist(url) {
  let playlistId = null;
  let resolvedUrl = url;

  if (url.includes('163cn.tv')) {
    const html = await fetchViaProxy(url);
    if (!html) return null;
    playlistId = extractPlaylistId(html);
    if (!playlistId) return null;
  } else {
    playlistId = extractPlaylistId(url);
    if (!playlistId) return null;
  }

  const apiUrl = `https://music.163.com/api/v3/playlist/detail?id=${playlistId}`;
  let jsonText = await fetchViaProxy(apiUrl);

  if (!jsonText) {
    const pageUrl = `https://music.163.com/playlist?id=${playlistId}`;
    jsonText = await fetchViaProxy(pageUrl);
    if (!jsonText) return null;
    return parseSongsFromHtml(jsonText);
  }

  return parseSongsFromJson(jsonText);
}

function parseSongsFromJson(jsonText) {
  try {
    const data = JSON.parse(jsonText);
    const tracks = data?.playlist?.tracks;
    if (!tracks || !Array.isArray(tracks)) return null;
    return tracks.map(t => ({
      name: t.name || '',
      artist: (t.artists || []).map(a => a.name).join(', ') || '',
    })).filter(s => s.name);
  } catch {
    return null;
  }
}

function parseSongsFromHtml(html) {
  try {
    const match = html.match(/window\.__INITIAL_STATE__\s*=\s*({.*?});/);
    if (!match) return null;
    const data = JSON.parse(match[1]);
    const tracks = data?.playlist?.trackIds || data?.playlist?.tracks || [];
    const trackList = data?.playlist?.tracks || [];
    if (trackList.length > 0) {
      return trackList.map(t => ({
        name: t.name || '',
        artist: (t.artists || []).map(a => a.name).join(', ') || '',
      })).filter(s => s.name);
    }
    return null;
  } catch {
    return null;
  }
}