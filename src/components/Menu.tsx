import React from "react";
import PropTypes from "prop-types";

export interface Props {
  title: string;
  children?: React.ReactNode;
}

export const Menu: React.FC<Props> = ({ title, children }) => (
  <div className="MenuItems">
    {title && <h2>{title}</h2>}
    {children && <div className="MenuItems--items">{children}</div>}
  </div>
);
