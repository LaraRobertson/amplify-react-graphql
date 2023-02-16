// components/Layout.js
import React, {useEffect, useState} from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {useAuthenticator, Flex, Button, useTheme, Heading, View, Image, Authenticator,Card, Text, TextField, TextAreaField} from '@aws-amplify/ui-react';
import {API, Auth} from "aws-amplify";
import {updateGameStats as updateGameStatsMutation} from "../graphql/mutations";

export function Layout() {
    const [userAuthEmail, setUserAuthEmail] = useState('');
    const [error, setError] = useState(false);

    const { route, signOut } = useAuthenticator((context) => [
        context.route,
        context.signOut,
    ]);

    async function logOut() {
        console.log("logout");
        localStorage.setItem("gameName","");
        /* update game state */
        /* get values from local variables - need gamename */
        const gameStatID = localStorage.getItem("GameStatsID");
        const waiverSigned = localStorage.getItem("agreeToWaiver");
        /* update game state */
        /* get values from local variables - need gamename and email */
        const gameStatsValues = {
            waiverSigned: waiverSigned,
            gamePage: "test",
            guessedPuzzle12: false
        }
        const newGameStats = {
            id: gameStatID,
            gameStates: JSON.stringify(gameStatsValues)
        };

        const apiGameStatsUpdate = await API.graphql({ query: updateGameStatsMutation, variables: {input: newGameStats}});
        signOut();
    }

    function goHome() {
        localStorage.setItem("gameName","");
        navigate('/');
    }
    async function save() {
        console.log("save");
        try {
        /* update game state */
        /* get values from local variables - need gamename */
        const gameStatID = localStorage.getItem("GameStatsID");
        const waiverSigned = localStorage.getItem("agreeToWaiver");
        /* update game state */
        /* get values from local variables - need gamename and email */
        const gameStatsValues = {
            waiverSigned: waiverSigned,
        }
        const newGameStats = {
            id: gameStatID,
            gameStates: JSON.stringify(gameStatsValues)
        };

        const apiGameStatsUpdate= await API.graphql({ query: updateGameStatsMutation, variables: {input: newGameStats}});
            setError(false);
        } catch (err) {
            console.log('error: ', err);
            setError(true);
        }
    }
    const ErrorComponent = () => {
        console.log("error in component: " + error);
        let className = "hide";
        error ? className ="show" : className="hide";
        return (
            <View className={className} >
                <div>There are errors (probably no internet) and your data did not save.
                    <br />
                    Your progress is not lost.
                    <br />
                    Please do not close window so that your progress can be saved.
                </div>
            </View>
        )
    }
    async function getUserAuthInfo() {
        Auth.currentAuthenticatedUser({
            bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(user => {
            console.log("getUserAuthInfo()");
            console.log(" user?.signInUserSession?.idToken?.payload?.email (useEffect-user): " + user?.signInUserSession?.idToken?.payload?.email);
            setUserAuthEmail(user?.signInUserSession?.idToken?.payload?.email);
        })
            .catch(err => {
                console.log(err)
            });
    }

    /* useEffects */
    /*
    So if you want to perform an action immediately after setting state on a state variable,
    we need to pass a callback function to the setState function.
    But in a functional component no such callback is allowed with useState hook.
    In that case we can use the useEffect hook to achieve it.
     */
    useEffect(() => {
        /* check table to make sure user is there, add free games if needed */
        console.log("***useEffect***: fetchUserInfofromDB() + email: " + userAuthEmail);
    }, [userAuthEmail]);

    useEffect(() => {
        /* get userAuthEmail from authentication */
        console.log("***useEffect***:  getUserAuthInfo()");
        getUserAuthInfo();
    }, [])

    const location = useLocation();
    const navigate = useNavigate();
   // const { tokens } = useTheme();
    console.log("location: " + location.pathname);

    return (
        <View
            maxWidth="800px"
            margin="10px auto 10px auto">
            {(route === 'authenticated') && (location.pathname === '/') ? (
                <View>
                        <header>
                            <View>
                                <div className="wp-block-columns">
                                    <div><Image className="test" src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/02/logo-escapeout.png" /></div>
                                </div>
                            </View>
                        </header>
                        <View padding=".5rem 0">
                            <Button onClick={() => goHome()}>Home</Button> | <Button
                            onClick={() => logOut()}>Logout</Button> | <Button
                            onClick={() => localStorage.clear()}>Clear</Button>
                        </View>
                </View>) : null}
            {(route !== 'authenticated') && (location.pathname === '/')||(location.pathname === '/login') ? (
                <View>
                    <header>
                        <View>
                            <div className="wp-block-columns">
                                <div><Image className="test" src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/02/logo-escapeout.png" /></div>
                            </div>
                        </View>
                    </header>
                    <div>
                        <div>
                            <View padding="0 0 10px 0">
                                <hr />
                                <Heading
                                    level={4}
                                    paddingTop="10px">
                                    Game is under development
                                </Heading>
                                <div>Please email us at info@escapeout.games if you have questions.</div>
                            </View>
                            <hr />
                            <View paddingTop="10px">
                                {location.pathname === '/login' ? (
                                    <Button onClick={() => navigate('/')}>Home</Button>
                                ) : (
                                    <div>
                                        <View paddingBottom="10px">Fell free to create an account and test:</View>
                                        <Button className="button bouncy" onClick={() => navigate('/login')}>Login or Create an
                                            Account</Button>
                                    </div>
                                )
                                }

                            </View>
                        </div>
                    </div>
                </View>) : null}
            <ErrorComponent />
            <Outlet />
            {(location.pathname === '/')||(location.pathname === '/login') ? (
                <View paddingTop="40px"> © 2023 EscapeOut.Games</View>
            ) : null}
        </View>
    );
}