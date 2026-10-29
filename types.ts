export interface Product {
  id: string;
  name: string;
  priceLKR: number;
  collection: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  detailedStory: string;
  stemsCount: string;
  flowerTypes: string[];
  colorDots: string[];
  imageUrl: string;
  categories: string[];
  inStock: boolean;
  dimensions?: string;
}

export interface CustomBouquetConfig {
  sizeName: string;
  sizePrice: number;
  stemsNote: string;
  flowers: string[];
  palette: string;
  wrapping: string;
  recipientName: string;
  personalMessage: string;
  deliveryCity: string;
  targetDate: string;
}

export interface CartItem {
  id: string;
  name: string;
  priceLKR: number;
  quantity: number;
  imageUrl: string;
  isCustom?: boolean;
  customDetails?: {
    size: string;
    stems: string;
    flowers: string[];
    palette: string;
    wrapping: string;
    recipientName?: string;
    cardMessage?: string;
    deliveryCity?: string;
  };
}

export type Currency = 'LKR' | 'USD' | 'GBP' | 'AUD';
