export function Layout({
  logo,
  footerNav,
}: {
  logo?: React.ReactNode;
  footerNav?: React.ReactNode;
}) {
  const date = new Date();
  return (
    <footer className="flex justify-center items-center bg-background/95  shadow border-t ">
      <div className=" xl:container w-full mx-auto max-w-screen-xl p-6 pb-2 md:flex md:items-center md:justify-between">
        <span className="flex gap-3 justify-center items-center text-sm text-foreground/60 sm:text-center ">
          {logo}
          {`© ${date.getFullYear()}`}
        </span>
        {footerNav}
      </div>
    </footer>
  );
}
