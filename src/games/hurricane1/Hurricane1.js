import React, {useEffect, useState} from "react"
import {Button, View, Image, TextAreaField, TextField,Flex} from '@aws-amplify/ui-react';
import {useNavigate} from "react-router-dom";
import {toggleIntro, toggleHelp, toggleBackpack,
    toggleNotes, goHomeQuit, setGameStopFunction,
    intervalFunction, goHome, goToStop, leaveComment, winGameFunction, toggleHint1,toggleHint2,toggleHint3, toggleHint4, setCommentsFunction} from "../../components/helper";
import {shallowEqual} from "../../components/ShallowEqual";
import {NotesOpen, HelpScreen, GameIntro, CoverScreenView} from "../../components/sharedComponents";

export function Hurricane1() {

    /* for all games */
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [areNotesVisible, setAreNotesVisible] = useState(false);
    const [isHelpVisible, setIsHelpVisible] = useState(false);
    const [gameNotes,setGameNotes] = useState('');
    const [gameComments,setGameComments] = useState('');
    const [isBackpackVisible, setIsBackpackVisible] = useState(false);
    const [gameBackpack, setGameBackpack] = useState([]);
    const [gameBackpackHasItems, setGameBackpackHasItems] = useState(false);
    const [isCoverScreenVisible, setIsCoverScreenVisible] = useState(true);
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
    const [teamName, setTeamName] = useState('');
    const [isHint1Visible, setIsHint1Visible] = useState(false);
    const [isHint2Visible, setIsHint2Visible] = useState(false);
    const [isHint3Visible, setIsHint3Visible] = useState(false);
    const [isHint4Visible, setIsHint4Visible] = useState(false);
    const [hintTime1,setHintTime1] = useState(0);
    const [hintTime2,setHintTime2] = useState(0);
    const [hintTime3,setHintTime3] = useState(0);
    const [hintTime4,setHintTime4] = useState(0);
    const [isIntroVisible, setIsIntroVisible] = useState(false);
    const [isGameIntroVisible, setIsGameIntroVisible] = useState(true);

    /* get gamestats and set localstorage */
    useEffect(() => {
        console.log("***useEffect***: setGameStop (only on mount)");
        /* set local storage for gameStop - only on mount */
        setGameStopFunction(setGameStop,setNumberOfTimes,setGameID,setGameStatsID,setGameStopNameArray,setGameStopName,setGameScoreID);
    }, []);
    /* always scroll to top */
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    /* 60000 milliseconds = 1 minute */
    const MINUTE_MS = 3000;
    /* clock action */
    useEffect(() => {
        const interval = setInterval(() => {
            intervalFunction(gameTime,stopClock,setGameTime,hintTime1,hintTime2,hintTime3,hintTime4,setGameTimeHint,isIntroVisible);
        }, MINUTE_MS);
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [gameTime,isIntroVisible])

    /* changed in helper function - testing */
    useEffect(() => {
        console.log("***useEffect***: numberOfPlayers: " + numberOfPlayers);
    });
    useEffect(() => {
        console.log("***useEffect***: numberOfPlayersError: " + numberOfPlayersError);
    });
    useEffect(() => {
        console.log("***useEffect***: isGameIntroVisible: " + isGameIntroVisible);
    });
    useEffect(() => {
        console.log("***useEffect***: stopClock: " + stopClock);
    });

    const navigate = useNavigate();

    /* end for all games */

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
        isCoverScreenVisible ? setIsCoverScreenVisible(false) : setIsCoverScreenVisible(true);
    }
    /* need to click on safe */
    const [isSafeInfoVisible, setIsSafeInfoVisible] = useState(false);
    function toggleSafeInfo() {
        isSafeInfoVisible ? setIsSafeInfoVisible(false) : setIsSafeInfoVisible(true);
        isCoverScreenVisible ? setIsCoverScreenVisible(false) : setIsCoverScreenVisible(true);
    }

    /* need to select prybar and then click on cement marking */
    const [isCementSafeInfoVisible, setIsCementSafeInfoVisible] = useState(false);
    function toggleCementSafeInfo() {
        isCementSafeInfoVisible ? setIsCementSafeInfoVisible(false) : setIsCementSafeInfoVisible(true);
        isCoverScreenVisible ? setIsCoverScreenVisible(false) : setIsCoverScreenVisible(true);
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
        setIsAlertVisible(true);

        setTimeout(() => {
            setIsAlertVisible(false);
        }, 3000);
        console.log("put prybar in backpack");
        localStorage.setItem("prybar", "https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/prybar-not-using.png");
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
                    src: 'https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/prybar-not-using.png',
                    key: 'prybar'
                })
            }
        } else {
            console.log("push prybar to backpack");
            gameBackpack.push({
                src: 'https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/prybar-not-using.png',
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
                            gameBackpack[i].src = "https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/prybar-using.png"
                            localStorage.setItem("prybar", "https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/prybar-using.png");
                        } else {
                            gameBackpack[i].src = "https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/prybar-not-using.png"
                            localStorage.setItem("prybar", "https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/prybar-not-using.png");
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
            <View position="relative" height="100%">
                <View
                    ariaLabel="Main Container"
                    className="main-container">
                    <View
                        className="image-holder image-short"
                        ariaLabel="Image Holder"
                        backgroundImage = "url('https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/background-game-jaycee-shelter-objects.jpg')">

                        {/* all games */}

                        <View
                            className="z-index102 info-button"
                            ariaLabel="Info Button"
                            onClick={() => toggleHelp(isHelpVisible,setIsHelpVisible,isCoverScreenVisible,setIsCoverScreenVisible)}>
                            <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/help.png" />
                        </View>
                        <View
                            className="z-index102 notes-button"
                            ariaLabel="Notes Button"
                            onClick={() => toggleNotes(areNotesVisible,setAreNotesVisible,isCoverScreenVisible,setIsCoverScreenVisible)}>
                            <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/notes.png" />
                        </View>
                        <View
                            className="z-index102 backpack-image"
                            ariaLabel="backpack Image"
                            onClick={()=>toggleBackpack(isBackpackVisible,setIsBackpackVisible,isCoverScreenVisible,setIsCoverScreenVisible)}>
                            <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/backpack-new.png" />
                        </View>
                        <View className={isBackpackVisible ? "all-screen zIndex103 show" : "all-screen hide"} >
                            <Button className="close-button" onClick={() => toggleBackpack(isBackpackVisible,setIsBackpackVisible,isCoverScreenVisible,setIsCoverScreenVisible)}>X</Button>
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
                        <NotesOpen areNotesVisible={areNotesVisible} setAreNotesVisible={setAreNotesVisible} isCoverScreenVisible={isCoverScreenVisible} setIsCoverScreenVisible={setIsCoverScreenVisible} toggleNotes={toggleNotes} gameNotes={gameNotes} setGameNotes={setGameNotes}/>

                        {/* end all games */}

                        <View
                            ariaLabel="Hanging Sign"
                            className="hanging-sign"
                            onClick={() => toggleSign()}>
                            <Image
                                src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/hanging-sign.png"/>
                        </View>

                        { !isWrong1 && haveGuessed1 ?   (
                            <View>
                                <View className={isAlertVisible ? "alert-container show" : "hide"}>
                                    <div className='alert-inner'>Prybar is in backpack</div>
                                </View>
                                <View className="safe-shelter show">
                                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/open-safe.png" />
                                    <View marginRight="10px" className={isPrybarVisible ? "safe-shelter  show" : "hide"}
                                          onClick={pryBar}>
                                        <Image  src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/prybar.png"/>
                                    </View>
                                </View>

                            </View>
                        ) : <View
                            ariaLabel="Safe Shelter"
                            className="safe-shelter"
                            onClick={() => toggleSafeInfo()}>
                            <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/safe-shelter.png"/>
                            </View>
                        }
                        {/* what you see first, it can NOT be clicked */}
                        <View className={!isPrybarOn ? "cement-safe show" : "hide"}>
                            <Image  src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/cementsafe-closed.png" />
                        </View>

                        {/* Now Prybar is ON but Cement Safe is closed */}
                        <View className={isPrybarOn && !isCementSafeOpen && isWrong2 ? "cement-safe show" : "hide"}
                              onClick={() => toggleCementSafe()}>
                            <Image  src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/cementsafe-closed.png" />
                        </View>

                        {/* Cement Safe is open, prybar doesn't matter, but answer is wrong  */}
                        <View className={isCementSafeOpen && isWrong2 ? "cement-safe show" : "hide"}
                              onClick={() => toggleCementSafeInfo()}>
                            <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/cementsafeopencode.png"/>
                        </View>

                        {/* Cement Safe is open, prybar doesn't matter, but answer is RIGHT  */}
                        <View className={!isWrong2 ? "cement-safe show" : "hide"}>
                            <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/cementsafeopensandbags.png"/>
                        </View>
                    </View>

                    <View
                        ariaLabel="stop 1 - sign info"
                        className={isSignVisible ? "all-screen show" : "hide"}>
                        <Button className="close-button" onClick={() => toggleSign()}>X</Button>
                        <View className="hanging-sign-big-jaycee">
                        <div>I am an odd number. <br />Take away a letter <br />and I become even.</div>
                        </View>
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
                            </View>
                        ) : (

                                <View className="torn-diary-big-jaycee big-width">
                                As I sit here under <span className="bold-underline">this sign(#?)</span>,<br/>
                                I look South and see something near <br />with <span
                                className="bold-underline">vertical slots (#?)</span> that
                                align,<br/>
                                I also see on the screen <span className="bold-underline">discs(#?)</span>,
                                    <br /><span className="bold-underline">balls (#?)</span>,
                                and <span className="bold-underline">water bottles (#?)</span>
                                    <br />and count them in record time.
                                </View>
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
                                   src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/codeforcement.png"/>
                        )}
                    </View>
                    {(!isWrong1 && !isWrong2) ?
                        (
                            <View ariaLabel="Stop 1 Winner" className="winner">
                                <h3>Good Job on Finding Sandbags!</h3>
                                But you need more.<br/>
                                Next stop is at Jaycee Park Gazebo - maybe you can find some there.<br/><br/>
                                <Button className="button" onClick={() => goToStop(setGameStop,gameStop,gameTime,setGameTime,gameTimeTotal,setGameTimeTotal,setGameTimeHint,gameTimeHint,setHintTime1,setHintTime2,setHintTime3,setHintTime4,setIsIntroVisible,isCoverScreenVisible,setIsCoverScreenVisible)}>Click here for picture of stop
                                    2</Button>
                            </View>
                        ) : null}

                    <View ariaLabel="stop 1 Time" className="time">
                        <Button className="button small" onClick={() => completeStop()}>complete stop (REMOVE)</Button>
                        <span className="small">hint time: {gameTimeHint} mins | real time: {gameTime} mins |
                                tot: time: { Number((gameTime + gameTimeHint + gameTimeTotal).toFixed(2))} min</span>
                    </View>                    <HelpScreen />
                    <View className={isHelpVisible ? "all-screen show" : "all-screen hide"}>
                        <Button className="close-button" onClick={() => toggleHelp(isHelpVisible,setIsHelpVisible,isCoverScreenVisible,setIsCoverScreenVisible)}>X</Button>
                    <View width="100%" padding="10px">
                        <View paddingBottom="10px">
                            <strong>Game Stop</strong>: <span className="font-small">{gameStop}</span>
                        </View>
                        <View paddingBottom="10px">
                            <strong>How to Play:</strong> Click around - some items will disappear and then appear in
                            your backpack. If it is in your backpack you may be able to use it by clicking on it.
                        </View>
                        <View paddingBottom="10px">
                            <strong>Goal for this stop:</strong> Find the SandBags! Use Hints if you really need them.
                        </View>
                        <Flex wrap="wrap">
                            <Button className="button small" onClick={() => toggleHint1(setHintTime1,isHint1Visible,setIsHint1Visible)}>Open Hint (vertical slots)</Button>
                            <Button className="button small" onClick={() => toggleHint2(setHintTime2,isHint2Visible,setIsHint2Visible)}>Open Hint (discs, water bottles, balls)</Button>
                            <Button className="button small" onClick={() => toggleHint3(setHintTime3,isHint3Visible,setIsHint3Visible)}>Open Hint (this sign)</Button>
                            <Button className="button small" onClick={() => toggleHint4(setHintTime4,isHint4Visible,setIsHint4Visible)}>Open Hint (#slides, #swings, etc)</Button>
                        </Flex>

                        <br/><br/>
                        <div className={isHint4Visible ? "winner show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint4(setHintTime4,isHint4Visible,setIsHint4Visible)}>X</Button>
                            <strong>#slides, #swings, etc</strong>
                            <br/><br/>These things are all around - you can see them - count the swings and slides in playground, count the
                            windows on the building that has the bathrooms, and get number of closest disc golf hole to the shelter.
                            <br/><br/>

                        </div>
                        <div className={isHint3Visible ? "winner show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint3(setHintTime3,isHint3Visible,setIsHint3Visible)}>X</Button>
                            <strong>this sign:</strong>
                            <br/><br/>It's a riddle but think about how you spell the odd number. It's spelling not math.
                            <br/><br/>

                        </div>
                        <div className={isHint2Visible ? "winner show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint2(setHintTime2,isHint2Visible,setIsHint2Visible)}>X</Button>
                            <strong>discs, water bottles, balls:</strong> <br/><br/>
                            These items are ONLY on the game screen - count them there.

                        </div>
                        <div className={isHint1Visible ? "winner show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint1(setHintTime1,isHint1Visible,setIsHint1Visible)}>X</Button>
                            <strong>Vertical Slots:</strong> <br/><br/>
                            There is a grill to the south (in direction of parking lot) it has slots on the sides - count these.
                        </div>
                        <Button className="button action-button  small" onClick={() => toggleHelp(isHelpVisible,setIsHelpVisible,isCoverScreenVisible,setIsCoverScreenVisible)}>Close Help and
                            Play</Button>
                    </View>
                </View>
                    <View
                        ariaLabel="stop 1 intro"
                        textAlign="center"
                        className={isIntroVisible ? "all-screen show" : "hide"}>
                        <h3>Game Goals: Find more Discs!</h3>
                        <h4>Start Playing Game When You are Here:</h4>
                        <View>
                            <Image maxHeight="150px" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/background-game-jaycee-shelter.jpg" />
                        </View>
                        <View>
                            <span className="small"> <strong>Remember, clock doesn't stop until you complete the stop.</strong></span></View>

                        <Button className="button" onClick={() => toggleIntro(isIntroVisible,setIsIntroVisible,setStopClock,setIsCoverScreenVisible)}>I Want To Play!</Button>
                        &nbsp;&nbsp;
                        <Button className="button" onClick={() => goHomeQuit(navigate)}>Back to All Games</Button>
                    </View>
                    <GameIntro isGameIntroVisible={isGameIntroVisible} setIsGameIntroVisible={setIsGameIntroVisible} numberOfPlayersError={numberOfPlayersError} numberOfPlayers={numberOfPlayers} setNumberOfPlayers={setNumberOfPlayers} teamName={teamName} setTeamName={setTeamName} gameStopNameArray={gameStopNameArray} setNumberOfPlayersError={setNumberOfPlayersError} setIsIntroVisible={setIsIntroVisible}/>
                </View>
                <CoverScreenView isCoverScreenVisible={isCoverScreenVisible}/>
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
                    <NotesOpen areNotesVisible={areNotesVisible} setAreNotesVisible={setAreNotesVisible} isCoverScreenVisible={isCoverScreenVisible} setIsCoverScreenVisible={setIsCoverScreenVisible} toggleNotes={toggleNotes} gameNotes={gameNotes} setGameNotes={setGameNotes}/>
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
                        <span className="small"> <strong>Remember, clock doesn't stop until you complete the stop.</strong></span></View>
                    <View><span className="small"><strong>Total Time So Far</strong>: { Number((gameTime + gameTimeHint + gameTimeTotal).toFixed(2)) } min</span></View>

                    <Button className="button" onClick={() => toggleIntro(isIntroVisible,setIsIntroVisible,setStopClock,setIsCoverScreenVisible)}>I Want To Play!</Button>
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
                    <NotesOpen areNotesVisible={areNotesVisible} setAreNotesVisible={setAreNotesVisible} isCoverScreenVisible={isCoverScreenVisible} setIsCoverScreenVisible={setIsCoverScreenVisible} toggleNotes={toggleNotes} gameNotes={gameNotes} setGameNotes={setGameNotes}/>

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