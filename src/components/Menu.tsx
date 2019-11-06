import React from "react";

type Props = {
  title: string;
  children?: React.ReactNode;
};

export const Menu = ({ title, children }: Props) => (
  <div className="MenuItems">
    {title && <h2>{title}</h2>}
    {children && <div className="MenuItems--items">{children}</div>}
  </div>
);
