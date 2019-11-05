import React from "react";
import Header from "./components/Header";
import axios from "axios";
import { Menu } from "./components/Menu";
import { MenuItem } from "./components/MenuItem";
import { Cart } from "./components/Cart";
import { selectPanier, selectData } from "./selectors";
import { connect } from "react-redux";
import { incrementItem, addItem } from "./action";

// SET_POSTS action creator
const setData = data => ({ type: "SET_DATA", payload: data });

const fetchMyData = dispatch => {
  axios.get("https://deliveroo-api.now.sh/menu").then(response => {
    dispatch(setData(response.data));
  });
};

const mapStateToProps = state => ({
  panier: selectPanier(state),
  data: selectData(state)
});

const mapDispatchToProps = dispatch => ({
  addItem: item => {
    dispatch(addItem(item));
  },
  incrementItem: item => {
    dispatch(incrementItem(item));
  },
  fetchMyData: () => dispatch(fetchMyData)
});

class AppRender extends React.Component {
  async componentDidMount() {
    await this.props.fetchMyData();
  }

  render() {
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
                                  console.log("additem");
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
