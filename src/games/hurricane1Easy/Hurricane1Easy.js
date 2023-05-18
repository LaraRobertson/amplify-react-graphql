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

export function Hurricane1Easy() {
    /* for all games */
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [isWinnerScreenVisible, setIsWinnerScreenVisible] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [showComment, setShowComment] = useState(false);
    const [areNotesVisible, setAreNotesVisible] = useState(false);
    const [isHelpVisible, setIsHelpVisible] = useState(false);
    const [gameNotes,setGameNotes] = useState('');
    const [clues, setClues] = useState('');
    const [isMapVisible, setIsMapVisible] = useState(false);
    const [gameComments,setGameComments] = useState('');
    const [isBackpackVisible, setIsBackpackVisible] = useState(false);
    const [gameBackpack, setGameBackpack] = useState([]);
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
    const [stopClock, setStopClock] = useState(true);
    const [realTimeStart, setRealTimeStart] = useState();
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
        /* set local storage for gameStop - only on mount - to recover from refresh */
        setGameStopFunction(setGameStop,setNumberOfTimes,setGameID,setGameStatsID,setGameStopNameArray,
            setGameStopName,setGameScoreID,setIsGameIntroVisible,setIsIntroVisible, gameTime,setGameTime,setGameTimeHint,
            setIsAlertVisible, setAlertText, setTeamName, setStopClock, setHintTime1, setHintTime2, setHintTime3, setHintTime4, setRealTimeStart,
            setGameNotes,setClues);
    }, []);
    /* always scroll to top */
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const navigate = useNavigate();

    /* end for all games */

    /* STOP 1 */
    /* guessing states and answers for 1st safe - 3 words */
    /* game answers */
    const [guess1, setGuess1] = useState('');
    const [haveGuessed1, setHaveGuessed1] = useState(false);
    const [isWrong1, setIsWrong1] = useState(true);
    const [answer1] = useState("Wesseling");

    const [guess2, setGuess2] = useState('');
    const [haveGuessed2, setHaveGuessed2] = useState(false);
    const [isWrong2, setIsWrong2] = useState(true);
    const [answer2] = useState("Guard");

    const [guess3, setGuess3] = useState('');
    const [haveGuessed3, setHaveGuessed3] = useState(false);
    const [isWrong3, setIsWrong3] = useState(true);
    const [answer3] = useState("baseball");

    /* end guessing states and answers for 1st safe - 3 words */

    function checkAnswer(guess1Val, guess2Val, guess3Val) {
        setGuess1(guess1Val);
        setGuess2(guess2Val);
        setGuess3(guess3Val);
        let x = 0;
        console.log("guess: " + guess1);
        if (guess1Val != '' && shallowEqual(guess1Val,answer1)) {
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
        if (guess2Val != '' && shallowEqual(guess2Val,answer2)) {
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
        if (guess3Val != '' && shallowEqual(guess3Val,answer3)) {
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
        /* set wingame */
        if (x == 3) {
            console.log("stop 1 open safe");
            /* set timeout to close window? */
            /* isSafeInfoVisible - close in 3 seconds because solved*/
            setTimeout(() => {
                setIsSafeInfoVisible(false);
            }, 3000);

        }
    }
    /* end guessing states and answers for 1st  safe - 3 words */

    /* FINAL: guessing states and answers for 2nd safe - 1 word */
    const [guess4,setGuess4] = useState('');
    const [haveGuessed4,setHaveGuessed4] = useState();
    const [isWrong4, setIsWrong4] = useState(true);
    const [answer4] = useState('wus');

    function checkAnswer2(guess4Val) {
        setGuess4(guess4Val);
        console.log("guess: " + guess4Val);
        if (shallowEqual(guess4Val,answer4)) {
            console.log("guess 4 is right");
            setHaveGuessed4(true);
            setIsWrong4(false);
            console.log("stop 1 win game");
            setGameComplete(true);
            /* set timeout to close window? */
            /* isSafeInfoVisible */
            setTimeout(() => {
                setIsCementSafeInfoVisible(false);
                setIsWinnerScreenVisible(true);
            }, 3000);
            winGameFunction(true,gameScoreID,gameTime,gameStop,gameTimeTotal,setGameTimeTotal,gameTimeHint,numberOfPlayers,teamName, realTimeStart,
                hintTime1,hintTime2,hintTime3,hintTime4);
        } else {
            console.log("wrong guess 4");
            setHaveGuessed4(true);
            setIsWrong4(true);
        }
    }

    /* game action */
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
                <View className="image-holder image-short" ariaLabel="Image Holder" backgroundImage = "url('https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/background-game-jaycee-shelter.jpg')">
                {/* all games */}
                <TopRight isHelpVisible={isHelpVisible} setIsHelpVisible={setIsHelpVisible}
                          areNotesVisible={areNotesVisible} setAreNotesVisible={setAreNotesVisible}
                          isBackpackVisible={isBackpackVisible} setIsBackpackVisible={setIsBackpackVisible}
                          gameBackpack={gameBackpack} showItemContents={showItemContents} />
                {/* end all games */}
                {/* static, non-clickable items */}

                {/* end static, non-clickable items */}
                <View ariaLabel="Torn Diary" className="torn-diary-jaycee clickable" onClick={()=>toggleTornDiary()}>
                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/torndiarypage.png" />
                </View>
                <View className={isTornDiaryVisible? "cover-screen show-gradual" : "all-screen hide"}>
                    <View className="all-screen show">
                        <Button className="close-button" onClick={()=>toggleTornDiary()}>X</Button>
                        <View textAlign="center">
                            <Button className="button small" onClick={()=>setCluesFunction(
                                "  ** start clue (torn diary page) ==> What is the name of the house Northwest" +
                                "of here? (not a bathroom) <== end clue ** "
                                ,clues,setAlertText,setIsAlertVisible,setClues)}>add clue below to notes</Button>
                        </View>
                     <View className="torn-diary-big-jaycee">
                        What is the name of the <br /><br />house Northwest <br /><br />of here? (not a bathroom)
                    </View>
                        <View width="100%" textAlign='center' marginTop="5px">
                            <Button className="button action-button small" onClick={()=>toggleTornDiary()}>tap to close this window</Button>
                        </View>
                    </View>
                </View>


                <View ariaLabel="Hanging Sign" className="hanging-sign clickable" onClick={()=>toggleSign()}>
                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/hanging-sign.png" />
                </View>
                <View className={isSignVisible? "cover-screen show-gradual" : "all-screen hide"}>
                    <View className="all-screen show">
                    <Button className="close-button" onClick={()=>toggleSign()}>X</Button>
                        <View textAlign="center">
                            <Button className="button small" onClick={()=>setCluesFunction(
                                "  ** start clue (hanging sign) ==> What is the name of the Field close to here? <== end clue ** "
                                ,clues,setAlertText,setIsAlertVisible,setClues)}>add clue below to notes</Button>
                        </View>
                        <View className="hanging-sign-big-jaycee">What is the name of the <br /><br />Field close to here?</View>
                        <View width="100%" textAlign='center' marginTop="5px">
                            <Button className="button action-button small" onClick={()=>toggleSign()}>tap to close this window</Button>
                        </View>
                    </View>
                </View>

                <View ariaLabel="Diary" className="diary-jaycee clickable" onClick={()=>toggleDiary()}>
                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/diary.png" />
                </View>
                <View className={isDiaryVisible? "cover-screen show-gradual" : "all-screen hide"}>
                    <View className="all-screen show">
                        <View textAlign="center">
                            <Button className="button small" onClick={()=>setCluesFunction(
                                "  ** start clue (diary) ==> Dear Diary, I love playing" +
                                " the sport on the field closest to the shelter. <== end clue ** "
                                ,clues,setAlertText,setIsAlertVisible,setClues)}>add clue below to notes</Button>
                        </View>
                    <Button className="close-button" onClick={()=>toggleDiary()}>X</Button>
                    <View className="diary-big-jaycee">
                        Dear Diary, <br /><br />I love playing.<br/><br/>the sport<br /><br />on the field<br /><br />closest to the shelter.
                    </View>
                        <View width="100%" textAlign='center' marginTop="5px">
                            <Button className="button action-button small" onClick={()=>toggleDiary()}>tap to close this window</Button>
                        </View>
                    </View>
                </View>

                { (!isWrong1 && !isWrong2 && !isWrong3)  ? (
                    <View>
                        <View className="safe-shelter clickable show">
                            <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/open-safe.png" />
                            <View marginBottom="10px" marginRight="10px" className={isKeyVisible ? "safe-shelter inside-safe clickable show" : "hide"}
                                  onClick={()=>keyInBackpack()}>
                                <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/key.png"/>
                            </View>
                        </View>
                    </View>
                ) :  <View ariaLabel="Safe Shelter" className="safe-shelter clickable" onClick={()=>toggleSafe()}>
                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/safe.png"/>
                </View> }

                <View className={!isKeyOn? "cement-safe  z-Index-not-clicked show" : "hide"}>
                    <Image alt="test" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/cementsafe-closed-keyhole.png" />
                </View>
                <View className={isKeyOn? "cement-safe clickable show" : "hide"}
                      onClick={()=>toggleCementSafe()}>
                    <Image alt="test" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/cementsafe-closed-keyhole.png" />
                </View>
                <View className={isCementSafeOpen && isKeyOn? "cement-safe clickable show" : "hide"}
                      onClick={()=>toggleCementSafeInfo()}>
                    <Image alt="test" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/cementsafeopencode.png" />
                </View>

                <View className={(!isWrong4)? "cement-safe show" : "hide"}
                      onClick={()=>toggleSandbagMessages()}>
                    <Image alt="test" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/cementsafe-shelter-easy-discs.png" />
                </View>
            </View>
           {/* puzzle solving */}
            <View className={isSafeInfoVisible ? "cover-screen show-gradual" : "all-screen hide"}>
                <View className="all-screen show">
                <Button className="close-button" onClick={()=>toggleSafe()}>X</Button>
                <br />
                <TextField
                    label="Word 1 (9 letters - hanging sign)"
                    value={guess1}
                    onChange={(e) => checkAnswer(e.currentTarget.value,guess2,guess3)}/>
                {
                    (haveGuessed1 && isWrong1 && !showComment)  ? (
                        <span className="red"> Wrong Answer!</span>
                    ) : null
                }
                {
                    (!isWrong1 && !showComment)  ? (
                        <span className="green"> Right Answer!</span>
                    ) : null
                }
                <TextField
                    label="Word 2 (5 letters - torn diary page)"
                    value={guess2}
                    onChange={(e) => checkAnswer(guess1,e.currentTarget.value,guess3)}/>
                {
                    (haveGuessed2 && isWrong2 && !showComment)  ? (
                        <span className="red"> Wrong Answer!</span>
                    ) : null
                }
                {
                    (!isWrong2 && !showComment)  ? (
                        <span className="green"> Right Answer!</span>
                    ) : null
                }
                <TextField
                    label="Word 3 (8 letters - diary)"
                    value={guess3}
                    onChange={(e) => checkAnswer(guess1,guess2,e.currentTarget.value)}/>
                {
                    (haveGuessed3 && isWrong3 && !showComment)   ? (
                        <span className="red"> Wrong Answer!</span>
                    ) : null
                }
                {
                    (!isWrong3 && !showComment)  ? (
                        <span className="green"> Right Answer!</span>
                    ) : null
                }
                <View width="100%" textAlign='center' marginTop="5px">
                    <Button className="button action-button small" onClick={()=>toggleSafe()}>tap to close this window</Button>
                    <br/><Button className={areNotesVisible ? "hide" : "link-button small"}
                                 onClick={() => toggleNotes(areNotesVisible, setAreNotesVisible)}>open
                    notes</Button>
                </View>
                    {(!isWrong1 && !isWrong2 && !isWrong3 && !showComment) ? (
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
            {/* puzzle solving */}
            <View className={isCementSafeInfoVisible ? "cover-screen show-gradual" : "all-screen hide"}>
                <View className="all-screen show">
                <Button className="close-button" onClick={()=>toggleCementSafeInfo()}>X</Button>
                <TextField
                    label="Try to Open Floor Safe! (3 letters)"
                    value={guess4}
                    onChange={(e) => checkAnswer2(e.currentTarget.value)}/>
                {
                    haveGuessed4 && isWrong4 && !showComment ? (
                        <span className="red"> Wrong Answer!</span>
                    ) : null
                }

                { !isWrong4  && !showComment  ? (
                    <View textAlign="center" marginTop="1em">
                        <View className="green"> Right Answer! <br/>(window will close in 3 seconds)</View>
                    </View>
                ) : (
                    <View>
                        <div>
                            <br /><h3>Engraved on Panel:</h3>
                            The <span className="bold-underline">first</span> thing I did was visit <br />
                            the named field.<br />
                            The <span className="bold-underline">second</span> thing I did was visit the house.<br />
                            The <span className="bold-underline">third</span> thing I did was<br />
                            play a sport.
                        </div>
                        <View width="100%" textAlign='center' marginTop="5px">
                        <Button className="button action-button small" onClick={()=>toggleCementSafeInfo()}>tap to close this window</Button>
                        <br/><Button className={areNotesVisible ? "hide" : "link-button small"}
                        onClick={() => toggleNotes(areNotesVisible, setAreNotesVisible)}>open
                        notes</Button>
                        </View>
                        <NotesOpen areNotesVisible={areNotesVisible} clues={clues} setClues={setClues}
                                   setAreNotesVisible={setAreNotesVisible} toggleNotes={toggleNotes}
                                   gameNotes={gameNotes} setGameNotes={setGameNotes}/>
                    </View>

                )}
                </View>
            </View>
            {(!isWrong4 && !showComment)? (
                    <View className={isWinnerScreenVisible ? "show" : "hide"}>
                        <View className="black-box">
                            <h3>WINNER!</h3>
                        <View>Now you have lots of Discs!</View>
                            <View marginTop="20px">
                                <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/cementsafe-shelter-easy-discs.png"/>
                            </View>
                        </View>

                        <View className="bottom z-index125">
                            <View color="white">Total Time: {gameTimeTotal}</View>
                            <Button className="button" onClick={() => leaveComment(setShowComment)}>Please Tap to Leave
                                Comment</Button>
                        </View>
                    </View>
                ): null }


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
                            <strong>Goal for this stop:</strong> Get More Discs!
                        </View>
                        <View paddingBottom="10px">
                            <strong>Hints:</strong> Clicking on a Hint costs <span
                            className="italics"> 5 Minutes!</span> Use Hints if you really need them.
                        </View>
                        <Flex wrap="wrap">
                            <Button className={(hintTime1 == 0) ? "button small" : "hide"}
                                    onClick={() => toggleHint1(setHintTime1, isHint1Visible, setIsHint1Visible, hintTime1, setGameTimeHint, gameTimeHint)}>Open Hint (engraved on panel) - adds 5 minutes</Button>
                            <Button className={(hintTime1 == 0) ? "hide" : "button small"}
                                    onClick={() => toggleHint1(setHintTime1, isHint1Visible, setIsHint1Visible, hintTime1, setGameTimeHint, gameTimeHint)}>Open Hint (engraved on panel) - free now</Button>
                            <Button className={(hintTime2 == 0) ? "button small" : "hide"}
                                    onClick={() => toggleHint2(setHintTime2, isHint2Visible, setIsHint2Visible, hintTime2, setGameTimeHint, gameTimeHint)}>Open Hint (name of house) - adds 5 minutes</Button>
                            <Button className={(hintTime2 == 0) ? "hide" : "button small"}
                                    onClick={() => toggleHint2(setHintTime2, isHint2Visible, setIsHint2Visible, hintTime2, setGameTimeHint, gameTimeHint)}>Open Hint (name of house) - free now</Button>
                            <Button className={(hintTime3 == 0) ? "button small" : "hide"}
                                    onClick={() => toggleHint3(setHintTime3, isHint3Visible, setIsHint3Visible, hintTime3, setGameTimeHint, gameTimeHint)}>Open Hint (sport) - adds 5 minutes</Button>
                            <Button className={(hintTime3 == 0) ? "hide" : "button small"}
                                    onClick={() => toggleHint3(setHintTime3, isHint3Visible, setIsHint3Visible, hintTime3, setGameTimeHint, gameTimeHint)}>Open Hint (sport) - free now</Button>
                            <Button className={(hintTime4 == 0) ? "button small" : "hide"}
                                    onClick={() => toggleHint4(setHintTime4, isHint4Visible, setIsHint4Visible, hintTime4, setGameTimeHint, gameTimeHint)}>Open Hint (name of field) - adds 5 minutes</Button>
                            <Button className={(hintTime4 == 0) ? "hide" : "button small"}
                                    onClick={() => toggleHint4(setHintTime4, isHint4Visible, setIsHint4Visible, hintTime4, setGameTimeHint, gameTimeHint)}>Open Hint (name of field) - free now</Button>
                        </Flex>
                        <br/><br/>
                        <View className={isHint4Visible ? "cover-screen show-gradual" : "hide"}>
                            <View className="winner show">
                                <strong>Hint for somewhere order of numbers for safe:</strong>
                                <strong>Hint for name of field</strong>
                                <br /><br />There is a large sign on the fence at the field with the name.
                                <br /><br /><View width="100%" textAlign='center'>
                                    <Button className="button action-button"
                                            onClick={() => toggleHint4(setHintTime4, isHint4Visible, setIsHint4Visible, hintTime4, setGameTimeHint, gameTimeHint)}>tap
                                        to close hint 4</Button>
                                </View>
                            </View>
                        </View>
                        <View className={isHint3Visible ? "cover-screen show-gradual" : "hide"}>
                            <View className="winner show">
                                <strong>Hint for Sport:</strong>
                                <br /><br />People do play soccer and disc golf but the closest field to the shelter is the baseball field.
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
                                <Button className="close-button" onClick={() => toggleHint2(setHintTime2,isHint2Visible,setIsHint2Visible)}>X</Button>
                                <strong>Hint for name of house:</strong> <br /><br />
                                Near the intersection of Solomon and N. Campbell there is a house that people use for events.<br /><br />
                                Go over there and look for the name.
                            <br /><br />
                                <View width="100%" textAlign='center'>
                                    <Button className="button action-button"
                                            onClick={() => toggleHint2(setHintTime2, isHint2Visible, setIsHint2Visible, hintTime2, setGameTimeHint, gameTimeHint)}>tap
                                        to close hint 2</Button>
                                </View>
                            </View>
                        </View>
                        <View className={isHint1Visible ? "cover-screen show-gradual" : "hide"}>
                            <div className="winner show">
                                <strong>Hint for engraved on panel:</strong> <br /><br />
                                The <span className="bold-underline">first</span> is in reference to the first letter of the named field.
                                And the pattern continues with name of house and name of sport.
                                <br /><br />
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
                    <h3>Game Goals: Find more Discs!</h3>
                    <View marginBottom="5px">Location: 1 Stop at Jaycee Park Gazebo (by parking lot)</View>
                    <View>
                        <span className="small"> <strong>Remember, your time to complete the game is your score and is calculated when you start playing. Hints add 5 minutes.</strong> </span><br />
                        <strong>Start Playing when you are here:</strong>
                    </View>
                    <View>
                        <Image maxHeight="150px" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/background-game-jaycee-shelter.jpg" />
                    </View>
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
                           src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/jaycee-park-map.png"/>
                    <Link href="https://goo.gl/maps/4FHz3mx5zdQjeGwy8?coh=178571&entry=tt" isExternal={true}>link to
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
