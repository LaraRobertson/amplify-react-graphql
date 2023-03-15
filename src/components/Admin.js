// components/Home.js
import React, {useEffect, useState} from 'react';
import {
    Flex,
    Button,
    useTheme,
    Heading,
    View,
    Card,
    Text,
    TextField,
    TextAreaField,
    useAuthenticator
} from '@aws-amplify/ui-react';
import {API, Auth} from "aws-amplify";
import {listGames, gamesByDate, usersByEmail, listUsers} from "../graphql/queries";
import { format } from 'date-fns'
import {
    createGame as createGameMutation,
    createUser as createUserMutation,
    createUserGamePlay as createUserGamePlayMutation
} from "../graphql/mutations";
import { useNavigate } from 'react-router-dom';

export function Admin() {
    const [games, setGames] = useState([]);
    const [users, setUsers] = useState([]);
    const [userID, setUserID] = useState('');
    const [isGameDetailVisible, setIsGameDetailVisible] = useState(true);
    const [userAuth, setUserAuth] = useState({});

    const {tokens} = useTheme();
    const { route } = useAuthenticator((context) => [context.route]);
    const navigate = useNavigate();


    /* classes */
    let buttonDetailClassHide = "button button-small hide";
    let buttonDetailClassShow = "button button-small show";
    let gameDetailClass = "all-screen hide-gradual";
    if (isGameDetailVisible === true) {
        buttonDetailClassHide = "button button-small hide";
        buttonDetailClassShow = "button button-small show";
        gameDetailClass = "all-screen hide-gradual";
    } else {
        buttonDetailClassHide = "button button-small show";
        buttonDetailClassShow = "button button-small hide";
        gameDetailClass = "alls-screen show-gradual";
    }
    function showGameDetail() {
        setIsGameDetailVisible(false);
        console.log("isGameDetailVisible: " + isGameDetailVisible);
    }

    function hideGameDetail() {
        setIsGameDetailVisible(true);
        console.log("isGameDetailVisible: " + isGameDetailVisible);
    }
    function goToGame(gameName) {
        const gameStatsValues = {
            waiverSigned: false,
            gameName: "test",
            gamePage: "",
            guessedPuzzle1: false
        }
        //localStorage.setItem("gameStats",  JSON.stringify(gameStatsValues));
        let gameStatsObject = JSON.parse(localStorage.getItem("gameStats"));
        console.log("gameStatsObject (gameName): " + gameStatsObject.gameName);
        for (const key in gameStatsObject) {
            console.log(`${key}: ${ gameStatsObject[key]}`);
            /* for (const key1 in dataTest[key]) {
                 console.log(`${key1}: ${dataTest[key][key1]}`);
             }*/
        }
        console.log("go to page: " + gameName);
        let path = gameName.replace(/\s+/g, '-').toLowerCase();
        console.log("go to page: " + '/' + path + '-page1');
        navigate('/' + path + '-page1');
    }

    async function getUserGamePlay() {
        const apiData = await API.graphql({
            query: getUserGamePlay,
            variables: { gameId: "1"}
        });
        const gamesFromAPI = apiData.data.gamesByDate.items;
        /*await Promise.all(
            gamesFromAPI.map(async (game) => {
                if (game.gameImage) {
                    const url = await Storage.get(game.gameName);
                    game.gameImage = url;
                    console.log("url: " + url);
                }
                return game;
            })
        );*/
        // setGames(gamesFromAPI);
    }

    async function getUserAuthInfo() {
        Auth.currentAuthenticatedUser({
            bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(user => {
            console.log("getUserAuthInfo()");
            console.log(" user?.signInUserSession?.idToken?.payload?.email (useEffect-user): " + user?.signInUserSession?.idToken?.payload?.email);
            setUserAuth({
                email: user?.signInUserSession?.idToken?.payload?.email,
                username: user.username
            });
        })
            .catch(err => {
                console.log(err)
            });
    }
    async function fetchGames() {
        const apiData = await API.graphql({
            query: gamesByDate,
            variables: {sortDirection: "DESC", type: "game"}
        });
        const gamesFromAPI = apiData.data.gamesByDate.items;
        /*await Promise.all(
            gamesFromAPI.map(async (game) => {
                if (game.gameImage) {
                    const url = await Storage.get(game.gameName);
                    game.gameImage = url;
                    console.log("url: " + url);
                }
                return game;
            })
        );*/
        setGames(gamesFromAPI);
    }

    async function fetchGamesFree() {
        let filter = {
            gameType: {
                eq: "free"
            }
        };
        const apiDataFree = await API.graphql({query: listGames, variables: {filter: filter}});
        console.log("apiDataFree: " + JSON.stringify(apiDataFree));
        for (const key in apiDataFree) {
            console.log(`${key}: ${apiDataFree[key]}`);
            for (const key1 in apiDataFree[key]) {
                console.log(`${key1}: ${apiDataFree[key][key1]}`);
            }
        }
        const gamesFromAPI = apiDataFree.data.listGames.items;
        setGames(gamesFromAPI);
    }
    async function fetchUserInfofromDB() {
        console.log("fetchUserInfofromDB - email: " + userAuth.email);
        console.log("fetchUserInfofromDB - username: " + userAuth.username);
        /* check if user in database, if not create user and games */
        const apiDataFree =  await API.graphql({
            query: usersByEmail,
            variables: { email: userAuth.email}
        });
        console.log("apiDataFree: " + JSON.stringify(apiDataFree.data.usersByEmail.items));
        /* if nothing is returned (check if username changed??)  */
        if (apiDataFree.data.usersByEmail.items.length === 0) {
            console.log("need to add user");
            const data = {
                userName: userAuth.username,
                email: userAuth.email,
            };
            await API.graphql({
                query: createUserMutation,
                variables: { input: data },
            });
        }
        //let dataTest = apiDataFree.data.listUsers.items[0].id;
        //console.log("typeof: " + typeof dataTest);
        //console.log("dataTest: " + dataTest);
        /* if user is NOT in database need to add user and set up free games -in user and usergameplay */
        //setUserID(dataTest);
    }

    async function fetchGamesFree() {
        let filter = {
            gameType: {
                eq: "free"
            }
        };
        const apiDataFree = await API.graphql({ query: listGames, variables: { filter: filter} });
        console.log("apiDataFree: " + JSON.stringify(apiDataFree));
        for (const key in apiDataFree) {
            console.log(`${key}: ${apiDataFree[key]}`);
            for (const key1 in apiDataFree[key]) {
                console.log(`${key1}: ${apiDataFree[key][key1]}`);
            }
        }
        const gamesFromAPI = apiDataFree.data.listGames.items;
        setGames(gamesFromAPI);
    }

    /* ADMIN */
    async function fetchUsers() {
        const apiData = await API.graphql({ query: listUsers });
        const usersFromAPI = apiData.data.listUsers.items;
        setUsers(usersFromAPI);
    }

    //create new game
    async function createGame(event) {
        console.log("createGame");
        event.preventDefault();
        const form = new FormData(event.target);
        const image = form.get("image");
        const data = {
            gameName: form.get("GameName"),
            gameType: form.get("GameType"),
            gameStop: form.get("GameStop"),
            gameLocationPlace: form.get("GameLocationPlace"),
            gameLocationCity: form.get("GameLocationCity"),
            type: "game",
            gameDescriptionH2: form.get("GameDescriptionH2"),
            gameDescriptionH3: form.get("GameDescriptionH3"),
            gameDescriptionP: form.get("GameDescriptionP"),
        };
        await API.graphql({
            query: createGameMutation,
            variables: { input: data },
        });
        fetchGames();
        event.target.reset();
    }

    //create new user
    async function createUser(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const data = {
            userName: form.get("UserName"),
            email: form.get("Email"),
        };
        await API.graphql({
            query: createUserMutation,
            variables: { input: data },
        });
        fetchUsers();
        event.target.reset();
    }

    //create item in createUserGamePlay
    async function createUserGamePlay(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const data = {
            gameId: form.get("GameID"),
            userId: form.get("UserID"),
        };
        await API.graphql({
            query: createUserGamePlayMutation,
            variables: { input: data },
        });
        event.target.reset();
    }
    /* END ADMIN

     */
    /* useEffects */
    /*
    So if you want to perform an action immediately after setting state on a state variable,
    we need to pass a callback function to the setState function.
    But in a functional component no such callback is allowed with useState hook.
    In that case we can use the useEffect hook to achieve it.
     */

    useEffect(() => {
        console.log("***useEffect***:  fetchGames()");
        fetchGames();
    }, []);
    useEffect(() => {
        console.log("***useEffect***:  fetchGames()");
        fetchUsers();
    }, []);
    useEffect(() => {
        /* get userAuthEmail from authentication */
        console.log("***useEffect***:  getUserAuthInfo()");
        getUserAuthInfo();
    }, [])

    useEffect(() => {
        console.log("***useEffect***: userAuth.email: " + userAuth.email);
    });

    useEffect(() => {
        /* check table to make sure user is there, add free games if needed */
        console.log("***useEffect***: fetchUserInfofromDB() + email: " + userAuth.email);
        fetchUserInfofromDB();
    }, [userAuth]);

    const HeadingComponent = props => {
        console.log("props.userName: " + props);
        for (const key in props) {
            console.log(`${key}: ${ props[key]}`);
            /* for (const key1 in dataTest[key]) {
                 console.log(`${key1}: ${dataTest[key][key1]}`);
             }*/
        }
        return (
            <Heading level={4} marginBottom="10px">Welcome {props.userName.username} | {props.userName.email}</Heading>
        )
    }
    return (
            <View margin="1rem 0"
                  maxWidth="800px"
                  margin="10px auto 10px auto">
                <HeadingComponent userName = {userAuth} />
                {userAuth.email === "lararobertson70@gmail.com" ? (
                    <View
                        maxWidth="800px"
                        margin="10px auto 10px auto"
                    >
                        <Heading level={3}>Admin</Heading>
                        <View as="form" margin="3rem 0" onSubmit={createUserGamePlay}>
                            <Flex direction="row" justifyContent="center">
                                <TextField
                                    name="GameID"
                                    placeholder="Game ID"
                                    label="Game ID"
                                    labelHidden
                                    variation="quiet"
                                    required
                                />
                                <TextField
                                    name="UserID"
                                    placeholder="User ID"
                                    label="User ID"
                                    labelHidden
                                    variation="quiet"
                                    required
                                />
                                <Button type="submit" variation="primary">
                                    createUserGamePlay
                                </Button>
                            </Flex>
                        </View>
                        <View as="form" margin="3rem 0" onSubmit={createUser}>
                            <Flex direction="row" justifyContent="center" gap="1rem">
                                <TextField
                                    name="UserName"
                                    placeholder="User Name"
                                    label="User Name"
                                    labelHidden
                                    variation="quiet"
                                    required
                                />
                                <TextField
                                    name="Email"
                                    placeholder="Email"
                                    label="Type"
                                    labelHidden
                                    variation="quiet"
                                    required
                                />
                                <Button type="submit" variation="primary">
                                    Create User
                                </Button>
                            </Flex>
                        </View>
                        <View as="form" margin="3rem 0" onSubmit={createGame}>
                            <Flex direction="row" justifyContent="center" gap="1rem">
                                <TextField
                                    name="GameName"
                                    placeholder="Game Name"
                                    label="Game Name"
                                    labelHidden
                                    variation="quiet"
                                    required
                                />
                                <TextField
                                    name="GameType"
                                    placeholder="Game Type"
                                    label="Game Type"
                                    labelHidden
                                    variation="quiet"
                                    required
                                />
                                <TextField
                                    name="GameStop"
                                    placeholder="Game Stop"
                                    label="Game Stop"
                                    labelHidden
                                    variation="quiet"
                                    required
                                />
                                <TextField
                                    name="GameLocationPlace"
                                    placeholder="Place"
                                    label="Game Location Place"
                                    labelHidden
                                    variation="quiet"
                                    required
                                />
                                <TextField
                                    name="GameLocationCity"
                                    placeholder="City"
                                    label="Game Location City"
                                    labelHidden
                                    variation="quiet"
                                    required
                                />
                            </Flex>
                            <Flex direction="row" justifyContent="center" gap="1rem">
                                <TextField
                                    name="GameDescriptionH2"
                                    placeholder="Game Description H2"
                                    label="Game Description H2"
                                    labelHidden
                                    variation="quiet"
                                    required
                                />
                                <TextField
                                    name="GameDescriptionH3"
                                    placeholder="Game Description H3"
                                    label="Game Description H3"
                                    labelHidden
                                    variation="quiet"
                                    required
                                />

                                <TextAreaField
                                    autoComplete="off"
                                    direction="column"
                                    hasError={false}
                                    isDisabled={false}
                                    isReadOnly={false}
                                    isRequired={false}
                                    labelHidden={false}
                                    name="GameDescriptionP"
                                    placeholder="Game Description"
                                    rows="3"
                                    size="small"
                                    wrap="nowrap"
                                    onChange={(e) => console.info(e.currentTarget.value)}
                                    onInput={(e) => console.info('input fired:', e.currentTarget.value)}
                                    onCopy={(e) => console.info('onCopy fired:', e.currentTarget.value)}
                                    onCut={(e) => console.info('onCut fired:', e.currentTarget.value)}
                                    onPaste={(e) => console.info('onPaste fired:', e.currentTarget.value)}
                                    onSelect={(e) =>
                                        console.info(
                                            'onSelect fired:',
                                            e.currentTarget.value.substring(
                                                e.currentTarget.selectionStart,
                                                e.currentTarget.selectionEnd
                                            )
                                        )
                                    }
                                />
                            </Flex>
                            <Flex direction="row" justifyContent="center" marginTop="20px">
                                <Button type="submit" variation="primary">
                                    Create Game
                                </Button>
                            </Flex>
                            <Heading level={3}>Games</Heading>
                            <View>
                                {games.map((game) => (
                                    <div><strong>game id</strong>: {game.id} | <strong>game name</strong>: {game.gameName} | <strong>type</strong>: {game.gameType} <br />
                                   <strong>gameLocationPlace</strong>: {game.gameLocationPlace} | <strong>gameLocationCity</strong>: {game.gameLocationCity}<br />
                                        <strong>gameDescriptionH2</strong>: {game.gameDescriptionH2} <br />
                                    <strong>gameDescriptionH3</strong>: {game.gameDescriptionH3} <br />
                                   <strong>gameDescriptionP</strong> {game.gameDescriptionP} <br />
                                        <hr />
                                    </div>

                                ))}
                            </View>
                            <Heading level={3}>Users</Heading>
                            <View>
                                {users.map((user) => (
                                    <div><strong>user id</strong>: {user.id} | <strong>email</strong>: {user.email} | <strong>userName</strong>: {user.userName}</div>
                                ))}
                            </View>
                        </View>
                    </View>) : (<div></div>)
                }
            </View>
    );
}