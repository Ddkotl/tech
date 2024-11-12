export default function Bookmarks(params: { params: { id: string } }) {
  return (
    <div>
      <h1>Bookmarks by user with id:{params.params.id}</h1>
    </div>
  );
}
