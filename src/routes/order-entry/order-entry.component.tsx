import { ChangeEvent, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  selectEnabledProducts,
  selectProducts,
  selectProductsIsLoading,
} from '../../store/products/products.selector'
import Spinner from '../../components/spinner/spinner.component'
import { fetchProductsStart } from '../../store/products/products.action'
import { clearCart } from '../../store/cart/cart.action'
import { useNavigate } from 'react-router-dom'
import ProductTableRow from '../../components/product/product-table.component'
import { Alert, Container, Row, Table, Col, InputGroup, Form, Button } from 'react-bootstrap'
import { addCollectionAndDocuments } from '../../utils/firebase/firebase.utils'

// let items = require('../../data/items.json')

const OrderEntry = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(false);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    dispatch(fetchProductsStart())
  }, [])

  const items = useSelector(selectEnabledProducts)
  const [filteredItems, setFilteredItems] = useState(items)
  const isLoading = useSelector(selectProductsIsLoading)

  useEffect(() => {
    const newFilteredItems = items.filter( (item) => {
      return item['Item Name'].toLocaleLowerCase().includes(searchString);
    });
    setFilteredItems(newFilteredItems);
  }, [items,searchString]);

  const buttonHandler = () => {
    dispatch(clearCart());
    setShowAlert(true);
  }

  const searchBoxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    const searchString = event.target.value.toLocaleLowerCase();
    setSearchString(searchString);
  }

  // const uploadHandler = () => {
  //   addCollectionAndDocuments("products",items);
  // }
  
  return (
    <>
      {/* <Button onClick={uploadHandler}>Upload!</Button> */}

        <Container>
            {!showAlert ? null : (<Row>
                <Alert dismissible variant="primary" onClose={() => setShowAlert(false)}>
                <Alert.Heading>Cart Cleared</Alert.Heading>
                </Alert>
            </Row>)}
        </Container>
    
      <Container className="p-lg-3">
        <Row className="m-md-3 p-1 text-end">

            <Col>
                <InputGroup className="">
                <InputGroup.Text id="inputGroup-sizing-default">
                Search
                </InputGroup.Text>
                <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={searchBoxHandler}
                />
                </InputGroup>
            </Col>
            <Col className="">
                <button className="btn btn-primary" onClick={buttonHandler}>
                Clear cart
                </button>
            </Col>
        </Row>
        <Row className="border border-primary rounded mt-3 m-md-3">
          <Col>
              {/* end margin 5 aligns the header with content (scrollbar offset) */}
            <Row className="p-2 pe-5 bg-primary text-white ">
                  <Col scope="col" className="">Name</Col>
                  <Col scope="col" className="col-2">Price</Col>
                  <Col scope="col" className="col-2">Pack</Col>
                  <Col scope="col" className="col-1">Cat</Col>
                  <Col scope="col" className="col-1">Order</Col>
            </Row>
            <Container fluid className="py-1" style={{height:"65vh", overflow:"auto"}}>
              {isLoading ? (
                <Spinner />
              ) : (
                filteredItems
                  .sort((a, b) =>
                    a['Sort Order'] > b['Sort Order'] ? 1 : -1,
                  )
                  .map((item) => (
                    <ProductTableRow key={item['Item GUID']} item={item} />
                  ))
              )}
            </Container>
          </Col>
        </Row>
        
      </Container>
    </>
  )
}

export default OrderEntry
