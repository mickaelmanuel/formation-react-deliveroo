import React from "react";
import Populaire from "./Populaire";
import { formatToEuroCurrency } from "../Utils";

export interface Props {
  title: string;
  description: string;
  price: number;
  popular?: boolean;
  picture?: string;
  onClick: () => void;
}

export const MenuItem: React.FC<Props> = ({ title, description, price, popular, picture, onClick }) => (
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
