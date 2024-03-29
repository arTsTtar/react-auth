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
import AdminHome from "./pages/admin/AdminHome";

function App() {

    const [name, setName] = useState('');
    const [id, setId] = useState('');

    useEffect( () => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/user', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });
                const content = await response.json();
                if (content.name !== undefined) {
                    setName(content.name);
                    setId(content.id)
                }
            }
        )();
    });

  return (
    <div className="App">
        <BrowserRouter>
            <Nav name={name} id={id} setName={setName}/>
              <main className="form-signin">
                      <Route path="/" exact component={() => <Home name={name}/>}/>
                      <Route path="/login" component={() => <Login setName={setName}/>}/>
                      <Route path="/cant-log-in" component={() => <CredentialsReset/>}/>
                      <Route path="/reset-password" component={() => <ResetPassword/>}/>
                      <Route path="/success" component={SuccessfulRegistration}/>
                      <Route path="/register" component={Register}/>
              </main>
            <Route path="/admin" exact component={AdminHome}/>
        </BrowserRouter>
    </div>
  );
}

export default App;
