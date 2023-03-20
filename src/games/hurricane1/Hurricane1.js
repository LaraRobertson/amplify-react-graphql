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
import {gameStatsByUserEmail} from "../../graphql/queries";
import {updateGameStats as updateGameStatsMutation} from "../../graphql/mutations";

export function Hurricane1() {
    /* for all games */
    const [areNotesVisible, setAreNotesVisible] = useState(false);
    const [isHelpVisible, setIsHelpVisible] = useState(false);
    const [gameNotes,setGameNotes] = useState('');
    const [gameComments,setGameComments] = useState('');
    const [gameCommentsOld,setGameCommentsOld] = useState([]);
    const [isBackpackVisible, setIsBackpackVisible] = useState(false);
    const [gameBackpack, setGameBackpack] = useState([]);
    const [gameBackpackHasItems, setGameBackpackHasItems] = useState(false);
    const [gameTime, setGameTime] = useState(0);
    const [gameTimeHint, setGameTimeHint] = useState(0);
    const [gameTimeTotal, setGameTimeTotal] = useState(0);
    const [stopClock, setStopClock] = useState(false);
    const [statsUpdated, setStatsUpdated] = useState(false);
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
        /* check numberOfPlayers */
        if (numberOfPlayers != '') {
            isIntroVisible ? setIsIntroVisible(false) : setIsIntroVisible(true);
            setStopClock(false);
        } else {
            setNumberOfPlayersError("Please choose number of players");
        }

    }
    /* for each extra stop */
    const [solvedStop1, setSolvedStop1] = useState(false);
    const [solvedStop2, setSolvedStop2] = useState(false);
    const [solvedStop3, setSolvedStop3] = useState(false);
    const [isIntroStop2Visible, setIsIntroStop2Visible] = useState(true);
    function toggleIntroStop2() {
            isIntroStop2Visible ? setIsIntroStop2Visible(false) : setIsIntroStop2Visible(true);
            setStopClock(false);
    }
    const [isIntroStop3Visible, setIsIntroStop3Visible] = useState(true);
    function toggleIntroStop3() {
        isIntroStop3Visible ? setIsIntroStop3Visible(false) : setIsIntroStop3Visible(true);
        setStopClock(false);
    }
    const [isIntroStop4Visible, setIsIntroStop4Visible] = useState(true);
    function toggleIntroStop4() {
        isIntroStop4Visible ? setIsIntroStop4Visible(false) : setIsIntroStop4Visible(true);
        setStopClock(false);
    }
    const navigate = useNavigate();
    function goHomeQuit() {
        navigate('/');
    }
    async function goHome() {
        /* get number of games */
        /* gameCommentsOld is parsed value of gameComments */
        let gameCommentsArray = [];
        console.log("gameCommentsOld: " + gameCommentsOld);
        if (gameCommentsOld) {
            console.log ("length of gameComments: " + gameCommentsOld.length);
            gameCommentsOld[gameCommentsOld.length] = gameComments;
            gameCommentsArray = [...gameCommentsOld];
        } else {
            gameCommentsArray = [gameComments];
        }
        console.log("JSON.stringify(gameCommentsOld): " + JSON.stringify(gameCommentsArray));
        const newGameStats = {
            id: localStorage.getItem("GameStatsID"),
            gameComments: JSON.stringify(gameCommentsArray)
        };
        const apiGameStatsUpdate = await API.graphql({ query: updateGameStatsMutation, variables: {input: newGameStats}});
        localStorage.removeItem("agreeToWaiver");
        localStorage.removeItem("GameStatsID");
        localStorage.removeItem("gameName");
        localStorage.removeItem("gameTime");
        localStorage.removeItem("gameTimeTotal");
        localStorage.removeItem("gameStop");
        localStorage.removeItem("numberOfTimes");
        localStorage.removeItem("numPlayerValue");
        localStorage.removeItem("solvedStop1");
        localStorage.removeItem("solvedStop2");
        localStorage.removeItem("solvedStop3");
        localStorage.removeItem("key");
        localStorage.removeItem("prybar");
        navigate('/');
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
        localStorage.setItem("numPlayerValue",numPlayerValue);
        setNumberOfPlayers(numPlayerValue);
    }
    /* game time/scoring */

    useEffect(() => {
        console.log("***useEffect***: gameTime: " + gameTime);
        console.log("***useEffect***: gameTimeTotal: " + gameTimeTotal);
    });
    useEffect(() => {
        console.log("***useEffect***: gameStop: " + gameStop);
    });
    useEffect(() => {
        console.log("***useEffect***: isIntroVisible: " + isIntroVisible);
    });
    /* 60000 milliseconds = 1 minute */
    const MINUTE_MS = 3000;
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Logs every 3 seconds');
            if (gameTime) {
                let gameTimeNum = Number((gameTime + .05).toFixed(2));
                let gameTimeTotalNum = Number((gameTimeTotal + .05).toFixed(2));
                console.log('game time: ' + gameTimeNum);
                if (!stopClock) {
                    localStorage.setItem("gameTime",gameTimeNum);
                    setGameTime(gameTimeNum);
                    let hintTimeTotalNum = Number(hintTime1 + hintTime2 + hintTime3 + hintTime4);
                    console.log("hint time total: " + hintTimeTotalNum);
                    console.log("game time total: " + gameTimeTotalNum);
                    setGameTimeTotal(gameTimeTotalNum + hintTimeTotalNum);
                    setGameTimeHint(hintTimeTotalNum);
                    localStorage.setItem("gameTimeTotal", gameTimeTotalNum);
                }
                console.log("statsupdated: " + statsUpdated);
                console.log("stopClock: " + stopClock);
                if (stopClock) {
                    if (!statsUpdated) winGameFunction(interval);
                }

            } else {
                console.log("no gameTime");
                if (!isIntroVisible) {
                    setGameTimeFunction(.05);
                    setGameTimeTotal(.05);
                    localStorage.setItem("gameTimeTotal", .05);
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
    async function winGameFunction(interval) {
        /* for end of game: clearInterval(interval);*/
        console.log("stop has been won");
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

        /* gameTime is an array */
        let gameTimeStop1Array = [];
        let gameTimeStop2Array = [];
        let gameTimeStop3Array = [];
        let gameTimeStop4Array = [];
        let hintTimeStop1Array = [];
        let hintTimeStop2Array = [];
        let hintTimeStop3Array = [];
        let hintTimeStop4Array = [];
        let gameTimeTotalArray = [];
        let numberOfPlayersArray = [];
        let gameStatsGameTimeValues = '';
        console.log("gameStop (values): " + gameStop);
        let gameStatsGameStateValues = '{"waiverSigned":true,"gameStop":"' + gameStop + '"}';
        let numberOfTimes = 1;
        /* value of gameTime field in table */
        if (gamesStatsFromAPI.gameTime) {
            console.log("some gameTime data");
            const gameStatsGameTime = JSON.parse(gamesStatsFromAPI.gameTime);
            /* get number of times */
            numberOfTimes = Number(gameStatsGameTime.numberOfTimes);
            let indexNumberOfTimes = numberOfTimes-1;
            /* get old data */
            gameTimeStop1Array = [...gameStatsGameTime.gameTimeStop1];
            gameTimeStop2Array = [...gameStatsGameTime.gameTimeStop2];
            gameTimeStop3Array = [...gameStatsGameTime.gameTimeStop3];
            gameTimeStop4Array = [...gameStatsGameTime.gameTimeStop4];
            hintTimeStop1Array = [...gameStatsGameTime.hintTimeStop1];
            hintTimeStop2Array = [...gameStatsGameTime.hintTimeStop2];
            hintTimeStop3Array = [...gameStatsGameTime.hintTimeStop3];
            hintTimeStop4Array = [...gameStatsGameTime.hintTimeStop4];
            if (gameStop === "Jaycee Park Shelter (Hurricane)") {
                gameTimeStop1Array[indexNumberOfTimes] = (gameTime + .05).toFixed(2);
                hintTimeStop1Array[indexNumberOfTimes] = Number(hintTime1 + hintTime2 + hintTime3 + hintTime4);
            } else if (gameStop === "Jaycee Park Gazebo (Hurricane)") {
                gameTimeStop2Array[indexNumberOfTimes] = (gameTime + .05).toFixed(2);
                hintTimeStop2Array[indexNumberOfTimes] = Number(hintTime1 + hintTime2 + hintTime3 + hintTime4);
            } else if (gameStop === "Jaycee Park Exercise (Hurricane)") {
                gameTimeStop3Array[indexNumberOfTimes] = (gameTime + .05).toFixed(2);
                hintTimeStop2Array[indexNumberOfTimes] = Number(hintTime1 + hintTime2 + hintTime3 + hintTime4);
            } else if (gameStop === "Jaycee Park little bridge (Hurricane)") {
                gameTimeStop4Array[indexNumberOfTimes] = (gameTime + .05).toFixed(2);
                hintTimeStop2Array[indexNumberOfTimes] = Number(hintTime1 + hintTime2 + hintTime3 + hintTime4);
            }
            setGameCommentsOld(JSON.parse(gamesStatsFromAPI.gameComments));
            gameTimeTotalArray = [...gameStatsGameTime.gameTimeTotal];
            numberOfPlayersArray = [...gameStatsGameTime.numberOfPlayers];

            gameTimeTotalArray[indexNumberOfTimes] = (gameTimeTotal + .05).toFixed(2);
            numberOfPlayersArray[indexNumberOfTimes] = numberOfPlayers;
            console.log("gameTimeStop1Array: " + JSON.stringify(gameTimeStop1Array));
            console.log("gameTimeStop2Array: " + JSON.stringify(gameTimeStop2Array));
            console.log("gameTimeStop3Array: " + JSON.stringify(gameTimeStop3Array));
            console.log("gameTimeStop4Array: " + JSON.stringify(gameTimeStop4Array));
        } else {
            console.log("no gameTime data");
            gameTimeStop1Array[0] = (gameTime + .05).toFixed(2);
            gameTimeStop2Array[0] = "";
            gameTimeStop3Array[0] = "";
            gameTimeStop4Array[0] = "";
            hintTimeStop1Array[0] = Number(hintTime1 + hintTime2 + hintTime3 + hintTime4);
            hintTimeStop2Array[0] = "";
            hintTimeStop3Array[0] = "";
            hintTimeStop4Array[0] = "";
            gameTimeTotalArray[0] = (gameTimeTotal + .05).toFixed(2);
            numberOfPlayersArray[0] = numberOfPlayers;
        }
        gameStatsGameTimeValues = '{"numberOfTimes":1,"numberOfPlayers":' + JSON.stringify(numberOfPlayersArray) +
            ',"gameTimeStop1":' + JSON.stringify(gameTimeStop1Array) +
            ',"gameTimeStop2":' + JSON.stringify(gameTimeStop2Array) +
            ',"gameTimeStop3":' + JSON.stringify(gameTimeStop3Array) +
            ',"gameTimeStop4":' + JSON.stringify(gameTimeStop4Array) +
            ',"hintTimeStop1":' + JSON.stringify(hintTimeStop1Array) +
            ',"hintTimeStop2":' + JSON.stringify(hintTimeStop2Array) +
            ',"hintTimeStop3":' + JSON.stringify(hintTimeStop3Array) +
            ',"hintTimeStop4":' + JSON.stringify(hintTimeStop4Array) +
            ',"gameTimeTotal":' + JSON.stringify(gameTimeTotalArray) + '}';
        const newGameStats = {
            id: gamesStatsFromAPI.id,
            gameStates: gameStatsGameStateValues,
            gameTime: gameStatsGameTimeValues
        };
        localStorage.setItem("GameStatsID",gamesStatsFromAPI.id);
        /* one time */
        const apiGameStatsUpdate = await API.graphql({ query: updateGameStatsMutation, variables: {input: newGameStats}});
        setStatsUpdated(true);
    }
    /* end for all games */




    /* stop 1 - game specific */
    /* get gamestats and set localstorage */
    useEffect(() => {
        console.log("***useEffect***: setGameStop");
        /* set local storage for gameStop */
        setGameStopFunction();
    }, []);

    const [gameStop,setGameStop] = useState("Jaycee Park Shelter (Hurricane)");

    function setGameStopFunction() {
        console.log ("set Game Stop: " + gameStop);
        if (localStorage.getItem("solvedStop1")) {
            setSolvedStop1(true);
        }
        if (localStorage.getItem("solvedStop2")) {
            setSolvedStop2(true);
        }
        if (localStorage.getItem("solvedStop3")) {
            setSolvedStop3(true);
        }
        localStorage.setItem("gameStop", gameStop);
    }

    /* STOP 1 */
    /* guessing states and answers for first safe - 5 numbers */
    const [guess1,setGuess1] = useState({'numbers':''});
    const [haveGuessed1,setHaveGuessed1] = useState();
    const [isWrong1, setIsWrong1] = useState(true);
    const answer1 = {'numbers':'78594'};
    useEffect(() => {
        console.log("***useEffect***: guess1.numbers: " + guess1.numbers);
    });
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
    useEffect(() => {
        console.log("***useEffect***: guess2.numbers: " + guess2.numbers);
    })
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
            setStopClock(true);
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
    function goToStop4() {
        console.log("go to stop 4");
        localStorage.setItem("solvedStop3",true);
        localStorage.setItem("gameStop","Jaycee Park little bridge (Hurricane)");
        setGameStop("Jaycee Park little bridge (Hurricane)");
        setGameTime(0);
        setGameTimeHint(0);
        setStatsUpdated(false);
    }
    function goToStop3() {
        console.log("go to stop 2");
        localStorage.setItem("solvedStop2",true);
        localStorage.setItem("gameStop","Jaycee Park Exercise (Hurricane)");
        setGameStop("Jaycee Park Exercise (Hurricane)");
        setGameTime(0);
        setGameTimeHint(0);
        setStatsUpdated(false);
    }
    function goToStop2() {
        console.log("go to stop 2");
        localStorage.setItem("solvedStop1", true);
        localStorage.setItem("gameStop", "Jaycee Park Gazebo (Hurricane)");
        setGameStop("Jaycee Park Gazebo (Hurricane)");
        /* check if solved anything else, if so don't stop time */
        if (!localStorage.getItem("solvedStop1") && !localStorage.getItem("solvedStop2") && !localStorage.getItem("solvedStop3")) {
            setGameTime(0);
            setGameTimeHint(0);
            setStatsUpdated(false);
        }
    }
    function goToStop1() {
        console.log("go to stop 1");
        setIsHelpVisible(false);
        setGameStop("Jaycee Park Shelter (Hurricane)");
    }
    /* END STOP 1 */


    /* STOP 2 */
    /* guessing states and answers for first safe - 6 letters - trying to find order of letters*/
    const [guess1Stop2,setGuess1Stop2] = useState({'answer':''});
    const [haveGuessed1Stop2,setHaveGuessed1Stop2] = useState();
    const [isWrong1Stop2, setIsWrong1Stop2] = useState(true);
    const answer1Stop2 = {'answer':'SBOVHW'};
    useEffect(() => {
        console.log("***useEffect***: guess1Stop2.answer: " + guess1Stop2.answer);
    });
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
    useEffect(() => {
        console.log("***useEffect***: guess2Stop2.answer: " + guess2.answer);
    })
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
    useEffect(() => {
        console.log("***useEffect***: isSafeInfoStop2Visible: " + isSafeInfoStop2Visible);
    });

    /* use key in key hole */
    const [isKeyUsed, setIsKeyUsed] = useState(false);
    function toggleUseKey() {
        isKeyUsed ? setIsKeyUsed(false) : setIsKeyUsed(true);
        /* completing stop 2 */
        setStopClock(true);
    }
    /* move on to next stop */
    const [isSandbagMessageVisible, setIsSandbagMessageVisible] = useState(false);
    function toggleSandbagMessages() {
        isSandbagMessageVisible ? setIsSandbagMessageVisible(false) : setIsSandbagMessageVisible(true);
    }
    /* backpack functions */
    /* backpack items: prybar */
    function toggleBackpack() {
        isBackpackVisible ? setIsBackpackVisible(false) : setIsBackpackVisible(true);
    }
    const [isPrybarOn, setIsPrybarOn] = useState(false);
    useEffect(() => {
        console.log("***useEffect***: isPrybarOn: " + isPrybarOn);
    });
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
            default:
        }
    }
    /* stop 1 - game specific */
    if (gameStop === "Jaycee Park Shelter (Hurricane)") {
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
                        className={isBackpackVisible ? "all-screen zIndex103 show-gradual" : "all-screen hide-gradual"}>
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
                            I also collected the <span className="bold-underline">discs <span
                            className="small">(#?)</span></span>, <span className="bold-underline">balls <span
                            className="small">(#?)</span></span>,
                            and <span className="bold-underline">water bottles <span
                            className="small">(#?)</span></span> in record time.
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
                        <View className="winner">
                            <h3>Good Job on Finding Sandbags!</h3>
                            But you need more.<br/>
                            Next stop is at Jaycee Park Gazebo - maybe you can find some there.<br/><br/>
                            <Button className="button" onClick={() => goToStop2()}>Click here for picture of stop
                                2</Button>
                        </View>
                    ) : null}


                <View ariaLabel="stop 1 help" className={isHelpVisible ? "all-screen show" : "all-screen hide"}>
                    <Button className="close-button" onClick={() => toggleHelp()}>X</Button>
                    <View width="100%" padding="10px">
                        <View paddingBottom="10px">
                            <strong>Game Stop</strong>: <span className="font-small">{gameStop}</span>
                            {solvedStop1? (
                                <Button className="button" onClick={() => goToStop2()}>Click here for picture of stop
                                    2</Button>
                            ): null}
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
                        <div className={isHint4Visible ? "all-screen show-gradual" : "all-screen hide-gradual"}>
                            <Button className="close-button" onClick={() => toggleHint4()}>X</Button>
                            <strong>Hint for name of field</strong>
                            <br/><br/>There is a large sign on the fence at the field with the name.
                            <br/><br/>

                        </div>
                        <div className={isHint3Visible ? "all-screen show-gradual" : "all-screen hide-gradual"}>
                            <Button className="close-button" onClick={() => toggleHint3()}>X</Button>
                            <strong>Hint for Sport:</strong>
                            <br/><br/>People do play soccer and disc golf but the closest field to the shelter is the
                            baseball field.
                            <br/><br/>

                        </div>
                        <div className={isHint2Visible ? "all-screen show-gradual" : "all-screen hide-gradual"}>
                            <Button className="close-button" onClick={() => toggleHint2()}>X</Button>
                            <strong>Hint for name of house:</strong> <br/><br/>
                            Near the intersection of Solomon and N. Campbell there is a house that people use for
                            events.<br/><br/>
                            Go over there and look for the name.

                        </div>
                        <div className={isHint1Visible ? "all-screen show-gradual" : "all-screen hide-gradual"}>
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
                    </SelectField>
                    {localStorage.getItem("numberOfTimes") !== null ? (
                        <div> You have played {localStorage.getItem("numberOfTimes")} time(s) before - good luck this
                            time! </div>
                    ) : null}
                    <h4>Start Playing Game When You are Here:</h4>
                    <View>
                        <Image maxHeight="150px"
                               src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/game-picture-jaycee-shelter.jpg"/>
                    </View>
                    <Button className="button" onClick={() => toggleIntro()}>I Want To Play!</Button>
                    |
                    <Button className="button" onClick={() => goHomeQuit()}>Back Home</Button>
                </View>

                <View className="time">
                    <span className="small">hint time: {gameTimeHint} mins | real time: {gameTime} mins | tot: time: {gameTimeTotal} min</span>
                </View>
            </View>
        )
    } else if (gameStop === "Jaycee Park Gazebo (Hurricane)") {
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
                        <Image src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/03/words-small.png" />
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
                        <br /><h3>What Order for Letters in Words On String:</h3>
                        <br />
                        <Image src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/03/words-big.png" />
                    </View>
                    <View
                        ariaLabel="bench info"
                        className={isBenchVisible ? "all-screen show" : "hide"}>
                        <Button className="close-button" onClick={()=>toggleBench()}>X</Button>
                        <br /><h3>What numbers are these?</h3>
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
                                <Button className="button" onClick={() => goToStop3()}>Click here for picture of stop
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

                <View className={isSandbagMessageVisible ? "all-screen show" : "hide"}>
                    <Button className="close-button" onClick={()=>toggleSandbagMessages()}>X</Button>
                    <h3>Good Job on Finding Sandbags!</h3>
                    <br />
                    You will need to find some way to transport these sandbags!
                    <br /><br />
                    Next stop is at the Exercise Areay<br /><br />
                    <Button className="button">Click here for picture of stop 3</Button>
                </View>

                <View className="time">
                    <span className="small">hint time: {gameTimeHint} mins | real time: {gameTime} mins | tot: time: {gameTimeTotal} min</span>
                </View>
                <View ariaLabel="stop 2 help" className={isHelpVisible ? "all-screen show" : "all-screen hide"}>
                    <Button className="close-button" onClick={() => toggleHelp()}>X</Button>
                    <View width="100%" padding="10px">
                        <View paddingBottom="10px">
                            <strong>Game Stop</strong>: <span className="font-small">{gameStop} (stop 2)</span><br />
                            <Button className="button" onClick={() => goToStop1()}>Go to stop 1</Button>
                            {solvedStop2? (
                                <Button className="button" onClick={() => goToStop3()}>Go to stop 3</Button>
                            ): null}
                            {solvedStop3? (
                                <Button className="button" onClick={() => goToStop4()}>Go to stop 4</Button>
                            ): null}
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
                        <div className={isHint4Visible ? "all-screen show-gradual" : "all-screen hide-gradual"}>
                            <Button className="close-button" onClick={() => toggleHint4()}>X</Button>
                            <strong>Hint for name of field</strong>
                            <br /><br />There is a large sign on the fence at the field with the name.
                            <br /><br />

                        </div>
                        <div className={isHint3Visible ? "all-screen show-gradual" : "all-screen hide-gradual"}>
                            <Button className="close-button" onClick={() => toggleHint3()}>X</Button>
                            <strong>Hint for Sport:</strong>
                            <br /><br />People do play soccer and disc golf but the closest field to the shelter is the baseball field.
                            <br /><br />

                        </div>
                        <div className={isHint2Visible ? "all-screen show-gradual" : "all-screen hide-gradual"}>
                            <Button className="close-button" onClick={() => toggleHint2()}>X</Button>
                            <strong>Hint for name of house:</strong> <br /><br />
                            Near the intersection of Solomon and N. Campbell there is a house that people use for events.<br /><br />
                            Go over there and look for the name.

                        </div>
                        <div className={isHint1Visible ? "all-screen show-gradual" : "all-screen hide-gradual"}>
                            <Button className="close-button" onClick={() => toggleHint1()}>X</Button>
                            <strong>Hint for engraved on panel:</strong> <br /><br />
                            The <span className="bold-underline">first</span> is in reference to the first letter of the named field.<br />
                            <br />And the pattern continues with name of house and name of sport.<br />

                        </div>
                        <Button className="button small" onClick={() => toggleHelp()}>Close Help and Play</Button>
                    </View>
                </View>
                {/* doesn't need number of players */}
                <View
                    ariaLabel="stop 2 intro"
                    textAlign="center"
                    className={isIntroStop2Visible ? "all-screen show" : "hide"}>
                    <h3>Game Goals: Find Sandbags!</h3>
                    <h4>Start Playing Game When You are Here:</h4>
                    <View>
                        <Image maxHeight="150px" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/background-game-jaycee-gazebo.jpg" />
                    </View>
                    <Button className="button" onClick={() => toggleIntroStop2()}>I Want To Play!</Button>
                </View>
            </View>
        )
    } else if (gameStop === "Jaycee Park Exercise (Hurricane)") {
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
                        className={isBackpackVisible ? "all-screen zIndex103 show-gradual" : "all-screen hide-gradual"}>
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
                            {solvedStop1 ? (
                                <Button className="button" onClick={() => goToStop2()}>Click here for picture of stop
                                    2</Button>
                            ) : null}
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
                        <div className={isHint4Visible ? "all-screen show-gradual" : "all-screen hide-gradual"}>
                            <Button className="close-button" onClick={() => toggleHint4()}>X</Button>
                            <strong>Hint for name of field</strong>
                            <br/><br/>There is a large sign on the fence at the field with the name.
                            <br/><br/>

                        </div>
                        <div className={isHint3Visible ? "all-screen show-gradual" : "all-screen hide-gradual"}>
                            <Button className="close-button" onClick={() => toggleHint3()}>X</Button>
                            <strong>Hint for Sport:</strong>
                            <br/><br/>People do play soccer and disc golf but the closest field to the shelter is the
                            baseball field.
                            <br/><br/>

                        </div>
                        <div className={isHint2Visible ? "all-screen show-gradual" : "all-screen hide-gradual"}>
                            <Button className="close-button" onClick={() => toggleHint2()}>X</Button>
                            <strong>Hint for name of house:</strong> <br/><br/>
                            Near the intersection of Solomon and N. Campbell there is a house that people use for
                            events.<br/><br/>
                            Go over there and look for the name.

                        </div>
                        <div className={isHint1Visible ? "all-screen show-gradual" : "all-screen hide-gradual"}>
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
                    className={isIntroStop3Visible ? "all-screen show" : "hide"}>
                    <h3>Game Goals: Find Sandbags!</h3>
                    <h4>Start Playing Game When You are Here:</h4>
                    <View>
                        <Image maxHeight="150px"
                               src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/background-game-jaycee-exercise.jpg"/>
                    </View>
                    <Button className="button" onClick={() => toggleIntroStop3()}>I Want To Play!</Button>
                </View>
                <View className="time">
                    <span
                        className="small">hint time: {gameTimeHint} mins | real time: {gameTime} mins | tot: time: {gameTimeTotal} min</span>
                </View>
            </View>
        )
    }
}