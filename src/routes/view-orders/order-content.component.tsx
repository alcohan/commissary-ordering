import { FC } from "react";
import { Form, ListGroup, InputGroup, Row } from "react-bootstrap";
import { OrderContent } from "../../store/orders/orders.types";

export type OrderContentRowProps = {
    lineItem: OrderContent
}

const prettyCurrencyFromCents = (cents: number) => {
    let dollars=cents/100
    return `$${
        dollars
        .toLocaleString(
            'en-US',
            {minimumFractionDigits:2}
        )
    }`
}

const OrderContentRow: FC<OrderContentRowProps> = ({lineItem}) => {
    return (
        <InputGroup>
            <Form.Control value={lineItem["Item Name"]} />
            <Form.Control value={lineItem["Qty Ordered"]} />
            <Form.Control value={lineItem["Qty Final"]} />
            <Form.Control value={prettyCurrencyFromCents(lineItem["UnitPriceCents"])} />
            <Form.Control value={prettyCurrencyFromCents(lineItem["ExtendedPriceCents"])} />
        </InputGroup>
    )
}

export default OrderContentRow;