import React from "react";

export function Actions({
  adminIcon,
  theme,
}: {
  adminIcon?: React.ReactNode;
  theme?: React.ReactNode;
}) {
  return (
    <div className=" flex items-center justify-between px-1 gap-1">
      <div>{adminIcon}</div>
      <div>{theme}</div>
    </div>
  );
}
