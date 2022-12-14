import { queryByDisplayValue } from "@testing-library/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Badge, ListGroup, Row, Col, Container, Form, Button, ToggleButton, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { fetchCustomersStart, updateCustomerStart } from "../../store/customers/customers.action";
import { selectCustomers, selectCommissaries } from "../../store/customers/customers.selector"
import { Customer } from "../../store/customers/customers.types";

//FIXME there has got to be a better way to do this
const days = ['sun','mon','tue','wed','thu','fri','sat'];
type d = {[index:string]:string}
const daysOfWeek:d = {
    "sun": 'Sunday', 
    "mon": 'Monday',
    "tue": 'Tuesday',
    "wed": 'Wednesday',
    "thu": 'Thursday',
    "fri": 'Friday',
    "sat": 'Saturday',
}

const EditStores = () => {
    const stores = useSelector(selectCustomers);
    const commissaries = useSelector(selectCommissaries);
    const dispatch = useDispatch();
    const [selectedStore, setSelectedStore] = useState({} as Customer);

    useEffect(() => {
        dispatch(fetchCustomersStart())
    },[])

    const checkIsActive = (store:Customer) => {
        if (store["Store GUID"] === selectedStore["Store GUID"]) {
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

        const newValues = {...selectedStore, [name]:valueToReplace} as Customer;
        setSelectedStore(newValues);
    }

    const checkForChanges = () => {
        const currentlySelected = stores.find((element) => element["Store GUID"]===selectedStore["Store GUID"])
        return(selectedStore === currentlySelected)
    }

    const formSubmitHandler = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateCustomerStart(selectedStore));
    }

    const handleDayPickerToggle = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;
        const newValues = {...selectedStore, "DeliveryDates":{...selectedStore.DeliveryDates, [id]:checked}} as Customer;
        setSelectedStore(newValues)
    }


    return (
        <Container fluid>
            <Row>
                <Col className="col-12 col-md-4">
                    <ListGroup>
                    {stores
                        .sort((a,b) => {return a["Store Code"] > b["Store Code"] ? 1:-1})
                        .map(store => 
                    <ListGroup.Item 
                        className="d-flex justify-content-between align-items-start"
                        key={store["Store GUID"]}
                        variant="primary"
                        active={checkIsActive(store)}
                        action onClick={() => setSelectedStore(store)}
                        >
                        {store["Store Name"]}
                        <Badge>{store["Store Code"]}</Badge>
                    </ListGroup.Item>
                    )}

                    </ListGroup>
                </Col>
                <Col>
                        {selectedStore["Store GUID"]? (
                            <Form
                                onSubmit={formSubmitHandler}>
                                    
                                <Form.Text>Name</Form.Text>
                                <Form.Control 
                                    onChange={handleFormChange} 
                                    name="Store Name"
                                    value={selectedStore["Store Name"]} 
                                />
                                <Form.Text>Code</Form.Text>
                                <Form.Control 
                                    onChange={handleFormChange}
                                    name="Code"
                                    value={selectedStore["Store Code"]} 
                                    />

                                <Form.Text>Delivery Dates</Form.Text>
                                <InputGroup className="text-center gap-3">                                  
                                    {days.map((day) => (
                                        <Form.Group>
                                            <Form.Check 
                                                key={day}
                                                onChange={handleDayPickerToggle}
                                                checked={selectedStore.DeliveryDates[day]} 
                                                id={day}>
                                            </Form.Check>
                                            <Form.Label for={day}>{daysOfWeek[day]}</Form.Label>
                                        </Form.Group>
                                    ))}
                                </InputGroup>
    
                                <Form.Text>Commissary</Form.Text>
                                <Form.Control 
                                    onChange={handleFormChange}
                                    name="ParentCommissary"
                                    value={commissaries.find(e => e["ID"] === selectedStore["Commissary ID"])?.Name}
                                    />

                                <Form.Text>GUID</Form.Text>
                                <Form.Control disabled
                                    value={selectedStore["Store GUID"]}
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

export default EditStores