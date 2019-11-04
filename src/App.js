import React from "react";
import axios from "axios";
import Header from "./components/Header";
import { Menu } from "./components/Menu";
import { MenuItem } from "./components/MenuItem";
import { Cart } from "./components/Cart";
import { selectPanier } from "./selectors";
import { connect } from "react-redux";
import { incrementItem, addItem } from "./action";

const mapStateToProps = state => ({
  panier: selectPanier(state)
});

const mapDispatchToProps = {
  addItem,
  incrementItem
};

class AppRender extends React.Component {
  state = {
    data: null
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
                                let index = this.props.panier.findIndex(x => x.id === item.id);

                                if (index !== -1) {
                                  this.props.incrementItem(item.id);
                                } else {
                                  this.props.addItem({ id: item.id, title: item.title, price: item.price });
                                }
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
              <Cart />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRender);
