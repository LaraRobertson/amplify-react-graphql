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
    Image,
    Grid,
    useAuthenticator
} from '@aws-amplify/ui-react';
import {API, Auth} from "aws-amplify";
import {
    listGames,
    gamesByDate,
    usersByEmail,
    userGamePlaysByUserId,
    gameStatsByGameID,
    gameStopByGameID,
    gameScoreByGameStatsID,
    gameStopByGameStatsID,
    getGameStop
} from "../graphql/queries";
import {
    createGame, createGameScore,
    createGameStats,
    createUser,
    createUserGamePlay
} from "../graphql/mutations";
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'
/*({format(new Date(game.createdAt), "MM/dd/yyyy H:mma")})*/


export function Home() {
    const [games, setGames] = useState([]);
    const [gameNameLink,setGameNameLink] = useState(false);
    const [gameName,setGameName] = useState("");
    const [userDB, setUserDB] = useState({});
    const [gamesIDUser, setGamesIDUser] = useState([]);
    const [userAuth, setUserAuth] = useState({});
    const [isGameDetailVisible, setIsGameDetailVisible] = useState(false);
    const [gameIndex, setGameIndex] = useState();

    //const {tokens} = useTheme();
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
        let gameDetailClass = "all-screen hide-gradual";
        if (isGameDetailVisible) gameDetailClass = "all-screen show-gradual";
        let gameDescriptionH2 = "";
        let gameDescriptionH3 = "";
        let gameDescriptionP = "";
        let gameStopDetail = "";
        let gameStopWord = "Stops";
        console.log("length of games: " + games.length);
        if (games.length > 0) {
            if (gameIndex || gameIndex === 0) {
                let test = games[gameIndex];
                console.log("test - game info: " + JSON.stringify(test));
                console.log("test - gameName: " + test.gameName);
                /*for (const key in test) {
                    console.log(`${key}: ${test[key]}`);
                }*/
                gameDescriptionH2 = test.gameDescriptionH2;
                gameDescriptionH3 = test.gameDescriptionH3;
                gameDescriptionP = test.gameDescriptionP;
                gameStopDetail = test.gameStop.items.length;
                if (gameStopDetail < 2) gameStopWord = "Stop";
            }
        }
        return (
            <div className={gameDetailClass}>
                <Button className="close-button"  onClick={() => hideGameDetail()} >X</Button>
                <br />
                <h2>{gameDescriptionH2}</h2>
                <h3>{gameDescriptionH3}</h3>
                <div>{gameDescriptionP}</div><br />
                <strong>Game Details:</strong> This game has {gameStopDetail} {gameStopWord}. You can tell if you are at the right Stop by looking at the picture on
                the screen. The picture on the screen represents the playing area and contains some extra stuff on the screen for you to figure out
                how to solve puzzles.<br /><br />
                <strong>How to Play</strong>: Click around on the game screen to
                try and figure out the puzzles. You will also need to use details from your surroundings such has North, South, East, West, Names of Shops, fields,
                Names of Structures, etc.  Pay special attention to any historical sign.
                <div className="italics">Game may be better viewed in landscape mode. Please turn your phone horizontally for better gameplay at stops.</div>
                <br /><strong>Time / Score</strong>: Your Time is Your Score. The time starts when you hit "I Want To Play" at Each Stop. When you finish solving
                puzzles at the Stop, Time stops.  It continues when you reach next Stop and hit "I want to Play". Each Hint costs 5 minutes.
                <strong>Clock does not stop until you complete stop!</strong>
                <br /><br /><strong>Fun Fact</strong>: The game can be played on one device or everyone can play together
                on their own device. To play together, start the game at the same time and talk to each other about the
                puzzles. You will get your own score on your own device but may get a better score if you work together.
                <br /><br /><strong>You need the Internet to load the game</strong> but you can play it without the Internet if you load game before
                going to Stop. You can not save game unless you have internet. However, if you do not close the browser window all game stats,
                including final score, will still be available. Simply <strong>Save</strong> game once you have Internet Access.<br /><br />
                <strong>Helpful Hints:</strong>
                <br /><br />
                <Grid
                    templateColumns="1fr 4fr"
                    rowGap="0.5rem"
                >
                    <View><Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/help.png" /></View>
                    <View><h3>Click on Help Sign for Hints and helpful information about game.</h3></View>
                    <View><Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/notes.png" /></View>
                    <View><h3>Click on Notes Sign to save notes about game.</h3></View>
                    <View><Image src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/02/blacklight.png" /></View>
                    <View><h3>Clicking on objects will sometimes open a small window with information and sometimes put them in your backpack.</h3></View>
                    <View><Image width="50px" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/backpack-new.png" /></View>
                    <View><h3>If an object disappears from screen when you click on it, it may be in your backpack.</h3></View>

                </Grid>
                </div>
        )
    }

    async function goToGameSet(gameDetails) {
        let path = gameDetails.gameName.replace(/\s+/g, '-').toLowerCase();
        console.log("go to page: " + '/' + path);
        navigate('/' + path);
    }
    async function leaderBoard(gameDetails) {
        localStorage.setItem("gameID",gameDetails.gameID);
        localStorage.setItem("gameName",gameDetails.gameName);
        navigate('/leaderboard');
    }
    async function goToGame(gameDetails) {
        localStorage.setItem("gameName",gameDetails.gameName);
        localStorage.setItem("gameID",gameDetails.gameID);
        localStorage.setItem("gameStop",1);
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
                userEmail: userAuth.email,
                gameName: gameDetails.gameName
            };
            console.log("data for createGameStats: " + JSON.stringify(data));
            try {
                await API.graphql({
                    query: createGameStats,
                    variables: { input: data },
                });
            } catch (err) {
                console.log('error createGameStats..', err)
            }
            /* no waiver */
            console.log("go to waiver then page: " + gameDetails.gameName);
            navigate('/waiver');
        } else {
            console.log("go to page: " + gameDetails.gameName);
            /* check if waiver signed */
            if (apiGameStats.data.gameStatsByGameID.items[0].gameStates != "" || apiGameStats.data.gameStatsByGameID.items[0].gameStates !== null ) {
                console.log("check waiver");
                const gamesStatsFromAPI = apiGameStats.data.gameStatsByGameID.items[0];
                console.log("gamesStatsFromAPI.gameStates: " + gamesStatsFromAPI.gameStates);
                if (gamesStatsFromAPI.gameStates != "") {
                    let gameStatsState =  JSON.parse(gamesStatsFromAPI.gameStates);
                    /* check how many times played game */

                    /* how many "completed" entries in "GameScore" table by gameStatsID */
                    console.log("gameStatsID (home): " + gamesStatsFromAPI.id);
                    let filter = {
                        completed: {
                            eq: true
                        }
                    };
                    const apiGameScore = await API.graphql({
                        query: gameScoreByGameStatsID,
                        variables: { filter: filter, gameStatsID: gamesStatsFromAPI.id}
                    });
                    if (apiGameScore) {
                        const gamesScoreFromAPI = apiGameScore.data.gameScoreByGameStatsID.items;
                        console.log("gamesScoreFromAPI (home): " + gamesScoreFromAPI.length);
                        if (Array.isArray(gamesScoreFromAPI)) {
                            localStorage.setItem("numberOfTimes", gamesScoreFromAPI.length);
                        } else {
                            localStorage.setItem("numberOfTimes", 0);
                        }
                    }
                    /* end check number of times */

                    /* check if "not completed" */
                    let filter2 = {
                        completed: {
                            eq: false
                        }
                    };
                    const apiGameScoreNotCompleted = await API.graphql({
                        query: gameScoreByGameStatsID,
                        variables: { filter: filter2, gameStatsID: gamesStatsFromAPI.id}
                    });
                    if (apiGameScoreNotCompleted) {
                        if (apiGameScoreNotCompleted.data.gameScoreByGameStatsID.items.length === 0) {
                            /* add new game score */
                            const data = {
                                gameStatsID: gamesStatsFromAPI.id,
                                gameID: gamesStatsFromAPI.gameID,
                                gameTotalTime: 0,
                                completed: false
                            };
                            await API.graphql({
                                query: createGameScore,
                                variables: {input: data},
                            });
                        }
                    }
                    /* end game score */
                    console.log("gameStatsState:" + gameStatsState);
                    /* waiver signed and go to game */
                    if (gameStatsState !== null && gameStatsState.waiverSigned) {
                        localStorage.setItem("agreeToWaiver", true);
                        localStorage.setItem("gameStatsID",gamesStatsFromAPI.id);
                        let path = gameDetails.gameName.replace(/\s+/g, '-').toLowerCase();
                        console.log("go to page: " + '/' + path);
                       navigate('/' + path);
                    } else {
                       navigate('/waiver');
                    }
                } else {
                    navigate('/waiver');
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
        }).catch(err => {
            console.log(err)
        });
    }

    async function fetchGames() {
        console.log("fetchGames");
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
        try {
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
                    query: createUser,
                    variables: { input: data },
                });
            }
            /* get userID */
            const userFromAPI = apiUserDB.data.usersByEmail.items[0];
            console.log("userFromAPI: " + userFromAPI);
            setUserDB(userFromAPI);
        } catch (err) {
            console.log('error fetchUserDB..', err)
        }
   }

   async function fetchUserGamePlay() {
       console.log("fetchUserGamePlay - userID: " + userDB.id);
       /* check if user in database, if not create user and games */
       if (userDB.id != null){
           try {
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
           } catch (err) {
               console.log('error fetchUserGamePlay..', err)
           }
       }
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
    we need to pass a callback function to the setState function (use [state variable] at end).
    But in a functional component no such callback is allowed with useState hook.
    In that case we can use the useEffect hook to achieve it.
     */
    useEffect(() => {
        console.log("***useEffect***:  navigate to game from localstorage - only on mount because empty []");
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
    }, [userAuth])

    useEffect(() => {
        console.log("***useEffect***: userAuth.email: " + userAuth.email);
    });
    useEffect(() => {
        console.log("***useEffect***: userDB: " + userDB);
    });

    useEffect(() => {
        console.log("***useEffect***: gamesIDUser: " + gamesIDUser);
    });

    useEffect(() => {
        console.log("***useEffect***: games: " + games);
    });

    useEffect(() => {
        /* check table to make sure user is there, add free games if needed */
        console.log("***useEffect***: fetchUserDB() + email: " + userAuth.email);
        fetchUserDB();
    }, [userAuth]);

    const HeadingComponent = props => {
        console.log("props.userName: " + props);
        /*for (const key in props) {
            console.log(`${key}: ${ props[key]}`);*/
            /* for (const key1 in dataTest[key]) {
                 console.log(`${key1}: ${dataTest[key][key1]}`);
             }*/
        /*}*/
        return (
            <View marginBottom="10px">Welcome {props.userName.username} | {props.userName.email}</View>
        )
    }


    return (
        <View
            maxWidth="900px"
            margin="10px auto 10px auto">
            <GameDetailView />
        {route === 'authenticated' ? (
            <View padding="0 10px">
                <HeadingComponent userName = {userAuth} />
                {gameNameLink ?
                    <div>currently playing {gameName}: <Button style={{display:'inline'}} className={buttonDetailClassShow} onClick={() => goToGameSet({gameName:gameName,gameID:''})}>
                       go to game
                    </Button></div> : <div></div>
                }
                <Heading level={"5"}>
                    Games:
                </Heading>

                <Flex
                    wrap="wrap"
                    gap="1rem"
                    paddingTop="20px"
                    direction="row"
                    justifyContent="flex-start"
                >
                    {games.map((game,index) => (
                        <Card className="gameCard" variation="elevated"  key={game.id || game.gameName} >
                            <Text className="bold">{game.gameName} <span className="small">({game.gameType})</span></Text>
                            <Text><span className="italics">Location</span>: {game.gameLocationPlace}</Text>
                            <Text><span className="italics">City</span>: {game.gameLocationCity}</Text>
                            <Text><span className="italics">Stops</span>: {game.gameStop.items.length}</Text>

                            {(gamesIDUser.includes(game.id) || game.gameType === "free") ?
                                (<div>
                                    <Button onClick={() => goToGame({gameName:game.gameName,gameID:game.id})}>
                                        go to game
                                    </Button>
                                </div>) :
                                (<div></div>)
                            }
                            <Button className={buttonDetailClassShow} onClick={() => leaderBoard({gameName:game.gameName,gameID:game.id})}>
                                Leader Board
                            </Button>
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
            <View padding="0 10px">
                <Heading level={"5"}>
                    Games:
                </Heading>

                <Flex
                    wrap="wrap"
                    gap="1rem"
                    paddingTop="20px"
                    direction="row"
                    justifyContent="flex-start"
                >
                    {games.map((game,index) => (
                        <Card className="gameCard" variation="elevated" key={game.id || game.gameName}>
                            <Text className="bold">{game.gameName} <span className="small"> ({game.gameType})</span></Text>
                            <Text><span className="italics">Location</span>: {game.gameLocationPlace}</Text>
                            <Text><span className="italics">City</span>: {game.gameLocationCity}</Text>
                            <Text><span className="italics">Stops</span>: {game.gameStop.items.length}</Text>
                            <Button className={buttonDetailClassShow} onClick={() => leaderBoard({gameName:game.gameName,gameID:game.id})}>
                                Leader Board
                            </Button>
                            <Button className={buttonDetailClassShow} onClick={() => showGameDetail(index)} >Show Game Details</Button>
                        </Card>

                    ))}
                </Flex>
            </View>
        )}
        </View>
    );
}