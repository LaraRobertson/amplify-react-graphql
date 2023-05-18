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
    toggleHint4, setGameNotesFunction,
} from "../../components/helper";
import {shallowEqual} from "../../components/ShallowEqual";
import {NotesOpen, TopRight, GameIntro, TimeBlock, CommentWindow} from "../../components/sharedComponents";

export function Memorial() {
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

    /* guessing states and answers for safe - 4 words */
    const [guess1, setGuess1] = useState('');
    const [haveGuessed1, setHaveGuessed1] = useState(false);
    const [isWrong1, setIsWrong1] = useState(true);
    const [answer1] = useState("ten");

    const [guess2, setGuess2] = useState('');
    const [haveGuessed2, setHaveGuessed2] = useState(false);
    const [isWrong2, setIsWrong2] = useState(true);
    const [answer2] = useState("3");

    const [guess3, setGuess3] = useState('');
    const [haveGuessed3, setHaveGuessed3] = useState(false);
    const [isWrong3, setIsWrong3] = useState(true);
    const [answer3] = useState("6");

    const [guess4, setGuess4] = useState('');
    const [haveGuessed4, setHaveGuessed4] = useState(false);
    const [isWrong4, setIsWrong4] = useState(true);
    const [answer4] = useState("10");

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
        /* close safe windo */
        if (x == 4) {
            console.log("close safe window");
            /* set timeout to close window? */
            /* isSafeInfoVisible - close in 3 seconds because solved*/
            setTimeout(() => {
                setIsSafeInfoVisible(false);
            }, 3000);

        }
    }

    function winGame() {
        console.log("stop 1 win game");
        setGameComplete(true);
        /* set timeout to close window? */
        setTimeout(() => {
            setIsWinnerScreenVisible(true);
        }, 3000);
        winGameFunction(true, gameScoreID, gameTime, gameStop, gameTimeTotal, setGameTimeTotal, gameTimeHint, numberOfPlayers, teamName, realTimeStart,
            hintTime1, hintTime2, hintTime3, hintTime4);
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

    const [isSafeInfoVisible, setIsSafeInfoVisible] = useState(false);
    function toggleSafeInfo() {
        isSafeInfoVisible ? setIsSafeInfoVisible(false) : setIsSafeInfoVisible(true);
    }

    /* backpack functions */
    /* backpack items: key */
    /* key is used to open sandbag vault */
    const [isKeyOn, setIsKeyOn] = useState(false);
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
                            gameBackpack[i].src = "https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/key-using.png"
                            localStorage.setItem("key", "https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/key-using.png");
                        } else {
                            gameBackpack[i].src = "https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/key-not-using.png"
                            localStorage.setItem("key", "https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/key-not-using.png");
                        }
                    }
                }
                break;
            default:
        }
    }
    /* remove key from window and put in backpack and turn off on in backpack */
    const [isKeyVisible, setIsKeyVisible] = useState(true);
    function keyInBackpack() {
        setIsKeyVisible(false);
        setIsAlertVisible(true);
        setAlertText('Key is in backpack')
        setTimeout(() => {
            setIsAlertVisible(false);
        }, 3000);
        console.log("put key in backpack");
        localStorage.setItem("key", "https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/key-not-using.png");
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
                    src: 'https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/key-not-using.png',
                    key: 'key'
                })
            }
        } else {
            console.log("push key to backpack (1st item)");
            gameBackpack.push({
                src: 'https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/key-not-using.png',
                key: 'key'
            })
        }
    }
    /* end stop 1 - game specific */
    return (
        <View position="relative" height="100%">
            <View ariaLabel="Main Container" className="main-container">
                <View className="image-holder image-short" ariaLabel="Image Holder"
                      backgroundImage="url('https://escapeoutbucket213334-staging.s3.amazonaws.com/public/memorial/background-game-memorial-park.jpg')">
                    {/* all games */}
                    <TopRight isHelpVisible={isHelpVisible} setIsHelpVisible={setIsHelpVisible}
                              areNotesVisible={areNotesVisible} setAreNotesVisible={setAreNotesVisible}
                              isBackpackVisible={isBackpackVisible} setIsBackpackVisible={setIsBackpackVisible}
                              gameBackpack={gameBackpack} showItemContents={showItemContents}/>
                    {/* end all games */}

                    {/* static, non-clickable items */}
                    {/* end static, non-clickable items */}

                    <View ariaLabel="Playground Sign" className="bottom25 left0 absolute clickable"
                          onClick={() => toggleSign()}>
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/memorial/playground-sign.png"/>
                    </View>
                    <View className={isSignVisible ? "cover-screen show-gradual" : "all-screen hide"}>
                        <View className="all-screen show">
                            <View textAlign="center">
                                <Button className="button small" onClick={() => setCluesFunction(
                                    "  ** start clue (playground sign)  ==> line 1: Cyvqdv, jvcbjm qgl cjboyvtd |" +
                                    " line 2: Cjwvjv sv dwngqyvj mbfm cjboyvtv | " +
                                    " line 3: Jvcbjmv pfqyafwvj cjboyvtq. Cbj uqebj. <== end clue ** "
                                    , clues, setAlertText, setIsAlertVisible, setClues)}>add clue below to
                                    notes</Button>
                            </View>
                                <View textAlign="center" padding="40px 0">
                                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/memorial/playground-sign-big.png" />
                                </View>
                                <View width="100%" textAlign='center' marginTop="5px">
                                    <Button className="button action-button small" onClick={() => toggleSign()}>tap to close
                                        this window</Button>
                                </View>
                        </View>
                    </View>

                    {isKeyOn ? (
                        <View ariaLabel="garbage can" className="bottom15 right0 absolute clickable"
                              onClick={() => winGame()}>
                            <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/memorial/garbage-can.png"/>
                        </View>
                    ) : (
                        <View ariaLabel="garbage can" className="bottom15 right0 absolute z-index-not-clicked">
                            <Image
                                src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/memorial/garbage-can.png"/>
                        </View>)
                    }
                    <View ariaLabel="garbage can" className={gameComplete ? "bottom15 right0 absolute clickable" : "hide"}>
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/memorial/garbage-can-baby.png"/>
                    </View>

                    {/* show closed safe if haven't guessed or guess is wrong */}
                    { !isWrong1 && !isWrong2 && !isWrong3 && !isWrong4  ?   (
                        <View>
                            <View className="bottom10 left0 absolute clickable">
                                <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/safe-right-open.png" />
                                <View margin="0 0 10px 15px" className={isKeyVisible ? "bottom10 left0 absolute clickable show" : "hide"}
                                      onClick={()=>keyInBackpack()} >
                                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/key.png" />
                                </View>

                            </View>

                        </View>
                    ) : <View ariaLabel="Safe" className="bottom10 left0 absolute clickable" onClick={()=>toggleSafeInfo()}>
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/safe-right-closed.png"/>
                    </View>
                    }

                    <View ariaLabel="Diary" className="bottom10 right0 absolute clickable" onClick={()=>toggleDiary()}>
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/diary.png" />
                    </View>
                    <View className={isDiaryVisible? "cover-screen show-gradual" : "all-screen hide"}>
                        <View className="all-screen show">
                            <View textAlign="center">
                                <Button className="button small" onClick={()=>setCluesFunction(
                                    "  ** start clue (diary) ==> Dear Diary, Answer 1: MVG (playground fun) | Answer 2: Slides that are blue" +
                                    " | Answer 3: # of sides on bench surrounding tree< | Answer 4: # T's <br />on closest tennis court door <== end clue ** "
                                    ,clues,setAlertText,setIsAlertVisible,setClues)}>add clue below to notes</Button>
                            </View>
                            <Button className="close-button" onClick={()=>toggleDiary()}>X</Button>
                            <View className="diary-big-jaycee" lineHeight="16px">
                                Dear Diary, <br /><br />Answer 1: MVG (playground fun)<br/><br/>Answer 2: Slides that are blue<br /><br />
                                Answer 3: # of sides on <br />bench surrounding tree<br /><br />Answer 4: # T's <br />on closest tennis <br />court door
                            </View>
                            <View width="100%" textAlign='center' marginTop="5px">
                                <Button className="button action-button small" onClick={()=>toggleDiary()}>tap to close this window</Button>
                            </View>
                        </View>
                    </View>


                </View>{/* end Image Holder */}

                {/* puzzle solving */}
                <View className={isSafeInfoVisible ? "cover-screen show-gradual" : "all-screen hide"}>
                    <View className="all-screen show">
                        <Button className="close-button" onClick={() => toggleSafeInfo()}>X</Button>
                        <div>Try to Open Safe!</div>
                        <br/>
                        <TextField
                            label="Answer 1 (3 letters)"
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
                            label="Answer 2 (number)"
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
                            label="Answer 3 (number)"
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
                            label="Answer 4 (number)"
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
                            <Button className="button action-button small" onClick={() => toggleSafeInfo()}>tap to close
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
                            <NotesOpen areNotesVisible={areNotesVisible} clues={clues} setClues={setClues} setAreNotesVisible={setAreNotesVisible} toggleNotes={toggleNotes} gameNotes={gameNotes} setGameNotes={setGameNotes} setGameNotesFunction={setGameNotesFunction}/>

                        )
                        }
                    </View>
                </View>

                {(!isWrong1 && !isWrong2 && !isWrong3 && !isWrong4 & gameComplete && !showComment) ? (
                    <View className={isWinnerScreenVisible ? "show" : "hide"}>
                        <View className="black-box">
                            <h3>WINNER!</h3>
                            <View>Yeah the baby is safe!</View>
                            <View marginTop="20px">
                                <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/memorial/garbage-can-baby.png"/>
                            </View>
                        </View>

                        <View className="bottom z-index125">
                            <View color="white">Total Time: {gameTimeTotal}</View>
                            <Button className="button small" onClick={() => leaveComment(setShowComment)}>Tap to Leave Comment (to help make game better)</Button>

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
                                <strong>How to Play:</strong> Tap around - some items will disappear and then appear
                                in
                                your backpack.<br /> <span className="italics">If it is in your backpack you may be able to use it by tapping on it.</span>
                            </View>
                            <View paddingBottom="10px">
                                <strong>Goal for this stop:</strong> Find the Baby!
                            </View>
                            <View paddingBottom="10px">
                                <strong>Hints:</strong> Tapping on a Hint costs <span
                                className="italics"> 5 Minutes!</span> Use Hints if you really need them.
                            </View>
                            <Flex wrap="wrap">
                                <Button className={(hintTime1 == 0) ? "button small" : "hide"}
                                        onClick={() => toggleHint1(setHintTime1, isHint1Visible, setIsHint1Visible, hintTime1, setGameTimeHint, gameTimeHint)}>Open
                                    Hint (playground fun) - adds 5 minutes</Button>
                                <Button className={(hintTime1 == 0) ? "hide" : "button small"}
                                        onClick={() => toggleHint1(setHintTime1, isHint1Visible, setIsHint1Visible, hintTime1, setGameTimeHint, gameTimeHint)}>Open
                                    Hint (playground fun) - free now</Button>
                                <Button className={(hintTime2 == 0) ? "button small" : "hide"}
                                        onClick={() => toggleHint2(setHintTime2, isHint2Visible, setIsHint2Visible, hintTime2, setGameTimeHint, gameTimeHint)}>Open
                                    Hint (slides) - adds 5 minutes</Button>
                                <Button className={(hintTime2 == 0) ? "hide" : "button small"}
                                        onClick={() => toggleHint2(setHintTime2, isHint2Visible, setIsHint2Visible, hintTime2, setGameTimeHint, gameTimeHint)}>Open
                                    Hint (slides) - free now</Button>
                                <Button className={(hintTime3 == 0) ? "button small" : "hide"}
                                        onClick={() => toggleHint3(setHintTime3, isHint3Visible, setIsHint3Visible, hintTime3, setGameTimeHint, gameTimeHint)}>Open
                                    Hint (bench) - adds 5 minutes</Button>
                                <Button className={(hintTime3 == 0) ? "hide" : "button small"}
                                        onClick={() => toggleHint3(setHintTime3, isHint3Visible, setIsHint3Visible, hintTime3, setGameTimeHint, gameTimeHint)}>Open
                                    Hint (bench) - free now</Button>
                                <Button className={(hintTime4 == 0) ? "button small" : "hide"}
                                        onClick={() => toggleHint4(setHintTime4, isHint4Visible, setIsHint4Visible, hintTime4, setGameTimeHint, gameTimeHint)}>Open
                                    Hint (door) - adds 5 minutes</Button>
                                <Button className={(hintTime4 == 0) ? "hide" : "button small"}
                                        onClick={() => toggleHint4(setHintTime4, isHint4Visible, setIsHint4Visible, hintTime4, setGameTimeHint, gameTimeHint)}>Open
                                    Hint (door) - free now</Button>
                            </Flex>
                            <br/><br/>
                            <View className={isHint4Visible ? "cover-screen show-gradual" : "hide"}>
                                <View className="winner show">
                                    <Button className="close-button"
                                            onClick={() => toggleHint3(setHintTime3, isHint3Visible, setIsHint3Visible, hintTime3, setGameTimeHint, gameTimeHint)}>X</Button>
                                    <strong>Hint for T's on Tennis court door:</strong>
                                    <br/><br/>There are 2 signs on closest tennis court door.<br /><br />One says "Courts For Tennis or Pickleball only....." that sign has 5 T's.<br />
                                    <br />The other one says "Pets Prohibited on the Tennis Courts" <br />and that sign has 5 T's.<br /><br />
                                    <View width="100%" textAlign='center'>
                                        <Button className="button action-button"
                                                onClick={() => toggleHint4(setHintTime4, isHint4Visible, setIsHint4Visible, hintTime4, setGameTimeHint, gameTimeHint)}>tap
                                            to close hint 4</Button>
                                    </View>
                                </View>
                            </View>
                            <View className={isHint3Visible ? "cover-screen show-gradual" : "hide"}>
                                <View className="winner show">
                                    <strong>Hint for sides on Bench:</strong>
                                    <br/><br/>There is a bench near the playground entrance.<br /><br />
                                    It is blue and goes all around the tree. <br />
                                    It has 6 sides.
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
                                    <Button className="close-button"
                                            onClick={() => toggleHint2(setHintTime2, isHint2Visible, setIsHint2Visible, hintTime2, setGameTimeHint, gameTimeHint)}>X</Button>
                                    <strong>Hint for slides that are blue:</strong>
                                    <br/><br/>There are many slides on the playground but only 3 are blue.<br/><br/>
                                    There are 2 right next to each other and one that is covered.<br /><br />
                                    <View width="100%" textAlign='center'>
                                        <Button className="button action-button"
                                                onClick={() => toggleHint2(setHintTime2, isHint2Visible, setIsHint2Visible, hintTime2, setGameTimeHint, gameTimeHint)}>tap
                                            to close hint 2</Button>
                                    </View>
                                </View>
                            </View>
                            <View className={isHint1Visible ? "cover-screen show-gradual" : "hide"}>
                                <div className="winner show">
                                    <Button className="close-button" onClick={() => toggleHint1(setHintTime1, isHint1Visible, setIsHint1Visible, hintTime1, setGameTimeHint, gameTimeHint)}>X</Button>
                                    <strong>Hint for playground fun:</strong>
                                    <br/><br/>The clue in the diary for playground fun is: "MVG"<br/>
                                    This is a simple cipher that substitutes one letter for another A=Q and Q=A. <br /><br /> The key is the clue on the playground sign.
                                    <br />line 1: Cyvqdv, jvcbjm qgl cjboyvtd
                                    <br />line 2: Cjwvjv sv dwngqyvj mbfm cjboyvtv
                                    <br />line 3: Jvcbjmv pfqyafwvj cjboyvtq. Cbj uqebj.<br /><br />
                                    on real sign:
                                    <br />line 1: Please report any problems
                                    <br />line 2: Priere de signaler tout probleme
                                    <br />line 3: Reporte cualquier problema. Por favor.<br /><br />
                                    "M" is in "problems" on first line, it is "T".<br />
                                    "V" is third letter on first line, it is "E".<br />
                                    "G" is in third word on first line, it is "N"<br /><br />
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
                        <h3>Stop 1 Intro</h3>
                        <h3>Game Goals: Find The Baby!</h3>
                        <View marginBottom="5px">Location: 1 Stop at Memorial Park</View>
                        <View>
                            <span className="small"> <strong>Remember, your time to complete the game is your score and is calculated when you start playing. Hints add 5 minutes.</strong> </span><br />
                            <strong>Start Playing when you are here:</strong>
                        </View>
                        <View>
                            <Image maxHeight="150px"
                                   src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/memorial/gameImage-memorial-park.jpg"/>
                        </View>
                        <Button className="button"
                                onClick={() => toggleIntro(isIntroVisible, setIsIntroVisible, setStopClock, gameTime, setGameTime, setRealTimeStart)}>tap
                            to play (time will start)</Button>
                        <Button className="link-button " onClick={() => toggleMap(isMapVisible, setIsMapVisible)}>tap to
                            see location on map</Button>
                        <View className="navigate-message">(please use buttons to navigate, back button doesn't work as well)</View>
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
                               src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/memorial/memorial-map.png"/>
                        <Link href="https://goo.gl/maps/HEAuNi2rCoFr6UAL7?coh=178571&entry=tt" isExternal={true}>link to
                            google maps</Link><br/>
                        <Button className="button action-button"
                                onClick={() => toggleHelp(isMapVisible, setIsMapVisible)}>tap to close map</Button>
                    </View>
                </View>
            </View> {/* end main-container */}
            <TimeBlock gameTimeHint={gameTimeHint} realTimeStart={realTimeStart}/>
            <NotesOpen areNotesVisible={areNotesVisible} clues={clues} setClues={setClues} setAreNotesVisible={setAreNotesVisible} toggleNotes={toggleNotes} gameNotes={gameNotes} setGameNotes={setGameNotes} setGameNotesFunction={setGameNotesFunction}/>

        </View>
    )
}