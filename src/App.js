//App.js
import {Authenticator, useAuthenticator} from '@aws-amplify/ui-react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RequireAuth } from './RequireAuthLogin';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { Admin } from './components/Admin';
import { Layout } from './components/Layout';
import { Waiver } from './components/Waiver';
import { LeaderBoard } from './components/LeaderBoard';
import { MyStats } from './components/MyStats';

/* Games */
import { Thief1 } from './games/thief1/Thief1';
import { Hurricane1Easy } from './games/hurricane1Easy/Hurricane1Easy';
import { Hurricane1 } from './games/hurricane1/Hurricane1';
import { Hurricane1Stop2 } from './games/hurricane1/Hurricane1Stop2';


import './App.css';
import './games/jaycee.css';

/* merged from dev - 3/30/23 */

function MyRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home />}/>
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
                        path="/hurricane-1-Easy"
                        element={
                            <RequireAuth>
                                <Hurricane1Easy />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/hurricane-1"
                        element={
                            <RequireAuth>
                                <Hurricane1 />
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
                    <Route
                        path="/leaderboard"
                        element={
                            <LeaderBoard />
                        }
                    />
                    <Route
                        path="/myStats"
                        element={
                            <MyStats />
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