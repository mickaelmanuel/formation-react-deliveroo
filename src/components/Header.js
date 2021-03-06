import React from "react";
import { IconDeliveroo } from "./Icon";
import { isNull } from "../Utils";

const Header = ({ restaurant }) => {
  return (
    <header className="Header">
      <div className="TopBar">
        <div className="TopBar--center">
          <IconDeliveroo />
        </div>
      </div>
      <div className="RestaurantInfos">
        {(() => {
          if (isNull(restaurant)) {
            return (
              <div className="RestaurantInfos--center">
                <div className="RestaurantInfosLoader--texts">
                  <div className="RestaurantInfosLoader--title"></div>
                  <div className="RestaurantInfosLoader--description"></div>
                </div>
                <div className="RestaurantInfosLoader--cover"></div>
              </div>
            );
          }

          return (
            <div className="RestaurantInfos--center">
              <div className="RestaurantInfos--texts">
                <h1>{restaurant.name}</h1>
                <p>{restaurant.description} </p>
              </div>
              <img className="RestaurantInfos--cover" src={restaurant && restaurant.picture} alt="restaurant cover" />
            </div>
          );
        })()}
      </div>
    </header>
  );
};

export default Header;
