import { Layout } from "./_ui/layout";
import { Logo } from "./_ui/logo";
import { MainNav } from "./_ui/main-nav";
import { mainNavItems } from "./settings/main-nav-items";
import { MobileMenu } from "./_ui/mobile-menu";
import { Profile } from "./_ui/profile";
import { ToggleTheme } from "@/features/theme/toggle-theme";

export function AppHeader() {
  return (
    <Layout
      logo={<Logo />}
      mobileNav={<MobileMenu items={mainNavItems} logo={<Logo />} />}
      nav={<MainNav items={mainNavItems} />}
      profile={<Profile />}
      actions={<ToggleTheme />}
    />
  );
}
