// components/Layout.js
import React, {useEffect, useState} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {useAuthenticator, Flex, Button, useTheme, Heading, View, Image, Authenticator,Card, Text, TextField, TextAreaField} from '@aws-amplify/ui-react';
import { API, graphqlOperation, Storage, Auth   } from "aws-amplify";
import { listGames, listUsers,gamesByDate } from "../graphql/queries";
import {
    createGame as createGameMutation,
    createUser as createUserMutation,
    createUserGamePlay as createUserGamePlayMutation,
} from "../graphql/mutations";
import { format } from 'date-fns'

export function Home() {
    const [userInfo, setUserInfo] = useState({});
    const [user, setUser] = useState([]);
    const [homeDetail, setHomeDetail] = useState("show");
    const [loginDetail, setLoginDetail] = useState("hide");
    const [adminDetail, setAdminDetail] = useState("hide");
    const [isGameDetailVisible, setIsGameDetailVisible] = useState(true);
    /* classes */
    let buttonDetailClassHide = "button button-small hide";
    let buttonDetailClassShow = "button button-small show";
    let gameDetailClass = "allScreen hide-gradual";
    if (isGameDetailVisible === true) {
        buttonDetailClassHide = "button button-small hide";
        buttonDetailClassShow = "button button-small show";
        gameDetailClass = "allScreen hide-gradual";
    } else {
        buttonDetailClassHide = "button button-small show";
        buttonDetailClassShow = "button button-small hide";
        gameDetailClass = "allScreen show-gradual";
    }

    function showGameDetail() {
        setIsGameDetailVisible(false);
        console.log("isGameDetailVisible: " + isGameDetailVisible);
    }
    function hideGameDetail() {
        setIsGameDetailVisible(true);
        console.log("isGameDetailVisible: " + isGameDetailVisible);
    }
    const { route, signOut } = useAuthenticator((context) => [
        context.route,
        context.signOut,
    ]);
    const navigate = useNavigate();

    function logIn() {
        setHomeDetail("show");
        setLoginDetail("allScreen show-gradual");
    }
    function logOut() {
        setHomeDetail("show");
        setLoginDetail("allScreen hide-gradual");
        setAdminDetail("hide");
        signOut();
    }
    function goToPage2() {
        console.log("go to page 2");
        setHomeDetail("hide");
        navigate('/page2');
    }
    function goToGame(gameName) {
        console.log("go to page: " + gameName);
        let path = gameName.replace(/\s+/g, '-').toLowerCase();
        setHomeDetail("hide");
        setAdminDetail("hide");
        console.log("go to page: " + '/' + path + '-page1');
        navigate('/' + path + '-page1');
    }
    function goToHome() {
        console.log("go to home");
        setHomeDetail("show");
        setLoginDetail("allScreen hide-gradual");
        navigate('/');
    }
    useEffect(() => {
        console.log("homeDetail (useEffect-home): " + homeDetail);
    });
    useEffect(() => {
        console.log("user (useEffect-user): " + user);
        console.log("user.username: " + user.username);
        if (user.username === "lararobertson70@gmail.com" && route === 'authenticated' & homeDetail==="show") setAdminDetail("show");
    });
    useEffect(() => {
        console.log("adminDetail (useEffect-admin): " + adminDetail);
    });
    //get user email
        useEffect(() => {
            getUserInfo();
        }, [])
    async function getUserInfo() {
        Auth.currentAuthenticatedUser({
            bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(user => {
            console.log("user: " + user);
            setUser(user)
        })
            .catch(err => {
                // console.log(err)
            });
    }

    const UserInfoBlock = ({userInfoInput}) => {
        console.log("userInfo component: " + userInfoInput);
        return (
            <div></div>
    );

    }
    async function fetchGames() {
        const apiData = await API.graphql({
            query: gamesByDate,
            variables: { sortDirection: 'DESC',type: "game"}
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
    async function fetchUserInfo() {
        let filter = {
            email: {
                eq: "lara@test.com"
            }
        };
        const apiDataFree =  await API.graphql({
            query: listUsers,
            variables: { filter: filter}
        });
        console.log("apiDataFree: " + JSON.stringify(apiDataFree.data.listUsers));
        let dataTest = apiDataFree.data.listUsers.items[0];
        console.log("typeof: " + typeof dataTest);
        console.log("dataTest: " + dataTest);
        for (const key in dataTest) {
            console.log(`${key}: ${dataTest[key]}`);
           /* for (const key1 in dataTest[key]) {
                console.log(`${key1}: ${dataTest[key][key1]}`);
            }*/
        }
        setUserInfo(dataTest);
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
    async function fetchUsers() {
        const apiData = await API.graphql({ query: listUsers });
        const usersFromAPI = apiData.data.listUsers.items;
        setUserInfo(usersFromAPI);
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
    //create new game
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
        const data = {
            gameId: "1",
           userId: "test@test.com",
        };
        await API.graphql({
            query: createUserGamePlayMutation,
            variables: { input: data },
        });
        event.target.reset();
    }
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchGames();
    }, []);
    useEffect(() => {
        fetchUserInfo();
    }, []);
    /*
    So if you want to perform an action immediately after setting state on a state variable,
    we need to pass a callback function to the setState function.
    But in a functional component no such callback is allowed with useState hook.
    In that case we can use the useEffect hook to achieve it.
     */
    useEffect(() => {
        console.log("userInfo: " + userInfo);
    }, []);
    const { tokens } = useTheme();
    return (
        <View>
            <header>
                <View className={homeDetail}
                    maxWidth="800px"
                    margin="10px auto 10px auto">
                    <div className="wp-block-columns">
                        <div><Image className="test" src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/02/logo-escapeout.png" /></div>
                    </div>
                </View>
            </header>
            <View
                maxWidth="800px"
                margin="10px auto 10px auto">
                <Flex>
                <div>
                    {route === 'authenticated' ? (
                        <div>
                            <Heading level={4} marginBottom="10px">Welcome {user.username}</Heading>
                            <Button onClick={() => goToHome()}>Home</Button> | <Button
                            onClick={() => logOut()}>Logout</Button>
                            <UserInfoBlock  userInfoInput={user.username} />
                        </div>

                    ) : (
                        <div>
                            <div className={loginDetail}>
                                <Button onClick={() => goToHome()}>Home</Button>
                                <br />
                                Please Login
                                <View className="auth-wrapper">
                                    <Authenticator></Authenticator>
                                </View>
                            </div>
                            <div className={homeDetail}>
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
                                    <div>Fell free to create an account and test:</div>
                                    <Button className="button bouncy" backgroundColor={tokens.colors.green} onClick={() => logIn()}>Login or create account</Button>
                                </View>
                            </div>
                        </div>
                        )
                    }

                </div>
                </Flex>
            </View>

                <View margin="1rem 0"maxWidth="800px"
                      margin="10px auto 10px auto"
                      className={homeDetail}>
                    <Heading level={"5"}>
                        Games:
                    </Heading>
                    <Flex>
                        <Button className={buttonDetailClassShow} onClick={fetchGames} >All Games</Button>
                        <Button className={buttonDetailClassShow} onClick={fetchGamesFree} >Show Free Only</Button>
                    </Flex>

                    <Flex
                        wrap="wrap"
                        gap="1rem"
                        paddingTop="20px"
                        direction="row"
                        justifyContent="flex-start"
                    >
                    {games.map((game) => (
                            <Card variation="elevated"  key={game.id || game.gameName} >
                                <Text>{game.gameName} {format(new Date(game.createdAt), "MM/dd/yyyy H:mma")}</Text>
                                {route === 'authenticated' ? (
                                    <div>
                                        <Button onClick={() => goToGame(game.gameName)}>
                                        go to game
                                        </Button>
                                        <Button className={buttonDetailClassShow} onClick={showGameDetail} >Show My Stats</Button>
                                    </div>
                                    ):(<div></div>)}
                                <Button className={buttonDetailClassShow} onClick={showGameDetail} >Show Game Details</Button>
                                <Button className={buttonDetailClassHide} onClick={hideGameDetail} >Hide Game Details</Button>
                                <div className={gameDetailClass} >
                                    <Button className="close-button" onClick={hideGameDetail}>X</Button>
                                    <br />
                                    <h2>{game.gameDescriptionH2}</h2>
                                    <h3>{game.gameDescriptionH3}</h3>
                                    <div>{game.gameDescriptionP}</div>
                                    <strong>Game Details:</strong> This game has {game.gameStop}. You can tell if you are at the right stop by looking at the picture on the game.
                                    The picture represents the playing area and contains some extra stuff on screen for you to use to find the thief's ill-begotten gains.
                                    Once you are at the stop, you need click around on the game screen to
                                    try and figure out the puzzles. You also need to use details from your surroundings.
                                    <div className="italics">Game is best viewed in landscape mode. Please turn your phone horizontally for gameplay at stops.</div>
                                    <br /><br /><strong>Fun Fact</strong>: The game can be played on one device or everyone can play together
                                    on their own device - just click on appropriate link to access game, once you have loaded game you don't need the internet.
                                    If you keep the window open gameplay will be saved over a long period of time.<br /><br />
                                    <strong>Helpful Hints:</strong>
                                    <div className="wp-block-columns">
                                        <div className="wp-block-column-intro">
                                            <img className="test" src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/02/info.png" />
                                        </div>
                                        <div className="wp-block-column-intro">
                                            <h3>Click on Info bubble for helpful information about game</h3>
                                        </div>
                                    </div>
                                    <div className="wp-block-columns">
                                        <div className="wp-block-column-intro">
                                            <img className="test" src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/diary-50.png" />
                                        </div>
                                        <div className="wp-block-column-intro">
                                            <h3>Clicking on objects will sometimes open a small window with information and sometimes put them in your backpack.</h3>
                                        </div>
                                    </div>
                                    <div className="wp-block-columns">
                                        <div className="wp-block-column-intro">
                                            <img className="test" src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/04/backpack.png" />
                                        </div>
                                        <div className="wp-block-column-intro">
                                            <h3>If an object is in your backpack it will be highlighted .</h3>
                                        </div>
                                    </div>

                                    <h4>Start Playing when you are here</h4>

                                </div>

                            </Card>

                    ))}
                    </Flex>
                    <View paddingTop="40px"> © 2022 EscapeOut.Games</View>
                </View>
            <View
                maxWidth="800px"
                margin="10px auto 10px auto"
                className={adminDetail}
            >
            <Heading level={3}>Admin</Heading>
            <View as="form" margin="3rem 0" onSubmit={createUserGamePlay}>
                <Flex direction="row" justifyContent="center">

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
                </View>
            </View>
            <Outlet />
        </View>
    );
}