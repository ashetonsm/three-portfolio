import './App.css'
import { Home } from './pages/Home'
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from './components/UI/Navbar.tsx'

function App() {

  return (

    <ChakraProvider>
      <Navbar>
        <Home />
      </Navbar>
    </ChakraProvider>

  );
}

export default App;
