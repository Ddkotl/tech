export default async function TagPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <h1>Tag Page : {params.slug}</h1>
    </div>
  );
}
