import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, updateItemInCart } from '../../store/cart/cart.action';
import { useSelector, useDispatch } from 'react-redux';
import { InventoryItem } from './product.styles';
import { Product } from '../../store/products/products.types';
import { ChangeEvent, useState } from 'react';

import { FC } from 'react';

export type ProductItemProps = {
    item: Product;
} 

const ProductCard: FC<ProductItemProps> = ({item}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const [value, setValue ] = useState('');
    
    const inputChangeHandler = (id: any , event: ChangeEvent<HTMLInputElement>) => {
        const qty = parseInt(event.target.value);
        dispatch(updateItemInCart(cartItems, item, qty))
        setValue(qty.toString());
    }

    return (
        <InventoryItem>
            <span className='name'>{item["Item Name"]}</span>
            <span className='price'>${item["List Price (WA)"]}</span>
            <span className='packsize'>{item["Pack Size"]}</span>
            <span className='category'>{item["Category Code"]}</span>
            <input
                className='qty'
                placeholder='qty'
                onChange={e => inputChangeHandler(item["Item GUID"], e)}
                value={value}
            ></input>
        </InventoryItem>
    )
}

export default ProductCard;