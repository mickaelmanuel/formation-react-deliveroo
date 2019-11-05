export interface Menu {
  id: string;
  title: string;
  description: string;
  price: string;
  picture: string;
  popular?: boolean;
}

export interface PanierLight {
  id: string;
  title: string;
  price: number;
}

export interface Panier extends PanierLight {
  nb: number;
}

export interface Restaurant {
  name: string;
  description: string;
  picture: string;
}
