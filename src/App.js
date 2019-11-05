import React from "react";
import Header from "./components/Header";
import { Menu } from "./components/Menu";
import { MenuItem } from "./components/MenuItem";
import { Cart } from "./components/Cart";
import { selectPanier, selectData } from "./selectors";
import { connect } from "react-redux";
import { incrementItem, addItem, fetchMyData } from "./action";

const mapStateToProps = state => ({
  panier: selectPanier(state),
  data: selectData(state),
  dataHasError: state.dataHasError,
  dataIsLoading: state.dataIsLoading
});

const mapDispatchToProps = {
  addItem,
  incrementItem,
  fetchMyData
};

class AppRender extends React.Component {
  componentDidMount() {
    this.props.fetchMyData();
  }

  render() {
    if (this.props.dataHasError) {
      return <p>Ouuups! Une erreur est arrivée lors du chargement des données</p>;
    }

    // if (this.props.dataIsLoading) {
    //   return <p>Loading…</p>;
    // }

    return (
      <div>
        <Header restaurant={this.props.data && this.props.data.restaurant} />
        <div className="Content">
          <div className="Content--center">
            <div className="Menu">
              {this.props.data &&
                this.props.data.menu &&
                Object.keys(this.props.data.menu).map((menuName, index) => {
                  return (
                    this.props.data.menu[menuName].length > 0 && (
                      <Menu title={menuName} key={index}>
                        {this.props.data.menu[menuName].map(item => {
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
