import { Layout } from "./_ui/layout";
import { Logo } from "../../shared/components/custom/logo";
import { MainNav } from "./_ui/main-nav";
import { mainNavItems } from "./_settings/main-nav-items";
import { MobileMenu } from "./_ui/mobile-menu";
import { Profile } from "../../shared/components/custom/profile";
import { ToggleTheme } from "@/features/theme/toggle-theme";
import { Actions } from "./_ui/actions";
import { Container } from "@/shared/components";
import { BookmarksIcon } from "@/features/bookmarks/_ui/bookmarks_icon";

export function AppHeader({ variant }: { variant: "auth" | "private" | "public" | "admin" }) {
  const isProfile = variant !== "auth";

  return (
    <Container className="sticky  top-0  z-[55]">
      <Layout
        logo={<Logo />}
        mobileNav={<MobileMenu items={mainNavItems} logo={<Logo />} />}
        nav={<MainNav items={mainNavItems} />}
        profile={isProfile && <Profile />}
        actions={<Actions bookmarks={<BookmarksIcon />} theme={<ToggleTheme />} />}
      />
    </Container>
  );
}
