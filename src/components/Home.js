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
    getGameStop,
    getGameStats,
    getGameScore
} from "../graphql/queries";
import {
    createGame, createGameScore,
    createGameStats,
    createUser,
    createUserGamePlay
} from "../graphql/mutations";
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'
import {removeLocalStorage} from "./helper";
/*({format(new Date(game.createdAt), "MM/dd/yyyy H:mma")})*/


export function Home() {
    const [gamesTybee, setGamesTybee] = useState([]);
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

    function showGameDetail(cardID) {
       /* setIsGameDetailVisible(true);
        setGameIndex(gameIndex);
        console.log("gameIndex (show): " + gameIndex);
        console.log("gameIndex (show): " + typeof gameIndex);
        console.log("isGameDetailVisible: " + isGameDetailVisible);*/
        console.log("cardID: " + cardID);
        let detail =  document.getElementById(cardID);
        detail.classList.add('show');
        let buttonShow = document.getElementById("buttonShow"+cardID);
        let buttonHide = document.getElementById("buttonHide"+cardID);
        buttonHide.classList.add('show');
        buttonHide.classList.remove('hide');
        buttonShow.classList.remove('show');
        buttonShow.classList.add('hide');
        /*GameDetailView();*/
    }

    function hideGameDetail(cardID) {
        /*setIsGameDetailVisible(false);
        console.log("isGameDetailVisible: " + isGameDetailVisible);
        GameDetailView();*/
        console.log("cardID: " + cardID);
        let element =  document.getElementById(cardID);
        element.classList.remove('show');
        let buttonShow = document.getElementById("buttonShow"+cardID);
        let buttonHide = document.getElementById("buttonHide"+cardID);
        buttonHide.classList.add('hide');
        buttonHide.classList.remove('show');
        buttonShow.classList.remove('hide');
        buttonShow.classList.add('show');
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
        console.log("length of games: " + gamesTybee.length);
        if (gamesTybee.length > 0) {
            if (gameIndex || gameIndex === 0) {
                let test = gamesTybee[gameIndex];
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


    async function leaderBoard(gameDetails) {
        localStorage.setItem("gameID",gameDetails.gameID);
        localStorage.setItem("gameName",gameDetails.gameName);
        navigate('/leaderboard');
    }
    async function goToGame(gameDetails) {
        localStorage.setItem("gameName",gameDetails.gameName);
        localStorage.setItem("gameLink",gameDetails.gameLink);
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
                gameName: gameDetails.gameName,
                gameLocationCity: gameDetails.gameLocationCity,
                type: "gameStats"
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
            let firstTime=true;
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
                            firstTime=false;
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
                                completed: false,
                                firstTime: firstTime
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
                        let path = gameDetails.gameLink.replace(/\s+/g, '-').toLowerCase();
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

    async function goToCurrentGame(gameDetails) {
        /* check if gameStats entry */
        const apiGameStats =  await API.graphql({
            query: getGameStats,
            variables: { id: gameDetails.gameStatsID}
        });
        if (apiGameStats) {
            console.log("game stat there");
            console.log("check waiver");
            console.log("gapiGameStats.data.getGameStats.gameStates: " + apiGameStats.data.getGameStats.gameStates);
            if (apiGameStats.data.getGameStats.gameStates != "") {
                /* check if gameScore entry */
                const apiGameScore = await API.graphql({
                    query: getGameScore,
                    variables: {id: gameDetails.gameScoreID}
                });
                if (apiGameScore) {
                    /* good to go! */
                    let path = gameDetails.gameName.replace(/\s+/g, '-').toLowerCase();
                    console.log("current game: go to page: " + '/' + path);
                    navigate('/' + path);

                }
            }
        } else {
            removeLocalStorage();
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
        let filter = {
            gameType: {
                eq: "free"
            },
            gameLocationCity: {
                eq: "Tybee Island"
            }
        };
        const apiData = await API.graphql({
            query: gamesByDate,
            variables: {filter: filter, sortDirection: "DESC", type: "game"}
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
        setGamesTybee(gamesFromAPI);
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
            },
            gameLocationCity: {
                eq: "Tybee Island"
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
        setGamesTybee(gamesFromAPI);
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
        console.log("***useEffect***: gamesTybee: " + gamesTybee);
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
    const divStyle = (src) => ({
        background:  "url(" + src + ") 0 0 / contain no-repeat"
    })
    if (isGameDetailVisible) {
        return (
            <View className="main-container">
                <GameDetailView />
            </View>
        )} else {
        return (
            <View className="main-container">
                <View className="main-content">
                    {(localStorage.getItem("gameID") !== null &&
                        localStorage.getItem("gameName") !== null &&
                        localStorage.getItem("gameLink") !== null &&
                        localStorage.getItem("gameTime") !== null &&
                        localStorage.getItem("gameStatsID") !== null &&
                        localStorage.getItem("gameScoreID") !== null &&
                        localStorage.getItem("gameStop") !== null ) ? (
                        <View textAlign="center" border="1px solid white" padding="10px">
                            Currently Playing: {localStorage.getItem("gameName")} &nbsp;&nbsp;
                        <Button className="go-to-game-button" onClick={() => goToCurrentGame({
                            gameName:localStorage.getItem("gameLink"),
                            gameID:localStorage.getItem("gameID"),
                            gameScoreID:localStorage.getItem("gameScoreID"),
                            gameStatsID:localStorage.getItem("gameStatsID")})}>
                            go back to game
                        </Button></View>):null}
                    <Flex
                        wrap="wrap"
                        gap="1rem"
                        paddingTop="20px"
                        direction="row"
                        justifyContent="flex-start" className="city-links">
                    </Flex>
                {route === 'authenticated' ? (
                    <View>
                        <HeadingComponent userName = {userAuth} />
                        <Flex
                            wrap="wrap"
                            gap="1rem"
                            paddingTop="20px"
                            direction="row"
                            justifyContent="flex-start" className="city-links">Cities: <a href="#tybeeIsland">Tybee Island</a>
                        </Flex>

                        <a id="tybeeIsland"></a>
                        <Heading level={"5"} className="heading">
                            Games: Tybee Island, GA
                        </Heading>
                        <Flex className="flex-games">
                            {gamesTybee.map((game,index) => (
                                <Card style={divStyle(game.gameImage)} className="game-card" variation="elevated"  key={game.id || game.gameName} >
                                    <View className="inner-game-card">
                                        <View className="game-card-full"><Text className="game-card-header">{game.gameName} <span className="small">({game.gameType})</span></Text></View>
                                        <Flex>
                                        <View className="column-50">
                                            <Text color="white" ><span className="italics">Location</span>: {game.gameLocationPlace}</Text>
                                            <Text color="white"><span className="italics">City</span>: {game.gameLocationCity}</Text>
                                        </View>
                                            <View className="column-50">
                                            <Text color="white"><span className="italics">Stops</span>: {game.gameStop.items.length}</Text>
                                                {(gamesIDUser.includes(game.id) || game.gameType === "free") ?
                                                    (<div>
                                                        <Button className="go-to-game-button" onClick={() => goToGame({gameName:game.gameName,gameID:game.id,gameLocationCity:game.gameLocationCity,gameLink:game.gameLink})}>
                                                            go to game
                                                        </Button>
                                                    </div>) :
                                                    (<div></div>)
                                                }
                                            </View>
                                        </Flex>
                                    </View>
                                    <Flex justifyContent="center">
                                        <View>
                                            <Button className="button button-small button-center show" onClick={() => leaderBoard({gameName:game.gameName,gameID:game.id})}>
                                                Leader Board
                                            </Button>
                                        </View>
                                        <View>
                                            <Button id={"buttonShow" + game.id} className="button button-small button-center show" onClick={() => showGameDetail(game.id)} >Show Game Details</Button>
                                            <Button id={"buttonHide" + game.id} className="button button-small button-center hide" onClick={() => hideGameDetail(game.id)} >Hide Game Details</Button>
                                        </View>
                                    </Flex>
                                    <View className="game-card-full">
                                        <View id={game.id} className="hide">
                                            {game.gameDescriptionP}
                                        </View>
                                    </View>
                                </Card>
                            ))}
                        </Flex>

                    </View>
                ): (
                    <View>
                        <a id="tybeeIsland"></a>
                        <Heading level={"5"} className="heading" marginTop="15px">
                            Games: Tybee Island, GA
                        </Heading>
                        <Flex className="flex-games">
                            {gamesTybee.map((game,index) => (
                                <Card style={divStyle(game.gameImage)} className="game-card" variation="elevated" key={game.id || game.gameName}>
                                    <View className="inner-game-card">
                                        <View className="game-card-full"><Text  className="game-card-header">{game.gameName} <span className="small">({game.gameType})</span></Text></View>
                                        <Flex>
                                            <View className="column-50">

                                                <Text color="white" ><span className="italics">Location</span>: {game.gameLocationPlace}</Text>
                                                <Text color="white"><span className="italics">City</span>: {game.gameLocationCity}</Text>
                                            </View>
                                            <View className="column-50">
                                                <Text color="white"><span className="italics">Stops</span>: {game.gameStop.items.length}</Text>
                                            </View>
                                        </Flex>
                                    </View>
                                        <Flex justifyContent="center">
                                            <View>
                                                <Button className="button button-small button-center show" onClick={() => leaderBoard({gameName:game.gameName,gameID:game.id})}>
                                                Leader Board
                                                </Button>
                                            </View>
                                            <View>
                                                <Button id={"buttonShow" + game.id} className="button button-small button-center show" onClick={() => showGameDetail(game.id)} >Show Game Details</Button>
                                                <Button id={"buttonHide" + game.id} className="button button-small button-center hide" onClick={() => hideGameDetail(game.id)} >Hide Game Details</Button>
                                            </View>
                                        </Flex>
                                        <View className="game-card-full">
                                             <View id={game.id} className="hide">
                                                {game.gameDescriptionP}
                                            </View>
                                        </View>
                                </Card>

                            ))}
                        </Flex>
                    </View>
                )}
                </View>
            </View>
        );}
}