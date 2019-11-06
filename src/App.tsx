import React from "react";
import Header from "./components/Header";
import { Menu as MenuComponent } from "./components/Menu";
import { MenuItem } from "./components/MenuItem";
import { Cart } from "./components/Cart";
import { selectPanier, selectData } from "./selectors";
import { fetchMyData } from "./action";
import { addItem, incrementItem } from "./store/reducer/panier/actions";
import { connect } from "react-redux";
import { IMenu, IPanierLight } from "./Interfaces";
import { AppState } from "./store";
import { PanierState } from "./store/reducer/panier/types";
import { DataState } from "./store/reducer/data/types";
import { isNull } from "./Utils";

const mapStateToProps = (state: AppState) => ({
  panier: selectPanier(state),
  data: selectData(state)
});

const mapDispatchToProps = {
  addItem,
  incrementItem,
  fetchMyData
};

type AppProps = {
  panier: PanierState;
  data: DataState;
  addItem: (item: IPanierLight) => void;
  incrementItem: (id: string) => void;
  fetchMyData: () => void;
};

class AppRender extends React.Component<AppProps> {
  componentDidMount() {
    this.props.fetchMyData();
  }

  render() {
    if (this.props.data.hasError) {
      return <p>Ouuups! Une erreur est arrivée lors du chargement des données</p>;
    }

    // if (this.props.data.isLoading) {
    //   return <p>Loading…</p>;
    // }

    return (
      <div>
        <Header restaurant={this.props.data.root && this.props.data.root.restaurant} />
        <div className="Content">
          <div className="Content--center">
            <div className="Menu">
              {this.props.data.root &&
                this.props.data.root.menu &&
                Object.keys(this.props.data.root.menu).map((menuName, index) => {
                  return (
                    this.props.data.root &&
                    this.props.data.root.menu[menuName].length > 0 && (
                      <MenuComponent title={menuName} key={index}>
                        {this.props.data.root.menu[menuName].map((item: IMenu) => {
                          return (
                            <MenuItem
                              key={item.id}
                              title={item.title}
                              description={item.description}
                              price={parseFloat(item.price)}
                              popular={item.popular}
                              picture={item.picture}
                              onClick={() => {
                                let index = this.props.panier.elements.findIndex(x => x.id === item.id);

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
