import React from "react";
import PropTypes from "prop-types";

export const Menu = ({ title, children }) => (
  <div className="MenuItems">
    {title && <h2>{title}</h2>}
    {children && <div className="MenuItems--items">{children}</div>}
  </div>
);

Menu.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired
};
