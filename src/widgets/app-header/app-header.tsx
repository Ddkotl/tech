import { Layout } from "./_ui/layout";
import { Logo } from "./_ui/logo";
import { MainNav } from "./_ui/main-nav";
import { mainNavItems } from "./settings/main-nav-items";
import { MobileMenu } from "./_ui/mobile-menu";
import { Profile } from "./_ui/profile";
import { ToggleTheme } from "@/features/theme/toggle-theme";
import { Actions } from "./_ui/actions";
import { AdminLogo } from "./_ui/admin-logo";

export function AppHeader({
  variant,
}: {
  variant: "auth" | "private" | "public" | "admin";
}) {
  const isProfile = variant !== "auth";
  const isAdmin =  variant !== "auth";
  return (
    <Layout
      logo={<Logo />}
      mobileNav={<MobileMenu items={mainNavItems} logo={<Logo />} />}
      nav={<MainNav items={mainNavItems} />}
      profile={isProfile && <Profile />}
      actions={
        <Actions adminIcon={isAdmin && <AdminLogo />} theme={<ToggleTheme />} />
      }
    />
  );
}
