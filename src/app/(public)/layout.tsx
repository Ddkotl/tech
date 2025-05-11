import { LastModels } from "@/entities/phone_models";
import { PopularTags } from "@/entities/tag";
import { Container, ContentContainer } from "@/shared/components";
import { AppFooter } from "@/widgets/app-footer/app-footer";
import { AppHeader } from "@/widgets/app-header/app-header";
import { Sidebar } from "@/widgets/sidebar/app-sidebar";
import React from "react";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col gap-2 lg:gap-6">
      <AppHeader  />
      <Container className="h-full flex  flex-1  gap-2 lg:gap-6 ">
        <ContentContainer className="flex flex-col  flex-1 gap-2 lg:gap-6 ">{children}</ContentContainer>

        <Sidebar children1={<LastModels count={6} />} children2={<PopularTags count={16} />} />
      </Container>
      <AppFooter />
    </div>
  );
}
