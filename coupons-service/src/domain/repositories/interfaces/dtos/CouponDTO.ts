import { IProductDTO } from './ProductDTO';

export interface ICouponDTO {
  id: string;
  hash_code: string;
  products?: IProductDTO[];
  total: number;
  processed: boolean;
  created_at: Date;
  updated_at?: Date;
}

export interface ICreateCouponDTO {
  id: string;
  products: IProductDTO[];
  total: number;
  processed: boolean;
}

export interface IProcessCouponDTO {
  total: number;
}
