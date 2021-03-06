import React from "react";
import { IconPlus, IconMoins } from "./Icon";
import { formatToEuroCurrency } from "../Utils";

const CartLine = ({ onDecrement, nb, onIncrement, title, price }) => {
  return (
    <div className="Cart--line">
      <div className="Cart--counter">
        <span onClick={onDecrement}>
          <IconMoins />
        </span>
        <span>{nb}</span>
        <span onClick={onIncrement}>
          <IconPlus />
        </span>
      </div>
      <span className="Cart--item-name">{title}</span>
      <span className="Cart--amount">{formatToEuroCurrency(price)}</span>
    </div>
  );
};

export default CartLine;
