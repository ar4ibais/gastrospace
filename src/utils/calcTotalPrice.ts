import { CartItem } from '../redux/slices/cart/types';

export const calcTotalPrice = (items: CartItem[]) => {
	return items.reduce((sum, accum) => sum + accum.price * accum.count, 0);
};
