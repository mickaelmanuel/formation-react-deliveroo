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

const AppRender = ({ dataHasError, data, panier, incrementItem, addItem, fetchMyData }) => {
  React.useEffect(() => {
    fetchMyData();
  });

  if (dataHasError) {
    return <p>Ouuups! Une erreur est arrivée lors du chargement des données</p>;
  }

  // if (dataIsLoading) {
  //   return <p>Loading…</p>;
  // }

  return (
    <div>
      <Header restaurant={data && data.restaurant} />
      <div className="Content">
        <div className="Content--center">
          <div className="Menu">
            {data &&
              data.menu &&
              Object.keys(data.menu).map((menuName, index) => {
                return (
                  data.menu[menuName].length > 0 && (
                    <Menu title={menuName} key={index}>
                      {data.menu[menuName].map(item => {
                        return (
                          <MenuItem
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            price={parseFloat(item.price)}
                            popular={item.popular}
                            picture={item.picture}
                            onClick={() => {
                              let index = panier.findIndex(x => x.id === item.id);

                              if (index !== -1) {
                                incrementItem(item.id);
                              } else {
                                addItem({ id: item.id, title: item.title, price: item.price });
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
};

export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRender);
