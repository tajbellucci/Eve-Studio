/**
 * Prefix a public-folder asset path with the deployment base path.
 * Next.js applies basePath to routes and bundled assets automatically,
 * but raw `<img src="/...">` references need it added by hand.
 * NEXT_PUBLIC_BASE_PATH is inlined at build time ("" locally,
 * "/<repo>" on GitHub Pages).
 */
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
