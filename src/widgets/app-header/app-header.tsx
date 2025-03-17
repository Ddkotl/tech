import { Layout } from "./_ui/layout";
import { Logo } from "../../shared/components/custom/logo";
import { MainNav } from "./_ui/main-nav";
import { mainNavItems } from "./_settings/main-nav-items";
import { MobileMenu } from "./_ui/mobile-menu";
import { Profile } from "../../shared/components/custom/profile";
import { ToggleTheme } from "@/features/theme/toggle-theme";
import { Actions } from "./_ui/actions";
import { AdminLogo } from "../../shared/components/custom/admin-logo";
import { Container } from "@/shared/components";

export function AppHeader({
  variant,
}: {
  variant: "auth" | "private" | "public" | "admin";
}) {
  const isProfile = variant !== "auth";
  const isAdmin = variant !== "auth";

  return (
    <Container>
      <Layout
        logo={<Logo />}
        mobileNav={<MobileMenu items={mainNavItems} logo={<Logo />} />}
        nav={<MainNav items={mainNavItems} />}
        profile={isProfile && <Profile />}
        actions={
          <Actions
            adminIcon={isAdmin && <AdminLogo />}
            theme={<ToggleTheme />}
          />
        }
      />
    </Container>
  );
}
