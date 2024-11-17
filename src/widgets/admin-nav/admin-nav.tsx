import { Logo, LogoIcon, Profile } from "@/shared/components";
import { Layout } from "./_ui/lauout";
import { DesktopNav } from "./_ui/desctop-nav";
import { MobileNav } from "./_ui/mobile-nav";
import { AppBreadcrumb } from "@/shared/components";
import { AppSearch } from "@/shared/components/custom/app-search";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout
      mobileNav={<MobileNav logo={<Logo />} />}
      profile={<Profile />}
      navAside={<DesktopNav logo={<LogoIcon />} />}
      breadCrumb={<AppBreadcrumb />}
      search={<AppSearch />}
    >
      {children}
    </Layout>
  );
}
