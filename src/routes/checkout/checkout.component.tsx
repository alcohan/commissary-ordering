import { useSelector } from "react-redux";
import ProductCard from "../../components/product/product.component";
import CheckoutCard from "../../components/checkout-card/checkout-card.component";
import { 
    selectCartItems, 
    selectCartSubtotal, 
    selectCartQuantity 
} from "../../store/cart/cart.selector";

import { cartItem } from "../../store/cart/cart.types";
import { CheckoutContainer } from "./checkout.styles";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { FormEvent } from "react";

const Checkout = () => {
    const cart = useSelector(selectCartItems);
    const total = useSelector(selectCartSubtotal);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event);
        alert("This doesn't do anything yet");
    }

    return (
        <>
            <h1>Checkout</h1>
            <CheckoutContainer>
                {cart.sort((a:cartItem,b:cartItem) => a["Sort Order"] > b["Sort Order"] ? 1:-1)
                .map((item) => (
                    <CheckoutCard key={item["Item GUID"]} item={item} />
                    ))}
            </CheckoutContainer>
            <div>Total: ${total/100}</div>

            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <InputGroup.Text>Enter a Comment</InputGroup.Text>
                    <FormControl type="text" ></FormControl>
                    <Button type="submit">Submit</Button>
                </InputGroup>
            </Form>
        </>
    )
}

export default Checkout