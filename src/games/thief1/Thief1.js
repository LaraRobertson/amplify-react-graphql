import React, {useEffect, useState} from "react"
import {Button, View, Image, TextAreaField, TextField, Flex, Heading, Link} from '@aws-amplify/ui-react';
import {useNavigate} from "react-router-dom";
import {
    toggleIntro,
    toggleHelp,
    toggleMap,
    toggleNotes,
    setGameStopFunction,
    setCluesFunction,
    goToStop,
    leaveComment,
    winGameFunction,
    toggleHint1,
    toggleHint2,
    toggleHint3,
    toggleHint4,
} from "../../components/helper";
import {shallowEqual} from "../../components/ShallowEqual";
import {NotesOpen, TopRight, GameIntro, TimeBlock, CommentWindow} from "../../components/sharedComponents";

export function Thief1() {
    /* for all games */
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [isWinnerScreenVisible, setIsWinnerScreenVisible] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [showComment, setShowComment] = useState(false);
    const [areNotesVisible, setAreNotesVisible] = useState(false);
    const [isHelpVisible, setIsHelpVisible] = useState(false);
    const [gameNotes, setGameNotes] = useState('');
    const [clues, setClues] = useState('');
    const [isMapVisible, setIsMapVisible] = useState(false);
    const [gameComments, setGameComments] = useState('');
    const [isBackpackVisible, setIsBackpackVisible] = useState(false);
    const [gameBackpack, setGameBackpack] = useState([]);
    const [gameTime, setGameTime] = useState(0);
    const [gameTimeHint, setGameTimeHint] = useState(0);
    const [gameTimeTotal, setGameTimeTotal] = useState(0);
    const [gameStatsID, setGameStatsID] = useState('');
    const [gameScoreID, setGameScoreID] = useState('');
    const [gameID, setGameID] = useState('');
    const [numberOfTimes, setNumberOfTimes] = useState(0);
    const [gameStop, setGameStop] = useState(0);
    const [gameStopNameArray, setGameStopNameArray] = useState('');
    const [gameComplete, setGameComplete] = useState(false);
    const [gameStopName, setGameStopName] = useState(0);
    const [stopClock, setStopClock] = useState(true);
    const [realTimeStart, setRealTimeStart] = useState();
    const [numberOfPlayers, setNumberOfPlayers] = useState('');
    const [numberOfPlayersError, setNumberOfPlayersError] = useState('');
    const [teamName, setTeamName] = useState('');
    const [isHint1Visible, setIsHint1Visible] = useState(false);
    const [isHint2Visible, setIsHint2Visible] = useState(false);
    const [isHint3Visible, setIsHint3Visible] = useState(false);
    const [isHint4Visible, setIsHint4Visible] = useState(false);
    const [hintTime1, setHintTime1] = useState(0);
    const [hintTime2, setHintTime2] = useState(0);
    const [hintTime3, setHintTime3] = useState(0);
    const [hintTime4, setHintTime4] = useState(0);
    const [isIntroVisible, setIsIntroVisible] = useState(false);
    const [isGameIntroVisible, setIsGameIntroVisible] = useState(true);

    /* get gamestats and set or check localstorage */
    useEffect(() => {
        console.log("***useEffect***: setGameStop (only on mount)");
        /* set local storage for gameStop - only on mount */
        setGameStopFunction(setGameStop, setNumberOfTimes, setGameID, setGameStatsID, setGameStopNameArray,
            setGameStopName, setGameScoreID, setIsGameIntroVisible, setIsIntroVisible, gameTime, setGameTime, setGameTimeHint,
            setIsAlertVisible, setAlertText, setTeamName, setStopClock, setHintTime1, setHintTime2, setHintTime3, setHintTime4, setRealTimeStart,
            setGameNotes, setClues);
    }, []);
    /* go to top */
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const navigate = useNavigate();

    /* end for all games */
    /* stop 1 - game specific */
    const [clickTimeNow, setClickTimeNow] = useState();
    const [clickTimeThen, setClickTimeThen] = useState();
    const [clickCount, setClickCount] = useState();

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
        } else if (secondBetweenTwoDate < 5 && clickCount > 0) {
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

    /* guessing states and answers for safe - 4 words */
    const [guess1, setGuess1] = useState('');
    const [haveGuessed1, setHaveGuessed1] = useState(false);
    const [isWrong1, setIsWrong1] = useState(true);
    const [answer1] = useState("bean");

    const [guess2, setGuess2] = useState('');
    const [haveGuessed2, setHaveGuessed2] = useState(false);
    const [isWrong2, setIsWrong2] = useState(true);
    const [answer2] = useState("math");

    const [guess3, setGuess3] = useState('');
    const [haveGuessed3, setHaveGuessed3] = useState(false);
    const [isWrong3, setIsWrong3] = useState(true);
    const [answer3] = useState("ghirardelli");

    const [guess4, setGuess4] = useState('');
    const [haveGuessed4, setHaveGuessed4] = useState(false);
    const [isWrong4, setIsWrong4] = useState(true);
    const [answer4] = useState("inferno");

    function checkAnswer(guess1Val, guess2Val, guess3Val, guess4Val) {
        setGuess1(guess1Val);
        setGuess2(guess2Val);
        setGuess3(guess3Val);
        setGuess4(guess4Val);
        let x = 0;
        console.log("guess: " + guess1);
        if (guess1Val != '' && shallowEqual(guess1Val, answer1)) {
            console.log("guess 1 is right");
            setHaveGuessed1(true);
            setIsWrong1(false);
            x = x + 1;
        } else {
            console.log("wrong guess1");
            if (guess1Val != '') {
                setHaveGuessed1(true);
                setIsWrong1(true);
            }
        }
        if (guess2Val != '' && shallowEqual(guess2Val, answer2)) {
            console.log("guess 2 is right");
            setHaveGuessed2(true);
            setIsWrong2(false);
            x = x + 1;
        } else {
            console.log("wrong guess2");
            if (guess2Val != '') {
                setHaveGuessed2(true);
                setIsWrong2(true);
            }
        }
        if (guess3Val != '' && shallowEqual(guess3Val, answer3)) {
            console.log("guess 3 is right");
            setHaveGuessed3(true);
            setIsWrong3(false);
            x = x + 1;
        } else {
            console.log("wrong guess3");
            if (guess3Val != '') {
                setHaveGuessed3(true);
                setIsWrong3(true);
            }
        }
        if (guess4Val != '' && shallowEqual(guess4Val, answer4)) {
            console.log("guess 4 is right");
            setHaveGuessed4(true);
            setIsWrong4(false);
            x = x + 1;
        } else {
            console.log("wrong guess4");
            if (guess4Val != '') {
                setHaveGuessed4(true);
                setIsWrong4(true);
            }
        }
        /* set wingame */
        if (x == 4) {
            console.log("stop 1 win game");
            setGameComplete(true);
            /* set timeout to close window? */
            /* isSafeInfoVisible */
            setTimeout(() => {
                setIsSafeInfoVisible(false);
                setIsWinnerScreenVisible(true);
            }, 3000);
            winGameFunction(true, gameScoreID, gameTime, gameStop, gameTimeTotal, setGameTimeTotal, gameTimeHint, numberOfPlayers, teamName, realTimeStart,
                hintTime1, hintTime2, hintTime3, hintTime4);
        }
    }

    /* game action */
    const [isDiaryVisible, setIsDiaryVisible] = useState(false);

    function toggleDiary() {
        isDiaryVisible ? setIsDiaryVisible(false) : setIsDiaryVisible(true);
    }

    const [isTornDiaryVisible, setIsTornDiaryVisible] = useState(false);

    function toggleTornDiary() {
        isTornDiaryVisible ? setIsTornDiaryVisible(false) : setIsTornDiaryVisible(true);
    }

    const [isSignVisible, setIsSignVisible] = useState(false);

    function toggleSign() {
        isSignVisible ? setIsSignVisible(false) : setIsSignVisible(true);
    }

    const [isLegsAvailable, setIsLegsAvailable] = useState(false);
    const [isLegsVisible, setIsLegsVisible] = useState(false);

    function toggleLegs() {
        isLegsVisible ? setIsLegsVisible(false) : setIsLegsVisible(true);
        console.log("toggleLegs: " + isLegsVisible);
    }

    const [isNumBusAvailable, setIsNumBusAvailable] = useState(false);
    const [isNumBusVisible, setIsNumBusVisible] = useState(false);

    function toggleNumBus() {
        isNumBusVisible ? setIsNumBusVisible(false) : setIsNumBusVisible(true);
        console.log("toggleNumBus: " + isNumBusVisible);
    }

    const [isKnobMessageAvailable, setIsKnobMessageAvailable] = useState(false);

    const [isKnobMessageVisible, setIsKnobMessageVisible] = useState(false);

    function toggleKnobMessage() {
        isKnobMessageVisible ? setIsKnobMessageVisible(false) : setIsKnobMessageVisible(true);
        console.log("toggleKnobMessage: " + isKnobMessageVisible);
    }

    const [isSafeVisible, setIsSafeVisible] = useState(false);

    const [isSafeInfoVisible, setIsSafeInfoVisible] = useState(false);

    function toggleSafe() {
        isSafeInfoVisible ? setIsSafeInfoVisible(false) : setIsSafeInfoVisible(true);
        console.log("toggleSafe: " + isSafeVisible);
    }

    /* backpack functions */
    const [isLightOn, setIsLightOn] = useState(false);

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
                            gameBackpack[i].src = "https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/blacklight-using.png"
                            localStorage.setItem("light", "https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/blacklight-using.png");
                        } else {
                            gameBackpack[i].src = "https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/blacklight-not-using.png"
                            localStorage.setItem("light", "https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/blacklight-not-using.png");
                        }
                    }
                }
                break;

            default:
        }
    }

    const [isLightVisible, setIsLightVisible] = useState(true);

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

    function lightInBackpack() {
        setIsLightVisible(false);
        setIsAlertVisible(true);
        setAlertText("Light is in backpack")
        setTimeout(() => {
            setIsAlertVisible(false);
        }, 3000);
        console.log("put black light in backpack");
        localStorage.setItem("light", "https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/blacklight-not-using.png");
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
                    src: 'https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/blacklight-not-using.png',
                    key: 'light'
                })
            }
        } else {
            console.log("push light to backpack");
            gameBackpack.push({
                src: 'https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/blacklight-not-using.png',
                key: 'light'
            })
        }
    }

    /* end stop 1 - game specific */
    return (
        <View position="relative" height="100%">
            <View ariaLabel="Main Container" className="main-container">
                <View className="image-holder image-short" ariaLabel="Image Holder"
                      backgroundImage="url('https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/background-game-new.jpg')">
                    {/* all games */}
                    <TopRight isHelpVisible={isHelpVisible} setIsHelpVisible={setIsHelpVisible}
                              areNotesVisible={areNotesVisible} setAreNotesVisible={setAreNotesVisible}
                              isBackpackVisible={isBackpackVisible} setIsBackpackVisible={setIsBackpackVisible}
                              gameBackpack={gameBackpack} showItemContents={showItemContents}/>
                    {/* end all games */}

                    {/* static, non-clickable items */}
                    <View ariaLabel="Back Picnic Table" className="back-picnic-table z-Index-not-clicked">
                        <Image
                            src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/blue-table-right.png"/>
                    </View>
                    <View ariaLabel="Tree Circle" className="tree-circle z-Index-not-clicked">
                        <Image
                            src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/brown-circle.png"/>
                    </View>
                    {/* end static, non-clickable items */}

                    <View ariaLabel="Bottom Blue Table" className="bottom-blue-table clickable"
                          onClick={() => toggleNumBus()}>
                        <Image
                            src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/blue-table-left-writing.png"/>
                    </View>
                    <View className={isNumBusVisible ? "cover-screen show-gradual" : "all-screen hide"}>
                        <View className="all-screen show">
                            <View textAlign="center">
                                <Button className="button small" onClick={() => setCluesFunction(
                                    "  ** start clue (blue table) ==> Most Famous Cat Here <== end clue ** "
                                    , clues, setAlertText, setIsAlertVisible, setClues)}>add clue below to
                                    notes</Button>
                            </View>
                            <View className="blue-table-message">
                                Most Famous Cat Here!
                            </View>
                            <View width="100%" textAlign='center' marginTop="5px">
                                <Button className="button action-button small" onClick={() => toggleNumBus()}>tap to
                                    close this window</Button>
                            </View>
                        </View>
                    </View>

                    <View ariaLabel="Red Table 2 chairs" className="red-table-2-chairs clickable z-index-behind"
                          onClick={() => toggleLegs()}>
                        <Image
                            src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/red-table-left-writing.png"/>
                    </View>
                    <View className={isLegsVisible ? "cover-screen show-gradual" : "all-screen hide"}>
                        <View className="all-screen show">
                            <View textAlign="center">
                                <Button className="button small" onClick={() => setCluesFunction(
                                    "  ** start clue (red table) ==> What brand of chocolate does Tybean use in its Mocha? <== end clue ** "
                                    , clues, setAlertText, setIsAlertVisible, setClues)}>add clue below to
                                    notes</Button>
                            </View>
                            <View className="red-table-message">
                                What brand of chocolate does Tybean use in its Mocha?
                            </View>
                            <View width="100%" textAlign='center' marginTop="5px">
                                <Button className="button action-button small" onClick={() => toggleLegs()}>tap to close
                                    this window</Button>
                            </View>
                        </View>
                    </View>

                    {isKnobMessageAvailable ? (
                        <View ariaLabel="Red Table 4 chairs" className="red-table-4-chairs clickable"
                              onClick={() => toggleKnobMessage()}>
                            <Image
                                src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/red-table-right.png"/>
                        </View>
                    ) : (<View ariaLabel="Red Table 4 chairs" className="red-table-4-chairs z-Index-not-clicked">
                        <Image
                            src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/red-table-right.png"/>
                    </View>)
                    }
                    <View
                        className={isKnobMessageVisible && isKnobMessageAvailable ? "red-table-4-chairs z-index20 show" : "hide"}
                        onClick={() => toggleKnobMessage()}>
                        <Image
                            src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/red-table-right-message.png"/>
                    </View>

                    <View className={isLightVisible ? "black-light clickable show" : "hide"}
                          onClick={() => lightInBackpack()}>
                        <Image
                            src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/blacklight.png"/>
                    </View>

                    <View ariaLabel="Torn Diary" className="torn-diary clickable" onClick={() => toggleTornDiary()}>
                        <Image alt="torn diary"
                               src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/torndiarypage.png"/>
                    </View>
                    <View className={isTornDiaryVisible ? "cover-screen show-gradual" : "all-screen hide"}>
                        <View className="all-screen show">
                            <View textAlign="center">
                                <Button className="button small" onClick={() => setCluesFunction(
                                    "  ** start clue (torn diary page)  ==> The Police were trying to find me, so I hid somewhere HOT. <== end clue ** "
                                    , clues, setAlertText, setIsAlertVisible, setClues)}>add clue below to
                                    notes</Button>
                            </View>
                            <View paddingTop="70px" paddingLeft="45px" className="torn-diary-big-jaycee big-width">
                                The Police were trying<br/>
                                to find me, <br/>
                                so I hid somewhere<br/>
                                HOT.
                            </View>
                            <View width="100%" textAlign='center' marginTop="5px">
                                <Button className="button action-button small" onClick={() => toggleTornDiary()}>tap to
                                    close this window</Button>
                            </View>
                        </View>
                    </View>

                    <View ariaLabel="Diary" className="diary clickable" onClick={() => toggleDiary()}>
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/diary.png"/>
                    </View>
                    <View className={isDiaryVisible ? "cover-screen show-gradual" : "all-screen hide"}>
                        <View className="all-screen show">
                            <View textAlign="center">
                                <Button className="button small" onClick={() => setCluesFunction(
                                    "  ** start clue (diary) ==> Dear Diary, I learned about a cat.  I saw the shops.  What was in that Mocha?  Where did I hide from Cops? <== end clue ** "
                                    , clues, setAlertText, setIsAlertVisible, setClues)}>add clue below to
                                    notes</Button>
                            </View>
                            <View className="diary-big-jaycee big-width">
                                Dear Diary, <br/><br/>I learned about a cat.<br/><br/>I saw the shops.<br/><br/>What was
                                in that Mocha?<br/><br/>Where did I hide from Cops?
                            </View>
                            <View width="100%" textAlign='center' marginTop="5px">
                                <Button className="button action-button small" onClick={() => toggleDiary()}>tap to
                                    close this window</Button>
                            </View>
                        </View>
                    </View>

                    <View ariaLabel="Tree with Sign" className="tree-with-sign clickable" onClick={() => toggleSign()}>
                        <Image
                            src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/tree-with-sign.png"/>
                    </View>
                    <View className={isSignVisible ? "cover-screen show-gradual" : "all-screen hide"}>
                        <View className="all-screen show">
                            <View textAlign="center">
                                <Button className="button small" onClick={() => setCluesFunction(
                                    "  ** start clue (hanging sign)  ==> Look at the Little shops on West side of Tybee Oaks. " +
                                    "Go from South to North. What word do you see? Letter #6, Letter #3, Letter #14, Letter #4 <== end clue ** "
                                    , clues, setAlertText, setIsAlertVisible, setClues)}>add clue below to
                                    notes</Button>
                            </View>
                            <View paddingTop="90px" className="hanging-sign-big-jaycee big-width">
                                <View>Look at the Little shops on West <br/>side of Tybee Oaks.
                                    <br/>Go from South to North. <br/>
                                    What word do you see?
                                    <br/><strong>Letter #6</strong><br/><strong>Letter #3</strong><br/><strong>Letter
                                        #14</strong><br/><strong>Letter #4</strong>
                                </View>
                            </View>
                            <View width="100%" textAlign='center' marginTop="5px">
                                <Button className="button action-button small" onClick={() => toggleSign()}>tap to close
                                    this window</Button>
                            </View>
                        </View>
                    </View>

                    <View ariaLabel="Palm Tree" className="palm-tree z-index-not-clicked">
                        <Image
                            src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/palm-tree.png"/>
                        {isSafeVisible ? (
                            <View
                                ariaLabel="Safe"
                                className="safe clickable"
                                onClick={() => toggleSafe()}>
                                <Image
                                    src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/safe-right-closed.png"/>
                            </View>
                        ) : null}
                        {(!isWrong1 && !isWrong2 && !isWrong3 && !isWrong4) ? (
                            <View ariaLabel="safe open" className="safe">
                                <Image
                                    src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/safe-right-open.png"/>
                            </View>
                        ) : null}
                        {(!isWrong1 && !isWrong2 && !isWrong3 && !isWrong4) ? (
                            <View ariaLabel="safe open jewels" className="safe">
                                <Image
                                    src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/safe-right-open-jewels.png"/>
                            </View>
                        ) : null}
                    </View>

                    <View ariaLabel="Tybean Octopus" className="tybean-octopus clickable" onClick={() => countClicks()}>
                        <Image
                            src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/tybean-octopus.png"/>
                    </View>
                </View>{/* end Image Holder */}

                {/* puzzle solving */}
                <View className={isSafeInfoVisible ? "cover-screen show-gradual" : "all-screen hide"}>
                    <View className="all-screen show">
                        <Button className="close-button" onClick={() => toggleSafe()}>X</Button>
                        <div>Try to Open Safe!</div>
                        <br/>
                        <TextField
                            label="Word 1 (4 letters)"
                            value={guess1}
                            onChange={(e) => checkAnswer(e.currentTarget.value, guess2, guess3, guess4)}/>
                        {(haveGuessed1 && isWrong1 && !showComment) ? (
                            <span className="red"> Wrong Answer!</span>
                        ) : null
                        }
                        {(!isWrong1 && !showComment) ? (
                            <span className="green"> Right Answer!</span>
                        ) : null
                        }
                        <TextField
                            label="Word 2 (4 letters)"
                            value={guess2}
                            onChange={(e) => checkAnswer(guess1, e.currentTarget.value, guess3, guess4)}/>
                        {
                            (haveGuessed2 && isWrong2 && !showComment) ? (
                                <span className="red"> Wrong Answer!</span>
                            ) : null
                        }
                        {
                            (!isWrong2 && !showComment) ? (
                                <span className="green"> Right Answer!</span>
                            ) : null
                        }
                        <TextField
                            label="Word 3 (11 letters)"
                            value={guess3}
                            onChange={(e) => checkAnswer(guess1, guess2, e.currentTarget.value, guess4)}/>
                        {
                            (haveGuessed3 && isWrong3 && !showComment) ? (
                                <span className="red"> Wrong Answer!</span>
                            ) : null
                        }
                        {
                            (!isWrong3 && !showComment) ? (
                                <span className="green"> Right Answer!</span>
                            ) : null
                        }
                        <TextField
                            label="Word 4 (7 letters)"
                            value={guess4}
                            onChange={(e) => checkAnswer(guess1, guess2, guess3, e.currentTarget.value)}/>
                        {
                            (haveGuessed4 && isWrong4 && !showComment) ? (
                                <span className="red"> Wrong Answer!</span>
                            ) : null
                        }
                        {
                            (!isWrong4 && !showComment) ? (
                                <span className="green"> Right Answer!</span>
                            ) : null
                        }
                        <View width="100%" textAlign='center' marginTop="5px">
                            <Button className="button action-button small" onClick={() => toggleSafe()}>tap to close
                                this window</Button>
                            <br/><Button className={areNotesVisible ? "hide" : "link-button small"}
                                         onClick={() => toggleNotes(areNotesVisible, setAreNotesVisible)}>open
                            notes</Button>
                        </View>
                        {(!isWrong1 && !isWrong2 && !isWrong3 && !isWrong4 && !showComment) ? (
                            <View textAlign="center" marginTop="1em">
                                <View className="green"> Right Answer! <br/>(window will close in 3 seconds)</View>
                            </View>
                        ) : (
                            <NotesOpen areNotesVisible={areNotesVisible} clues={clues} setClues={setClues}
                                       setAreNotesVisible={setAreNotesVisible} toggleNotes={toggleNotes}
                                       gameNotes={gameNotes} setGameNotes={setGameNotes}/>
                        )
                        }
                    </View>
                </View>

                {(!isWrong1 && !isWrong2 && !isWrong3 && !isWrong4 && !showComment) ? (
                    <View className={isWinnerScreenVisible ? "show" : "hide"}>
                        <View className="black-box">
                            <h3>WINNER!</h3>
                            <View>Now you can return all the items to their rightful owners!</View>
                            <View marginTop="20px">
                                <Image
                                    src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/safe-right-open-jewels.png"/>
                            </View>
                        </View>

                        <View className="bottom z-index125">
                            <View color="white">Total Time: {gameTimeTotal}</View>
                            <Button className="button" onClick={() => leaveComment(setShowComment)}>Please Tap to Leave
                                Comment</Button>
                        </View>
                    </View>
                ) : null}

                {(showComment) ? (
                    <CommentWindow setGameComments={setGameComments} gameComments={gameComments}/>
                ) : null}

                <View className={isHelpVisible ? "cover-screen show-gradual" : "hide"}>
                    <View className="all-screen show">
                        <Button className="close-button"
                                onClick={() => toggleHelp(isHelpVisible, setIsHelpVisible)}>X</Button>
                        <View width="100%" padding="10px">
                            <View paddingBottom="10px">
                                <strong>Game Stop</strong>: <span className="font-small">{gameStop}</span>
                            </View>
                            <View paddingBottom="10px">
                                <strong>How to Play:</strong> Click around - some items will disappear and then appear
                                in
                                your backpack. If it is in your backpack you may be able to use it by clicking on it.
                            </View>
                            <View paddingBottom="10px">
                                <strong>Goal for this stop:</strong> open the safe!
                            </View>
                            <View paddingBottom="10px">
                                <strong>Hints:</strong> Clicking on a Hint costs <span
                                className="italics"> 5 Minutes!</span> Use Hints if you really need them.
                            </View>
                            <Flex wrap="wrap">
                                <Button className={(hintTime1 == 0) ? "button small" : "hide"}
                                        onClick={() => toggleHint1(setHintTime1, isHint1Visible, setIsHint1Visible, hintTime1, setGameTimeHint, gameTimeHint)}>Open
                                    Hint (shops) - adds 5 minutes</Button>
                                <Button className={(hintTime1 == 0) ? "hide" : "button small"}
                                        onClick={() => toggleHint1(setHintTime1, isHint1Visible, setIsHint1Visible, hintTime1, setGameTimeHint, gameTimeHint)}>Open
                                    Hint (shops) - free now</Button>
                                <Button className={(hintTime2 == 0) ? "button small" : "hide"}
                                        onClick={() => toggleHint2(setHintTime2, isHint2Visible, setIsHint2Visible, hintTime2, setGameTimeHint, gameTimeHint)}>Open
                                    Hint (famous cat) - adds 5 minutes</Button>
                                <Button className={(hintTime2 == 0) ? "hide" : "button small"}
                                        onClick={() => toggleHint2(setHintTime2, isHint2Visible, setIsHint2Visible, hintTime2, setGameTimeHint, gameTimeHint)}>Open
                                    Hint (famous cat) - free now</Button>
                                <Button className={(hintTime3 == 0) ? "button small" : "hide"}
                                        onClick={() => toggleHint3(setHintTime3, isHint3Visible, setIsHint3Visible, hintTime3, setGameTimeHint, gameTimeHint)}>Open
                                    Hint (light) - adds 5 minutes</Button>
                                <Button className={(hintTime3 == 0) ? "hide" : "button small"}
                                        onClick={() => toggleHint3(setHintTime3, isHint3Visible, setIsHint3Visible, hintTime3, setGameTimeHint, gameTimeHint)}>Open
                                    Hint (light) - free now</Button>
                                <Button className={(hintTime4 == 0) ? "button small" : "hide"}
                                        onClick={() => toggleHint4(setHintTime4, isHint4Visible, setIsHint4Visible, hintTime4, setGameTimeHint, gameTimeHint)}>Open
                                    Hint (words for safe) - adds 5 minutes</Button>
                                <Button className={(hintTime4 == 0) ? "hide" : "button small"}
                                        onClick={() => toggleHint4(setHintTime4, isHint4Visible, setIsHint4Visible, hintTime4, setGameTimeHint, gameTimeHint)}>Open
                                    Hint (words for safe) - free now</Button>
                            </Flex>
                            <br/><br/>
                            <View className={isHint4Visible ? "cover-screen show-gradual" : "hide"}>
                                <View className="winner show">
                                    <strong>Hint for somewhere order of numbers for safe:</strong>
                                    <br/><br/>The diary had a little rhyme. This rhyme tells you the order of the words.
                                    For example - what is the name of the cat you learned about? That is the first word.
                                    <View width="100%" textAlign='center'>
                                        <Button className="button action-button"
                                                onClick={() => toggleHint4(setHintTime4, isHint4Visible, setIsHint4Visible, hintTime4, setGameTimeHint, gameTimeHint)}>tap
                                            to close hint 4</Button>
                                    </View>
                                </View>
                            </View>
                            <View className={isHint3Visible ? "cover-screen show-gradual" : "hide"}>
                                <View className="winner show">
                                    <strong>Hint for light (in backpack):</strong>
                                    <br/><br/>Once you click on light it should go into your backpack. This is a
                                    blacklight and when you
                                    use it (click it in backpack to turn on) and click on objects you will see more
                                    clues.
                                    <br/><br/>
                                    <View width="100%" textAlign='center'>
                                        <Button className="button action-button"
                                                onClick={() => toggleHint3(setHintTime3, isHint3Visible, setIsHint3Visible, hintTime3, setGameTimeHint, gameTimeHint)}>tap
                                            to close hint 3</Button>
                                    </View>
                                </View>
                            </View>
                            <View className={isHint2Visible ? "cover-screen show-gradual" : "hide"}>
                                <View className="winner show">
                                    <strong>Hint for famous cat:</strong>
                                    <br/><br/>The famous cat has an awesome name for the Tybean Art & Coffee Bar (Bean).<br/><br/>
                                    <View width="100%" textAlign='center'>
                                        <Button className="button action-button"
                                                onClick={() => toggleHint2(setHintTime2, isHint2Visible, setIsHint2Visible, hintTime2, setGameTimeHint, gameTimeHint)}>tap
                                            to close hint 2</Button>
                                    </View>
                                </View>
                            </View>
                            <View className={isHint1Visible ? "cover-screen show-gradual" : "hide"}>
                                <div className="winner show">
                                    <strong>Hint for shops clue:</strong>
                                    <br/><br/>There are many little shops along the west side of the Tybee Oaks area -
                                    Inferno, Glazed and Confused are in the north part.
                                    The southern most shop on the west side is "Tipsy Mermaid Art", then "granny
                                    flounders", then "Casey Jones Photography", then "Rachel Vogel Designs".
                                    The 6th letter of the first (most southern) shop is "M". The 3rd letter of the 2nd
                                    shop is "A". The 14th letter of the third shop is "T". And the 4th letter of the 4th
                                    shop is "H".<br/><br/>
                                    <View width="100%" textAlign='center'>
                                        <Button className="button action-button"
                                                onClick={() => toggleHint1(setHintTime1, isHint1Visible, setIsHint1Visible, hintTime1, setGameTimeHint, gameTimeHint)}>tap
                                            to close hint 1</Button>
                                    </View>
                                </div>
                            </View>
                            <View width="100%" textAlign='center'>
                                <Button className="button action-button"
                                        onClick={() => toggleHelp(isHelpVisible, setIsHelpVisible)}>tap to close
                                    help</Button>
                                <Button className="link-button"
                                        onClick={() => toggleMap(isMapVisible, setIsMapVisible)}>tap to see location on
                                    map</Button>
                            </View>
                        </View>
                    </View>
                </View>

                {/* intro(s) */}
                <View className={isIntroVisible ? "cover-screen show-gradual" : "hide"}>
                    <View ariaLabel="stop 1 intro" textAlign="center" className="all-screen show">
                        <h3>Game Goals: Find The Thief's Hiding Place</h3>
                        <View marginBottom="5px">Location: 1 Stop at Tybean Coffee Bar</View>
                        <View>
                            <Image maxHeight="150px"
                                   src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/background-game-tybean-porch.jpg"/>
                        </View>
                        <View>
                            <span className="small"> <strong>Remember, your time to complete the game is your score and is calculated when you start playing. Hints add 5 minutes. Start Playing when you are here.</strong></span></View>
                        <Button className="button"
                                onClick={() => toggleIntro(isIntroVisible, setIsIntroVisible, setStopClock, gameTime, setGameTime, setRealTimeStart)}>tap
                            to play (time will start)</Button>
                        <Button className="link-button " onClick={() => toggleMap(isMapVisible, setIsMapVisible)}>tap to
                            see location on map</Button>
                    </View>
                </View>
                <GameIntro isGameIntroVisible={isGameIntroVisible} setIsGameIntroVisible={setIsGameIntroVisible}
                           numberOfPlayersError={numberOfPlayersError} numberOfPlayers={numberOfPlayers}
                           setNumberOfPlayers={setNumberOfPlayers} teamName={teamName} setTeamName={setTeamName}
                           gameStopNameArray={gameStopNameArray} setNumberOfPlayersError={setNumberOfPlayersError}
                           setIsIntroVisible={setIsIntroVisible}/>
                <View className={isAlertVisible ? "alert-container show" : "hide"}>
                    <div className='alert-inner'>{alertText}</div>
                </View>
                <View className={isMapVisible ? "cover-screen show-gradual" : "hide"}>
                    <View textAlign="center" className="all-screen show">
                        <Image maxHeight="300px"
                               src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/tybean-map.jpg"/>
                        <Link href="https://goo.gl/maps/GTDCK2z3Jr1xYonL8?coh=178571&entry=tt" isExternal={true}>link to
                            google maps</Link><br/>
                        <Button className="button action-button"
                                onClick={() => toggleHelp(isMapVisible, setIsMapVisible)}>tap to close map</Button>
                    </View>
                </View>
            </View> {/* end main-container */}
            <TimeBlock gameTimeHint={gameTimeHint} realTimeStart={realTimeStart}/>
            <NotesOpen areNotesVisible={areNotesVisible} clues={clues} setClues={setClues}
                       setAreNotesVisible={setAreNotesVisible} toggleNotes={toggleNotes} gameNotes={gameNotes}
                       setGameNotes={setGameNotes}/>
        </View>
    )
}