import React from "react";
import axios from "axios";
import Header from "./components/Header";
import { Menu } from "./components/Menu";
import { MenuItem } from "./components/MenuItem";
import produce from "immer";
import Cart from "./components/Cart";

const FRAIS_LIVRAISON = 2.5;

const initProduit = { id: "", title: "", nb: 1, price: 0.0 };

class App extends React.Component {
  state = {
    data: null,
    panier: []
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
              <Cart
                statePanier={this.state.panier}
                updateStatePanier={obj => {
                  this.setState({ panier: obj });
                }}
                subtotal={subtotal}
                total={total}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
