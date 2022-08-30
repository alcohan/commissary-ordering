import styled from 'styled-components';

export const OrderPage = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

export const ItemsContainer = styled.div`
width: 80%;
display: flex;
flex-direction: column;
align-items: center;

padding: 2px 10px;
border: 1px solid black;

max-height: 80vh;
overflow: auto;
`

export const ItemElement = styled.div`
width: 100%;
display: flex;
// min-height: 24px;
border-bottom: 1px solid lightgray;
padding: 5px 0px;
font-size: 14px;
align-items: center;
justify-content: space-between;

.sort,
.price,
.packsize,
.category {
    width: 10%;
    // overflow: hidden;
}

.name {
    width: 40%;
}

.qty {
    max-width: 30px;
    // width: 8%;
}
`

export const ItemsHeader = styled(ItemElement)`
width: 80%;
display: flex;
justify-content: space-between;
align-items: center;
margin: 20px auto 0;

.qty {
    // max-width: unset;
}
`

export const InventoryItemContainer = styled(ItemElement)`

`