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

// let items = require('../../data/items.json')

const OrderEntry = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchProductsStart())
  }, [])

  const items = useSelector(selectProducts)
  const isLoading = useSelector(selectProductsIsLoading)

  const buttonHandler = () => {
    dispatch(clearCart())
  }

  return (
    <OrderPage>
      {/* <ItemsHeader>
            <span className = 'name'>Name</span>
            <span className = 'price'>Price</span>
            <span className = 'packsize'>Pack</span>
            <span className = 'category'>Category</span>
            <span className = 'qty'>Order</span>
            </ItemsHeader>
            <ItemsContainer>
            {isLoading? (<Spinner />) :
            items.sort((a:any,b:any) => a["Sort Order"] > b["Sort Order"] ? 1:-1)
            .map((item) => (
                <ProductCard key={item["Item GUID"]} item={item} />
                ))
                
            }
        </ItemsContainer> */}
      <div className="container p-3 m-1">
        <button className="btn btn-primary" onClick={buttonHandler}>
          Clear cart
        </button>
        <div className="container border border-primary rounded p-3">
          <table className="table table-sm table-hover ">
            <thead className="table-primary">
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Pack</th>
              <th scope="col">Cat</th>
              <th scope="col" className="col-xs-1">
                Order
              </th>
            </thead>
            <tbody>
              {isLoading ? (
                <Spinner />
              ) : (
                items
                  .sort((a: any, b: any) =>
                    a['Sort Order'] > b['Sort Order'] ? 1 : -1,
                  )
                  .map((item) => (
                    <ProductTableRow key={item['Item GUID']} item={item} />
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </OrderPage>
  )
}

export default OrderEntry
