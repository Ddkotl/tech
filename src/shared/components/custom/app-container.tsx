import { cn } from "@/shared/lib/utils";
import React from "react";
interface Props {
  className?: string;
}
export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("mx-auto container max-w-[1240px]", className)}>
      {children}
    </div>
  );
};

export const ContentContainer: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return <div className={cn(" max-w-[800px]", className)}>{children}</div>;
};
