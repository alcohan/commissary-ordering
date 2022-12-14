import { FC } from "react";
import { Form, ListGroup, InputGroup, Row } from "react-bootstrap";
import { OrderContent } from "../../store/orders/orders.types";

export type OrderContentRowProps = {
    lineItem: OrderContent
}

const OrderContentRow: FC<OrderContentRowProps> = ({lineItem}) => {
    return (
        <InputGroup>
            <Form.Control value={lineItem["Item Name"]} />
            <Form.Control value={lineItem["Qty Ordered"]} />
            <Form.Control value={lineItem["Qty Final"]} />
            <Form.Control value={lineItem["Unit Price"]} />
            <Form.Control value={lineItem["Extended Price"]} />
        </InputGroup>
    )
}

export default OrderContentRow;