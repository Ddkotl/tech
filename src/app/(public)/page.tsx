import { NewPosts } from "@/features/some-hero-new-posts/new-posts";
import { Container, Title } from "@/shared/components";

export default async function Home() {
  return (
    <Container>
      <Title text="Новые посты" size="md" />
      <NewPosts />
    </Container>
  );
}
