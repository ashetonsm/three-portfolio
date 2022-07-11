import './App.css'
import { Home } from './pages/Home'
import { Contact } from './pages/Contact'
import { ChakraProvider } from '@chakra-ui/react'
import SidebarWithHeader from './components/UI/Sidebar.tsx'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Gallery2D } from './pages/Gallery2D'
import { Gallery3D } from './pages/Gallery3D'

function App() {

  return (
    <>
      <BrowserRouter>
        <ChakraProvider>


          <Routes>
            <Route path="/"
              element={
                <SidebarWithHeader>
                  <Home />
                </SidebarWithHeader>
              } />
            <Route path="/gallery3D"
              element={
                <SidebarWithHeader>
                  <Gallery3D />
                </SidebarWithHeader>
              } />
            <Route path="/gallery2D"
              element={
                <SidebarWithHeader>
                  <Gallery2D />
                </SidebarWithHeader>
              } />
            <Route path="/contact"
              element={
                <SidebarWithHeader>
                  <Contact />
                </SidebarWithHeader>
              } />
          </Routes>

        </ChakraProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
