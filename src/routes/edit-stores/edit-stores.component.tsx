import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCustomersStart } from "../../store/customers/customers.action";
import { selectCustomers } from "../../store/customers/customers.selector"

const EditStores = () => {
    const stores = useSelector(selectCustomers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCustomersStart())
    },[])

    return (
        <>
            <h1>Edit Stores</h1>
            {stores.map(store => <div>{store["Store Code"]}</div>)}
        </>
    )
}

export default EditStores