export async function GET() {
  const siteUrl = process.env.NEXTAUTH_URL;

  const robotsTxt = `
    User-agent: *
    Allow: /
    Disallow: /bookmarks
    Disallow: /profile
    Disallow: /admin
    Disallow: /sign-in

    Sitemap: ${siteUrl}/sitemap.xml
  `;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
