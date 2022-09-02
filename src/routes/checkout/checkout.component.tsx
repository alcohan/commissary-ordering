import { useSelector } from "react-redux";
import ProductCard from "../../components/product/product.component";
import CheckoutCard from "../../components/checkout-card/checkout-card.component";
import { 
    selectCartItems, 
    selectCartSubtotal, 
    selectCartQuantity 
} from "../../store/cart/cart.selector";

import { cartItem } from "../../store/cart/cart.types";

const Checkout = () => {
    const cart = useSelector(selectCartItems);
    const total = useSelector(selectCartSubtotal);

    return (
        <>
            <h1>Checkout</h1>
            <div>
                {cart.sort((a:any,b:any) => a["Sort Order"] > b["Sort Order"] ? 1:-1)
                .map((item) => (
                    <CheckoutCard key={item["Item GUID"]} item={item} />
                    ))}
            </div>
            <div>Total: ${total}</div>
        </>
    )
}

export default Checkout