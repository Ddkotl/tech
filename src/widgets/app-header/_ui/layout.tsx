export function Layout({
  logo,
  nav,
  profile,
  actions,
  mobileNav,
}: {
  logo?: React.ReactNode;
  nav?: React.ReactNode;
  profile?: React.ReactNode;
  actions?: React.ReactNode;
  mobileNav?: React.ReactNode;
}) {
  return (
    <header className="flex items-center justify-center sticky top-0  z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="xl:container w-full justify-between  flex h-14 items-center p-6">
        <div className="md:hidden mr-2">{mobileNav}</div>

        <div className=" hidden md:flex mr-4">{logo}</div>
        <div className="items-center flex-1 flex">
          <div className="hidden md:flex">{nav}</div>
          <div className="flex flex-1 items-center justify-end space-x-3 ">
            {actions}
            {profile}
          </div>
        </div>
      </div>
    </header>
  );
}
