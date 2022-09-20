import { selectCartItems, selectCartQuantity, selectSpecificCartItem } from '../../store/cart/cart.selector';
import { addItemToCart, updateItemInCart } from '../../store/cart/cart.action';
import { useSelector, useDispatch } from 'react-redux';
import { Product } from '../../store/products/products.types';
import { ChangeEvent, useState } from 'react';

import { FC } from 'react';
import { RootState } from '../../store/store';

import './product-table.styles.scss';

export type ProductItemProps = {
    item: Product;
} 

const ProductTableRow: FC<ProductItemProps> = ({item}) => {
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
        <tr>
            <td scope="row" className='name'>{item["Item Name"]}</td>
            <td className='price'>${item["List Price (WA)"]}</td>
            <td className='packsize'>{item["Pack Size"]}</td>
            <td className='category'>{item["Category Code"]}</td>
            <td> 
                <input
                    className='qty'
                    placeholder='qty'
                    onChange={e => inputChangeHandler(item["Item GUID"], e)}
                    value={value}
                    type="text"
                    pattern="\d*"
                />
            </td>
        </tr>
    )
}

export default ProductTableRow;