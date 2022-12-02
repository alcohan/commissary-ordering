import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import SignIn from './components/sign-in/sign-in.component';
import Auth from './routes/authentication/auth.component';
import OrderEntry from './routes/order-entry/order-entry.component';
import Checkout from './routes/checkout/checkout.component';
import EditItems from './routes/edit-items/edit-items.component';
import EditStores from './routes/edit-stores/edit-stores.component';

function App() {
  return (
    <Routes>
      <Route path='/*' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='auth' element={<Auth />} />
        <Route path='order' element={<OrderEntry />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='items' element={<EditItems />} />
        <Route path='stores' element={<EditStores />} />
      </Route>
    </Routes>
  );
}

export default App;
