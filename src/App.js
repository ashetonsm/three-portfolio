import './App.css'
import { Home } from './pages/Home'
import { Navbar } from './components/UI/Navbar'
import { DeskScene } from './pages/DeskScene';

function App() {

  return (

      <Navbar>
        <DeskScene />
      </Navbar>
  );
}

export default App;
