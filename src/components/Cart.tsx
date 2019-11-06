import * as React from "react";
import CartLine from "./CartLine";
import { incrementItem, decrementItem, removeItem } from "../action";
import { formatToEuroCurrency } from "../Utils";
import { selectPanier } from "./../selectors";
import { connect } from "react-redux";
import { IPanier } from "../Interfaces";

const mapStateToProps = (state: any) => ({
  panier: selectPanier(state)
});

const mapDispatchToProps = {
  incrementItem,
  decrementItem,
  removeItem
};

const FRAIS_LIVRAISON: number = 2.5;

export interface Props {
  panier: Array<IPanier>;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  removeItem: (id: string) => void;
}

const CartRender: React.FC<Props> = ({ panier, incrementItem, decrementItem, removeItem }) => {
  const panierVide = panier == null || panier.length === 0;
  const subtotal = panier.reduce((acc, currentValue) => acc + currentValue.price * currentValue.nb, 0);
  const total = subtotal + FRAIS_LIVRAISON;
  return (
    <div className="Cart--card">
      <button className={"Cart--validate " + (panierVide ? "Cart--disabled" : "")}>Valider mon panier</button>

      {(() => {
        if (panierVide) {
          return <div className="Cart--empty">Votre panier est vide</div>;
        }

        return (
          <div>
            <div className="Cart--items">
              {panier.map((item, index: number) => {
                return (
                  <CartLine
                    key={index}
                    onDecrement={() => {
                      let result = panier.find(x => x.id === item.id);
                      result && result.nb > 1 ? decrementItem(item.id) : removeItem(item.id);
                    }}
                    nb={item.nb}
                    onIncrement={() => {
                      incrementItem(item.id);
                    }}
                    title={item.title}
                    price={item.price}
                  />
                );
              })}
            </div>
            <div className="Cart--results">
              <div className="Cart--result-line">
                <span className="Cart--result-name">Sous-total</span>
                <span className="Cart--amount">{formatToEuroCurrency(subtotal)}</span>
              </div>
              <div className="Cart--result-line">
                <span className="Cart--result-name">Frais de livraison</span>
                <span>{formatToEuroCurrency(FRAIS_LIVRAISON)}</span>
              </div>
            </div>
            <div className="Cart--total">
              <span className="Cart--result-name">Total</span>
              <span className="Cart--amount">{formatToEuroCurrency(total)}</span>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export const Cart = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartRender);
