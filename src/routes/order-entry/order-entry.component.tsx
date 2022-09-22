import { ChangeEvent, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  selectProducts,
  selectProductsIsLoading,
} from '../../store/products/products.selector'
import Spinner from '../../components/spinner/spinner.component'
import {
  InventoryItemContainer,
  ItemsContainer,
  ItemsHeader,
  OrderPage,
} from './order-entry.styles'
import { fetchProductsStart } from '../../store/products/products.action'
import { Product } from '../../store/products/products.types'
import ProductCard from '../../components/product/product.component'
import Button from '../../components/button/button.component'
import { clearCart } from '../../store/cart/cart.action'
import { useNavigate } from 'react-router-dom'
import ProductTableRow from '../../components/product/product-table.component'
import { Alert, Container, Row, Table, Col, InputGroup, Form } from 'react-bootstrap'

// let items = require('../../data/items.json')

const OrderEntry = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsStart())
  }, [])

  const items = useSelector(selectProducts)
  const isLoading = useSelector(selectProductsIsLoading)

  const buttonHandler = () => {
    dispatch(clearCart())
  }

  return (
    <>
        <Container>
            {!show ? null : (<Row>
                <Alert dismissible variant="danger" onClose={() => setShow(false)}>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    Change this and that and try again.
                </p>
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
                items
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
