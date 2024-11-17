export function Layout({
  children,
  navAside,
  profile,
  breadCrumb,
  mobileNav,
  search,
}: {
  children: React.ReactNode;
  navAside?: React.ReactNode;
  profile?: React.ReactNode;
  breadCrumb?: React.ReactNode;
  mobileNav?: React.ReactNode;
  search?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {navAside}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          {mobileNav}
          {breadCrumb}
          {search}
          {profile}
        </header>
        <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  );
}
