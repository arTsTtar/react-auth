import React, {useEffect, useState} from 'react';
import './App.css';
import Login from "./pages/login/Login";
import Nav from "./components/Nav";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/register/Register";
import SuccessfulRegistration from "./pages/register/SuccessfulRegistration";
import CredentialsReset from "./pages/login/CredentialsReset";
import ResetPassword from "./pages/login/ResetPassword";

function App() {

    const [name, setName] = useState('');

    useEffect( () => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/user', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });
                const content = await response.json();
                if (content.name !== undefined)
                    setName(content.name);
            }
        )();
    });

  return (
    <div className="App">
        <BrowserRouter>
            <Nav name={name} setName={setName}/>
              <main className="form-signin">
                      <Route path="/" exact component={() => <Home name={name}/>}/>
                      <Route path="/login" component={() => <Login setName={setName}/>}/>
                      <Route path="/cant-log-in" component={() => <CredentialsReset/>}/>
                      <Route path="/reset-password" component={() => <ResetPassword/>}/>
                      <Route path="/success" component={SuccessfulRegistration}/>
                      <Route path="/register" component={Register}/>
              </main>
        </BrowserRouter>
    </div>
  );
}

export default App;
