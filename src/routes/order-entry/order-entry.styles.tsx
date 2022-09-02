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
border: 1px solid slategray;

max-height: 80vh;
overflow: auto;
`

export const ItemElement = styled.div`
width: 100%;
display: flex;
// min-height: 24px;
border-bottom: 1px solid lightgray;
padding: 5px 4px;
font-size: 14px;
align-items: center;
justify-content: space-between;

.price,
.packsize,
.category{
    width: 15%;
}

.qty {
    width: 10%;
    box-sizing: border-box;
}

.name {
    width: 40%;
}

`

export const ItemsHeader = styled(ItemElement)`
width: 80%;
justify-content: flex-start;
margin: 10px auto 0;
padding: 2px 10px;
background: lightgray;
border: 1px solid darkgray;
`

export const InventoryItemContainer = styled(ItemElement)`

`