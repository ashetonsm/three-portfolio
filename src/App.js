import './App.css'
import { DeskScene } from './pages/DeskScene'
import { Switch, Route } from "wouter"

function App() {

  return (
    <Switch>
      <Route>
        <DeskScene />
      </Route>
    </Switch>
  )
}

export default App
