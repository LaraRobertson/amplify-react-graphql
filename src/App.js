//App.js
import {Authenticator, useAuthenticator} from '@aws-amplify/ui-react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RequireAuth } from './RequireAuthLogin';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { Admin } from './components/Admin';
import { Layout } from './components/Layout';
import { Waiver } from './components/Waiver';

/* Games */
import { Thief1 } from './games/thief1/Thief1';
import { Thief2 } from './games/thief2/Thief2';
import { Thief3 } from './games/thief3/Thief3';


import './App.css';


function MyRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home />} />
                    <Route
                        path="/admin"
                        element={
                            <RequireAuth>
                                <Admin />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/thief-1"
                        element={
                            <RequireAuth>
                                <Thief1 />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/thief-2-(new)"
                        element={
                            <RequireAuth>
                                <Thief2 />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/thief-3"
                        element={
                            <RequireAuth>
                                <Thief3 />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/waiver"
                        element={
                            <RequireAuth>
                                <Waiver />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Login />
                        }
                        />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

function App() {
    return (
        <Authenticator.Provider>
            <MyRoutes  />
        </Authenticator.Provider>
    );
}

export default App;