export interface ConnectionsPuzzle {
  categories: Category[];
}

export interface CardsItem {
  content?: string;
  image_url?: string;
  image_alt_text?: string;
  position: number;
}

export interface Category {
  title: string;
  level: number;
  cards: CardsItem[];
}
