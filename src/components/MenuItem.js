import React from "react";
import PropTypes from "prop-types";
import Populaire from "./Populaire";
import { formatToEuroCurrency } from "../Utils";

export const MenuItem = ({ title, description, price, popular, picture, onClick }) => (
  <div className="MenuItem" onClick={onClick}>
    <div className="MenuItem--card">
      <div className="MenuItem--texts">
        {title && <h3>{title}</h3>}
        {description && <p>{description}</p>}
        <div className="MenuItem--infos">
          {price && <span className="MenuItem--price">{formatToEuroCurrency(price)}</span>}
          {popular && popular === true ? <Populaire /> : null}
        </div>
      </div>
      <div className="MenuItem--picture">
        {picture && <img src={picture} alt="" />}
        <div></div>
      </div>
    </div>
  </div>
);

MenuItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  popular: PropTypes.bool,
  picture: PropTypes.string
};
