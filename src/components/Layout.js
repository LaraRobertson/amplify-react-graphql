// components/Layout.js
// components/Layout.js
import React, {useEffect, useState} from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {useAuthenticator, Link, Button, useTheme, Heading, View, Image, Authenticator,Card, Text, TextField, TextAreaField} from '@aws-amplify/ui-react';
import {API, Auth} from "aws-amplify";
import {updateGameStats as updateGameStatsMutation} from "../graphql/mutations";
import {removeLocalStorage} from "./helper";

export function Layout() {
    const [errorInternet, setErrorInternet] = useState(false);
    // hook below is only reevaluated when `user` changes
    const { route, signOut, user } = useAuthenticator((context) => [
        context.route,
        context.signOut,
        context.user
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


    /* useEffects */
    /*
    So if you want to perform an action immediately after setting state on a state variable,
    we need to pass a callback function to the setState function.
    But in a functional component no such callback is allowed with useState hook.
    In that case we can use the useEffect hook to achieve it.
     */


    const location = useLocation();
    const navigate = useNavigate();
    // const { tokens } = useTheme();
    console.log("location: " + location.pathname);
    const NavigationButtons = (props) => {
        console.log("props.user.attributes.email: " + props.user.attributes.email);
        /*for (const key in props.user) {
             console.log(`${key}: ${props.user[key]}`);
            for (const key1 in props.user[key]) {
                console.log(`(key1)/${key1}: ${props.user[key][key1]}`);
            }
         }*/
        return (
            <View padding=".5rem 0">
                {props.user.attributes.email === "lararobertson70@gmail.com" ? (<Button className="button" marginLeft="10px" onClick={() => navigate('/admin')}> =>Admin</Button>
                ) : (<div></div>)
                }
            </View>
        )
    }
    return (
        <View>
            {(route === 'authenticated') && ((location.pathname === '/')||(location.pathname === '/leaderboard')||(location.pathname === '/leaderboard2')||(location.pathname === '/myStats')) ? (
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
                            <br />(<span className="italics">games are played at locations below</span> )
                        </View>
                        <hr />
                    </View>):null}

                    <NavigationButtons user={user} />
                    <View padding=".5rem 0">
                        {(location.pathname === '/leaderboard' || location.pathname === '/leaderboard2') ?
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

                    </View>
                </View>
            </View>
            ): null}
            {(route !== 'authenticated') && ((location.pathname === '/')||(location.pathname === '/login')||(location.pathname === '/leaderboard')||(location.pathname === '/leaderboard2')) ? (
              <View className="main-container">
                  <View className="main-content">
                      <header>
                          <View marginTop="10px">
                              <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/logo-escapeout-dark2.png" />
                          </View>
                      </header>
                      <hr />
                      {location.pathname != '/login' ? (
                          <View>
                             <View padding="0 0 15px 0">
                                    <Heading
                                        level={5}
                                        className="heading"
                                        paddingTop="10px">
                                        Games are under development
                                    </Heading>
                                    <div>Please email us at info@escapeout.games if you have questions.</div>
                             </View><hr/>
                          </View>):null}
                     <View padding="15px 0 0 0">
                            {(location.pathname === '/login' || location.pathname === '/leaderboard' || location.pathname === '/leaderboard2') ? (
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

                 </View>
             </View>) : null}

            <ErrorComponent />
            <Outlet />
            {(location.pathname === '/')||(location.pathname === '/login')||(location.pathname === '/leaderboard')||(location.pathname === '/leaderboard2') ? (
                <View className="main-container">
                    <View className="main-content">
                        <View padding="40px 10px 10px 10px" textAlign="center"> © 2023 EscapeOut.Games<br />
                            <Link
                                href="https://escapeout.games/privacy-policy/"
                                color="white"
                                isExternal={true}
                                textDecoration="underline"
                            >
                                Privacy Policy
                            </Link> |
                            <Link
                                href="https://escapeout.games/terms-of-service/"
                                color="white"
                                isExternal={true}
                                textDecoration="underline"
                            >
                                Terms of Service
                            </Link>
                        </View>
                    </View>
                </View>
            ) : null}
        </View>
    );
}