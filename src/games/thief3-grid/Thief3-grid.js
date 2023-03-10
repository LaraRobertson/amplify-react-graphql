import React, {useEffect, useState} from "react"
import data from "./gameConstants";
import {NotesOpen} from "../../components/NotesOpen";
import {
    Button,
    Heading,
    View,
    Image,
    TextAreaField,
    TextField,
    Text,
    Alert,
    Flex,
    Grid,
    useTheme
} from '@aws-amplify/ui-react';
import {useNavigate} from "react-router-dom";
import {API} from "aws-amplify";
import {gameStatsByGameID, gameStatsByUserEmail} from "../../graphql/queries";
import {createGameStats as createGameStatsMutation, updateGameStats as updateGameStatsMutation} from "../../graphql/mutations";

const shallowEqual = (object1, object2) => {
    const keys1 = Object.keys(object1);
    console.log("keys1: " + keys1.length);
    const keys2 = Object.keys(object2);
    console.log("keys2: " + keys2.length);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        console.log("object1[key]: " + object1[key]);
        console.log("object2[key]: " + object2[key]);
        console.log("typeof object1[key]: " + typeof object1[key]);
        console.log("typeof object2[key]: " + typeof object2[key]);
        if (object1[key] !== object2[key]) {
            console.log("false");
            return false;
        }
    }
    return true;
}

const shallowEqualLetters = (object1, object2) => {
    const keys1 = Object.keys(object1);
    console.log("keys1: " + keys1.length);
    const keys2 = Object.keys(object2);
    console.log("keys2: " + keys2.length);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        console.log("object1[key]: " + object1[key]);
        console.log("object2[key]: " + object2[key]);
        console.log("typeof object1[key]: " + typeof object1[key]);
        console.log("typeof object2[key]: " + typeof object2[key]);
        if (object1[key].toLowerCase() !== object2[key].toLowerCase()) {
            console.log("false");
            return false;
        }
    }
    return true;
}

