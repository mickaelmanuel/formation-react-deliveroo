import React from "react";
import CartLine from "./CartLine";
import { produce } from "immer";
import { formatToEuroCurrency } from "../Utils";

const FRAIS_LIVRAISON = 2.5;

const Cart = (statePanier, updateStatePanier, subtotal, total) => {
  return (
    <div className="Cart--card">
      <button className="Cart--validate">Valider mon panier</button>
      <div>
        <div className="Cart--items">
          {statePanier &&
            statePanier.map((item, index) => {
              return (
                <CartLine
                  key={index}
                  onDecrement={() => {
                    let index = statePanier.findIndex(x => x.id === item.id);

                    const nextState = produce(statePanier, draftState => {
                      if (draftState[index].nb === 1) {
                        draftState.splice(index, 1);
                      } else {
                        draftState[index].nb = statePanier[index].nb - 1;
                      }
                    });

                    updateStatePanier(nextState);
                  }}
                  nb={item.nb}
                  onIncrement={() => {
                    let index = statePanier.findIndex(x => x.id === item.id);

                    const nextState = produce(statePanier, draftState => {
                      draftState[index].nb = statePanier[index].nb + 1;
                    });

                    updateStatePanier(nextState);
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
    </div>
  );
};

export default Cart;
