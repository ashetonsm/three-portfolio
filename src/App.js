import './App.css';
import { Home } from './pages/Home';
import { ChakraProvider } from '@chakra-ui/react'
import SidebarWithHeader from './components/UI/Sidebar.tsx';

function App() {
  return (
    <>
    <ChakraProvider>
      
      <SidebarWithHeader>
        <Home/>
      </SidebarWithHeader>
      
    </ChakraProvider>
    </>
  );
}

export default App;
