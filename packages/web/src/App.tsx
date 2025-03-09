import { Route, Routes } from 'react-router';
import { Root } from './pages/Root';
import { Home } from './pages/Home';
import { MarkerContext } from './context/MarkerContext';
import { Journey } from './pages/Journey';

function App() {
  return (
    <MarkerContext>
      <Routes>
        <Route element={<Root />}>
          <Route path="/" element={<Home />}>
            <Route path="/journey" element={<Journey />} />
          </Route>
        </Route>
      </Routes>
    </MarkerContext>
  );
}

export default App;
