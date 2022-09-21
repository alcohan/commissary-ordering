import { selectCartItems, selectCartQuantity, selectSpecificCartItem } from '../../store/cart/cart.selector';
import { addItemToCart, updateItemInCart } from '../../store/cart/cart.action';
import { useSelector, useDispatch } from 'react-redux';
import { Product } from '../../store/products/products.types';
import { ChangeEvent, useState } from 'react';

import { FC } from 'react';
import { RootState } from '../../store/store';

import './product-table.styles.scss';
import { Row, Col } from 'react-bootstrap';

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
        <Row className="p-1 border-bottom">
            <Col className="col-6" scope="row" >{item["Item Name"]}</Col>
            <Col className="col-2" >${item["List Price (WA)"]}</Col>
            <Col className="col-2" >{item["Pack Size"]}</Col>
            <Col className="col-1" >{item["Category Code"]}</Col>
            <Col className="col-1" style={{padding:"0"}}> 
                <input style={{width:"100%"}}
                    className='qty'
                    placeholder='qty'
                    onChange={e => inputChangeHandler(item["Item GUID"], e)}
                    value={value}
                    type="text"
                    pattern="\d*"
                />
            </Col>
        </Row>
    )
}

export default ProductTableRow;