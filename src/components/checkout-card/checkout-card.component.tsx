import { FC } from "react";

import { CheckoutItem } from "./checkout-card.styles";

import { cartItem } from "../../store/cart/cart.types";

export type CheckoutCardProps = {
    item: cartItem;
}

const CheckoutCard: FC<CheckoutCardProps> = ({item}) => {
    return (
        <>
            <CheckoutItem>
                <span className='qty'>{item["quantity"]}</span>
                <span className='name'>{item["Item Name"]}</span>
                <span className='price'>${item["List Price (WA)"]}</span>
            </CheckoutItem>
        </>
    )
};

export default CheckoutCard;