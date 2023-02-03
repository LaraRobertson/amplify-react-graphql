//App.js
import { Authenticator } from '@aws-amplify/ui-react';
import { ThiefPage2 } from './components/ThiefPage2';
import { RequireAuth } from './RequireAuth';
import { Login } from './components/Login';
import { Home } from './components/Home';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

function MyRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route
                        path="/thief-1-page1"
                        element={
                            <RequireAuth>
                                <ThiefPage2 />
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
            <MyRoutes />
        </Authenticator.Provider>
    );
}

export default App;