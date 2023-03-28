import React, {useEffect, useState} from "react"
import {NotesOpen} from "../../components/NotesOpen";
import {shallowEqual} from "../../components/ShallowEqual";
import {Button, Heading, View, Image, TextAreaField, TextField, Text, Alert, Flex,  SelectField} from '@aws-amplify/ui-react';
import {useNavigate} from "react-router-dom";
import {API} from "aws-amplify";
import { gameScoreByGameStatsID, gameStopByGameID } from "../../graphql/queries";
import { updateGameScore, createGameHintTime, createGameStopTime } from "../../graphql/mutations";

export function Hurricane1Easy() {
    /* for all games */
    const [areNotesVisible, setAreNotesVisible] = useState(false);
    const [isHelpVisible, setIsHelpVisible] = useState(false);
    const [gameNotes,setGameNotes] = useState('');
    const [gameComments,setGameComments] = useState('');
    const [isBackpackVisible, setIsBackpackVisible] = useState(false);
    const [gameBackpack, setGameBackpack] = useState([]);
    const [gameBackpackHasItems, setGameBackpackHasItems] = useState(false);
    /* set in local storage too */
    const [gameTime, setGameTime] = useState(0);
    const [gameTimeHint, setGameTimeHint] = useState(0);
    const [gameTimeTotal, setGameTimeTotal] = useState(0);
    const [gameStatsID, setGameStatsID] = useState('');
    const [gameScoreID, setGameScoreID] = useState('');
    const [gameID, setGameID] = useState('');
    const [numberOfTimes, setNumberOfTimes] = useState(0);
    const [gameStop,setGameStop] = useState(0);
    const [gameStopNameArray,setGameStopNameArray] = useState('');
    const [gameComplete, setGameComplete] = useState(false);
    const [gameStopName,setGameStopName] = useState(0);
    /* end set in local storage too */

    const [stopClock, setStopClock] = useState(false);
    const [numberOfPlayers, setNumberOfPlayers] = useState('');
    const [numberOfPlayersError, setNumberOfPlayersError] = useState('');
    const [isHint1Visible, setIsHint1Visible] = useState(false);
    const [isHint2Visible, setIsHint2Visible] = useState(false);
    const [isHint3Visible, setIsHint3Visible] = useState(false);
    const [isHint4Visible, setIsHint4Visible] = useState(false);
    const [hintTime1,setHintTime1] = useState(0);
    const [hintTime2,setHintTime2] = useState(0);
    const [hintTime3,setHintTime3] = useState(0);
    const [hintTime4,setHintTime4] = useState(0);
    const [isIntroVisible, setIsIntroVisible] = useState(true);
    function toggleIntro() {
        console.log("gameTime: " + gameTime);
        console.log("gameTimeTotal: " + gameTimeTotal);
        /* check numberOfPlayers */
        if (numberOfPlayers != '') {
            isIntroVisible ? setIsIntroVisible(false) : setIsIntroVisible(true);
            setStopClock(false);
        } else {
            setNumberOfPlayersError("Please choose number of players");
        }

    }
    function goToStop() {
        setGameStop(Number(gameStop) + 1);
        localStorage.setItem("gameStop",Number(gameStop) + 1);
        console.log("go to stop:" + (Number(gameStop) + 1));
        setGameTimeTotal(gameTimeTotal + gameTime + gameTimeHint);
        /* reset time */
        setHintTime1(0);
        setHintTime2(0);
        setHintTime3(0);
        setHintTime4(0);
        setGameTime(0);
        setGameTimeHint(0);
        setIsIntroVisible(true);
    }
    const navigate = useNavigate();
    function removeLocalStorage() {
        localStorage.removeItem("agreeToWaiver");
        localStorage.removeItem("gameStatsID");
        localStorage.removeItem("gameScoreID");
        localStorage.removeItem("gameName");
        localStorage.removeItem("gameNameID");
        localStorage.removeItem("gameTime")
        localStorage.removeItem("gameTimeHint");
        localStorage.removeItem("gameTimeTotal");
        localStorage.removeItem("gameStop");
        localStorage.removeItem("gameStopNameArray");
        localStorage.removeItem("numberOfTimes");
        localStorage.removeItem("numberOfPlayers");
        localStorage.removeItem("key");
        localStorage.removeItem("prybar");
        localStorage.removeItem("shovel");
        localStorage.removeItem("key2");
    }
    function goHomeQuit() {
        removeLocalStorage();
        navigate('/');
    }
    async function goHome() {
        console.log("game comments: " + gameComments);
        const newGameStats = {
            id: localStorage.getItem("gameScoreID"),
            gameComments: gameComments,
            completed: true
        };
        const apiGameScoreUpdate = await API.graphql({ query: updateGameScore, variables: {input: newGameStats}});
        removeLocalStorage();
        navigate('/');
    }

    /* 60000 milliseconds = 1 minute */
    const MINUTE_MS = 3000;
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Logs every 3 seconds');
            if (gameTime) {
                let gameTimeNum = Number((gameTime + .05).toFixed(2));
                console.log('game time: ' + gameTimeNum);
                if (!stopClock) {
                    localStorage.setItem("gameTime", gameTimeNum);
                    setGameTime(gameTimeNum);
                    let hintTimeTotalNum = Number(hintTime1 + hintTime2 + hintTime3 + hintTime4);
                    console.log("hint time total: " + hintTimeTotalNum);
                    localStorage.setItem("gameTimeHint", hintTimeTotalNum);
                    setGameTimeHint(hintTimeTotalNum);
                }
                console.log("stopClock: " + stopClock);

            } else {
                console.log("no gameTime");
                if (!isIntroVisible) {
                    setGameTimeFunction(.05);
                }
            }

        }, MINUTE_MS);
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [gameTime,isIntroVisible])

    function setGameTimeFunction(gameTime) {
        let gameTimeNum = Number(gameTime);
        console.log("gametimefunction: " + gameTimeNum.toFixed(2));
        localStorage.setItem("gameTime",gameTimeNum.toFixed(2));
        setGameTime(gameTimeNum);
    }

    useEffect(() => {
        console.log("***useEffect***: stopClock: " + stopClock);
    });
    async function winGameFunction(props) {
        console.log("props: " + props);

        console.log("winGameFunction");
        /* for end of game: clearInterval(interval);*/
        console.log("stop has been won");
        /* update gameScore based on stop - */
        updateGameScoreFunction(props);
        createGameStopFunction();
        createGameHintFunction();
    }
    async function createGameStopFunction() {
        const data = {
            gameScoreID: gameScoreID,
            gameStopTime: gameTime,
            gameStop: gameStop
        };
        await API.graphql({
            query: createGameStopTime,
            variables: { input: data },
        });
    }
    async function createGameHintFunction() {
        const data = {
            gameScoreID: gameScoreID,
            gameHintTime: gameTimeHint,
            gameStop: gameStop
        };
        await API.graphql({
            query: createGameHintTime,
            variables: { input: data },
        });
    }
    async function updateGameScoreFunction(props) {
        console.log("gameScoreID (update):" + gameScoreID);
        let GameTimeTotalVar = gameTimeTotal + gameTime + gameTimeHint;
        const data = {
            id: gameScoreID,
            numberOfPlayers: numberOfPlayers,
            gameTotalTime: Number(GameTimeTotalVar),
            completed: props
        };
        console.log("data: " + data);
        let testObject = data;
        for (const key in testObject) {
            console.log(`${key}: ${ testObject[key]}`);
            for (const key1 in testObject[key]) {
                //console.log(`${key1}: ${testObject[key][key1]}`);
            }
        }
        const apiUpdateGameScore = await API.graphql({
            query: updateGameScore,
            variables: { input: data },
        }).then(response => {
            console.log(response);
            return(response);
        }).catch(e => {
            console.log("catch apiUpdateGameScore");
            console.log(e);
            return null;
        });

        return(apiUpdateGameScore);
    }

    /* hint functions */
    function toggleHint1() {
        setHintTime1(5);
        isHint1Visible ? setIsHint1Visible(false) : setIsHint1Visible(true);
    }
    function toggleHint2() {
        setHintTime2(5);
        isHint2Visible ? setIsHint2Visible(false) : setIsHint2Visible(true);
    }
    function toggleHint3() {
        setHintTime3(5);
        isHint3Visible ? setIsHint3Visible(false) : setIsHint3Visible(true);
    }
    function toggleHint4() {
        setHintTime4(5);
        isHint4Visible ? setIsHint4Visible(false) : setIsHint4Visible(true);
    }
    /* info functions */
    function toggleHelp() {
        isHelpVisible ? setIsHelpVisible(false) : setIsHelpVisible(true);
    }
    /* notes functions */
    function toggleNotes() {
        areNotesVisible ? setAreNotesVisible(false) : setAreNotesVisible(true);
    }
    function setNotesFunction(notes) {
        console.log('notes: ' + notes);
        /* set localhost variable */
        setGameNotes(notes);
    }
    /* end notes functions */
    function setCommentsFunction(notes) {
        console.log('comments: ' + notes);
        /* set localhost variable */
        setGameComments(notes);
    }
    function setNumPlayerFunction(numPlayerValue) {
        console.log("numPlayerFunction: " + numPlayerValue);
        localStorage.setItem("numberOfPlayers", numPlayerValue);
        setNumberOfPlayers(numPlayerValue);
    }
    /* get gamestats and set localstorage */
    useEffect(() => {
        console.log("***useEffect***: setGameStop (only on mount)");
        /* set local storage for gameStop - only on mount */
        setGameStopFunction();
    }, []);


    async function setGameStopFunction() {
        console.log("setGameStopFunction - only on mount");
        console.log ("get Game Stop: " + localStorage.getItem("gameStop"));
        console.log ("get GameID: " + localStorage.getItem("gameID"));
        console.log ("get GameStatsID: " + localStorage.getItem("gameStatsID"));
        setGameStop(localStorage.getItem("gameStop"))
        setNumberOfTimes(localStorage.getItem("numberOfTimes"));
        setGameID(localStorage.getItem("gameID"));
        setGameStatsID(localStorage.getItem("gameStatsID"));
        /* get gameStop name */
        const gameStopFromAPI = await getGameStopName();
        let gameStopNameArrayConst = gameStopFromAPI.data.gameStopByGameID.items;
        /* get gameScore Id */
        const gameScoreFromAPI = await getGameScoreID();
        let gameScoreID = gameScoreFromAPI.data.gameScoreByGameStatsID.items[0].id;
        let testObject = gameStopNameArrayConst[0];
        for (const key in testObject) {
            console.log(`${key}: ${ testObject[key]}`);
            for (const key1 in testObject[key]) {
                //console.log(`${key1}: ${testObject[key][key1]}`);
            }
        }
        let GameStopIndex = Number(localStorage.getItem("gameStop"))-1;
        setGameStopNameArray(gameStopNameArrayConst);
        setGameStopName(gameStopNameArrayConst[GameStopIndex].gameStopName);
        console.log("gameStopNameArrayConst[0].gameStopName (setGameStopFunction): " + gameStopNameArrayConst[GameStopIndex].gameStopName);
        localStorage.setItem("gameStopNameArray", gameStopFromAPI.data.gameStopByGameID.items);
        setGameScoreID(gameScoreID);
        localStorage.setItem("gameScoreID", gameScoreID);
    }

    async function getGameScoreID() {
        let filter = {
            completed: {
                eq: false
            }
        };
        const apiGameScore = await API.graphql({
            query: gameScoreByGameStatsID,
            variables: { filter: filter, gameStatsID: localStorage.getItem("gameStatsID")}
        }).then(response => {
            console.log(response);
            return(response);
        }).catch(e => {
            console.log("catch");
            console.log(e);
            return null;
        });

        return(apiGameScore);
    }

    async function getGameStopName() {
        const apiGameStop = await API.graphql({
            query: gameStopByGameID,
            variables: { gameID: localStorage.getItem("gameID")}
        }).then(response => {
            console.log(response);
            return(response);
        }).catch(e => {
            console.log("catch");
            console.log(e);
            return null;
        });

        return(apiGameStop);
    }
    /* end for all games */

    /* STOP 1 */
    /* guessing states and answers for 1st safe - 3 words */
    const [game1Word1Stop1HurricaneGuess,setGame1Word1Stop1HurricaneGuess]= useState({'game1Word1Stop1HurricaneLetters':''});
    const [haveGuessedGame1Word1Stop1Hurricane,setHaveGuessedGame1Word1Stop1Hurricane] = useState();
    const [isGame1Word1Stop1HurricaneWrong, setIsGame1Word1Stop1HurricaneWrong] = useState(true);

    const [game1Word2Stop1HurricaneGuess,setGame1Word2Stop1HurricaneGuess]= useState({'game1Word2Stop1HurricaneLetters':''});
    const [haveGuessedGame1Word2Stop1Hurricane,setHaveGuessedGame1Word2Stop1Hurricane] = useState();
    const [isGame1Word2Stop1HurricaneWrong, setIsGame1Word2Stop1HurricaneWrong] = useState(true);

    const [game1Word3Stop1HurricaneGuess,setGame1Word3Stop1HurricaneGuess]= useState({'game1Word3Stop1HurricaneLetters':''});
    const [haveGuessedGame1Word3Stop1Hurricane,setHaveGuessedGame1Word3Stop1Hurricane] = useState();
    const [isGame1Word3Stop1HurricaneWrong, setIsGame1Word3Stop1HurricaneWrong] = useState(true);


    const game1Word1Stop1HurricaneAnswer = {'game1Word1Stop1HurricaneLetters':'Wesseling'};
    const game1Word2Stop1HurricaneAnswer = {'game1Word2Stop1HurricaneLetters':'Guard'};
    const game1Word3Stop1HurricaneAnswer = {'game1Word3Stop1HurricaneLetters':'baseball'};

    /* end guessing states and answers for 1st safe - 3 words */

    function setGame1Word1Stop1HurricaneLetters(guess) {
        var x = guess;
        console.log("game1 word1 x: " + x);
        let guessObject = {"game1Word1Stop1HurricaneLetters":x};
        setGame1Word1Stop1HurricaneGuess(guessObject);
        //check if guess is right
        if (shallowEqual(x, game1Word1Stop1HurricaneAnswer.game1Word1Stop1HurricaneLetters)) {
            setHaveGuessedGame1Word1Stop1Hurricane(true);
            setIsGame1Word1Stop1HurricaneWrong(false);
        } else {
            console.log("wrong guess");
            setHaveGuessedGame1Word1Stop1Hurricane(true);
            setIsGame1Word1Stop1HurricaneWrong(true);
        }

    }
    function setGame1Word2Stop1HurricaneLetters(guess) {
        var x = guess;
        console.log("game1 word2 x: " + x);
        let guessObject = {"game1Word2Stop1HurricaneLetters":x};
        setGame1Word2Stop1HurricaneGuess(guessObject);
        //check if guess is right
        if (shallowEqual(x, game1Word2Stop1HurricaneAnswer.game1Word2Stop1HurricaneLetters)) {
            setHaveGuessedGame1Word2Stop1Hurricane(true);
            setIsGame1Word2Stop1HurricaneWrong(false);
        } else {
            console.log("wrong guess");
            setHaveGuessedGame1Word2Stop1Hurricane(true);
            setIsGame1Word2Stop1HurricaneWrong(true);
        }
    }
    function setGame1Word3Stop1HurricaneLetters(guess) {
        var x = guess;
        console.log("game1 word3 x: " + x);
        let guessObject = {"game1Word3Stop1HurricaneLetters":x};
        setGame1Word3Stop1HurricaneGuess(guessObject);
        //check if guess is right
        if (shallowEqual(x, game1Word3Stop1HurricaneAnswer.game1Word3Stop1HurricaneLetters)) {
            setHaveGuessedGame1Word3Stop1Hurricane(true);
            setIsGame1Word3Stop1HurricaneWrong(false);
        } else {
            console.log("wrong guess");
            setHaveGuessedGame1Word3Stop1Hurricane(true);
            setIsGame1Word3Stop1HurricaneWrong(true);
        }
    }
    /* end guessing states and answers for 1st  safe - 3 words */

    /* FINAL: guessing states and answers for 2nd safe - 1 word */
    const [guess1,setGuess1] = useState({'answer':''});
    const [haveGuessed1,setHaveGuessed1] = useState();
    const [isWrong1, setIsWrong1] = useState(true);
    const answer1 = {'answer':'wus'};
    useEffect(() => {
        console.log("***useEffect***: guess1.answer: " + guess1.answer);
    });
    function setGuess1Numbers(guess) {
        var x = guess;
        console.log("guess1 x: " + x);
        let guessObject = {"answer":x};
        setGuess1(guessObject);
        //check if guess is right
        if (shallowEqual(x,answer1.answer)) {
            setHaveGuessed1(true);
            setIsWrong1(false);
            /* completing stop 1 */
            console.log("stop 1 win game");
            setStopClock(true);
            setGameComplete(true);
            winGameFunction(true);
        } else {
            console.log("wrong guess");
            setHaveGuessed1(true);
            setIsWrong1(true);
        }

    }
    /* end guessing states and answers for 2nd safe - 1 word */
    /* sign is hanging */
    const [isSignVisible, setIsSignVisible] = useState(false);
    function toggleSign() {
        isSignVisible ? setIsSignVisible(false) : setIsSignVisible(true);
    }
    /* torn diary with message */
    const [isTornDiaryVisible, setIsTornDiaryVisible] = useState(false);
    function toggleTornDiary() {
        isTornDiaryVisible ? setIsTornDiaryVisible(false) : setIsTornDiaryVisible(true);
    }
    /* diary with message */
    const [isDiaryVisible, setIsDiaryVisible] = useState(false);
    function toggleDiary() {
        isDiaryVisible ? setIsDiaryVisible(false) : setIsDiaryVisible(true);
    }
    /* need to click on safe */
    const [isSafeInfoVisible, setIsSafeInfoVisible] = useState(false);
    function toggleSafe() {
        isSafeInfoVisible ? setIsSafeInfoVisible(false) : setIsSafeInfoVisible(true);
    }
    useEffect(() => {
        console.log("***useEffect***: isSafeInfoVisible: " + isSafeInfoVisible);
    });
    /* need to select prybar and then click on cement marking */
    const [isCementSafeInfoVisible, setIsCementSafeInfoVisible] = useState(false);
    function toggleCementSafeInfo() {
        isCementSafeInfoVisible ? setIsCementSafeInfoVisible(false) : setIsCementSafeInfoVisible(true);
    }
    /* show 2nd safe and message */
    const [isCementSafeOpen, setIsCementSafeOpen] = useState(false);
    function toggleCementSafe() {
        isCementSafeOpen ? setIsCementSafeOpen(false) : setIsCementSafeOpen(true);
    }

    /* Finish Game (not move on to next stop) */
    const [isSandbagMessageVisible, setIsSandbagMessageVisible] = useState(false);
    function toggleSandbagMessages() {
        isSandbagMessageVisible ? setIsSandbagMessageVisible(false) : setIsSandbagMessageVisible(true);
    }
    /* backpack functions */
    function toggleBackpack() {
        isBackpackVisible ? setIsBackpackVisible(false) : setIsBackpackVisible(true);
    }
    /* backpack items: key */
    /* key is used to open sandbag vault */
    const [isKeyOn, setIsKeyOn] = useState(false);
    useEffect(() => {
        console.log("***useEffect***: isKeyOn: " + isKeyOn);
    });
    /* remove key from window and put in backpack */
    const [isKeyVisible, setIsKeyVisible] = useState(true);
    function keyFunction() {
        setIsKeyVisible(false);
        console.log("put key in backpack");
        localStorage.setItem("key", "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/key-not-using.png");
        /* check if there */
        if (gameBackpack.length > 0) {
            for (var i = 0; i < gameBackpack.length; i++) {
                var bptest = true;
                if (gameBackpack[i].key === "key") {
                    console.log("key is already there");
                    bptest = false;
                }
            }
            if (bptest === true) {
                console.log("push key to backpack");
                gameBackpack.push({
                    src: 'https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/key-not-using.png',
                    key: 'key'
                })
            }
        } else {
            console.log("push key to backpack");
            gameBackpack.push({
                src: 'https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/key-not-using.png',
                key: 'key'
            })
        }
        setGameBackpackHasItems( true);
    }
    useEffect(() => {
        console.log("***useEffect***: gameBackpack: " + gameBackpack);
        for (const key in gameBackpack) {
            console.log(`${key}: ${gameBackpack[key]}`);
            for (const key1 in gameBackpack[key]) {
                console.log(`${key1}: ${gameBackpack[key][key1]}`);
            }
        }
    });

    function showItemContents(value) {
        console.log("show contents value: " + value);
        switch (value) {
            case 'key':
                console.log("isKeyOn 1: " + isKeyOn);
                setIsKeyOn(!isKeyOn);
                // change image
                for (var i = 0; i < gameBackpack.length; i++) {
                    if (gameBackpack[i].key === "key") {
                        console.log("turn on/off key - state");
                        if (!isKeyOn) {
                            gameBackpack[i].src = "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/key-using.png"
                            localStorage.setItem("key", "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/key-using.png");
                        } else {
                            gameBackpack[i].src = "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/key-not-using.png"
                            localStorage.setItem("key", "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/key-not-using.png");
                        }
                    }
                }
                break;
            default:
        }
    }
    /* end stop 1 - game specific */

    return (
        <View
            ariaLabel="Main Container"
            position="relative">
            <View
                className="image-holder image-short"
                ariaLabel="Image Holder"
                backgroundImage = "url('https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/background-jaycee-shelter.jpg')">

                {/* all games */}
                <View
                    className="z-index102 info-button"
                    ariaLabel="Info Button"
                    onClick={() => toggleHelp()}>
                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/help.png" />
                </View>
                <View
                    className="z-index102 notes-button"
                    ariaLabel="Notes Button"
                    onClick={() => toggleNotes()}>
                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/notes.png" />
                </View>
                <View
                    className="z-index102 backpack-image"
                    ariaLabel="backpack Image"
                    onClick={()=>toggleBackpack()}>
                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/backpack-new.png" />
                </View>
                <View className={isBackpackVisible ? "all-screen zIndex103 show" : "all-screen hide"} >
                    <Button className="close-button" onClick={() => toggleBackpack()}>X</Button>
                    <h3>Backpack Contents</h3><br />
                    {gameBackpack.map((item) => {
                        return (
                            <div className = "wp-block-columns" key={item.key}>
                                <div className = "wp-block-column">
                                    <Image alt={item.src} onClick={() => showItemContents(item.key)} className={item.key} src={item.src} />
                                </div>
                            </div>
                        )
                    })}
                </View>
                <NotesOpen areNotesVisible={areNotesVisible} toggleNotes={toggleNotes} gameNotes={gameNotes} setNotesFunction={setNotesFunction}/>

                {/* end all games */}

                <View
                    ariaLabel="Torn Diary"
                    className="torn-diary-jaycee"
                    onClick={()=>toggleTornDiary()}>
                    <Image src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/03/torndiarypage.png" />
                </View>
                <View
                    ariaLabel="Hanging Sign"
                    className="hanging-sign"
                    onClick={()=>toggleSign()}>
                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/hanging-sign.png" />
                </View>
                <View
                    ariaLabel="Diary"
                    className="diary-jaycee"
                    onClick={()=>toggleDiary()}>
                    <Image src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/02/diary.png" />
                </View>
                <View
                    ariaLabel="left picnic table"
                    className="left-picnic-table"
                >
                    <Image  src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/left-picnic-table-easy.png" />
                </View>
                <View
                    ariaLabel="right picnic table"
                    className="right-picnic-table"
                >
                    <Image  src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/right-picnic-table-easy.png" />
                </View>
                <View
                    className={isDiaryVisible ? "all-screen diary-big show" : "hide"}
                >
                    <Button className="close-button" onClick={()=>toggleDiary()}>X</Button>
                    <View>
                        Dear Diary, <br /><br />I love playing.<br/><br/>the sport<br /><br />on the field<br /><br />closest to the shelter.
                    </View>
                </View>
                <View
                    className={isTornDiaryVisible ? "all-screen show" : "hide"}
                >
                    <Button className="close-button" onClick={()=>toggleTornDiary()}>X</Button>
                    <View className="torn-diary-big-jaycee">
                        What is the name of the <br /><br />house Northwest <br /><br />of here?
                    </View>
                </View>
                <View
                    ariaLabel="sign info"
                    className={isSignVisible ? "all-screen show" : "hide"}>
                    <Button className="close-button" onClick={()=>toggleSign()}>X</Button>
                    <br /><h3>Hanging Sign Says:</h3>
                    <br />
                    <div>What is the name of the Field close to here?</div>
                </View>
                <View
                    ariaLabel="Safe Shelter"
                    className="safe-shelter"
                    onClick={()=>toggleSafe()}>
                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/safe-shelter.png"/>
                </View>
                <View className={!isCementSafeOpen? "cement-safe show" : "hide"}
                      onClick={()=>toggleCementSafe()}>
                    <Image className="test" alt="test" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/cementsafeclosed.png" />
                </View>
                <View className={isCementSafeOpen? "cement-safe show" : "hide"}
                      onClick={()=>toggleCementSafe()}>
                    <Image className="test" alt="test" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/cementsafeopenkeyhole.png" />
                </View>
                <View className={isCementSafeOpen && isKeyOn? "cement-safe show" : "hide"}
                      onClick={()=>toggleCementSafeInfo()}>
                    <Image className="test" alt="test" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/cementsafeopenkeyhole.png" />
                </View>
                <View className={(!isWrong1)? "cement-safe show" : "hide"}
                      onClick={()=>toggleSandbagMessages()}>
                    <Image className="test" alt="test" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/cementsafe-shelter-easy-discs.png" />
                </View>
            </View>
            <View className={isSafeInfoVisible ? "all-screen show" : "hide"}>
                <Button className="close-button" onClick={()=>toggleSafe()}>X</Button>
                <br />
                <TextField
                    label="Word 1 (9 letters - hanging sign)"
                    value={game1Word1Stop1HurricaneGuess.game1Word1Stop1HurricaneLetters}
                    onChange={(e) => setGame1Word1Stop1HurricaneLetters(e.currentTarget.value)}/>
                {
                    isGame1Word1Stop1HurricaneWrong && haveGuessedGame1Word1Stop1Hurricane  ? (
                        <span className="red"> Wrong Answer!</span>
                    ) : null
                }
                {
                    !isGame1Word1Stop1HurricaneWrong && haveGuessedGame1Word1Stop1Hurricane  ? (
                        <span className="green"> Right Answer!</span>
                    ) : null
                }
                <TextField
                    label="Word 2 (5 letters - torn diary page)"
                    value={game1Word2Stop1HurricaneGuess.game1Word2Stop1HurricaneLetters}
                    onChange={(e) => setGame1Word2Stop1HurricaneLetters(e.currentTarget.value)}/>
                {
                    isGame1Word2Stop1HurricaneWrong && haveGuessedGame1Word2Stop1Hurricane  ? (
                        <span className="red"> Wrong Answer!</span>
                    ) : null
                }
                {
                    !isGame1Word2Stop1HurricaneWrong && haveGuessedGame1Word2Stop1Hurricane  ? (
                        <span className="green"> Right Answer!</span>
                    ) : null
                }
                <TextField
                    label="Word 3 (8 letters - diary)"
                    value={game1Word3Stop1HurricaneGuess.game1Word3Stop1HurricaneLetters}
                    onChange={(e) => setGame1Word3Stop1HurricaneLetters(e.currentTarget.value)}/>
                {
                    isGame1Word3Stop1HurricaneWrong && haveGuessedGame1Word3Stop1Hurricane  ? (
                        <span className="red"> Wrong Answer!</span>
                    ) : null
                }
                {
                    !isGame1Word3Stop1HurricaneWrong && haveGuessedGame1Word3Stop1Hurricane  ? (
                        <span className="green"> Right Answer!</span>
                    ) : null
                }
                { !isGame1Word3Stop1HurricaneWrong && !isGame1Word2Stop1HurricaneWrong && !isGame1Word2Stop1HurricaneWrong  ? (
                    <View>
                        <View className={isKeyVisible ? "show" : "hide"}
                              onClick={keyFunction}>
                            <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/key.png" />
                        </View>
                    </View>
                ) : null }

            </View>
            <View className={isCementSafeInfoVisible ? "all-screen show" : "hide"}>
                <Button className="close-button" onClick={()=>toggleCementSafeInfo()}>X</Button>

                <TextField
                    label="Try to Open Floor Safe! (3 letters)"
                    value={guess1.answer}
                    onChange={(e) => setGuess1Numbers(e.currentTarget.value)}/>
                {
                    haveGuessed1 && isWrong1  ? (
                        <span className="red"> Wrong Answer!</span>
                    ) : null
                }

                { !isWrong1 && haveGuessed1  ? (
                    <View>
                        <span className="right"> Right Answer!</span><br />
                    </View>
                ) : (
                    <div>
                        <br /><h3>Engraved on Panel:</h3>
                        The <span className="bold-underline">first</span> thing I did was visit <br />
                        the named field.<br />
                        The <span className="bold-underline">second</span> thing I did was visit the house.<br />
                        The <span className="bold-underline">third</span> thing I did was<br />
                        play a sport.
                    </div>
                )}
            </View>
            {(!isWrong1)?
                (
                    <View className="winner">
                        <h3>WINNER!</h3>
                        Now you have lots of Discs!
                        <TextAreaField
                            rows="1"
                            onChange={(e) => setCommentsFunction(e.currentTarget.value)}
                            descriptiveText="Thank you for playing. Please let us know any and all comments you have about the game."
                        />
                        <span className="small">hint time: {gameTimeHint} mins | real time: {gameTime} mins |
                        tot: time: { Number((gameTime + gameTimeHint + gameTimeTotal).toFixed(2))} min</span>
                        <br />
                        <Button className="button small" onClick={() => goHome()}>Go Home - Play another Game!</Button>
                    </View>
                ): null }

            <View className="time">
                       <span className="small">hint time: {gameTimeHint} mins | real time: {gameTime} mins |
                        tot: time: { Number((gameTime + gameTimeHint + gameTimeTotal).toFixed(2))} min</span>
            </View>
            <View className={isHelpVisible ? "all-screen show" : "all-screen hide"}>
                <Button className="close-button" onClick={() => toggleHelp()}>X</Button>
                <View width="100%" padding="10px">
                    <View paddingBottom="10px">
                        <strong>Game Stop</strong>: <span className="font-small">{gameStop}</span>
                    </View>
                    <View paddingBottom="10px">
                        <strong>How to Play:</strong> Click around - some items will disappear and then appear in your backpack.  If it is in your backpack you may be able to use it by clicking on it.
                    </View>
                    <View paddingBottom="10px">
                        <strong>Goal for this stop:</strong> Find the Discs!  Use Hints if you really need them.
                    </View>
                    <Button className="button small" onClick={() => toggleHint3()}>Open Hint (sport)</Button>
                    <Button className="button small" onClick={() => toggleHint4()}>Open Hint (name of field)</Button>
                    <Button className="button small" onClick={() => toggleHint2()}>Open Hint (name of house)</Button>
                    <Button className="button small" onClick={() => toggleHint1()}>Open Hint (engraved on panel)</Button>

                    <br /><br />
                    <div className={isHint4Visible ? "all-screen show" : "all-screen hide"}>
                        <Button className="close-button" onClick={() => toggleHint4()}>X</Button>
                        <strong>Hint for name of field</strong>
                        <br /><br />There is a large sign on the fence at the field with the name.
                        <br /><br />

                    </div>
                    <div className={isHint3Visible ? "all-screen show" : "all-screen hide"}>
                        <Button className="close-button" onClick={() => toggleHint3()}>X</Button>
                        <strong>Hint for Sport:</strong>
                        <br /><br />People do play soccer and disc golf but the closest field to the shelter is the baseball field.
                        <br /><br />

                    </div>
                    <div className={isHint2Visible ? "all-screen show" : "all-screen hide"}>
                        <Button className="close-button" onClick={() => toggleHint2()}>X</Button>
                        <strong>Hint for name of house:</strong> <br /><br />
                        Near the intersection of Solomon and N. Campbell there is a house that people use for events.<br /><br />
                        Go over there and look for the name.

                    </div>
                    <div className={isHint1Visible ? "all-screen show" : "all-screen hide"}>
                        <Button className="close-button" onClick={() => toggleHint1()}>X</Button>
                        <strong>Hint for engraved on panel:</strong> <br /><br />
                        The <span className="bold-underline">first</span> is in reference to the first letter of the named field.<br />
                        <br />And the pattern continues with name of house and name of sport.<br />

                    </div>
                    <Button className="button small" onClick={() => toggleHelp()}>Close Help and Play</Button>
                </View>
            </View>
            <View
                ariaLabel="stop 1 intro"
                textAlign="center"
                className={isIntroVisible ? "all-screen show" : "hide"}>
                <h3>Game Goals: Find more Discs!</h3>
                {numberOfPlayersError}
                <SelectField
                    label="numberOfPlayers"
                    className="num-Player"
                    isRequired
                    labelHidden
                    size="small"
                    width="200px"
                    placeholder="How Many Players?"
                    value={numberOfPlayers}
                    onChange={(e) => setNumPlayerFunction(e.target.value)}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </SelectField>
                {localStorage.getItem("numberOfTimes") !== null ? (
                    <div> You have played {localStorage.getItem("numberOfTimes")} time(s) before - good luck this time! </div>
                ) : null}
                <h4>Start Playing Game When You are Here:</h4>
                <View>
                    <Image maxHeight="150px" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/game-picture-jaycee-shelter.jpg" />
                </View>
                <View>
                    <span className="small"> <strong>Remember, clock doesn't stop until you complete the stop.</strong></span></View>

                <Button className="button" onClick={() => toggleIntro()}>I Want To Play!</Button>
                |
                <Button className="button" onClick={() => goHomeQuit()}>Back Home</Button>
            </View>
        </View>
    )
}