export function Thief3() {
    const {tokens} = useTheme();
    const [gameStatsState, setGameStatsState] = useState({});
    /* all games */
    const [areNotesVisible, setAreNotesVisible] = useState(false);
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const [isHint1Visible, setIsHint1Visible] = useState(false);
    const [isHint2Visible, setIsHint2Visible] = useState(false);
    const [isHint3Visible, setIsHint3Visible] = useState(false);
    const [isHint4Visible, setIsHint4Visible] = useState(false);
    const [gameNotes,setGameNotes] = useState('');
    const [isBackpackVisible, setIsBackpackVisible] = useState(false);
    const [gameBackpack, setGameBackpack] = useState([]);
    const [gameBackpackHasItems, setGameBackpackHasItems] = useState(false);
    const [gameTime, setGameTime] = useState(0);
    const [gameTimeHint, setGameTimeHint] = useState(0);
    const [gameTimeTotal, setGameTimeTotal] = useState(0);
    const [isGamePlaying, setIsGamePlaying] = useState(true);
    const [isGamePaused, setIsGamePaused] = useState(false);

    /* game specific */
    /* stop 1 */
    const [isLightVisible, setIsLightVisible] = useState(true);
    const [isDiaryVisible, setIsDiaryVisible] = useState(false);
    const [isTornDiaryVisible, setIsTornDiaryVisible] = useState(false);
    const [isSignVisible, setIsSignVisible] = useState(false);
    const [isLegsAvailable, setIsLegsAvailable] = useState(false);
    const [isLegsVisible, setIsLegsVisible] = useState(false);
    const [isLightOn, setIsLightOn] = useState(false);
    const [isNumBusAvailable, setIsNumBusAvailable] = useState(false);
    const [isNumBusVisible, setIsNumBusVisible] = useState(false);
    const [isKnobMessageAvailable, setIsKnobMessageAvailable] = useState(false);
    const [isKnobMessageVisible, setIsKnobMessageVisible] = useState(false);
    const [clickTimeNow,setClickTimeNow] = useState();
    const [clickTimeThen,setClickTimeThen] = useState();
    const [clickCount,setClickCount] = useState();
    const [isSafeVisible, setIsSafeVisible] = useState(false);
    const [isSafeInfoVisible, setIsSafeInfoVisible] = useState(false);

    /* guessing states and answers for safe - 4 words */
    const [game1Word1Page1ThiefGuess,setGame1Word1Page1ThiefGuess]= useState({'game1Word1Page1ThiefLetters':''});
    const [haveGuessedGame1Word1Page1Thief,setHaveGuessedGame1Word1Page1Thief] = useState();
    const [isGame1Word1Page1ThiefWrong, setIsGame1Word1Page1ThiefWrong] = useState(true);

    const [game1Word2Page1ThiefGuess,setGame1Word2Page1ThiefGuess]= useState({'game1Word2Page1ThiefLetters':''});
    const [haveGuessedGame1Word2Page1Thief,setHaveGuessedGame1Word2Page1Thief] = useState();
    const [isGame1Word2Page1ThiefWrong, setIsGame1Word2Page1ThiefWrong] = useState(true);

    const [game1Word3Page1ThiefGuess,setGame1Word3Page1ThiefGuess]= useState({'game1Word3Page1ThiefLetters':''});
    const [haveGuessedGame1Word3Page1Thief,setHaveGuessedGame1Word3Page1Thief] = useState();
    const [isGame1Word3Page1ThiefWrong, setIsGame1Word3Page1ThiefWrong] = useState(true);

    const [game1Word4Page1ThiefGuess,setGame1Word4Page1ThiefGuess]= useState({'game1Word4Page1ThiefLetters':''});
    const [haveGuessedGame1Word4Page1Thief,setHaveGuessedGame1Word4Page1Thief] = useState();
    const [isGame1Word4Page1ThiefWrong, setIsGame1Word4Page1ThiefWrong] = useState(true);

    const game1Word1Page1ThiefAnswer = {'game1Word1Page1ThiefLetters':'bean'};
    const game1Word2Page1ThiefAnswer = {'game1Word2Page1ThiefLetters':'math'};
    const game1Word3Page1ThiefAnswer = {'game1Word3Page1ThiefLetters':'ghirardelli'};
    const game1Word4Page1ThiefAnswer= {'game1Word4Page1ThiefLetters':'inferno'};
    /* end guessing states and answers for safe - 4 words */

    /* not used */
    const [game1Num1Page1,setGame1Num1Page1] = useState('');
    const [game1Num2Page1,setGame1Num2Page1] = useState('');
    const [game1NumPage1guess,setGame1NumPage1guess] = useState( {Num1:"",Num2:""});
    const [haveGuessedGame1Stop1,setHaveGuessedGame1Stop1] = useState(false);
    const [isGame1Page1Wrong, setIsGame1Page1Wrong] = useState(true);
    /* end not used */

    const gamePage = "Tybean Lower Porch (thief)";

    const navigate = useNavigate();

    function goHome() {
        localStorage.setItem("gameName","");
        navigate('/');
    }

    function SetGuessGame1() {
        const elementID1 = "game1Num1Page1";
        const elementID2 = "game1Num2Page1";
        var x = document.getElementById(elementID1).value;
        var y = document.getElementById(elementID2).value;
        console.log("x: " + x);
        setGame1Num1Page1(x);
        setGame1Num2Page1(y);
        console.log("game1Num1Page1:" + game1Num1Page1);
        console.log("game1Num2Page1:" + game1Num2Page1);
        let updatedValue = {};
        updatedValue = {Num1:x,Num2:y};
        console.log("updatedValue.Num1: " + updatedValue.Num1);
        console.log("updatedValue.Num2: " + updatedValue.Num2);
        setGame1NumPage1guess(game1NumPage1guess => ({
            ...game1NumPage1guess,
            ...updatedValue
        }));
        //check if guess is right
        if (shallowEqual(updatedValue, data.game1NumPage1)) {
            console.log("right guess");
            setHaveGuessedGame1Stop1(true);
            localStorage.setItem("haveGuessedGame1Page1", true);
            setIsGame1Page1Wrong(false);
            localStorage.setItem("isGame1Page1Wrong", false);
        } else {
            console.log("wrong guess");
            setHaveGuessedGame1Stop1(true);
            localStorage.setItem("haveGuessedGame1Page1", true);
            setIsGame1Page1Wrong(true);
            localStorage.setItem("isGame1Page1Wrong", true);
        }
    }

    async function getGameStats() {
        console.log ("get Game Stats");
        /* Waiver Signed, haveGuessedGame1Stop1 */
        /* check local host */
        var haveGuessedGame1Stop1Local = localStorage.getItem("haveGuessedGame1Stop1");
        if (haveGuessedGame1Stop1Local) {
            setHaveGuessedGame1Stop1(haveGuessedGame1Stop1Local);
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

    /* get gamestats and set localstorage */
    /* need to useEffect */
    useEffect(() => {
        console.log("***useEffect***: getGameStats() - just localhost");
        /* get gamestats */
        getGameStats();
    }, []);

    useEffect(() => {
        console.log("***useEffect***: gameStatsState: " + gameStatsState);
        for (const key in gameStatsState) {
            console.log(`${key}: ${gameStatsState[key]}`);
        }
    });

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
    function toggleInfo() {
        isInfoVisible ? setIsInfoVisible(false) : setIsInfoVisible(true);
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
    /* backpack functions */
    function toggleBackpack() {
        isBackpackVisible ? setIsBackpackVisible(false) : setIsBackpackVisible(true);
    }
    function toggleDiary() {
        isDiaryVisible ? setIsDiaryVisible(false) : setIsDiaryVisible(true);
    }
    function toggleTornDiary() {
        isTornDiaryVisible ? setIsTornDiaryVisible(false) : setIsTornDiaryVisible(true);
    }
    function toggleSign() {
        isSignVisible ? setIsSignVisible(false) : setIsSignVisible(true);
    }
    function toggleKnobMessage() {
        isKnobMessageVisible ? setIsKnobMessageVisible(false) : setIsKnobMessageVisible(true);
        console.log("toggleKnobMessage: " + isKnobMessageVisible);
    }
    function toggleLegs() {
        isLegsVisible ? setIsLegsVisible(false) : setIsLegsVisible(true);
        console.log("toggleLegs: " + isLegsVisible);
    }
    function toggleNumBus() {
        isNumBusVisible ? setIsNumBusVisible(false) : setIsNumBusVisible(true);
        console.log("toggleNumBus: " + isNumBusVisible);
    }
    function toggleSafe() {
        isSafeInfoVisible ? setIsSafeInfoVisible(false) : setIsSafeInfoVisible(true);
        console.log("toggleSafe: " + isSafeVisible);
    }
    function backpackLight() {
        setIsLightVisible(false);
        console.log("put light in backpack");
        localStorage.setItem("light", "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/04/blacklight-off.png");
        /* check if there */
        if (gameBackpack.length > 0) {
            for (var i = 0; i < gameBackpack.length; i++) {
                var bptest = true;
                if (gameBackpack[i].key === "light") {
                    console.log("light is already there");
                    bptest = false;
                }
            }
            if (bptest === true) {
                console.log("push light to backpack");
                gameBackpack.push({
                    src: 'https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/04/blacklight-off.png',
                    key: 'light'
                })
            }
        } else {
            console.log("push light to backpack");
            gameBackpack.push({
                src: 'https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/04/blacklight-off.png',
                key: 'light'
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
    useEffect(() => {
        console.log("***useEffect***: knobMessage: " + isKnobMessageAvailable);
    });
    useEffect(() => {
        console.log("***useEffect***: isLightOn: " + isLightOn);
    });
    useEffect(() => {
        console.log("***useEffect***: isSafeVisible: " + isSafeVisible);
    });
    useEffect(() => {
        console.log("***useEffect***: game1Word1Page1ThiefGuess: " + game1Word1Page1ThiefGuess.game1Word1Page1ThiefLetters);
    });
    useEffect(() => {
        console.log("***useEffect***: gameTime: " + gameTime);
    });
    useEffect(() => {
        console.log("***useEffect***: isGamePaused: " + isGamePaused);
    });
    function pauseGame() {
        setIsGamePaused(true);
        setIsGamePlaying(false);
    }
    function playGame() {
        setIsGamePaused(false);
        setIsGamePlaying(true);
    }
    /* 60000 miliseconds = 1 minute */
    const MINUTE_MS = 30000;

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Logs every 30 seconds');
            console.log('pause game: ' + isGamePaused);
            console.log('game time: ' + gameTime);
            if (gameTime) {
                /* add 1 minute */
                if (!isGamePaused) setGameTimeFunction(gameTime + .5);
            } else {
                if (!isGamePaused) setGameTimeFunction(.5);
            }
            setGameTimeTotal(gameTime + .5);
        }, MINUTE_MS);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [gameTime,isGamePaused])

    function setGameTimeFunction(time) {
        console.log("gametimefunction: " + time);
        setGameTime(time);
    }
    function showItemContents(value) {
        console.log("show contents value: " + value);
        switch (value) {
            case 'light':
                console.log("isLightOn 1: " + isLightOn);
                setIsLightOn(!isLightOn);
                lightFunctions(!isLightOn);
                // change image
                for (var i = 0; i < gameBackpack.length; i++) {
                    if (gameBackpack[i].key === "light") {
                        console.log("turn on/off light - state");
                        if (!isLightOn) {
                            gameBackpack[i].src = "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/blacklight-on.png"
                            localStorage.setItem("light", "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/04/blacklight-on.png");
                        } else {
                            gameBackpack[i].src = "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/04/blacklight-off.png"
                            localStorage.setItem("light", "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/04/blacklight-off.png");
                        }
                    }
                }
                break;
            default:
        }
    }
    function lightFunctions(lightState) {
        console.log("turn on/off light: " + isLightOn);
        console.log("turn on/off lightstate: " + lightState);
        if (lightState) {
            console.log("Light is ON");
            setIsLegsAvailable(true);
            setIsNumBusAvailable(true);
            setIsKnobMessageAvailable(true);
        } else {
            console.log("Light is Off");
            setIsLegsAvailable(false);
            setIsNumBusAvailable(false);
            setIsKnobMessageAvailable(false);
        }
    }
    function countClicks() {
        var secondBetweenTwoDate = Math.abs((new Date().getTime() - clickTimeThen) / 1000);
        console.log("diff: " + secondBetweenTwoDate);
        let newDate = new Date();
        setClickTimeNow(newDate);
        if (clickCount === 0) {
            // start timing
            setClickTimeThen(new Date().getTime());
            console.log("time now: " + clickTimeNow);
            setClickCount(1);
        } else if (secondBetweenTwoDate<5 && clickCount > 0) {
            console.log("add click");
            setClickTimeThen(clickTimeNow);
            setClickCount(clickCount + 1);
        } else {
            setClickCount(0);
        }
        if (clickCount > 4) {
            setIsSafeVisible(!isSafeVisible);
            setClickCount(0);
        }
        console.log("count Clicks: " + clickCount);
    }

    function setGame1Word1Page1ThiefLetters(guess) {
        var x = guess;
        console.log("game1 word1 x: " + x);
        let guessObject = {"game1Word1Page1ThiefLetters":x};
        setGame1Word1Page1ThiefGuess(guessObject);
        localStorage.setItem("game1Word1Page1ThiefLetters", x);
        //check if guess is right
        if (shallowEqualLetters(x, game1Word1Page1ThiefAnswer.game1Word1Page1ThiefLetters)) {
            setHaveGuessedGame1Word1Page1Thief(true);
            localStorage.setItem("haveGuessedGame1Word1Page1Thief", true);
            setIsGame1Word1Page1ThiefWrong(false);
            localStorage.setItem("isGame1Word1Page1ThiefWrong", false);
        } else {
            console.log("wrong guess");
            setHaveGuessedGame1Word1Page1Thief(true);
            localStorage.setItem("haveGuessedGame1Word1Page1Thief", true);
            setIsGame1Word1Page1ThiefWrong(true);
            localStorage.setItem("isGame1Word1Page1ThiefWrong", true);
        }

    }
    function setGame1Word2Page1ThiefLetters(guess) {
        var x = guess;
        console.log("game1 word2 x: " + x);
        let guessObject = {"game1Word2Page1ThiefLetters":x};
        setGame1Word2Page1ThiefGuess(guessObject);
        localStorage.setItem("game1Word2Page1ThiefLetters", x);
        //check if guess is right
        if (shallowEqualLetters(x, game1Word2Page1ThiefAnswer.game1Word2Page1ThiefLetters)) {
            setHaveGuessedGame1Word2Page1Thief(true);
            localStorage.setItem("haveGuessedGame1Word2Page1Thief", true);
            setIsGame1Word2Page1ThiefWrong(false);
            localStorage.setItem("isGame1Word2Page1ThiefWrong", false);
        } else {
            console.log("wrong guess");
            setHaveGuessedGame1Word2Page1Thief(true);
            localStorage.setItem("haveGuessedGame1Word2Page1Thief", true);
            setIsGame1Word2Page1ThiefWrong(true);
            localStorage.setItem("isGame1Word2Page1ThiefWrong", true);
        }
    }
    function setGame1Word3Page1ThiefLetters(guess) {
        var x = guess;
        console.log("game1 word3 x: " + x);
        let guessObject = {"game1Word3Page1ThiefLetters":x};
        setGame1Word3Page1ThiefGuess(guessObject);
        localStorage.setItem("game1Word3Page1ThiefLetters", x);
        //check if guess is right
        if (shallowEqualLetters(x, game1Word3Page1ThiefAnswer.game1Word3Page1ThiefLetters)) {
            setHaveGuessedGame1Word3Page1Thief(true);
            localStorage.setItem("haveGuessedGame1Word3Page1Thief", true);
            setIsGame1Word3Page1ThiefWrong(false);
            localStorage.setItem("isGame1Word3Page1ThiefWrong", false);
        } else {
            console.log("wrong guess");
            setHaveGuessedGame1Word3Page1Thief(true);
            localStorage.setItem("haveGuessedGame1Word3Page1Thief", true);
            setIsGame1Word3Page1ThiefWrong(true);
            localStorage.setItem("isGame1Word3Page1ThiefWrong", true);
        }
    }
    function setGame1Word4Page1ThiefLetters(guess) {
        var x = guess;
        console.log("game1 word4 x: " + x);
        let guessObject = {"game1Word4Page1ThiefLetters":x};
        setGame1Word4Page1ThiefGuess(guessObject);
        localStorage.setItem("game1Word4Page1ThiefLetters", x);
        //check if guess is right
        if (shallowEqualLetters(x, game1Word4Page1ThiefAnswer.game1Word4Page1ThiefLetters)) {
            setHaveGuessedGame1Word4Page1Thief(true);
            localStorage.setItem("haveGuessedGame1Word4Page1Thief", true);
            setIsGame1Word4Page1ThiefWrong(false);
            localStorage.setItem("isGame1Word4Page1ThiefWrong", false);
        } else {
            console.log("wrong guess");
            setHaveGuessedGame1Word4Page1Thief(true);
            localStorage.setItem("haveGuessedGame1Word4Page1Thief", true);
            setIsGame1Word4Page1ThiefWrong(true);
            localStorage.setItem("isGame1Word4Page1ThiefWrong", true);
        }
    }
    return (
        <Grid
            ariaLabel="Main container"
            templateColumns="repeat(8, 12.5%)"
            templateRows="repeat(20, 5%)"
            className="image-holder"
            backgroundImage = "url('https://escapeoutbucket213334-staging.s3.amazonaws.com/public/tybee-lower-porch-bg.jpg')">
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View ariaLabel="I1"
                  className = "borderRed"
                  columnSpan={{ base: 1, small: 1 }}
                  rowSpan={{ base: 2, small: 4 }}
                  onClick={()=>toggleBackpack()}>
                <View textAlign="right" height="100%" >
                    <Image height="100%" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/backpack-new.png" />
                </View>
            </View>
            <View ariaLabel="H1"
                  rowSpan={{ base: 1, small: 2 }}
                  className = "border"
                  onClick={() => toggleInfo()}>
                <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/info.png" />
            </View>
            <View ariaLabel="a2-big" className = "border no-show-small">a2 - big</View>
            <View  ariaLabel="a2-small"className = "border no-show-bigger"></View>
            <View className = "border no-show-bigger"></View>
            <View className = "border no-show-bigger"></View>
            <View className = "border no-show-small"></View>
            <View className = "border no-show-small"></View>
            <View className = "border no-show-small"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View ariaLabel="a3-big" className = "border"></View>
            <View className = "border no-show-small"></View>
            <View className = "border no-show-small"></View>
            <View className = "border no-show-small"></View>
            <View className = "border no-show-small"></View>
            <View className = "border no-show-small"></View>
            <View ariaLabel="H2"
                  rowSpan={{ base: 1, small: 2 }}
                  className = "border"
                  onClick={() => toggleNotes()}>
                <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/notes.png" />
            </View>
            <View className = "border no-show-bigger"></View>
            <View className = "border no-show-bigger"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>
            <View className = "border"></View>

            <View ariaLabel="A9" className="border">
            </View>
            <View ariaLabel="B19" className = "border"></View>
            <View ariaLabel="C19" className = "border"></View>
            <View ariaLabel="D19" className = "border"></View>
            <View ariaLabel="E19" className = "border"></View>
            <View ariaLabel="F19" className = "border"></View>
            <View ariaLabel="G19" className = "border"></View>
            <View ariaLabel="H19" className = "border"></View>
            <View ariaLabel="A20" columnSpan={8} rowSpan={2} >
                <View position="relative" height="100%" >
                    <View position="absolute" bottom="0" width="100%">
                        <Flex alignItems="center" justifyContent="center">
                            <Button className="bottom-button" onClick={() => goHome()}>Home</Button>
                            <span className="small"> | hint time: {gameTimeHint} mins | real time: {gameTime} mins | tot: time: {gameTimeTotal} min</span>
                        </Flex>
                    </View>
                </View>
            </View>

                {isSafeVisible? (
                    <View
                        ariaLabel="Safe"
                        className="safe"
                        onClick={()=>toggleSafe()}>
                        <Image src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/04/circle-safe.png"/>
                    </View>
                ):null}





            <View
                className={isDiaryVisible ? "all-screen diary-big show" : "hide"}
            >
                <Button className="close-button" onClick={()=>toggleDiary()}>X</Button>
                <View>
                    Dear Diary, <br /><br />I learn about a game.<br/><br/>I saw the shops.<br /><br />What was in that Mocha?<br /><br />Where did I hide from Cops?
                </View>
            </View>
            <View
                className={isTornDiaryVisible ? "all-screen torn-diary-big show" : "hide"}
            >
                <Button className="close-button" onClick={()=>toggleTornDiary()}>X</Button>
            </View>
            <View className={isSafeInfoVisible ? "all-screen show" : "hide"}>
                <Button className="close-button" onClick={()=>toggleSafe()}>X</Button>
                <div>Try to Open Safe!</div>
                <br />
                <TextField
                    label="Word 1"
                    value={game1Word1Page1ThiefGuess.game1Word1Page1ThiefLetters}
                    onChange={(e) => setGame1Word1Page1ThiefLetters(e.currentTarget.value)}/>
                {
                    isGame1Word1Page1ThiefWrong && haveGuessedGame1Word1Page1Thief  ? (
                        <span className="red"> Wrong Answer!</span>
                    ) : null
                }
                {
                    !isGame1Word1Page1ThiefWrong && haveGuessedGame1Word1Page1Thief  ? (
                        <span className="green"> Right Answer!</span>
                    ) : null
                }
                <TextField
                    label="Word 2"
                    value={game1Word2Page1ThiefGuess.game1Word2Page1ThiefLetters}
                    onChange={(e) => setGame1Word2Page1ThiefLetters(e.currentTarget.value)}/>
                {
                    isGame1Word2Page1ThiefWrong && haveGuessedGame1Word2Page1Thief  ? (
                        <span className="red"> Wrong Answer!</span>
                    ) : null
                }
                {
                    !isGame1Word2Page1ThiefWrong && haveGuessedGame1Word2Page1Thief  ? (
                        <span className="green"> Right Answer!</span>
                    ) : null
                }
                <TextField
                    label="Word 3"
                    value={game1Word3Page1ThiefGuess.game1Word3Page1ThiefLetters}
                    onChange={(e) => setGame1Word3Page1ThiefLetters(e.currentTarget.value)}/>
                {
                    isGame1Word3Page1ThiefWrong && haveGuessedGame1Word3Page1Thief  ? (
                        <span className="red"> Wrong Answer!</span>
                    ) : null
                }
                {
                    !isGame1Word3Page1ThiefWrong && haveGuessedGame1Word3Page1Thief  ? (
                        <span className="green"> Right Answer!</span>
                    ) : null
                }
                <TextField
                    label="Word 4"
                    value={game1Word4Page1ThiefGuess.game1Word4Page1ThiefLetters}
                    onChange={(e) => setGame1Word4Page1ThiefLetters(e.currentTarget.value)}/>
                {
                    isGame1Word4Page1ThiefWrong && haveGuessedGame1Word4Page1Thief  ? (
                        <span className="red"> Wrong Answer!</span>
                    ) : null
                }
                {
                    !isGame1Word4Page1ThiefWrong && haveGuessedGame1Word4Page1Thief  ? (
                        <span className="green"> Right Answer!</span>
                    ) : null
                }
            </View>
            {(!isGame1Word1Page1ThiefWrong && !isGame1Word2Page1ThiefWrong && !isGame1Word3Page1ThiefWrong && !isGame1Word4Page1ThiefWrong)?
                (
            <View
                ariaLabel="winner"
                className="winner">
                <span className = "green">WINNER!!!</span>
                <br /><br /><Button onClick={() => goHome()}>Home</Button>
            </View>
                ): null }
            {(!isGame1Word1Page1ThiefWrong && !isGame1Word2Page1ThiefWrong && !isGame1Word3Page1ThiefWrong && !isGame1Word4Page1ThiefWrong)?
                (
                    <View
                        ariaLabel="safe open"
                        className="safe-open">
                        <Image src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/04/circle-safe-open.png"/>
                    </View>
                ): null }

            <View padding="100px" className={isGamePaused ? "all-screen show" : "hide"}>
                <Button className="play-button" onClick={() => playGame()}>Play </Button>
                <div className="play-div">{gamePage}</div>
                <div className="play-div">game time: {gameTime} mins</div>
            </View>
            <NotesOpen areNotesVisible={areNotesVisible} toggleNotes={toggleNotes} gameNotes={gameNotes} setNotesFunction={setNotesFunction}/>
            <View className={isInfoVisible ? "all-screen show-gradual" : "all-screen hide-gradual"}>
                <Button className="close-button" onClick={() => toggleInfo()}>X</Button>
                    <View width="100%" padding="10px">
                        <div className="wp-block-columns">
                            <div className="wp-block-column">
                                    <Image src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/02/info.png" />
                            </div>
                            <div className="wp-block-column">
                                <strong>This game is best played in landscape mode. Please turn your device sideways to play.</strong>
                            </div>
                        </div>
                        <div className="font-small">
                            <Button onClick={() => goHome()}>Home</Button>
                            &nbsp; | Thief 1 -> {gamePage}
                        </div><br />
                        <strong>How to Play:</strong> Click around - some items will disappear and then appear in your backpack.  If it is in your backpack you may be able to use it by clicking on it.
                        <br /><br />
                        <strong>Goal for this stop:</strong> find the thief's stolen goods.  Use Hints if you really need them.
                        <br /><br />
                        <Button className="button-small" onClick={() => toggleHint3()}>Open Hint (light)</Button>
                        <Button className="button-small" onClick={() => toggleHint4()}>Open Hint (order of words)</Button>
                        <Button className="button-small" onClick={() => toggleHint2()}>Open Hint (game)</Button>
                        <Button className="button-small" onClick={() => toggleHint1()}>Open Hint (shops)</Button>



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
                        <Button onClick={() => toggleInfo()}>Close Info and Play</Button>
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
        </Grid>
    )
}


