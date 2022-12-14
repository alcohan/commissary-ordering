import { queryByDisplayValue } from "@testing-library/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Badge, ListGroup, Row, Col, Container, Form, Button, ToggleButton, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { fetchOrdersStart, updateOrderStart } from "../../store/orders/orders.action";
import { selectOrders } from "../../store/orders/orders.selector"
import { Order } from "../../store/orders/orders.types";


const EditOrders = () => {
    const orders = useSelector(selectOrders);
    const dispatch = useDispatch();
    const [selectedOrder, setSelectedOrder] = useState({} as Order);

    useEffect(() => {
        dispatch(fetchOrdersStart())
    },[])

    const checkIsActive = (order:Order) => {
        if (order["Order GUID"] === selectedOrder["Order GUID"]) {
            return true;
        }
        else return false;
    }

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = event.target;

        let valueToReplace;
        
        if (type==="number") 
           valueToReplace = Number(value);
        else 
            valueToReplace = value;

        const newValues = {...selectedOrder, [name]:valueToReplace} as Order;
        setSelectedOrder(newValues);
    }
    const checkForChanges = () => {
        const currentlySelected = orders.find((element) => element["Order GUID"]===selectedOrder["Order GUID"])
        return(selectedOrder === currentlySelected)
    }

    const formSubmitHandler = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateOrderStart(selectedOrder));
    }

    return (
        <Container fluid>
            <Row>
                <Col className="col-12 col-md-4">
                    <ListGroup>
                    {orders
                        // .sort((a,b) => {return a["Order ID"] > b["Order ID"] ? 1:-1})
                        .map(order => 
                    <ListGroup.Item 
                        className="d-flex justify-content-between align-items-start"
                        key={order["Order GUID"]}
                        variant="primary"
                        active={checkIsActive(order)}
                        action onClick={() => setSelectedOrder(order)}
                        >
                        {order["Order ID"]}
                        <Badge>{order["Store"]}</Badge>
                    </ListGroup.Item>
                    )}

                    </ListGroup>
                </Col>
                <Col>
                        {selectedOrder["Order GUID"]? (
                            <Form
                                onSubmit={formSubmitHandler}>
                                    
                                <Form.Text>Name</Form.Text>
                                <Form.Control 
                                    onChange={handleFormChange} 
                                    name="Order ID"
                                    value={selectedOrder["Order ID"]} 
                                />
                                
                                <Form.Text>GUID</Form.Text>
                                <Form.Control disabled
                                    value={selectedOrder["Order GUID"]}
                                />
                                <Form.Group as={Row}>
                                    <Col className="mt-4 text-end">
                                        <Button type='submit'
                                            disabled={checkForChanges()}
                                        >Save Changes</Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                            ):null
                        }
                    </Col>
            </Row>
        </Container>
    )
}

export default EditOrders