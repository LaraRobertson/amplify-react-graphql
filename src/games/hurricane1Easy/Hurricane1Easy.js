import React, {useEffect, useState} from "react"
import {NotesOpen} from "../../components/NotesOpen";
import {shallowEqual} from "../../components/ShallowEqual";
import {Button, Heading, View, Image, TextAreaField, TextField, Text, Alert, Flex} from '@aws-amplify/ui-react';
import {useNavigate} from "react-router-dom";
import {API} from "aws-amplify";
import {gameStatsByGameID, gameStatsByUserEmail} from "../../graphql/queries";
import {createGameStats as createGameStatsMutation, updateGameStats as updateGameStatsMutation} from "../../graphql/mutations";

export function Hurricane1Easy() {
    /* for all games */
    const [gameStatsState, setGameStatsState] = useState({});
    const [areNotesVisible, setAreNotesVisible] = useState(false);
    const [isHelpVisible, setIsHelpVisible] = useState(false);
    const [isHint1Visible, setIsHint1Visible] = useState(false);
    const [isHint2Visible, setIsHint2Visible] = useState(false);
    const [isHint3Visible, setIsHint3Visible] = useState(false);
    const [isHint4Visible, setIsHint4Visible] = useState(false);
    const [gameNotes,setGameNotes] = useState('');
    const [gameComments,setGameComments] = useState('');
    const [isBackpackVisible, setIsBackpackVisible] = useState(false);
    const [gameBackpack, setGameBackpack] = useState([]);
    const [gameBackpackHasItems, setGameBackpackHasItems] = useState(false);
    const [gameTime, setGameTime] = useState(0);
    const [gameTimeHint, setGameTimeHint] = useState(0);
    const [gameTimeTotal, setGameTimeTotal] = useState(0);
    const [isGamePlaying, setIsGamePlaying] = useState(true);
    const [isGamePaused, setIsGamePaused] = useState(false);

    const navigate = useNavigate();
    function goHome() {
        navigate('/');
    }
    function goHomeQuit() {
        localStorage.removeItem("agreeToWaiver");
        localStorage.removeItem("GameStatsID");
        localStorage.removeItem("gameTimeTotal");
        localStorage.removeItem("gameTimeTotal");
        localStorage.removeItem("gameStop");
        localStorage.removeItem("game1Word1Stop1HurricaneLetters");
        localStorage.removeItem("haveGuessedGame1Word1Stop1Hurricane");
        localStorage.removeItem("isGame1Word1Stop1HurricaneWrong");
        localStorage.removeItem("game1Word2Stop1HurricaneLetters");
        localStorage.removeItem("haveGuessedGame1Word2Stop1Hurricane");
        localStorage.removeItem("isGame1Word2Stop1HurricaneWrong");
        localStorage.removeItem("game1Word3Stop1HurricaneLetters");
        localStorage.removeItem("haveGuessedGame1Word3Stop1Hurricane");
        localStorage.removeItem("isGame1Word3Stop1HurricaneWrong");
        localStorage.removeItem("guess1");
        localStorage.removeItem("haveGuessed1");
        localStorage.removeItem("isWrong1");
        navigate('/');
    }
    const [isIntroVisible, setIsIntroVisible] = useState(true);
    function toggleIntro() {
        isIntroVisible ? setIsIntroVisible(false) : setIsIntroVisible(true);
    }
    /* hint functions */
    function toggleHint1() {
        isHint1Visible ? setIsHint1Visible(false) : setIsHint1Visible(true);
    }
    function toggleHint2() {
        isHint2Visible ? setIsHint2Visible(false) : setIsHint2Visible(true);
    }
    function toggleHint3() {
        isHint3Visible ? setIsHint3Visible(false) : setIsHint3Visible(true);
    }
    function toggleHint4() {
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
        console.log('comemennts: ' + notes);
        /* set localhost variable */
        setGameComments(notes);
    }
    /* game time/scoring */

    useEffect(() => {
        console.log("***useEffect***: gameStatsState: " + gameStatsState);
        for (const key in gameStatsState) {
            console.log(`${key}: ${gameStatsState[key]}`);
        }
    });
    useEffect(() => {
        console.log("***useEffect***: gameTime: " + gameTime);
    });
    useEffect(() => {
        console.log("***useEffect***: isIntroVisible: " + isIntroVisible);
    });

    /* 60000 miliseconds = 1 minute */
    const MINUTE_MS = 3000;
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Logs every 30 seconds');
            console.log('game time: ' + gameTime);
            if (gameTime) {
                /* add 1 minute */
                if (!isIntroVisible && isWrong1) {
                    setGameTimeFunction(gameTime + .5);
                    setGameTimeTotal(gameTime + .5);
                    localStorage.setItem("gameTimeTotal", gameTime + .5);
                }
                if (!isWrong1) winGameFunction(interval);

            } else {
                if (!isIntroVisible) {
                    setGameTimeFunction(.5);
                    setGameTimeTotal(.5);
                    localStorage.setItem("gameTimeTotal", .5);
                }
            }

        }, MINUTE_MS);
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [gameTime,isIntroVisible])

    async function winGameFunction(interval) {
        clearInterval(interval);
        console.log("game has been won");
        /* push stats to database */
        /* gameTime, gameTimeTotal, hintTime */
        const userEmail = localStorage.getItem("email");
        const gameName = localStorage.getItem("gameName");
        let filter = {
            gameName: {
                eq: gameName
            }
        };
        const apiGameStats = await API.graphql({
            query: gameStatsByUserEmail,
            variables: { filter: filter, userEmail: userEmail}
        });
        const gamesStatsFromAPI = apiGameStats.data.gameStatsByUserEmail.items[0];
        const gameStatsState = JSON.parse(gamesStatsFromAPI.gameStates);
        /* gameTime is an array */
        let gameTimeArray = [gameTime];
        let gameTimeTotalArray = [gameTimeTotal];
        let gameStatsValues = '{"waiverSigned":true,"numberOfTimes":1,"gameTime":' + gameTimeArray + ',"gameTimeTotal1":' + gameTimeTotalArray + '}';
        /* need to get stats and update */
        /* TODO */
        let numberOfTimes = 1;
        if (gameStatsState.numberOfTimes) {
            numberOfTimes = gameStatsState.numberOfTimes + 1;
            /* push to array */
            gameStatsState.gameTime.push("gameTime");
            gameStatsState.gameTimeTotal.push("gameTimetotal");
            let gameStatsValues = '{"waiverSigned":true,"numberOfTimes":1,"gameTime":' + gameStatsState.gameTime + ',"gameTimeTotal1":' + gameStatsState.gameTimeTotal + '}';
        }
       /* {"waiverSigned":true,"numberOfTimes":1,"gameTime1":4,"gameTimeTotal1":4} */
        var gameTimeKey = "gameTime" + numberOfTimes;
        var gameTimeTotalKey = "gameTimeTotal" + numberOfTimes;
        /*const gameStatsValues = {
            waiverSigned: true,
            numberOfTimes: numberOfTimes,
            [gameTimeKey]: gameTime,
            [gameTimeTotalKey]: gameTimeTotal
        }*/
        const newGameStats = {
            id: gamesStatsFromAPI.id,
            gameStates: gameStatsValues
        };
        localStorage.setItem("GameStatsID",gamesStatsFromAPI.id);
        const apiGameStatsUpdate = await API.graphql({ query: updateGameStatsMutation, variables: {input: newGameStats}});
    }

    function setGameTimeFunction(time) {
        console.log("gametimefunction: " + time);
        localStorage.setItem("gameTime", .5);
        setGameTime(time);
    }
    /* end for all games */


    /* stop 1 - game specific */
    /* get gamestats and set localstorage */
    useEffect(() => {
        console.log("***useEffect***: getGameStats() - just localhost");
        /* get gamestats */
        getGameStats("Jaycee Park Shelter (Hurricane Easy)");
    }, []);

    const [haveGuessedGame1Stop1Local, setHaveGuessedGame1Stop1Local] = useState();

    const [gameStop,setGameStop] = useState();
    async function getGameStats(gameStop1) {
        console.log ("get Game Stats");
        /* check GameStop */

        const gameStopLocal = (localStorage.getItem('gameStop') !== null);
        if (gameStopLocal) {
            setGameStop(gameStopLocal);
        } else {
            localStorage.setItem("gameStop",gameStop1);
            setGameStop(gameStop1);
        }


        var haveGuessedGame1Stop1Local = localStorage.getItem("haveGuessedGame1Stop1");
        if (haveGuessedGame1Stop1Local) {
            setHaveGuessedGame1Stop1Local(haveGuessedGame1Stop1Local);
        } else {
            /* check database */

            /* check if gameStats entry */
            const userEmail = localStorage.getItem("email");
            const gameName = localStorage.getItem("gameName");
            let filter = {
                gameName: {
                    eq: gameName
                }
            };
            const apiGameStats =  await API.graphql({
                query: gameStatsByUserEmail,
                variables: { filter: filter, userEmail: userEmail}
            });
            const gamesStatsFromAPI = apiGameStats.data.gameStatsByUserEmail.items[0];
            let gameStatsState =  JSON.parse(gamesStatsFromAPI.gameStates);
            console.log("*** gameStatsState - state object below ***")
            for (const key in gameStatsState) {
                console.log(`${key}: ${gameStatsState[key]}`);
            }
            console.log("*** gameStatsState - end state object ***")
        }
        /* localhost beats saved stats */

    }

    /* guessing states and answers for safe - 4 words */
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

    /* end guessing states and answers for safe - 4 words */

    function setGame1Word1Stop1HurricaneLetters(guess) {
        var x = guess;
        console.log("game1 word1 x: " + x);
        let guessObject = {"game1Word1Stop1HurricaneLetters":x};
        setGame1Word1Stop1HurricaneGuess(guessObject);
        localStorage.setItem("game1Word1Stop1HurricaneLetters", x);
        //check if guess is right
        if (shallowEqual(x, game1Word1Stop1HurricaneAnswer.game1Word1Stop1HurricaneLetters)) {
            setHaveGuessedGame1Word1Stop1Hurricane(true);
            localStorage.setItem("haveGuessedGame1Word1Stop1Hurricane", true);
            setIsGame1Word1Stop1HurricaneWrong(false);
            localStorage.setItem("isGame1Word1Stop1HurricaneWrong", false);
        } else {
            console.log("wrong guess");
            setHaveGuessedGame1Word1Stop1Hurricane(true);
            localStorage.setItem("haveGuessedGame1Word1Stop1Hurricane", true);
            setIsGame1Word1Stop1HurricaneWrong(true);
            localStorage.setItem("isGame1Word1Stop1HurricaneWrong", true);
        }

    }
    function setGame1Word2Stop1HurricaneLetters(guess) {
        var x = guess;
        console.log("game1 word2 x: " + x);
        let guessObject = {"game1Word2Stop1HurricaneLetters":x};
        setGame1Word2Stop1HurricaneGuess(guessObject);
        localStorage.setItem("game1Word2Stop1HurricaneLetters", x);
        //check if guess is right
        if (shallowEqual(x, game1Word2Stop1HurricaneAnswer.game1Word2Stop1HurricaneLetters)) {
            setHaveGuessedGame1Word2Stop1Hurricane(true);
            localStorage.setItem("haveGuessedGame1Word2Stop1Hurricane", true);
            setIsGame1Word2Stop1HurricaneWrong(false);
            localStorage.setItem("isGame1Word2Stop1HurricaneWrong", false);
        } else {
            console.log("wrong guess");
            setHaveGuessedGame1Word2Stop1Hurricane(true);
            localStorage.setItem("haveGuessedGame1Word2Stop1Hurricane", true);
            setIsGame1Word2Stop1HurricaneWrong(true);
            localStorage.setItem("isGame1Word2Stop1HurricaneWrong", true);
        }
    }
    function setGame1Word3Stop1HurricaneLetters(guess) {
        var x = guess;
        console.log("game1 word3 x: " + x);
        let guessObject = {"game1Word3Stop1HurricaneLetters":x};
        setGame1Word3Stop1HurricaneGuess(guessObject);
        localStorage.setItem("game1Word3Stop1HurricaneLetters", x);
        //check if guess is right
        if (shallowEqual(x, game1Word3Stop1HurricaneAnswer.game1Word3Stop1HurricaneLetters)) {
            setHaveGuessedGame1Word3Stop1Hurricane(true);
            localStorage.setItem("haveGuessedGame1Word3Stop1Hurricane", true);
            setIsGame1Word3Stop1HurricaneWrong(false);
            localStorage.setItem("isGame1Word3Stop1HurricaneWrong", false);
        } else {
            console.log("wrong guess");
            setHaveGuessedGame1Word3Stop1Hurricane(true);
            localStorage.setItem("haveGuessedGame1Word3Stop1Hurricane", true);
            setIsGame1Word3Stop1HurricaneWrong(true);
            localStorage.setItem("isGame1Word3Stop1HurricaneWrong", true);
        }
    }
    /* end guessing states and answers for 2nd safe - 5 numbers */
    /* guessing states and answers for first safe - 5 numbers */
    const [guess1,setGuess1] = useState({'answer':''});
    const [haveGuessed1,setHaveGuessed1] = useState();
    const [isWrong1, setIsWrong1] = useState(true);
    const answer1 = {'answer':'wus'};
    useEffect(() => {
        console.log("***useEffect***: guess1.numbers: " + guess1.answer);
    });
    function setGuess1Numbers(guess) {
        var x = guess;
        console.log("guess1 x: " + x);
        let guessObject = {"answer":x};
        setGuess1(guessObject);
        localStorage.setItem("guess1", x);
        //check if guess is right
        if (shallowEqual(x,answer1.answer)) {
            setHaveGuessed1(true);
            localStorage.setItem("haveGuessed1", true);
            setIsWrong1(false);
            localStorage.setItem("isWrong1", false);
        } else {
            console.log("wrong guess");
            setHaveGuessed1(true);
            localStorage.setItem("haveGuessed1", true);
            setIsWrong1(true);
            localStorage.setItem("isWrong1", true);
        }

    }
    /* end guessing states and answers for first safe - 5 numbers */
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

    /* move on to next stop */
    const [isSandbagMessageVisible, setIsSandbagMessageVisible] = useState(false);
    function toggleSandbagMessages() {
        isSandbagMessageVisible ? setIsSandbagMessageVisible(false) : setIsSandbagMessageVisible(true);
    }
    function goToStop2() {
        console.log("go to stop 2");
        navigate('/hurricane-1-stop2');
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
                    <Image className="test" alt="test" src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/03/cementsafeopensandbags.png" />
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
                        <span className="small"> time: hint: {gameTimeHint} mins | real: {gameTime} mins | total: {gameTimeTotal} min</span><br />
                        <Button className="button small" onClick={() => goHome()}>Go Home - Play another Game!</Button>
                    </View>
                ): null }

            <View className="time">
                <span className="small"> time: hint: {gameTimeHint} mins | real: {gameTime} mins | total: {gameTimeTotal} min</span>
            </View>
            <NotesOpen areNotesVisible={areNotesVisible} toggleNotes={toggleNotes} gameNotes={gameNotes} setNotesFunction={setNotesFunction}/>
            <View className={isHelpVisible ? "all-screen show-gradual" : "all-screen hide-gradual"}>
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
                        <Button className="button small" onClick={() => toggleHint3()}>Open Hint (light)</Button>
                        <Button className="button small" onClick={() => toggleHint4()}>Open Hint (order of words)</Button>
                        <Button className="button small" onClick={() => toggleHint2()}>Open Hint (game)</Button>
                        <Button className="button small" onClick={() => toggleHint1()}>Open Hint (shops)</Button>

                        <br /><br />
                        <div className={isHint4Visible ? "all-screen show-gradual" : "all-screen hide-gradual"}>
                            <Button className="close-button" onClick={() => toggleHint4()}>X</Button>
                            <strong>Hint for somewhere order of numbers for safe:</strong>
                            <br /><br />The diary had a little rhyme.  This rhyme tells you the order of the numbers.
                            <br /><br />

                        </div>
                        <div className={isHint3Visible ? "all-screen show-gradual" : "all-screen hide-gradual"}>
                            <Button className="close-button" onClick={() => toggleHint3()}>X</Button>
                            <strong>Hint for light (in backpack):</strong>
                            <br /><br />Once you click on light it should go into your backpack. This is a blacklight and when you
                            use it (click it in backpack to turn on) and click on objects you will see more clues.
                            <br /><br />

                        </div>
                        <div className={isHint2Visible ? "all-screen show-gradual" : "all-screen hide-gradual"}>
                            <Button className="close-button" onClick={() => toggleHint2()}>X</Button>
                            <strong>Hint for game clue:</strong> <br /><br />You may have to ask someone about this contest.
                            It happened in July of 2021. Or you can look on their facebook/instagram feed.
                            <br /><br />OR if you
                            happen to know the name of the animal prowling around then you know the answer to this puzzle.<br /><br />

                        </div>
                        <div className={isHint1Visible ? "all-screen show-gradual" : "all-screen hide-gradual"}>
                            <Button className="close-button" onClick={() => toggleHint1()}>X</Button>
                            <strong>Hint for shops clue:</strong> <br /><br />There are many little shops along the west side of the Tybee Oaks area - Inferno, Glazed and Confused are in the north part.
                            The southern most shop on the west side is "Tipsy Mermaid Art", then "granny flounders", then "The Tybee Gallery", then "Rachel Vogel Designs".
                            The 6th letter of the first (most southern) shop is "M".<br /><br />

                        </div>
                        <Button className="button small" onClick={() => goHomeQuit()}>Quit Game and Go Home</Button> | <Button className="button small" onClick={() => toggleHelp()}>Close Help and Play</Button>
                </View>
            </View>
            <View className={isBackpackVisible ? "all-screen zIndex103 show-gradual" : "all-screen hide-gradual"} >
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
            <View
                ariaLabel="stop 1 intro"
                textAlign="center"
                className={isIntroVisible ? "all-screen show" : "hide"}>
                <h3>Game Goals: Find more Discs!</h3>
                {localStorage.getItem("numberOfTimes") !== null ? (
                    <div> You have played {localStorage.getItem("numberOfTimes")} time(s) before - good luck this time! </div>
                ) : null}
                <h4>Start Playing Game When You are Here:</h4>
                <View>
                <Image maxHeight="150px" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/game-picture-jaycee-shelter.jpg" />
                </View>
                <Button className="button" onClick={() => toggleIntro()}>I Want To Play!</Button>
                |
                <Button className="button" onClick={() => goHome()}>Back Home</Button>
            </View>
        </View>
    )
}


