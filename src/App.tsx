import React from "react";
import Header from "./components/Header";
import { Menu as MenuComponent } from "./components/Menu";
import { MenuItem } from "./components/MenuItem";
import { Cart } from "./components/Cart";
import { selectPanier, selectData } from "./selectors";
import { incrementItem, addItem, fetchMyData } from "./action";
import { connect } from "react-redux";
import { IPanierLight, IPanier, IMenu } from "./Interfaces";

const mapStateToProps = (state: any) => ({
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

export interface AppProps {
  panier: Array<IPanier>;
  data: any;
  dataHasError: boolean;
  dataIsLoading: boolean;
  addItem: (item: IPanierLight) => void;
  incrementItem: (id: string) => void;
  fetchMyData: () => void;
}

class AppRender extends React.Component<AppProps> {
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
                      <MenuComponent title={menuName} key={index}>
                        {this.props.data.menu[menuName].map((item: IMenu) => {
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
                                  let x: IPanierLight = {
                                    id: item.id,
                                    title: item.title,
                                    price: parseFloat(item.price)
                                  };
                                  this.props.addItem(x);
                                }
                              }}
                            />
                          );
                        })}
                      </MenuComponent>
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
