import { selectCartItems, selectCartQuantity, selectSpecificCartItem } from '../../store/cart/cart.selector';
import { addItemToCart, updateItemInCart } from '../../store/cart/cart.action';
import { useSelector, useDispatch } from 'react-redux';
import { InventoryItem } from './product.styles';
import { Product } from '../../store/products/products.types';
import { ChangeEvent, useState } from 'react';

import { FC } from 'react';
import { RootState } from '../../store/store';

export type ProductItemProps = {
    item: Product;
} 

const ProductCard: FC<ProductItemProps> = ({item}) => {
    const dispatch = useDispatch();
    const cartItems: any = useSelector(selectCartItems);
    const q = useSelector((state:RootState) => selectSpecificCartItem(state, item));
    // console.log(q)
    const [value, setValue ] = useState(q.toString());
    
    const inputChangeHandler = (id: any , event: ChangeEvent<HTMLInputElement>) => {
        const strippedInput = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'); 
        dispatch(updateItemInCart(cartItems, item, parseInt(strippedInput) || 0))
        setValue(strippedInput);
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
                type="text"
                pattern="\d*"
            ></input>
        </InventoryItem>
    )
}

export default ProductCard;