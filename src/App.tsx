import React from "react";
import "./App.scss";
import MainPage from "./pages/mainpage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Appnav from "./components/navbar";
import HistoricPage from "./pages/historicpage";
import EstacionPage from "./pages/estacionpage";



const App = () => {
  return (

    <Router>
      <Appnav></Appnav>

      <Switch>
        <Route path="/info">
        <EstacionPage></EstacionPage>
        </Route>
        <Route path="/historic">
          <HistoricPage></HistoricPage>
        </Route>
        <Route path="/">
          <MainPage></MainPage>
        </Route>
      </Switch>
    </Router>
  )
};
export default App;
