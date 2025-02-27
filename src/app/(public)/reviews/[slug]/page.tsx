export default async function SingleReviewPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <div>SingleReviewPage</div>
      <div>{params.slug}</div>
    </div>
  );
}
