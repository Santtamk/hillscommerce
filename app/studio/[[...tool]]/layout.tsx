export const metadata = {
  title: "Next.js + Sanity Studio",
  description: "Sanity Studio for managing content",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
