// components/Layout.js
// components/Layout.js
import React, {useEffect, useState} from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {useAuthenticator, Link, Button, useTheme, Heading, View, Image, Authenticator,Card, Text, TextField, TextAreaField} from '@aws-amplify/ui-react';
import {API, Auth} from "aws-amplify";
import {updateGameStats as updateGameStatsMutation} from "../graphql/mutations";
import {removeLocalStorage} from "./helper";

export function Layout() {
    const [userAuth, setUserAuth] = useState({});
    const [errorInternet, setErrorInternet] = useState(false);

    const { route, signOut } = useAuthenticator((context) => [
        context.route,
        context.signOut,
    ]);

    async function logOut() {
        console.log("logout");
        /* save everything for game? */
        /* get values from local variables - need gamename */
        const gameStatID = localStorage.getItem("gameStatsID");
        const waiverSigned = localStorage.getItem("agreeToWaiver");
        /* update game state */
        removeLocalStorage();
        /* don't save game stats from home page */
        /* get values from local variables - need gamename and email */
        /*
        const gameStatsValues = {
            waiverSigned: waiverSigned,
            gamePage: "test",
            guessedPuzzle12: false
        }
        const newGameStats = {
            id: gameStatID,
            gameStates: JSON.stringify(gameStatsValues)
        };
        const apiGameStatsUpdate = await API.graphql({ query: updateGameStatsMutation, variables: {input: newGameStats}});*/
        /* end save game stats */
        setUserAuth({});
        signOut();
    }

    function goHome() {
        localStorage.setItem("gameName","");
        navigate('/');
    }

    function myStats() {
        navigate('/myStats');
    }

    async function save() {
        console.log("save");
        try {
            /* update game state */
            /* get values from local variables - need gamename */
            const gameStatID = localStorage.getItem("gameStatsID");
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
            setErrorInternet(false);
        } catch (err) {
            console.log('errorInternet: ', err);
            setErrorInternet(true);
        }
    }
    const ErrorComponent = () => {
        console.log("error in component: " + errorInternet);
        let className = "hide";
        errorInternet ? className ="show" : className="hide";
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
            setUserAuth({
                email: user?.signInUserSession?.idToken?.payload?.email
            });
            // setUserAuthEmail(user?.signInUserSession?.idToken?.payload?.email);
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
        console.log("***useEffect***: fetchUserInfofromDB() + email: " + userAuth.email);
    }, [userAuth]);

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
        <View>
            {(route === 'authenticated') && ((location.pathname === '/')||(location.pathname === '/leaderboard')||(location.pathname === '/myStats')) ? (
            <View className="main-container">
                <View className="main-content">
                    <header>
                        <View marginTop="10px">
                            <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/logo-escapeout-dark2.png" />
                        </View>
                    </header>
                    <hr />
                    {(location.pathname === '/') ? (
                    <View>
                        <View color="white" paddingBottom="15px">
                        <Heading level={"4"} className="heading" textAlign="center">
                            Play the ultimate outdoor adventure game!
                        </Heading>
                        Grab your phone, round up your family and friends, and head outside for a fun-filled day of problem-solving, exploration, and excitement!
                        </View>
                        <hr />
                    </View>):null}

                    <View padding=".5rem 0">
                        {location.pathname === '/leaderboard' ?
                            ( <View><Button marginBottom="10px" className="button" onClick={() => navigate('/')}>Back to Game List</Button>
                            | <Button className="button" onClick={() => myStats()}>My Stats</Button> </View>
                        ) : null}
                        {location.pathname === '/' ?
                        (<View><Button className="button" onClick={() => myStats()}>My Stats</Button> |
                               &nbsp;<Button className="button" onClick={() => logOut()}>Logout</Button></View>)
                            :null}
                        {location.pathname === '/myStats' ?
                            (<Button marginBottom="10px" className="button" onClick={() => navigate('/')}>Back to Game List</Button>)
                            :null}
                        {userAuth.email === "lararobertson70@gmail.com" ? (<Button className="button" marginLeft="10px" onClick={() => navigate('/admin')}> =>Admin</Button>
                        ) : (<div></div>)
                        }
                    </View>
                </View>
            </View>
            ): null}
            {(route !== 'authenticated') && ((location.pathname === '/')||(location.pathname === '/login')||(location.pathname === '/leaderboard')) ? (
              <View className="main-container">
                  <View className="main-content">
                      <header>
                          <View marginTop="10px">
                              <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/logo-escapeout-dark2.png" />
                          </View>
                      </header>
                      <hr />
                     <View padding="0 0 15px 0">
                            <Heading
                                level={5}
                                className="heading"
                                paddingTop="10px">
                                Games are under development
                            </Heading>
                            <div>Please email us at info@escapeout.games if you have questions.</div>
                     </View>
                     <hr />
                     <View padding="15px 0">
                            {location.pathname === '/login' || location.pathname === '/leaderboard' ? (
                                <Button marginBottom="10px" className="button" onClick={() => navigate('/')}>Back to Game List</Button>
                            ) : (
                                <View>
                                    <View paddingBottom="10px">Feel free to Test:</View>
                                    <Button marginBottom="10px" className="button bouncy" onClick={() => navigate('/login')}>Login or Create an
                                        Account</Button><br />
                                  Questions?&nbsp;
                                    <Link
                                        href="https://escapeout.games/faqs/"
                                        color="white"
                                        isExternal={true}
                                        textDecoration="underline"
                                    >
                                        Visit FAQs
                                    </Link>
                                </View>
                            )
                            }
                     </View>
                     <hr />
                 </View>
             </View>) : null}

            <ErrorComponent />
            <Outlet />
            {(location.pathname === '/')||(location.pathname === '/login')||(location.pathname === '/leaderboard') ? (
                <View className="main-container">
                    <View className="main-content">
                        <View padding="40px 10px 0 10px"> © 2023 EscapeOut.Games</View>
                    </View>
                </View>
            ) : null}
        </View>
    );
}