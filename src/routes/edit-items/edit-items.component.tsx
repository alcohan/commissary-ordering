import { ChangeEvent, useEffect, useState } from "react";
import { Container, ListGroup, Badge, Col, Row, Form, InputGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "../../components/form-input/form-input.styles";
import { fetchProductsStart } from "../../store/products/products.action";
import { selectProducts } from "../../store/products/products.selector";

import { Product } from "../../store/products/products.types";

const EditItems = () => {
    const items = useSelector(selectProducts);
    const dispatch = useDispatch();
    const [selectedItem, setSelectedItem] = useState( {} as Product);

    const checkIsActive = (item:Product) => {
        if (item["Item GUID"] === selectedItem["Item GUID"]) {
            return true;
        }
        else return false;
    }

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target)
        const { name, value} = event.target;
        setSelectedItem({...selectedItem, [name]:value})
        console.log(selectedItem)
    }
    const handleToggle = (e: ChangeEvent) => setSelectedItem({...selectedItem,"Enabled":!selectedItem.Enabled});

    const checkForChanges = () => {
        const currentlySelected = items.find((element) => element["Item GUID"]===selectedItem["Item GUID"])
        return(selectedItem === currentlySelected)
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
                                    <ListGroup.Item 
                                        className="d-flex justify-content-between align-items-start"
                                        key={item["Item GUID"]}
                                        variant={item.Enabled?"primary":"secondary"}
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
                        {selectedItem["Item GUID"]? (
                            <Form>
                                    <InputGroup>
                                        <Form.Check
                                            onChange={handleToggle}
                                            id="Enabled"
                                            type="switch"
                                            checked={selectedItem.Enabled}
                                        />
                                        <Form.Label for="Enabled">
                                            {selectedItem.Enabled? "Available":"Disabled"}
                                        </Form.Label>
                                    </InputGroup>
                                <InputGroup>
                                    <InputGroup.Text>Sort</InputGroup.Text>
                                    <Form.Control 
                                        onChange={handleFormChange} 
                                        name="Sort Order"
                                        type="number"
                                        value={selectedItem["Sort Order"]} 
                                    />
                                </InputGroup>
                                <Form.Text>Name</Form.Text>
                                <Form.Control 
                                    onChange={handleFormChange} 
                                    name="Item Name"
                                    value={selectedItem["Item Name"]} 
                                />
                                <Form.Text>Display Name</Form.Text>
                                <Form.Control 
                                    onChange={handleFormChange}
                                    name="DisplayName"
                                    value={selectedItem.DisplayName} 
                                    />
                                <Form.Text>Mapping</Form.Text>
                                <InputGroup>
                                    <InputGroup.Text>GL Code</InputGroup.Text>
                                    <Form.Control 
                                        onChange={handleFormChange} 
                                        name="GL index"
                                        value={selectedItem["GL index"]} 
                                    />
                                    <InputGroup.Text>Category</InputGroup.Text>
                                    <Form.Control 
                                        onChange={handleFormChange} 
                                        name="Category Code"
                                        value={selectedItem["Category Code"]} 
                                    />
                                </InputGroup>
                                <Form.Text>Prices</Form.Text>
                                <InputGroup>
                                    <InputGroup.Text>WA</InputGroup.Text>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control 
                                        onChange={handleFormChange} 
                                        name="List Price (WA)"
                                        type="number"
                                        value={selectedItem["List Price (WA)"]} 
                                    />
                                    <InputGroup.Text>OR</InputGroup.Text>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control 
                                        onChange={handleFormChange} 
                                        name="List Price (OR)"
                                        type="number"
                                        value={selectedItem["List Price (OR)"]}
                                    />
                                </InputGroup>

                                <Form.Text>GUID</Form.Text>
                                <Form.Control disabled
                                    value={selectedItem["Item GUID"]}
                                />
                                <Form.Group as={Row}>
                                    <Col className="mt-4 text-end">
                                        <Button
                                            disabled={checkForChanges()}
                                            onClick={() => alert("this doesn't do anything yet")}
                                        >Save Changes</Button>
                                    </Col>
                                </Form.Group>
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