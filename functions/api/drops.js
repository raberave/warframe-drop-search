export async function onRequestGet(context) {
  const TARGET_URL = "https://warframe-web-assets.nyc3.cdn.digitaloceanspaces.com/uploads/cms/hnfvc0o3jnfvc873njb03enrf56.html";

  try {
    const response = await fetch(TARGET_URL, {
      cf: {
        // Cloudflareのエッジキャッシュに1時間（3600秒）保存して高速化
        cacheTtl: 3600,
        cacheEverything: true,
      },
    });

    if (!response.ok) {
      return new Response(`Upstream error: ${response.status}`, { status: response.status });
    }

    const html = await response.text();

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=1800",
      },
    });
  } catch (err) {
    return new Response(`Fetch failed: ${err.message}`, { status: 500 });
  }
}