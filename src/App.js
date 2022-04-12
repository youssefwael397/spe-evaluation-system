import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './components/AppRoutes';
import { UserProvider } from "./components/UserProvider";


function App() {

  return (
    <UserProvider>
      <Router>
        <div className="App bgColor">
          <NavBar />
          <AppRoutes />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
