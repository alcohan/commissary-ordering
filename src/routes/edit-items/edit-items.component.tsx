import { useEffect, useState } from "react";
import { Container, ListGroup, Badge, Col, Row, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsStart } from "../../store/products/products.action";
import { selectProducts } from "../../store/products/products.selector";

import { Product } from "../../store/products/products.types";

const EditItems = () => {
    const items = useSelector(selectProducts);
    const dispatch = useDispatch();
    const [selectedItem, setSelectedItem] = useState<Product>()

    const checkIsActive = (item:Product) => {
        if (item === selectedItem) {
            return true;
        }
        else return false;
    }

    useEffect(() => {
        dispatch(fetchProductsStart())
      }, [])

    return (
        <>
            <Container style={{height:"", overflow:"auto"}}>
                <Row>
                    <Col>
                    <ListGroup>
                            {
                            items.sort((a, b) =>
                                a['Sort Order'] > b['Sort Order'] ? 1 : -1,
                                ).map(
                                (item) =>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-start"
                                        variant="primary"
                                        active={checkIsActive(item)}
                                        // disabled={!item.Enabled}
                                        action onClick={() => setSelectedItem(item)}
                                        >
                                        {item["Item Name"]}
                                        <Badge>{item['Sort Order']}</Badge>
                                    </ListGroup.Item>
                                )
                            }
                    </ListGroup>
                    </Col>
                    <Col>
                        {selectedItem? (
                            //add onchange event for these form fields to update selectedItem. Then we can patch with a save button
                            <Form>
                                <Form.Text>Item</Form.Text>
                                <Form.Control disabled
                                    value={selectedItem["Item GUID"]}
                                />
                                <Form.Text>Name</Form.Text>
                                <Form.Control value={selectedItem["Item Name"]} />
                                <Form.Text>Display Name</Form.Text>
                                <Form.Control value={selectedItem.DisplayName} />
                                <Form.Text>GL Code</Form.Text>
                                <Form.Control value={selectedItem["GL index"]} />
                                <Form.Text>Is Active?</Form.Text>
                                <Form.Check defaultChecked={selectedItem.Enabled} />
                            </Form>
                            ):null
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
};

export default EditItems;