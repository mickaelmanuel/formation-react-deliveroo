export interface RootObject {
  restaurant: IRestaurant;
  menu: { [key: string]: IMenu[] };
}

export interface ClientAddress {
  coordinates: number[];
  locality: string;
  country: string;
  formatted_address: string;
  post_code: string;
  route: string;
  street_number: string;
  city: string;
}

export interface IRestaurant {
  path: string;
  name: string;
  categories: string[];
  phone: string;
  price: string;
  percentage: number;
  ratings: string;
  address: string;
  delay: string;
  description: string;
  picture: string;
  client_address: ClientAddress;
}

export interface IMenu {
  id: string;
  title: string;
  description: string;
  price: string;
  picture?: string;
  popular?: boolean;
}

export interface IPanierLight {
  id: string;
  title: string;
  price: number;
}

export interface IPanier extends IPanierLight {
  nb: number;
}

export interface IAction {
  type: string;
  payload: any;
}
