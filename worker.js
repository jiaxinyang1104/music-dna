export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    const search = url.search;

    if (path === '/playlist') {
      const id = url.searchParams.get('id');
      if (!id) return new Response('Missing id', { status: 400 });

      const apiUrl = `https://music.163.com/api/v3/playlist/detail?id=${id}`;
      const res = await fetch(apiUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://music.163.com/' },
      });
      const data = await res.json();

      const trackIds = data?.playlist?.trackIds || [];
      const ids = trackIds.map(t => (typeof t === 'object' ? t.id : t)).filter(Boolean);

      const BATCH = 50;
      const allSongs = [];
      for (let i = 0; i < ids.length; i += BATCH) {
        const batch = ids.slice(i, i + BATCH);
        const c = JSON.stringify(batch.map(id => ({ id })));
        const detailRes = await fetch(
          `https://music.163.com/api/v3/song/detail?c=${encodeURIComponent(c)}`,
          { headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://music.163.com/' } }
        );
        const detailData = await detailRes.json();
        const songs = detailData.songs || [];
        allSongs.push(...songs.map(s => ({
          name: s.name,
          artist: (s.artists || s.ar || []).map(a => a.name || '').join(', '),
        })));
      }

      return new Response(JSON.stringify({ songs: allSongs }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=300',
        },
      });
    }

    return new Response('Not found', { status: 404 });
  },
};