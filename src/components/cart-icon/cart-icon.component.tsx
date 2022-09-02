import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import { useSelector, useDispatch } from 'react-redux';

import { selectCartQuantity, selectCartIsOpen } from '../../store/cart/cart.selector';
import { setCartIsOpen } from '../../store/cart/cart.action';

import {CartIconContainer} from './cart-icon.styles';
import { useNavigate } from 'react-router-dom';

const CartIcon = ( ) => {
    const cartQuantity = useSelector(selectCartQuantity);
    const cartIsOpen = useSelector(selectCartIsOpen);
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const onClickHandler = () => {
        navigate('/checkout');
        // if(window.location.pathname==='/checkout')
        //     return;
        // dispatch(setCartIsOpen(!cartIsOpen));
    }

    return (
        <CartIconContainer onClick={onClickHandler}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>
                {cartQuantity}
            </span>
        </CartIconContainer>
    )
}

export default CartIcon;