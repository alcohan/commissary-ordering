import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import SignIn from './components/sign-in/sign-in.component';
import OrderEntry from './routes/order-entry/order-entry.component';

function App() {
  return (
    <Routes>
      <Route path='/*' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='auth' element={<SignIn />} />
        <Route path='order' element={<OrderEntry />} />
      </Route>
    </Routes>
  );
}

export default App;
