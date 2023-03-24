import React, {useEffect, useState} from "react"
import {NotesOpen} from "../../components/NotesOpen";
import {shallowEqual} from "../../components/ShallowEqual";
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
    SelectField
} from '@aws-amplify/ui-react';
import {useNavigate} from "react-router-dom";
import {API} from "aws-amplify";
import { gameScoreByGameStatsID, gameStopByGameID } from "../../graphql/queries";
import { updateGameScore, createGameHintTime, createGameStopTime } from "../../graphql/mutations";

export function Hurricane1() {
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
    function goHomeQuit() {
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
        localStorage.removeItem("agreeToWaiver");
        localStorage.removeItem("gameStatsID");
        localStorage.removeItem("gameScoreID");
        localStorage.removeItem("gameName");
        localStorage.removeItem("gameTime");
        localStorage.removeItem("gameTimeTotal");
        localStorage.removeItem("gameStop");
        localStorage.removeItem("gameStopNameArray");
        localStorage.removeItem("numberOfTimes");
        localStorage.removeItem("numberOfPlayers");
        localStorage.removeItem("key");
        localStorage.removeItem("prybar");
        localStorage.removeItem("shovel");
        localStorage.removeItem("key2");
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
    function completeStop(){
        /*stop 2 */
        if (gameStop == 2) {
            setIsKeyOn(true);
            setIsKeyUsed(true);
            setIsWrong2Stop2(false);
            setIsWrong1Stop2(false)
        } else if (gameStop == 1) {
            /* stop 1 */
            setIsWrong1(false);
            setIsWrong2(false);
        } else if  (gameStop == 3) {
            /* stop 1 */
            setIsWrong1(false);
            setIsWrong2(false);
        } else if  (gameStop == 4) {
            /* stop 1 */
            setIsWrong1(false);
            setIsWrong2(false);
        }
        console.log("complete stop override");
        setStopClock(true);
        winGameFunction();
    }
    useEffect(() => {
        console.log("***useEffect***: stopClock: " + stopClock);
    });
    async function winGameFunction() {
        console.log("winGameFunction");
        /* for end of game: clearInterval(interval);*/
        console.log("stop has been won");
        /* update gameScore based on stop - */
        updateGameScoreFunction();
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
    async function updateGameScoreFunction() {
        console.log("gameScoreID (update):" + gameScoreID);
        let GameTimeTotalVar = gameTimeTotal + gameTime + gameTimeHint;
        const data = {
            id: gameScoreID,
            numberOfPlayers: numberOfPlayers,
            gameTotalTime: GameTimeTotalVar,
            completed: gameComplete
        };
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
        let gameStopNameArray = gameStopFromAPI.data.gameStopByGameID.items;
        /* get gameScore Id */
        const gameScoreFromAPI = await getGameScoreID();
        let gameScoreID = gameScoreFromAPI.data.gameScoreByGameStatsID.items[0].id;
        /*let testObject = gameStopNameArray[0];
        for (const key in testObject) {
    console.log(`${key}: ${ testObject[key]}`);
        for (const key1 in testObject[key]) {
             //console.log(`${key1}: ${testObject[key][key1]}`);
         }
        }*/
        setGameStopNameArray(gameStopFromAPI.data.gameStopByGameID.items);
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
    /* guessing states and answers for first safe - 5 numbers */
    const [guess1,setGuess1] = useState({'numbers':''});
    const [haveGuessed1,setHaveGuessed1] = useState();
    const [isWrong1, setIsWrong1] = useState(true);
    const answer1 = {'numbers':'78493'};
   /* useEffect(() => {
        console.log("***useEffect***: guess1.numbers: " + guess1.numbers);
    });*/
    function setGuess1Numbers(guess) {
        var x = guess;
        console.log("guess1 x: " + x);
        let guessObject = {"numbers":x};
        setGuess1(guessObject);
        //check if guess is right
        if (shallowEqual(x,answer1.numbers)) {
            setHaveGuessed1(true);
            setIsWrong1(false);
        } else {
            console.log("wrong guess");
            setHaveGuessed1(true);
            setIsWrong1(true);
        }

    }
    /* end guessing states and answers for first safe - 5 numbers */

    /* FINAL - guessing states and answers for 2nd safe - 5 numbers */
    const [guess2,setGuess2] = useState({'numbers':''});
    const [haveGuessed2,setHaveGuessed2] = useState();
    const [isWrong2, setIsWrong2] = useState(true);

    const answer2 = {'numbers':'3687'};
    /*useEffect(() => {
        console.log("***useEffect***: guess2.numbers: " + guess2.numbers);
    })*/
    function setGuess2Numbers(guess) {
        var x = guess;
        console.log("guess2 x: " + x);
        let guessObject = {"numbers":x};
        setGuess2(guessObject);
        //check if guess is right
        if (shallowEqual(x,answer2.numbers)) {
            setHaveGuessed2(true);
            setIsWrong2(false);
            /* completing stop 1 */
            console.log("stop 1 win game");
            setStopClock(true);
            winGameFunction();
        } else {
            console.log("wrong guess");
            setHaveGuessed2(true);
            setIsWrong2(true);
        }

    }
    /* end guessing states and answers for 2nd safe - 5 numbers */

    /* sign is hanging */
    const [isSignVisible, setIsSignVisible] = useState(false);
    function toggleSign() {
        isSignVisible ? setIsSignVisible(false) : setIsSignVisible(true);
    }
    /* need to click on safe */
    const [isSafeInfoVisible, setIsSafeInfoVisible] = useState(false);
    function toggleSafeInfo() {
        isSafeInfoVisible ? setIsSafeInfoVisible(false) : setIsSafeInfoVisible(true);
    }

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

    /* END STOP 1 */


    /* STOP 2 */
    /* guessing states and answers for first safe - 6 letters - trying to find order of letters*/
    const [guess1Stop2,setGuess1Stop2] = useState({'answer':''});
    const [haveGuessed1Stop2,setHaveGuessed1Stop2] = useState();
    const [isWrong1Stop2, setIsWrong1Stop2] = useState(true);
    const answer1Stop2 = {'answer':'RAVERS'};
    /*useEffect(() => {
        console.log("***useEffect***: guess1Stop2.answer: " + guess1Stop2.answer);
    });*/
    function setGuess1Stop2Function(guess) {
        var x = guess;
        console.log("guess1 x: " + x);
        let guessObject = {"answer":x};
        setGuess1Stop2(guessObject);
        //check if guess is right
        if (shallowEqual(x,answer1Stop2.answer)) {
            setHaveGuessed1Stop2(true);
            setIsWrong1Stop2(false);
        } else {
            console.log("wrong guess");
            setHaveGuessed1Stop2(true);
            setIsWrong1Stop2(true);
        }

    }
    /* end guessing states and answers for first safe - 5 numbers */

    /* FINAL - guessing states and answers for 2nd safe - 4 numbers (adding stuff from signs) */
    const [guess2Stop2,setGuess2Stop2] = useState({'answer':''});
    const [haveGuessed2Stop2,setHaveGuessed2Stop2] = useState();
    const [isWrong2Stop2, setIsWrong2Stop2] = useState(true);

    const answer2Stop2 = {'answer':'1921'};
    /*useEffect(() => {
        console.log("***useEffect***: guess2Stop2.answer: " + guess2.answer);
    })*/
    function setGuess2Stop2Function(guess) {
        var x = guess;
        console.log("guess2 x: " + x);
        let guessObject = {"answer":x};
        setGuess2Stop2(guessObject);
        //check if guess is right
        if (shallowEqual(x,answer2Stop2.answer)) {
            setHaveGuessed2Stop2(true);
            setIsWrong2Stop2(false);
        } else {
            console.log("wrong guess");
            setHaveGuessed2Stop2(true);
            setIsWrong2Stop2(true);
        }
    }
    /* end guessing states and answers for 2nd safe - 4 numbers */

    /* open bush to show keyhole */
    const [isRightBushOpen, setIsRightBushOpen] = useState(false);
    function toggleRightBush() {
        isRightBushOpen ? setIsRightBushOpen(false) : setIsRightBushOpen(true);
    }
    /* open  bush to see safe */
    const [isLeftBushOpen, setIsLeftBushOpen] = useState(false);
    function toggleLeftBush() {
        isLeftBushOpen ? setIsLeftBushOpen(false) : setIsLeftBushOpen(true);
    }
    /* sign has 6 boards with references to signs about girlscouts on path leading to gazebo */
    const [isSignStop2Visible, setIsSignStop2Visible] = useState(false);
    function toggleSignStop2() {
        isSignStop2Visible ? setIsSignStop2Visible(false) : setIsSignStop2Visible(true);
    }
    /* bench has # references to signs about girlscouts on path leading to gazebo */
    const [isBenchVisible, setIsBenchVisible] = useState(false);
    function toggleBench() {
        isBenchVisible ? setIsBenchVisible(false) : setIsBenchVisible(true);
    }
    /* open safe window with note */
    const [isSafeInfoStop2Visible, setIsSafeInfoStop2Visible] = useState(false);
    function toggleSafeInfoStop2() {
        isSafeInfoStop2Visible ? setIsSafeInfoStop2Visible(false) : setIsSafeInfoStop2Visible(true);
    }
   /* useEffect(() => {
        console.log("***useEffect***: isSafeInfoStop2Visible: " + isSafeInfoStop2Visible);
    });*/

    /* use key in key hole */
    const [isKeyUsed, setIsKeyUsed] = useState(false);
    function toggleUseKey() {
        isKeyUsed ? setIsKeyUsed(false) : setIsKeyUsed(true);
        /* completing stop 2 */
        console.log("stop 2 win game");
        setStopClock(true);
        winGameFunction();
    }
    /* move on to next stop */
    const [isSandbagMessageVisible, setIsSandbagMessageVisible] = useState(false);
    function toggleSandbagMessages() {
        isSandbagMessageVisible ? setIsSandbagMessageVisible(false) : setIsSandbagMessageVisible(true);
    }
    /* End Stop 2 */

    /* Stop 3 */

    /* guessing states and answers for first safe - a number - trying to find total number of green rungs in exercise area */
    const [guess1Stop3,setGuess1Stop3] = useState({'answer':''});
    const [haveGuessed1Stop3,setHaveGuessed1Stop3] = useState();
    const [isWrong1Stop3, setIsWrong1Stop3] = useState(true);
    const answer1Stop3 = {'answer':'33'};
    /*useEffect(() => {
        console.log("***useEffect***: guess1Stop2.answer: " + guess1Stop2.answer);
    });*/
    function setGuess1Stop3Function(guess) {
        var x = guess;
        console.log("guess1 x: " + x);
        let guessObject = {"answer":x};
        setGuess1Stop3(guessObject);
        //check if guess is right
        if (shallowEqual(x,answer1Stop3.answer)) {
            setHaveGuessed1Stop3(true);
            setIsWrong1Stop3(false);
            console.log("stop 3 win game");
            setStopClock(true);
            winGameFunction();
        } else {
            console.log("wrong guess");
            setHaveGuessed1Stop3(true);
            setIsWrong1Stop3(true);
        }

    }
    /* end guessing states and answers for first safe - 5 numbers */

    /* sign has has encrypted info to help solve encrypted clue */
    const [isSignStop3Visible, setIsSignStop3Visible] = useState(false);
    function toggleSignStop3() {
        isSignStop3Visible ? setIsSignStop3Visible(false) : setIsSignStop3Visible(true);
    }

    /* open safe by tree with note */
    const [isSafeInfoStop3Visible, setIsSafeInfoStop3Visible] = useState(false);
    function toggleSafeInfoStop3() {
        isSafeInfoStop3Visible ? setIsSafeInfoStop3Visible(false) : setIsSafeInfoStop3Visible(true);
    }

    /* use shovel on dirt */
    const [isShovelUsed, setIsShovelUsed] = useState(false);
    function toggleUseShovel() {
        isShovelUsed ? setIsShovelUsed(false) : setIsShovelUsed(true);
        /* completing stop 2 */
        setStopClock(true);
    }
    /* move on to next stop */
    const [isSandbagMessageStop3Visible, setIsSandbagMessageStop3Visible] = useState(false);
    function toggleSandbagStop3Messages() {
        isSandbagMessageStop3Visible ? setIsSandbagMessageStop3Visible(false) : setIsSandbagMessageStop3Visible(true);
    }
    /* end Stop 3 */

    /* Stop 4 */

    /* guessing states and answers for first safe - number - math: # barracks + #closest hole #men */
    const [guess1Stop4,setGuess1Stop4] = useState({'answer':''});
    const [haveGuessed1Stop4,setHaveGuessed1Stop4] = useState();
    const [isWrong1Stop4, setIsWrong1Stop4] = useState(true);
    const answer1Stop4 = {'answer':'118'};
    /*useEffect(() => {
        console.log("***useEffect***: guess1Stop2.answer: " + guess1Stop2.answer);
    });*/
    function setGuess1Stop4Function(guess) {
        var x = guess;
        console.log("guess1 x: " + x);
        let guessObject = {"answer":x};
        setGuess1Stop4(guessObject);
        //check if guess is right
        if (shallowEqual(x,answer1Stop4.answer)) {
            setHaveGuessed1Stop4(true);
            setIsWrong1Stop4(false);
        } else {
            console.log("wrong guess");
            setHaveGuessed1Stop4(true);
            setIsWrong1Stop4(true);
        }

    }
    /* end guessing  */

    /* guessing answers for 2nd: northeastwestnorthsouth (old barracks (northeast), new barracks (west), lighthouse (north), guardhouse (south) */
    const [guess2Stop4,setGuess2Stop4] = useState({'answer':''});
    const [haveGuessed2Stop4,setHaveGuessed2Stop4] = useState();
    const [isWrong2Stop4, setIsWrong2Stop4] = useState(true);
    const answer2Stop4 = {'answer':'northeastwestnorthsouth'};
    /*useEffect(() => {
        console.log("***useEffect***: guess2Stop2.answer: " + guess2Stop2.answer);
    });*/
    function setGuess2Stop4Function(guess) {
        var x = guess;
        console.log("guess2 x: " + x);
        let guessObject = {"answer":x};
        setGuess2Stop4(guessObject);
        //check if guess is right
        if (shallowEqual(x,answer2Stop4.answer)) {
            setHaveGuessed2Stop4(true);
            setIsWrong2Stop4(false);
        } else {
            console.log("wrong guess");
            setHaveGuessed2Stop4(true);
            setIsWrong2Stop4(true);
        }

    }
    /* end guessing  */
    /* guessing answers for 3rd: order of when built
    2: remainingbarrack
    1: tybeeartscenter
    5: electricity at barrack
    4: lavatories at barrack
    3: bridge
    -> not a spinner? - pictures of each with numbers?*/
    const [guess3Stop4,setGuess3Stop4] = useState({'answer':''});
    const [haveGuessed3Stop4,setHaveGuessed3Stop4] = useState();
    const [isWrong3Stop4, setIsWrong3Stop4] = useState(true);
    const answer3Stop4 = {'answer':'21543'};
    /*useEffect(() => {
        console.log("***useEffect***: guess2Stop2.answer: " + guess2Stop2.answer);
    });*/
    function setGuess3Stop4Function(guess) {
        var x = guess;
        console.log("guess2 x: " + x);
        let guessObject = {"answer":x};
        setGuess3Stop4(guessObject);
        //check if guess is right
        if (shallowEqual(x,answer3Stop4.answer)) {
            setHaveGuessed3Stop4(true);
            setIsWrong3Stop4(false);
        } else {
            console.log("wrong guess");
            setHaveGuessed3Stop4(true);
            setIsWrong3Stop4(true);
        }

    }
    /* end guessing  */

    /* sign is bridge with build order */
    const [isSignStop4Visible, setIsSignStop4Visible] = useState(false);
    function toggleSignStop4() {
        isSignStop4Visible ? setIsSignStop4Visible(false) : setIsSignStop4Visible(true);
    }

    /* open safe by disc golf hole */
    const [isSafeInfoStop4Visible, setIsSafeInfoStop4Visible] = useState(false);
    function toggleSafeInfoStop4() {
        isSafeInfoStop4Visible ? setIsSafeInfoStop4Visible(false) : setIsSafeInfoStop4Visible(true);
    }

    /* use key2 on bridge - round key*/
    const [isKey2Used, setIsKey2Used] = useState(false);
    function toggleUseKey2() {
        isKey2Used ? setIsKey2Used(false) : setIsKey2Used(true);
        console.log("stop 4 win game");
        setStopClock(true);
        setGameComplete(true);
        winGameFunction();
    }
    /* win! */
    const [isSandbagMessageStop4Visible, setIsSandbagMessageStop4Visible] = useState(false);
    function toggleSandbagStop4Messages() {
        isSandbagMessageStop4Visible ? setIsSandbagMessageStop4Visible(false) : setIsSandbagMessageStop4Visible(true);
    }
    /* end Stop 3 */

    /* backpack functions */
    /* backpack items: prybar */
    function toggleBackpack() {
        isBackpackVisible ? setIsBackpackVisible(false) : setIsBackpackVisible(true);
    }
    /* Stop 4 */
    /* key is used to open bridge and display flying boat */
    const [isKey2On, setIsKey2On] = useState(false);
    /* remove key from window and put in backpack */
    const [isKey2Visible, setIsKey2Visible] = useState(true);
    function key2Function() {
        setIsKey2Visible(false);
        console.log("put key2 in backpack");
        localStorage.setItem("key2", "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/key-not-using.png");
        /* check if there */
        if (gameBackpack.length > 0) {
            for (var i = 0; i < gameBackpack.length; i++) {
                var bptest = true;
                if (gameBackpack[i].key === "key2") {
                    console.log("key2 is already there");
                    bptest = false;
                }
            }
            if (bptest === true) {
                console.log("push key2 to backpack");
                gameBackpack.push({
                    src: 'https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/key-not-using.png',
                    key: 'key2'
                })
            }
        } else {
            console.log("push key to backpack");
            gameBackpack.push({
                src: 'https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/key-not-using.png',
                key: 'key2'
            })
        }
        setGameBackpackHasItems( true);
    }

    /* Stop 3 */
    const [isShovelOn, setIsShovelOn] = useState(false);
    /*useEffect(() => {
        console.log("***useEffect***: isShovelOn: " + isShovelOn);
    });*/
    const [isShovelVisible, setIsShovelVisible] = useState(true)
    function shovel() {
        setIsShovelVisible(false);
        console.log("put shovel in backpack");
        localStorage.setItem("shovel", "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/shovel-not-using.png");
        /* check if there */
        if (gameBackpack.length > 0) {
            for (var i = 0; i < gameBackpack.length; i++) {
                var bptest = true;
                if (gameBackpack[i].key === "shovel") {
                    console.log("shovel is already there");
                    bptest = false;
                }
            }
            if (bptest === true) {
                console.log("push shovel to backpack");
                gameBackpack.push({
                    src: 'https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/shovel-not-using.png',
                    key: 'shovel'
                })
            }
        } else {
            console.log("push shovel to backpack");
            gameBackpack.push({
                src: 'https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/shovel-not-using.png',
                key: 'shovel'
            })
        }
        setGameBackpackHasItems( true);
    }
    /* Stop 1 */
    const [isPrybarOn, setIsPrybarOn] = useState(false);
    /*useEffect(() => {
        console.log("***useEffect***: isPrybarOn: " + isPrybarOn);
    });*/
    const [isPrybarVisible, setIsPrybarVisible] = useState(true)
    function pryBar() {
        setIsPrybarVisible(false);
        console.log("put prybar in backpack");
        localStorage.setItem("prybar", "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/prybar-not-using.png");
        /* check if there */
        if (gameBackpack.length > 0) {
            for (var i = 0; i < gameBackpack.length; i++) {
                var bptest = true;
                if (gameBackpack[i].key === "prybar") {
                    console.log("prybar is already there");
                    bptest = false;
                }
            }
            if (bptest === true) {
                console.log("push prybar to backpack");
                gameBackpack.push({
                    src: 'https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/prybar-not-using.png',
                    key: 'prybar'
                })
            }
        } else {
            console.log("push prybar to backpack");
            gameBackpack.push({
                src: 'https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/prybar-not-using.png',
                key: 'prybar'
            })
        }
        setGameBackpackHasItems( true);
    }
    /* Stop 2 */
    /* key is used to open sandbag vault */
    const [isKeyOn, setIsKeyOn] = useState(false);
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

    /*useEffect(() => {
        console.log("***useEffect***: gameBackpack: " + gameBackpack);
        for (const key in gameBackpack) {
            console.log(`${key}: ${gameBackpack[key]}`);
            for (const key1 in gameBackpack[key]) {
                console.log(`${key1}: ${gameBackpack[key][key1]}`);
            }
        }
    });*/

    function showItemContents(value) {
        console.log("show contents value: " + value);
        switch (value) {
            case 'shovel':
                console.log("isShovelOn 1: " + isShovelOn);
                setIsShovelOn(!isShovelOn);
                // change image
                for (var i = 0; i < gameBackpack.length; i++) {
                    if (gameBackpack[i].key === "shovel") {
                        console.log("turn on/off shovel - state");
                        if (!isPrybarOn) {
                            gameBackpack[i].src = "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/shovel-using.png"
                            localStorage.setItem("shovel", "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/shovel-using.png");
                        } else {
                            gameBackpack[i].src = "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/shovel-not-using.png"
                            localStorage.setItem("shovel", "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/shovel-not-using.png");
                        }
                    }
                }
                break;
            case 'prybar':
                console.log("isPrybarOn 1: " + isPrybarOn);
                setIsPrybarOn(!isPrybarOn);
                // change image
                for (var i = 0; i < gameBackpack.length; i++) {
                    if (gameBackpack[i].key === "prybar") {
                        console.log("turn on/off prybar - state");
                        if (!isPrybarOn) {
                            gameBackpack[i].src = "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/prybar-using.png"
                            localStorage.setItem("prybar", "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/prybar-using.png");
                        } else {
                            gameBackpack[i].src = "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/prybar-not-using.png"
                            localStorage.setItem("prybar", "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/prybar-not-using.png");
                        }
                    }
                }
                break;
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
            case 'key2':
                console.log("isKey2On 1: " + isKeyOn);
                setIsKey2On(!isKey2On);
                // change image
                for (var i = 0; i < gameBackpack.length; i++) {
                    if (gameBackpack[i].key2 === "key2") {
                        console.log("turn on/off key2 - state");
                        if (!isKey2On) {
                            gameBackpack[i].src = "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/key-using.png"
                            localStorage.setItem("key2", "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/key-using.png");
                        } else {
                            gameBackpack[i].src = "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/key-not-using.png"
                            localStorage.setItem("key2", "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/key-not-using.png");
                        }
                    }
                }
                break;
            default:
        }
    }

    /* stop 1 - game specific */
    if (gameStop == 1) {
        return (
            <View
                ariaLabel="Main Container"
                position="relative">
                <View
                    className="image-holder image-short"
                    ariaLabel="Image Holder"
                    backgroundImage="url('https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/background-jaycee-shelter.jpg')">
                    {/* all games */}
                    <View
                        className="z-index102 info-button"
                        ariaLabel="Info Button"
                        onClick={() => toggleHelp()}>
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/help.png"/>
                    </View>
                    <View
                        className="z-index102 notes-button"
                        ariaLabel="Notes Button"
                        onClick={() => toggleNotes()}>
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/notes.png"/>
                    </View>
                    <View
                        className="z-index102 backpack-image"
                        ariaLabel="backpack Image"
                        onClick={() => toggleBackpack()}>
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/backpack-new.png"/>
                    </View>
                    <View
                        className={isBackpackVisible ? "all-screen zIndex103 show" : "all-screen hide"}>
                        <Button className="close-button" onClick={() => toggleBackpack()}>X</Button>
                        <h3>Backpack Contents</h3><br/>
                        {gameBackpack.map((item) => {
                            return (
                                <div className="wp-block-columns" key={item.key}>
                                    <div className="wp-block-column">
                                        <Image alt={item.src} onClick={() => showItemContents(item.key)}
                                               className={item.key} src={item.src}/>
                                    </div>
                                </div>
                            )
                        })}
                    </View>
                    <NotesOpen areNotesVisible={areNotesVisible} toggleNotes={toggleNotes} gameNotes={gameNotes}
                               setNotesFunction={setNotesFunction}/>

                    {/* end all games */}

                    <View
                        ariaLabel="Hanging Sign"
                        className="hanging-sign"
                        onClick={() => toggleSign()}>
                        <Image
                            src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/hanging-sign.png"/>
                    </View>

                    <View
                        ariaLabel="left picnic table"
                        className="left-picnic-table"
                    >
                        <Image
                            src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/left-picnic-table.png"/>
                    </View>
                    <View
                        ariaLabel="right picnic table"
                        className="right-picnic-table"
                    >
                        <Image
                            src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/right-picnic-table.png"/>
                    </View>
                    <View
                        ariaLabel="Safe Shelter"
                        className="safe-shelter"
                        onClick={() => toggleSafeInfo()}>
                        <Image
                            src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/safe-shelter.png"/>
                    </View>
                    <View className={isPrybarOn && !isCementSafeOpen && isWrong2 ? "cement-safe show" : "hide"}
                          onClick={() => toggleCementSafe()}>
                        <Image className="test" alt="test"
                               src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/03/cementsafe1.png"/>
                    </View>
                    <View className={!isPrybarOn ? "cement-safe show" : "hide"}>
                        <Image className="test" alt="test"
                               src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/03/cementsafe1.png"/>
                    </View>
                    <View className={isCementSafeOpen && isWrong2 ? "cement-safe show" : "hide"}
                          onClick={() => toggleCementSafeInfo()}>
                        <Image className="test" alt="test"
                               src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/03/cementsafeopen.png"/>
                    </View>
                    <View className={!isWrong2 ? "cement-safe show" : "hide"}>
                        <Image className="test" alt="test"
                               src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/03/cementsafeopensandbags.png"/>
                    </View>
                </View>
                <View
                    ariaLabel="stop 1 - sign info"
                    className={isSignVisible ? "all-screen show" : "hide"}>
                    <Button className="close-button" onClick={() => toggleSign()}>X</Button>
                    <br/><h3>Hanging Sign Says:</h3>
                    <br/>
                    <div>I am an odd number. Take away a letter and I become even.</div>
                </View>
                <View className={isSafeInfoVisible ? "all-screen show" : "hide"}>
                    <Button className="close-button" onClick={()=>toggleSafeInfo()}>X</Button>
                    <TextField
                        label="Try to Open Safe! (5 numbers)"
                        value={guess1.numbers}
                        onChange={(e) => setGuess1Numbers(e.currentTarget.value)}/>
                    {
                        haveGuessed1 && isWrong1 ? (
                            <span className="red"> Wrong Answer!</span>
                        ) : null
                    }

                    {!isWrong1 && haveGuessed1 ? (
                        <View>
                            <span className="right"> Right Answer!</span><br/>
                            <View className={isPrybarVisible ? "show" : "hide"}
                                  onClick={pryBar}>
                                <Image className="test"
                                       src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/03/prybar.png"/>
                            </View>
                        </View>
                    ) : (
                        <div>
                            <br/><h3>Note Under Safe Says:</h3>
                            As I sit here under <span className="bold-underline">this sign <span
                            className="small">(#?)</span></span>,<br/>
                            I look South and see something near with <span
                            className="bold-underline">vertical slots <span className="small">(#?)</span></span> that
                            align,<br/>
                            I also see on the screen <span className="bold-underline">discs <span
                            className="small">(#?)</span></span>, <span className="bold-underline">balls <span
                            className="small">(#?)</span></span>,
                            and <span className="bold-underline">water bottles <span
                            className="small">(#?)</span></span> and count in record time.
                        </div>
                    )}
                </View>
                <View className={isCementSafeInfoVisible ? "all-screen show" : "hide"}>
                    <Button className="close-button" onClick={() => toggleCementSafeInfo()}>X</Button>

                    <TextField
                        label="Try to Open Floor Safe! (4 numbers)"
                        value={guess2.numbers}
                        onChange={(e) => setGuess2Numbers(e.currentTarget.value)}/>
                    {
                        haveGuessed2 && isWrong2 ? (
                            <span className="red"> Wrong Answer!</span>
                        ) : null
                    }

                    {!isWrong2 && haveGuessed2 ? (
                        <View>
                            <span className="right"> Right Answer!</span><br/>

                        </View>
                    ) : (
                        <Image className="test"
                               src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/03/codeforcement.png"/>
                    )}
                </View>
                {(!isWrong1 && !isWrong2) ?
                    (
                        <View ariaLabel="Stop 1 Winner" className="winner">
                            <h3>Good Job on Finding Sandbags!</h3>
                            But you need more.<br/>
                            Next stop is at Jaycee Park Gazebo - maybe you can find some there.<br/><br/>
                            <Button className="button" onClick={() => goToStop()}>Click here for picture of stop
                                2</Button>
                        </View>
                    ) : null}


                <View ariaLabel="stop 1 help" className={isHelpVisible ? "all-screen show" : "all-screen hide"}>
                    <Button className="close-button" onClick={() => toggleHelp()}>X</Button>
                    <View width="100%" padding="10px">
                        <View paddingBottom="10px">
                            <strong>Game Stop</strong>: <span className="font-small">{gameStop}</span>
                        </View>
                        <View paddingBottom="10px">
                            <strong>How to Play:</strong> Click around - some items will disappear and then appear in
                            your backpack. If it is in your backpack you may be able to use it by clicking on it.
                        </View>
                        <View paddingBottom="10px">
                            <strong>Goal for this stop:</strong> Find the Discs! Use Hints if you really need them.
                        </View>
                        <Button className="button small" onClick={() => toggleHint3()}>Open Hint (this sign)</Button>
                        <Button className="button small" onClick={() => toggleHint1()}>Open Hint (vertical slots)</Button>
                        <Button className="button small" onClick={() => toggleHint2()}>Open Hint (discs, water bottles, balls)</Button>
                        <Button className="button small" onClick={() => toggleHint4()}>Open Hint (#slides, #swings, etc)</Button>

                        <br/><br/>
                        <div className={isHint4Visible ? "all-screen show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint4()}>X</Button>
                            <strong>#slides, #swings, etc</strong>
                            <br/><br/>These things are all around - you can see them - count the swings and slides in playground, count the
                            windows on the building that has the bathrooms, and get number of closest disc golf hole to the shelter.
                            <br/><br/>

                        </div>
                        <div className={isHint3Visible ? "all-screen show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint3()}>X</Button>
                            <strong>this sign:</strong>
                            <br/><br/>It's a riddle but think about how you spell the odd number. It's spelling not math.
                            <br/><br/>

                        </div>
                        <div className={isHint2Visible ? "all-screen show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint2()}>X</Button>
                            <strong>discs, water bottles, balls:</strong> <br/><br/>
                            These items are ONLY on the game screen - count them there.

                        </div>
                        <div className={isHint1Visible ? "all-screen show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint1()}>X</Button>
                            <strong>Vertical Slots:</strong> <br/><br/>
                            There is a grill to the south (in direction of parking lot) it has slots on the sides:
                            <Image className="test" alt="test" src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/slot-pic.jpg"/>


                        </div>
                        <Button className="button small" onClick={() => toggleHelp()}>Close Help and
                        Play</Button>
                    </View>
                </View>
                <View
                    ariaLabel="stop 1 intro"
                    textAlign="center"
                    className={isIntroVisible ? "all-screen show" : "hide"}>
                    <h3>Game Goals: Find Sandbags!</h3>
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
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </SelectField>
                    {localStorage.getItem("numberOfTimes") !== null && localStorage.getItem("numberOfTimes") != 0 ? (
                        <div> You have played {localStorage.getItem("numberOfTimes")} time(s) before - good luck this
                            time! </div>
                    ) : null}
                    <h4>Start Playing Game When You are Here:</h4>
                    <View>
                        <Image maxHeight="150px"
                               src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/game-picture-jaycee-shelter.jpg"/>
                    </View>
                    <View>
                    <span ariaLabel="stop 1 intro" className="small"> <strong>Remember, clock doesn't stop until you complete the stop.</strong></span></View>
                    <Button className="button" onClick={() => toggleIntro()}>I Want To Play!</Button>
                    |
                    <Button className="button" onClick={() => goHomeQuit()}>Back Home</Button>
                </View>

                <View ariaLabel="stop 1 Time" className="time">
                    <Button className="hide button small" onClick={() => completeStop()}>complete stop (REMOVE)</Button>
                    <span className="small">hint time: {gameTimeHint} mins | real time: {gameTime} mins |
                        tot: time: { Number((gameTime + gameTimeHint + gameTimeTotal).toFixed(2))} min</span>
                </View>
            </View>
        )
    } else if (gameStop == 2) {
        return (
            <View
                ariaLabel="Main Container"
                position="relative">
                <View
                    className="image-holder image-short"
                    ariaLabel="Image Holder"
                    backgroundImage = "url('https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/background-game-jaycee-gazebo.jpg')">
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
                    {
                        !isLeftBushOpen  ? (
                            <View
                                ariaLabel="left bush"
                                className="left-bush"
                                onClick={()=>toggleLeftBush()}>
                                <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/bush-left.png" />
                            </View>
                        ) : (
                            <View
                                ariaLabel="left bush"
                                className="left-bush"
                                onClick={()=>toggleSafeInfoStop2()}>
                                <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/bush-open-left.png" />
                            </View>
                        )
                    }
                    {
                        !isRightBushOpen? (
                            <View
                                ariaLabel="right bush"
                                className="right-bush"
                                onClick={()=>toggleRightBush()}>
                                <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/bush-right.png" />
                            </View>
                        ) : (
                            <View>
                                <View
                                    ariaLabel="right bush"
                                    className={!isKeyOn ? "right-bush show" : "hide"}
                                    onClick={()=>toggleRightBush()}>
                                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/bush-open-right.png" />
                                </View>
                                <View
                                    ariaLabel="right bush"
                                    className={isKeyOn ? "right-bush show" : "hide"}
                                    onClick={()=>toggleUseKey()}>
                                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/bush-open-right.png" />
                                </View>
                            </View>
                        )
                    }
                    <View
                        ariaLabel="stop2 - words on string"
                        className="words-on-string"
                        onClick={()=>toggleSignStop2()}>
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/words-small.png" />
                    </View>
                    <View
                        ariaLabel="bench"
                        className="bench"
                        onClick={()=>toggleBench()}>
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/bench.png" />
                    </View>
                    <View
                        ariaLabel="stop2 - sign info"
                        className={isSignStop2Visible ? "all-screen show" : "hide"}>
                        <Button className="close-button" onClick={()=>toggleSignStop2()}>X</Button>
                        <br /><h3>What Order for Letters in Words On Panels?</h3>
                        <br />
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/words-big.png" />
                    </View>
                    <View
                        ariaLabel="bench info"
                        className={isBenchVisible ? "all-screen show" : "hide"}>
                        <Button className="close-button" onClick={()=>toggleBench()}>X</Button>
                        <br /><h3>Add these numbers (use 4 digit YEAR for DOB):</h3>
                        <br />
                        <Image src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/03/piece-of-floor-big.png" />
                    </View>
                    {(isKeyOn && isKeyUsed && !isWrong2Stop2 && !isWrong1Stop2)?
                        (
                            <View className="winner">
                                <h3>Good Job on Finding Sandbags!</h3>
                                You will need to find some way to transport these sandbags!
                                <br /><br />
                                Next stop is at the Exercise Area<br /><br />
                                <Button className="button" onClick={() => goToStop()}>Click here for picture of stop
                                    3</Button>
                            </View>
                        ): null }

                    <View className={isKeyOn && isKeyUsed && !isWrong2Stop2 && !isWrong1Stop2? "cement-safe show" : "hide"}
                          onClick={()=>toggleSandbagMessages()}>
                        <Image className="test" alt="test" src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/03/sandbags2.png" />
                    </View>
                </View>
                <View ariaLabel="Stop2 - safe" className={isSafeInfoStop2Visible ? "all-screen show" : "hide"}>
                    <Button className="close-button" onClick={()=>toggleSafeInfoStop2()}>X</Button>
                    <h3>Try to Open Safe</h3>
                    <TextField
                        label="6 Letters"
                        value={guess1Stop2.answer}
                        onChange={(e) => setGuess1Stop2Function(e.currentTarget.value)}/>
                    {
                        haveGuessed1Stop2 && isWrong1Stop2  ? (
                            <span className="red"> Wrong Answer!</span>
                        ) : null
                    }
                    {
                        !isWrong1Stop2  ? (
                            <span  className="right"> Right Answer!</span>
                        ) : null
                    }
                    <TextField
                        label="4 numbers"
                        value={guess2Stop2.answer}
                        onChange={(e) => setGuess2Stop2Function(e.currentTarget.value)}/>
                    {
                        haveGuessed2Stop2 && isWrong2Stop2 ? (
                            <span className="red"> This is wrong.</span>
                        ) : null
                    }
                    {
                        !isWrong2Stop2  ? (
                            <span  className="right"> Right Answer!</span>
                        ) : null
                    }
                    { !isWrong1Stop2 && !isWrong2Stop2 && haveGuessed1Stop2 && haveGuessed2Stop2  ? (
                        <View>
                            <View  className={isKeyVisible ? "show" : "hide"}
                                   onClick={keyFunction}>
                                <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/key.png" />
                            </View>
                        </View>
                    ) : (
                        <div>
                            <br /><h3>Note Under Safe Says:</h3>
                            There are Letters on a String...<br />
                            And you should ADD NUMBERS on Bench Thing.
                        </div>
                    )}
                </View>

                <View ariaLabel="Stop 2 Sandbag Message" className={isSandbagMessageVisible ? "all-screen show" : "hide"}>
                    <Button className="close-button" onClick={()=>toggleSandbagMessages()}>X</Button>
                    <h3>Good Job on Finding Sandbags!</h3>
                    <br />
                    You will need to find some way to transport these sandbags!
                    <br /><br />
                    Next stop is at the Exercise Areay<br /><br />
                    <Button className="button">Click here for picture of stop 3</Button>
                </View>

                <View ariaLabel="time stop 2" className="time"> <Button className="hide button small" onClick={() => completeStop()}>complete stop (REMOVE)</Button>
                    <span className="small">hint time: {gameTimeHint} mins | real time: {gameTime} mins |
                        tot: time: { Number((gameTime + gameTimeHint + gameTimeTotal).toFixed(2))} min</span>
                </View>
                <View ariaLabel="stop 2 help" className={isHelpVisible ? "all-screen show" : "all-screen hide"}>
                    <Button className="close-button" onClick={() => toggleHelp()}>X</Button>
                    <View width="100%" padding="10px">
                        <View paddingBottom="10px">
                            <strong>Game Stop</strong>: <span className="font-small">{gameStop} (stop 2)</span><br />
                        </View>
                        <View paddingBottom="10px">
                            <strong>How to Play:</strong> Click around - some items will disappear and then appear in your backpack.  If it is in your backpack you may be able to use it by clicking on it.
                        </View>
                        <View paddingBottom="10px">
                            <strong>Goal for this stop:</strong> Find the Discs!  Use Hints if you really need them.
                        </View>
                        <Button className="button small" onClick={() => toggleHint3()}>Open Hint (words on panels)</Button>
                        <Button className="button small" onClick={() => toggleHint4()}>Open Hint (matthews DOB)</Button>
                        <Button className="button small" onClick={() => toggleHint2()}>Open Hint (First Girl Scout Troop Here)</Button>
                        <Button className="button small" onClick={() => toggleHint1()}>Open Hint (infantry that erected girl scout hut)</Button>

                        <br /><br />
                        <div className={isHint4Visible ? "all-screen show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint4()}>X</Button>
                            <strong>Hint for Matthews DOB:</strong>
                            <br /><br />Go to the
                            historical signs at the path turn-off for the gazebo.  Look at the sign that has
                            a picture of General George C. Marshall and his wife Katherine at the top. Note the General Information for
                            Mrs. Frederick S. Matthews.
                            <br /><br />

                        </div>
                        <div className={isHint3Visible ? "all-screen show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint3()}>X</Button>
                            <strong>Hint for Words on Panel:</strong>
                            <br /><br />Get the Order of Words from the top of sign with "Regular Army Values the Girl Scouts". Use the
                            bolded, capitals.
                            <br /><br />

                        </div>
                        <div className={isHint2Visible ? "all-screen show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint2()}>X</Button>
                            <strong>Hint for First Girl Scout Troop Here:</strong> <br /><br />
                            Go to the
                            historical signs at the path turn-off for the gazebo. The signs often mention what Troop # is the first Tybee Island based troop.

                        </div>
                        <div className={isHint1Visible ? "all-screen show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint1()}>X</Button>
                            <strong>Hint for Infantry that erected girl scout hut:</strong> <br /><br />
                            Go to the
                            historical signs at the path turn-off for the gazebo.  Look closely at the picture with title "Regular Army Values the Girl Scouts".<br /><br />

                        </div>
                        <Button className="button small" onClick={() => toggleHelp()}>Close Help and Play</Button>
                    </View>
                </View>
                {/* doesn't need number of players */}
                <View
                    ariaLabel="stop 2 intro"
                    textAlign="center"
                    className={isIntroVisible ? "all-screen show" : "hide"}>
                    <h3>Game Goals: Find Sandbags!</h3>
                    <h4>Start Playing Game When You are Here:</h4>
                    <View>
                        <Image maxHeight="150px" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/background-game-jaycee-gazebo.jpg" />
                    </View>
                    <View>
                        <span ariaLabel="stop 1 intro" className="small"> <strong>Remember, clock doesn't stop until you complete the stop.</strong></span></View>
                    <View><span className="small"><strong>Total Time So Far</strong>: { Number((gameTime + gameTimeHint + gameTimeTotal).toFixed(2)) } min</span></View>

                        <Button className="button" onClick={() => toggleIntro()}>I Want To Play!</Button>
                </View>
            </View>
        )
    } else if (gameStop == 3) {
        return (
            <View
                ariaLabel="Main Container"
                position="relative">
                <View
                    className="image-holder image-short"
                    ariaLabel="Image Holder"
                    backgroundImage="url('https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/background-game-jaycee-exercise.jpg')">
                    {/* all games */}
                    <View
                        className="z-index102 info-button"
                        ariaLabel="Info Button"
                        onClick={() => toggleHelp()}>
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/help.png"/>
                    </View>
                    <View
                        className="z-index102 notes-button"
                        ariaLabel="Notes Button"
                        onClick={() => toggleNotes()}>
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/notes.png"/>
                    </View>
                    <View
                        className="z-index102 backpack-image"
                        ariaLabel="backpack Image"
                        onClick={() => toggleBackpack()}>
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/backpack-new.png"/>
                    </View>
                    <View
                        className={isBackpackVisible ? "all-screen zIndex103 show" : "all-screen hide"}>
                        <Button className="close-button" onClick={() => toggleBackpack()}>X</Button>
                        <h3>Backpack Contents</h3><br/>
                        {gameBackpack.map((item) => {
                            return (
                                <div className="wp-block-columns" key={item.key}>
                                    <div className="wp-block-column">
                                        <Image alt={item.src} onClick={() => showItemContents(item.key)}
                                               className={item.key} src={item.src}/>
                                    </div>
                                </div>
                            )
                        })}
                    </View>
                    <NotesOpen areNotesVisible={areNotesVisible} toggleNotes={toggleNotes} gameNotes={gameNotes}
                               setNotesFunction={setNotesFunction}/>

                    {/* end all games */}
                </View>
                <View ariaLabel="stop 3 help" className={isHelpVisible ? "all-screen show" : "all-screen hide"}>
                    <Button className="close-button" onClick={() => toggleHelp()}>X</Button>
                    <View width="100%" padding="10px">
                        <View paddingBottom="10px">
                            <strong>Game Stop</strong>: <span className="font-small">{gameStop}</span>
                        </View>
                        <View paddingBottom="10px">
                            <strong>How to Play:</strong> Click around - some items will disappear and then appear in
                            your backpack. If it is in your backpack you may be able to use it by clicking on it.
                        </View>
                        <View paddingBottom="10px">
                            <strong>Goal for this stop:</strong> Find the Discs! Use Hints if you really need them.
                        </View>
                        <Button className="button small" onClick={() => toggleHint3()}>Open Hint (sport)</Button>
                        <Button className="button small" onClick={() => toggleHint4()}>Open Hint (name of
                            field)</Button>
                        <Button className="button small" onClick={() => toggleHint2()}>Open Hint (name of
                            house)</Button>
                        <Button className="button small" onClick={() => toggleHint1()}>Open Hint (engraved on
                            panel)</Button>

                        <br/><br/>
                        <div className={isHint4Visible ? "all-screen show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint4()}>X</Button>
                            <strong>Hint for name of field</strong>
                            <br/><br/>There is a large sign on the fence at the field with the name.
                            <br/><br/>

                        </div>
                        <div className={isHint3Visible ? "all-screen show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint3()}>X</Button>
                            <strong>Hint for Sport:</strong>
                            <br/><br/>People do play soccer and disc golf but the closest field to the shelter is the
                            baseball field.
                            <br/><br/>

                        </div>
                        <div className={isHint2Visible ? "all-screen show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint2()}>X</Button>
                            <strong>Hint for name of house:</strong> <br/><br/>
                            Near the intersection of Solomon and N. Campbell there is a house that people use for
                            events.<br/><br/>
                            Go over there and look for the name.

                        </div>
                        <div className={isHint1Visible ? "all-screen show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint1()}>X</Button>
                            <strong>Hint for engraved on panel:</strong> <br/><br/>
                            The <span className="bold-underline">first</span> is in reference to the first letter of the
                            named field.<br/>
                            <br/>And the pattern continues with name of house and name of sport.<br/>

                        </div>
                        <Button className="button small" onClick={() => toggleHelp()}>Close Help and
                            Play</Button>
                    </View>
                </View>
                <View
                    ariaLabel="stop 3 intro"
                    textAlign="center"
                    className={isIntroVisible ? "all-screen show" : "hide"}>
                    <h3>Game Goals: Find Sandbags!</h3>
                    <h4>Start Playing Game When You are Here:</h4>
                    <View>
                        <Image maxHeight="150px"
                               src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/background-game-jaycee-exercise.jpg"/>
                    </View>
                    <View><span className="small">
                        <strong>Total Time So Far</strong>: { Number((gameTime + gameTimeHint + gameTimeTotal).toFixed(2))} min</span>
                    </View>
                    <Button className="hide button" >I Want To Play!</Button><br />
                    <TextAreaField
                        rows="1"
                        onChange={(e) => setCommentsFunction(e.currentTarget.value)}
                        descriptiveText="Thank you for playing. Please let us know any and all comments you have about the game."
                    />
                    <Button className="button small" onClick={() => goHome()}>Go Home - Game not finished, sorry</Button>
                </View>
                <View ariaLabel="Time - Stop 3" className="time">
                    <Button className="hide button small" onClick={() => completeStop()}>complete stop (REMOVE)</Button>
                    <span className="small">hint time: {gameTimeHint} mins | real time: {gameTime} mins |
                        tot: time: { Number((gameTime + gameTimeHint + gameTimeTotal).toFixed(2))} min</span>
                </View>
                {(isShovelOn && isShovelUsed && !isWrong1Stop3)?
                    (
                        <View className="winner">
                            <h3>Good Job on Finding Sandbags!</h3>
                            You will need to find some way to transport these sandbags!
                            <br /><br />
                            Next stop is at the Exercise Area<br /><br />
                            <Button className="button" onClick={() => goToStop()}>Click here for picture of stop
                                4</Button>
                        </View>
                    ): null }

            </View>
        )
    } else if (gameStop == 4) {
        return (
            <View
                ariaLabel="Main Container"
                position="relative">
                <View
                    className="image-holder image-short"
                    ariaLabel="Image Holder"
                    backgroundImage="url('https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/background-game-jaycee-exercise.jpg')">
                    {/* all games */}
                    <View
                        className="z-index102 info-button"
                        ariaLabel="Info Button"
                        onClick={() => toggleHelp()}>
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/help.png"/>
                    </View>
                    <View
                        className="z-index102 notes-button"
                        ariaLabel="Notes Button"
                        onClick={() => toggleNotes()}>
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/notes.png"/>
                    </View>
                    <View
                        className="z-index102 backpack-image"
                        ariaLabel="backpack Image"
                        onClick={() => toggleBackpack()}>
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/backpack-new.png"/>
                    </View>
                    <View
                        className={isBackpackVisible ? "all-screen zIndex103 show" : "all-screen hide"}>
                        <Button className="close-button" onClick={() => toggleBackpack()}>X</Button>
                        <h3>Backpack Contents</h3><br/>
                        {gameBackpack.map((item) => {
                            return (
                                <div className="wp-block-columns" key={item.key}>
                                    <div className="wp-block-column">
                                        <Image alt={item.src} onClick={() => showItemContents(item.key)}
                                               className={item.key} src={item.src}/>
                                    </div>
                                </div>
                            )
                        })}
                    </View>
                    <NotesOpen areNotesVisible={areNotesVisible} toggleNotes={toggleNotes} gameNotes={gameNotes}
                               setNotesFunction={setNotesFunction}/>

                    {/* end all games */}
                </View>
                <View ariaLabel="stop 4 help" className={isHelpVisible ? "all-screen show" : "all-screen hide"}>
                    <Button className="close-button" onClick={() => toggleHelp()}>X</Button>
                    <View width="100%" padding="10px">
                        <View paddingBottom="10px">
                            <strong>Game Stop</strong>: <span className="font-small">{gameStop}</span>
                        </View>
                        <View paddingBottom="10px">
                            <strong>How to Play:</strong> Click around - some items will disappear and then appear in
                            your backpack. If it is in your backpack you may be able to use it by clicking on it.
                        </View>
                        <View paddingBottom="10px">
                            <strong>Goal for this stop:</strong> Find the Discs! Use Hints if you really need them.
                        </View>
                        <Button className="button small" onClick={() => toggleHint3()}>Open Hint (sport)</Button>
                        <Button className="button small" onClick={() => toggleHint4()}>Open Hint (name of
                            field)</Button>
                        <Button className="button small" onClick={() => toggleHint2()}>Open Hint (name of
                            house)</Button>
                        <Button className="button small" onClick={() => toggleHint1()}>Open Hint (engraved on
                            panel)</Button>

                        <br/><br/>
                        <div className={isHint4Visible ? "all-screen show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint4()}>X</Button>
                            <strong>Hint for name of field</strong>
                            <br/><br/>There is a large sign on the fence at the field with the name.
                            <br/><br/>

                        </div>
                        <div className={isHint3Visible ? "all-screen show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint3()}>X</Button>
                            <strong>Hint for Sport:</strong>
                            <br/><br/>People do play soccer and disc golf but the closest field to the shelter is the
                            baseball field.
                            <br/><br/>

                        </div>
                        <div className={isHint2Visible ? "all-screen show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint2()}>X</Button>
                            <strong>Hint for name of house:</strong> <br/><br/>
                            Near the intersection of Solomon and N. Campbell there is a house that people use for
                            events.<br/><br/>
                            Go over there and look for the name.

                        </div>
                        <div className={isHint1Visible ? "all-screen show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint1()}>X</Button>
                            <strong>Hint for engraved on panel:</strong> <br/><br/>
                            The <span className="bold-underline">first</span> is in reference to the first letter of the
                            named field.<br/>
                            <br/>And the pattern continues with name of house and name of sport.<br/>

                        </div>
                        <Button className="button small" onClick={() => toggleHelp()}>Close Help and
                            Play</Button>
                    </View>
                </View>
                <View
                    ariaLabel="stop 4 intro"
                    textAlign="center"
                    className={isIntroVisible ? "all-screen show" : "hide"}>
                    <h3>Game Goals: Find Sandbags!</h3>
                    <h4>Start Playing Game When You are Here:</h4>
                    <View>
                        <Image maxHeight="150px"
                               src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/background-game-jaycee-exercise.jpg"/>
                    </View>
                    <Button className="button" onClick={() => toggleIntro()}>I Want To Play!</Button>
                </View>
                <View ariaLabel="Time - Stop 4" className="time">
                    <Button className="hide button small" onClick={() => completeStop()}>complete stop (REMOVE)</Button>
                    <span className="small">hint time: {gameTimeHint} mins | real time: {gameTime} mins |
                        tot: time: { Number((gameTime + gameTimeHint + gameTimeTotal).toFixed(2))} min</span>
                </View>
                {(isKey2On && isKey2Used && !isWrong1Stop4 && !isWrong2Stop4 && !isWrong3Stop4)?
                    (
                        <View className="winner">
                            <h3>YOU WIN!!!</h3><br/><br/>
                            <TextAreaField
                                rows="1"
                                onChange={(e) => setCommentsFunction(e.currentTarget.value)}
                                descriptiveText="Thank you for playing. Please let us know any and all comments you have about the game."
                            />
                            <span className="small">hint time: {gameTimeHint} mins | real time: {gameTime} mins |
                        tot: time: { Number((gameTime + gameTimeHint + gameTimeTotal).toFixed(2))} min</span>
                            <Button className="button small" onClick={() => goHome()}>Go Home - Play another Game!</Button>
                        </View>
                    ) : null}

            </View>
        )
    }
}