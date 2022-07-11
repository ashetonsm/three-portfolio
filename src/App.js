import './App.css'
import { Home } from './pages/Home'
import { ChakraProvider } from '@chakra-ui/react'
import SidebarWithHeader from './components/UI/Sidebar.tsx'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <ChakraProvider>
          <SidebarWithHeader>
            <Home/>
          </SidebarWithHeader>

          <Routes>
            <Route path="/test" element={<div>Hell, world!</div>} />
          </Routes>

        </ChakraProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
