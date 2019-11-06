import * as React from "react";
import { IconMoins, IconPlus } from "./Icon";
import { formatToEuroCurrency } from "../Utils";

type Props = {
  nb: number;
  title: string;
  price: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const CartLine = ({ onDecrement, nb, onIncrement, title, price }: Props) => {
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
