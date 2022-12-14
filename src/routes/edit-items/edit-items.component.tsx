import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, ListGroup, Badge, Col, Row, Form, InputGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "../../components/form-input/form-input.styles";
import { fetchProductsStart, updateProductStart } from "../../store/products/products.action";
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
        // console.log(event.target)
        const { name, value, type } = event.target;

        let valueToReplace;
        
        if (type==="number") 
           valueToReplace = Number(value);
        else 
            valueToReplace = value;

        const newValues = {...selectedItem, [name]:valueToReplace} as Product;
        setSelectedItem(newValues);
        // console.log(selectedItem)
    }
    const handleCurrencyChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = event.target;
        const newValues = {...selectedItem, [name]: Number(value)*100 } as Product;
        setSelectedItem(newValues);
    }
    const handleToggle = (e: ChangeEvent) => setSelectedItem({...selectedItem,"Enabled":!selectedItem.Enabled});

    const checkForChanges = () => {
        const currentlySelected = items.find((element) => element["Item GUID"]===selectedItem["Item GUID"])
        return(selectedItem === currentlySelected)
    }

    const formSubmitHandler = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(selectedItem)
        dispatch(updateProductStart(selectedItem));
    }

    useEffect(() => {
        dispatch(fetchProductsStart())
      }, [])

    return (
        <>
            <Container fluid 
                // style={{height:"", overflow:"auto"}}
                >
                <Row>
                    <Col className="col-12 col-md-4">
                    <ListGroup style={{height: "80vh", overflow:"auto"}}>
                            {
                            items.sort((a, b) =>{
                                if(a['Sort Order'] === b['Sort Order'])
                                    return a['Item Name'] > b['Item Name'] ? 1 : -1;
                                else return a['Sort Order'] > b['Sort Order'] ? 1 : -1;
                            },
                                ).map(
                                (item) =>
                                    <ListGroup.Item 
                                        className="d-flex justify-content-between align-items-start"
                                        key={item["Item GUID"]}
                                        variant={item.Enabled?"primary":"secondary"}
                                        active={checkIsActive(item)}
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
                            <Form
                                onSubmit={formSubmitHandler}>
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
                                        onChange={handleCurrencyChange} 
                                        name="List Price (WA)"
                                        type="number"
                                        value={selectedItem["List Price (WA)"]/100} 
                                    />
                                    <InputGroup.Text>OR</InputGroup.Text>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control 
                                        onChange={handleCurrencyChange} 
                                        name="List Price (OR)"
                                        type="number"
                                        value={selectedItem["List Price (OR)"]/100}
                                    />
                                </InputGroup>

                                <Form.Text>GUID</Form.Text>
                                <Form.Control disabled
                                    value={selectedItem["Item GUID"]}
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
        </>
    )
};

export default EditItems;