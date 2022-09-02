import { ChangeEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectProducts, selectProductsIsLoading } from "../../store/products/products.selector";
import Spinner from "../../components/spinner/spinner.component";
import { InventoryItemContainer, ItemsContainer, ItemsHeader, OrderPage } from "./order-entry.styles";
import { fetchProductsStart } from "../../store/products/products.action";
import { Product } from "../../store/products/products.types";
import ProductCard from "../../components/product/product.component";
import Button from "../../components/button/button.component";
import { clearCart } from "../../store/cart/cart.action";
import { useNavigate } from "react-router-dom";

// let items = require('../../data/items.json')

const OrderEntry = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        dispatch(fetchProductsStart());
        navigate('/order');
    },[]);

    const items = useSelector(selectProducts);
    const isLoading = useSelector(selectProductsIsLoading);

    const buttonHandler = () => {
        dispatch(clearCart());
    }

    return(
        <OrderPage>
            <Button onClick={buttonHandler}>Clear cart</Button>
        <ItemsHeader>
            <span className = 'name'>Name</span>
            <span className = 'price'>Price</span>
            <span className = 'packsize'>Pack</span>
            <span className = 'category'>Category</span>
            <span className = 'qty'>Order</span>
        </ItemsHeader>
        <ItemsContainer>
        {isLoading? (<Spinner />) :
                items.sort((a:any,b:any) => a["Sort Order"] > b["Sort Order"] ? 1:-1)
                .map((item: any) => (
                    <ProductCard key={item["Item GUID"]} item={item} />
                    ))
                
            }
        </ItemsContainer>
        </OrderPage>
    )
}

export default OrderEntry