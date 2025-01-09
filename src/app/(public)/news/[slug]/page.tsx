export default async function SinleNewsPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <h1>Single News Page</h1>
      <p>Slug: {params.slug}</p>
    </div>
  );
}
