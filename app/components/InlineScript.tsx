"use client";

// Executable in the server-rendered HTML (runs during parsing, before first
// paint), but rendered as inert text/plain on the client so React doesn't warn
// about <script> tags. suppressHydrationWarning covers the `type` mismatch.
// Pattern from node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
