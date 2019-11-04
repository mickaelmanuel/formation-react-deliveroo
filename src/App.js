import React from "react";
import axios from "axios";
import Header from "./components/Header";
import { Menu } from "./components/Menu";
import { MenuItem } from "./components/MenuItem";
import { formatToEuroCurrency } from "./Utils";
import produce from "immer";
import CartLine from "./components/CartLine";

const FRAIS_LIVRAISON = 2.5;

const initProduit = { id: "1519055545-88", title: "Brunch authentique 1 personne", nb: 1, price: 25.0 };

class App extends React.Component {
  state = {
    data: null,
    panier: [initProduit]
  };

  async componentDidMount() {
    try {
      const response = await axios.get("https://deliveroo-api.now.sh/menu");
      this.setState({ data: response.data });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const subtotal = this.state.panier.reduce((acc, currentValue) => acc + currentValue.price * currentValue.nb, 0);
    const total = subtotal + FRAIS_LIVRAISON;

    return (
      <div>
        <Header restaurant={this.state.data && this.state.data.restaurant} />
        <div className="Content">
          <div className="Content--center">
            <div className="Menu">
              {this.state.data &&
                this.state.data.menu &&
                Object.keys(this.state.data.menu).map((menuName, index) => {
                  return (
                    this.state.data.menu[menuName].length > 0 && (
                      <Menu title={menuName} key={index}>
                        {this.state.data.menu[menuName].map(item => {
                          return (
                            <MenuItem
                              key={item.id}
                              title={item.title}
                              description={item.description}
                              price={parseFloat(item.price)}
                              popular={item.popular}
                              picture={item.picture}
                              onClick={() => {
                                let index = this.state.panier.findIndex(x => x.id === item.id);
                                const nextState = produce(this.state.panier, draftState => {
                                  if (index !== -1) {
                                    draftState[index].nb = this.state.panier[index].nb + 1;
                                  } else {
                                    let clone = { ...initProduit };
                                    clone.id = item.id;
                                    clone.title = item.title;
                                    clone.price = item.price;
                                    draftState.push(clone);
                                  }
                                });

                                this.setState({ panier: nextState });
                              }}
                            />
                          );
                        })}
                      </Menu>
                    )
                  );
                })}
            </div>
            <div className="Cart">
              <div className="Cart--card">
                <button className="Cart--validate">Valider mon panier</button>
                <div>
                  <div className="Cart--items">
                    {this.state.panier &&
                      this.state.panier.map((item, index) => {
                        return (
                          <CartLine
                            onDecrement={() => {
                              let index = this.state.panier.findIndex(x => x.id === item.id);

                              const nextState = produce(this.state.panier, draftState => {
                                if (draftState[index].nb === 1) {
                                  draftState.splice(index, 1);
                                } else {
                                  draftState[index].nb = this.state.panier[index].nb - 1;
                                }
                              });

                              this.setState({ panier: nextState });
                            }}
                            nb={item.nb}
                            onIncrement={() => {
                              let index = this.state.panier.findIndex(x => x.id === item.id);

                              const nextState = produce(this.state.panier, draftState => {
                                draftState[index].nb = this.state.panier[index].nb + 1;
                              });

                              this.setState({ panier: nextState });
                            }}
                            title={item.title}
                            price={item.price}
                          />
                        );
                      })}

                    {/* <div className="Cart--line">
                      <div className="Cart--counter">
                        <span onClick={() => {}}>
                          <IconMoins />
                        </span>
                        <span>{this.state.panier[0].nb}</span>
                        <span
                          onClick={() => {
                            let id = "1519055545-88";
                            let index = this.state.panier.findIndex(x => x.id === id);

                            const nextState = produce(this.state.panier, draftState => {
                              draftState[index].nb = this.state.panier[index].nb + 1;
                            });

                            this.setState({ panier: nextState });
                          }}
                        >
                          <IconPlus />
                        </span>
                      </div>
                      <span className="Cart--item-name">{this.state.panier[0].title}</span>
                      <span className="Cart--amount">{formatToEuroCurrency(this.state.panier[0].price)}</span>
                    </div> */}
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
