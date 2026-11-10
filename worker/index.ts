// Static assets answer a Range request with the whole file (Cloudflare's "Static Assets" limitations page),
// and Safari won't play a video from a server that does. So clips come through here (`run_worker_first`
// in wrangler.jsonc) and get the bytes asked for. The asset's own response carries no length, so the clip
// is read whole: they're about a megabyte each.

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const asset = await env.ASSETS.fetch(request);
    if (asset.status !== 200 || request.method !== "GET") return asset;
    const file = await asset.blob();
    const headers = new Headers(asset.headers);
    headers.set("Accept-Ranges", "bytes");
    const range = byteRange(request.headers.get("Range"), file.size);
    if (range === "whole") return new Response(file, { headers });
    if (range === "outside") {
      headers.set("Content-Range", `bytes */${file.size}`);
      return new Response(null, { status: 416, headers });
    }
    const [start, end] = range;
    headers.set("Content-Range", `bytes ${start}-${end}/${file.size}`);
    return new Response(file.slice(start, end + 1), { status: 206, headers });
  },
};

/** One range from a `Range` header, inclusive. Several ranges, or none, get the whole file, as HTTP allows. */
export function byteRange(
  header: string | null,
  size: number,
): [number, number] | "whole" | "outside" {
  const { first = "", last = "" } =
    header?.match(/^bytes=(?<first>\d*)-(?<last>\d*)$/)?.groups ?? {};
  if (first === "" && last === "") return "whole";
  if (first === "") {
    const suffix = Number(last);
    return suffix === 0 ? "outside" : [Math.max(size - suffix, 0), size - 1];
  }
  const start = Number(first);
  if (start >= size) return "outside";
  const end = last === "" ? size - 1 : Math.min(Number(last), size - 1);
  return end < start ? "whole" : [start, end];
}
