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
import {listGames, gamesByDate, usersByEmail, userGamePlaysByUserId,gameStatsByGameID} from "../graphql/queries";
import { format } from 'date-fns'
import {
    createGame as createGameMutation, createGameStats,
    createUser as createUserMutation,
    createUserGamePlay as createUserGamePlayMutation,
    createGameStats as createGameStatsMutation
} from "../graphql/mutations";
import { useNavigate } from 'react-router-dom';

export function Home() {
    const [games, setGames] = useState([]);
    const [gameNameLink,setGameNameLink] = useState(false);
    const [gameName,setGameName] = useState("");
    const [userDB, setUserDB] = useState({});
    const [gamesIDUser, setGamesIDUser] = useState([]);
    const [userAuth, setUserAuth] = useState({});
    const [isGameDetailVisible, setIsGameDetailVisible] = useState(false);
    const [gameIndex, setGameIndex] = useState();

    const {tokens} = useTheme();
    const { route } = useAuthenticator((context) => [context.route]);
    const navigate = useNavigate();

    /* classes */
    let buttonDetailClassShow = "button button-small show";

    function showGameDetail(gameIndex) {
        setIsGameDetailVisible(true);
        setGameIndex(gameIndex);
        console.log("gameIndex (show): " + gameIndex);
        console.log("gameIndex (show): " + typeof gameIndex);
        console.log("isGameDetailVisible: " + isGameDetailVisible);
        GameDetailView();
    }

    function hideGameDetail() {
        setIsGameDetailVisible(false);
        console.log("isGameDetailVisible: " + isGameDetailVisible);
        GameDetailView();
    }

    const GameDetailView = () => {
        console.log("gameIndex: " + gameIndex);
        console.log("gameIndex - typeof: " + typeof gameIndex);
        let gameDetailClass = "allScreen hide-gradual";
        if (isGameDetailVisible) gameDetailClass = "allScreen show-gradual";
        let gameDescriptionH2 = "";
        let gameDescriptionH3 = "";
        let gameDescriptionP = "";
        let gameStop = "";
        console.log("length of games: " + games.length);
        if (games.length > 0) {
            if (gameIndex) {
                let test = games[gameIndex];
               /* console.log("test - gamename: " + JSON.stringify(test));
                console.log("test - gamename: " + test.gameName);
                for (const key in test) {
                    console.log(`${key}: ${test[key]}`);
                }*/
                gameDescriptionH2 = test.gameDescriptionH2;
                gameDescriptionH3 = test.gameDescriptionH3;
                gameDescriptionP = test.gameDescriptionP;
                gameStop = test.gameStop;
            }
        }
        return (
            <div className={gameDetailClass}>
                <Button className="close-button"  onClick={() => hideGameDetail()} >X</Button>
                <br />
                <h2>{gameDescriptionH2}</h2>
                <h3>{gameDescriptionH3}</h3>
                <div>{gameDescriptionP}</div>
                <strong>Game Details:</strong> This game has {gameStop} stops. You can tell if you are at the right stop by looking at the picture on the game.
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
        )
    }

    async function goToGameSet(gameDetails) {
        let path = gameDetails.gameName.replace(/\s+/g, '-').toLowerCase();
        console.log("go to page: " + '/' + path + '-stop1');
        navigate('/' + path + '-stop1');
    }
    async function goToGame(gameDetails) {
        localStorage.setItem("gameName",gameDetails.gameName);
        /* check if gameStats entry */
        let filter = {
            userEmail: {
                eq: userAuth.email
            }
        };
        const apiGameStats =  await API.graphql({
            query: gameStatsByGameID,
            variables: { filter: filter, gameID: gameDetails.gameID}
        });
        if (apiGameStats.data.gameStatsByGameID.items.length === 0) {
            console.log("need to add game stat");
            const data = {
                gameID: gameDetails.gameID,
                userEmail: userDB.email,
                gameName: gameDetails.gameName,
                type: "gamestat",
            };
            await API.graphql({
                query: createGameStatsMutation,
                variables: { input: data },
            });

            /* no waiver */
            console.log("go to waiver then page: " + gameDetails.gameName);
            navigate('/waiver');
        } else {
            console.log("go to page: " + gameDetails.gameName);
            /* check if waiver signed */
            if (apiGameStats.data.gameStatsByGameID.items.gameStates !== "" || apiGameStats.data.gameStatsByGameID.items.gameStates !== null ) {
                console.log("check waiver");
                const gamesStatsFromAPI = apiGameStats.data.gameStatsByGameID.items[0];
                let gameStatsState =  JSON.parse(gamesStatsFromAPI.gameStates);
                console.log("gameStatsState:" + gameStatsState);
                if (gameStatsState !== null && gameStatsState.waiverSigned) {
                    let path = gameDetails.gameName.replace(/\s+/g, '-').toLowerCase();
                    console.log("go to page: " + '/' + path + '-stop1');
                    navigate('/' + path + '-stop1');
                } else {
                    navigate('/waiver')
                }
            } else {
                console.log("go to waiver then page: " + gameDetails.gameName);
                navigate('/waiver')
            }
        }
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
            localStorage.setItem("email",user?.signInUserSession?.idToken?.payload?.email);
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

    async function fetchUserDB() {
        console.log("fetchUserDB - email: " + userAuth.email);
        console.log("fetchUserDB - username: " + userAuth.username);
        /* check if user in database, if not create user and games */
        const apiUserDB =  await API.graphql({
            query: usersByEmail,
            variables: { email: userAuth.email}
        });
        console.log("apiUserDB: " + JSON.stringify(apiUserDB.data.usersByEmail.items[0]));
        /* if nothing is returned (check if username changed??)  */
        if (apiUserDB.data.usersByEmail.items.length === 0) {
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
        /* get userID */
        const userFromAPI = apiUserDB.data.usersByEmail.items[0];
        setUserDB(userFromAPI);
    }

    async function fetchUserGamePlay() {
        console.log("fetchUserGamePlay - userID: " + userDB.id);
        /* check if user in database, if not create user and games */
        const apiUserGamePlay =  await API.graphql({
            query: userGamePlaysByUserId,
            variables: { userId: userDB.id}
        });
        console.log("apiUserGamePlay: " + JSON.stringify(apiUserGamePlay.data.userGamePlaysByUserId.items));
        /* create array of gameIDs */
        const gameIDsUser = apiUserGamePlay.data.userGamePlaysByUserId.items;
        const gameIDsUserArray = gameIDsUser.map(item => {
            return item.gameId
        })
        console.log('gameIDsUserArray: ' + gameIDsUserArray);
        setGamesIDUser(gameIDsUserArray);
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

    /* useEffects */
    /*
    So if you want to perform an action immediately after setting state on a state variable,
    we need to pass a callback function to the setState function.
    But in a functional component no such callback is allowed with useState hook.
    In that case we can use the useEffect hook to achieve it.
     */
    useEffect(() => {
        console.log("***useEffect***:  navigate to game from localstorage");
        const gameNameSaved = localStorage.getItem("gameName");
        if (gameNameSaved !== null && gameNameSaved != '') {
            console.log("go to page: " + gameNameSaved);
           setGameNameLink(true);
           setGameName(gameNameSaved);
        } else {
            setGameNameLink(false);
            setGameName('');
        }

    }, []);

    useEffect(() => {
        console.log("***useEffect***:  fetchGames()");
        fetchGames();
    }, []);

    useEffect(() => {
        /* get userAuthEmail from authentication */
        console.log("***useEffect***:  getUserAuthInfo()");
        getUserAuthInfo();
    }, [])

    useEffect(() => {
        /* get game ids from usergameplay */
        console.log("***useEffect***:  fetchUserGamePlay()");
        fetchUserGamePlay();
    }, [userDB])

    useEffect(() => {
        console.log("***useEffect***: userAuth.email: " + userAuth.email);
    });

    useEffect(() => {
        console.log("***useEffect***: gamesIDUser: " + gamesIDUser);
    });

    useEffect(() => {
        /* check table to make sure user is there, add free games if needed */
        console.log("***useEffect***: fetchUserDB() + email: " + userAuth.email);
        fetchUserDB();
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
        <div>
            <GameDetailView />
        {route === 'authenticated' ? (
            <View margin="1rem 0"
                  maxWidth="800px"
                  margin="10px auto 10px auto">
                <HeadingComponent userName = {userAuth} />
                <Heading level={"5"}>
                    Games:
                </Heading>
                <Flex>
                    <Button className={buttonDetailClassShow} onClick={fetchGames} >All Games</Button>
                    <Button className={buttonDetailClassShow} onClick={fetchGamesFree} >Show Free Only</Button>
                    {gameNameLink ?
                    <Button onClick={() => goToGameSet({gameName:gameName,gameID:''})}>
                        go to game
                    </Button> : <div></div>
                    }
                </Flex>

                <Flex
                    wrap="wrap"
                    gap="1rem"
                    paddingTop="20px"
                    direction="row"
                    justifyContent="flex-start"
                >
                    {games.map((game,index) => (
                        <Card className="gameCard" variation="elevated"  key={game.id || game.gameName} >
                            <Text>{game.gameName} - {game.gameType} {index} <span className="small"> ({format(new Date(game.createdAt), "MM/dd/yyyy H:mma")})</span></Text>
                            {(gamesIDUser.includes(game.id) || game.gameType === "free") ?
                                (<div>
                                    <Button onClick={() => goToGame({gameName:game.gameName,gameID:game.id})}>
                                        go to game
                                    </Button>
                                    <Button className={buttonDetailClassShow} onClick={() => showGameDetail(index)} >Show My Stats</Button>
                                </div>) :
                                (<div></div>)
                            }
                            <Button className={buttonDetailClassShow} onClick={() => showGameDetail(index)} >Show Game Details</Button>
                        </Card>

                    ))}
                </Flex>
                {userAuth.email === "lararobertson70@gmail.com" ? (
                    <View
                        maxWidth="800px"
                        margin="10px auto 10px auto"
                    >
                        <Button onClick={() => navigate('/admin')}>Admin</Button>
                    </View>) : (<div></div>)
                }
            </View>
            ): (
            <View margin="1rem 0" maxWidth="800px"
                  margin="10px auto 10px auto">
                <Heading level={"5"}>
                    Games:
                </Heading>
                <Flex>
                    <Button className={buttonDetailClassShow} onClick={fetchGames}>All Games</Button>
                    <Button className={buttonDetailClassShow} onClick={fetchGamesFree}>Show Free Only</Button>
                </Flex>

                <Flex
                    wrap="wrap"
                    gap="1rem"
                    paddingTop="20px"
                    direction="row"
                    justifyContent="flex-start"
                >
                    {games.map((game,index) => (
                        <Card className="gameCard" variation="elevated" key={game.id || game.gameName}>
                            <Text>{game.gameName} - {game.gameType}({index}) <span className="small"> ({format(new Date(game.createdAt), "MM/dd/yyyy H:mma")})</span></Text>
                            <Button className={buttonDetailClassShow} onClick={() => showGameDetail(index)} >Show Game Details</Button>
                        </Card>

                    ))}
                </Flex>
                <View paddingTop="40px"> © 2022 EscapeOut.Games</View>
            </View>
        )}
        </div>
    );
}