import { Route, Routes } from 'react-router';
import { Root } from './pages/Root';
import { Home } from './pages/Home';

function App() {
  return (
    <Routes>
      <Route element={<Root />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
