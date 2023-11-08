import React, {useEffect, useState} from "react"
import {Button, View, Image, TextAreaField, TextField, Flex, Heading, Link} from '@aws-amplify/ui-react';
import {useNavigate} from "react-router-dom";
import {toggleIntro, toggleHelp, toggleMap,
    toggleNotes, setGameStopFunction, setCluesFunction,
     goHome, goToStop, leaveComment, winGameFunction, toggleHint1,toggleHint2, toggleHint3, toggleHint4, setGameNotesFunction} from "../../components/helper";
import {shallowEqual} from "../../components/ShallowEqual";
import {NotesOpen, HelpScreen, TopRight, GameIntro, TimeBlock, CommentWindow} from "../../components/sharedComponents";

export function TybeanEasy() {
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

    /* get gamestats and set or check localstorage */
    useEffect(() => {
        console.log("***useEffect***: setGameStop (only on mount)");
        /* set local storage for gameStop - only on mount */
        setGameStopFunction(setGameStop,setNumberOfTimes,setGameID,setGameStatsID,setGameStopNameArray,
            setGameStopName,setGameScoreID,setIsGameIntroVisible,setIsIntroVisible, gameTime,setGameTime,setGameTimeHint,
            setIsAlertVisible, setAlertText, setTeamName, setStopClock, setHintTime1, setHintTime2, setHintTime3, setHintTime4, setRealTimeStart,
            setGameNotes,setClues);
    }, []);
    /* go to top */
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const navigate = useNavigate();

    /* end for all games */

    /* stop 1 - game specific */

    /* game answers */
    const [guess1, setGuess1] = useState('');
    const [haveGuessed1, setHaveGuessed1] = useState(false);
    const [isWrong1, setIsWrong1] = useState(true);
    const [answer1] = useState("poo");

    const [guess2, setGuess2] = useState('');
    const [haveGuessed2, setHaveGuessed2] = useState(false);
    const [isWrong2, setIsWrong2] = useState(true);
    const [answer2] = useState("i");

    const [guess3, setGuess3] = useState('');
    const [haveGuessed3, setHaveGuessed3] = useState(false);
    const [isWrong3, setIsWrong3] = useState(true);
    const [answer3] = useState("8");

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
            console.log("stop 1 win game");
            setGameComplete(true);
            /* set timeout to close window? */
            /* isSafeInfoVisible */
            setTimeout(() => {
                setIsSafeInfoVisible(false);
                setIsWinnerScreenVisible(true);
            }, 3000);
            winGameFunction(true,gameScoreID,gameTime,gameStop,gameTimeTotal,setGameTimeTotal,gameTimeHint,numberOfPlayers,teamName, realTimeStart,
                hintTime1,hintTime2,hintTime3,hintTime4);
        }
    }
    /* game action */
    /* need to click on safe */
    const [isSafeInfoVisible, setIsSafeInfoVisible] = useState(false);
    function toggleSafeInfo() {
        isSafeInfoVisible ? setIsSafeInfoVisible(false) : setIsSafeInfoVisible(true);
    }
    /* end stop 1 - game specific */
    return (
        <View ariaLabel="View Screen" position="relative" height="100%">
            <View
                ariaLabel="Main Container"
                className="main-container">
                <View
                    className="image-holder image-short"
                    ariaLabel="Image Holder"
                    backgroundImage = "url('https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/background-game-new.jpg')">
                    {/* all games */}
                    <TopRight isHelpVisible={isHelpVisible} setIsHelpVisible={setIsHelpVisible}
                              areNotesVisible={areNotesVisible} setAreNotesVisible={setAreNotesVisible}
                              isBackpackVisible={isBackpackVisible} setIsBackpackVisible={setIsBackpackVisible}
                              gameBackpack={gameBackpack} />
                    {/* end all games */}

                    {/* static, non-clickable items */}
                    <View ariaLabel="Back Picnic Table" className="back-picnic-table z-index-not-clicked">
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/blue-table-right.png"/>
                    </View>
                    <View ariaLabel="Tree Circle" className="tree-circle z-index-not-clicked">
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/brown-circle.png"/>
                    </View>
                    <View ariaLabel="Red Table 2 chairs" className="red-table-2-chairs z-index-not-clicked">
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/red-table-left.png"/>
                    </View>
                    <View ariaLabel="Tree with Sign" className="tree-with-sign z-index-not-clicked">
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/tree-without-sign.png" />
                    </View>
                    <View ariaLabel="Palm Tree" className="palm-tree z-index-not-clicked">
                        <Image  src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/palm-tree.png" />
                    </View>
                    <View ariaLabel="Bottom Blue Table" className="bottom-blue-table z-index-not-clicked">
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/blue-table-left.png"/>
                    </View>
                    {/* end static, non-clickable items */}

                    {/* show closed safe if haven't guessed or guess is wrong */}
                    {(!isWrong1 && !isWrong2 && !isWrong3)? (
                        <View>
                            <View  className="safe-on-table z-index-not-clicked show">
                                <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/open-safe.png" />
                            </View>
                            <View marginRight="10px" className="safe-on-table z-index-not-clicked show">
                                <Image  src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/important-documents.png"/>
                            </View>
                        </View>
                    ) : <View
                        padding="5px"
                        ariaLabel="Safe Shelter"
                        className="safe-on-table clickable"
                        onClick={() => toggleSafeInfo()}>
                        <Image  src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/safe-shelter.png"/>
                    </View>
                    }

                    {/* Safe OPEN WINDOW */}
                    <View className={isSafeInfoVisible? "cover-screen show-gradual" : "all-screen hide"}>
                        <View className="all-screen show">
                            <div>Try to Open Safe!</div>
                            <br />
                            <TextField
                                label="3 letters"
                                className="poo"
                                value={guess1}
                                onChange={(e) => checkAnswer(e.currentTarget.value, guess2, guess3)}/>
                            &nbsp;&nbsp;&nbsp;
                            <TextField
                                label="1 letter"
                                className="short-one-letter"
                                value={guess2}
                                onChange={(e) => checkAnswer(guess1, e.currentTarget.value, guess3)}/>

                            S                 &nbsp;&nbsp;&nbsp;GR
                            <TextField
                                label="1 number"
                                className="short-one-letter"
                                value={guess3}
                                onChange={(e) => checkAnswer(guess1, guess2, e.currentTarget.value)}/>

                            {(isWrong1 || isWrong2 || isWrong3)? (
                                <View paddingTop="10px">
                                    <View textAlign="center">
                                    <Button className="button small" onClick={()=>setCluesFunction(
                                        " ** start clue ** ==> 1: Letters #5, #6, #7 of restaurant north of here |\n" +
                                        "2: First letter of Hot Sauce Place | \n" +
                                        "3: 25% of Shop South of here.  <== ** end clue ** \n"
                                    ,clues,setAlertText,setIsAlertVisible,setClues)}>add clue below to notes</Button>
                                    </View>
                                    <View className="torn-diary-big-jaycee big-width">
                                        Letters <span className="bold-underline">#5, #6, #7</span> of restaurant <br />
                                        north of here.<br /><br />
                                      First letter of Hot Sauce Place.<br /><br />
                                        25% of Shop South of here.
                                    </View>
                                </View>
                            ): (<View textAlign="center" marginTop="1em">
                                <View className="green"> Right Answer! <br />(window will close in 3 seconds)</View>
                                </View>)}
                            <View width="100%" textAlign='center'>
                                <Button className="button action-button small" onClick={()=>toggleSafeInfo()}>tap to close this window</Button>
                            </View>
                        </View>
                    </View>

                    {/* Winner Message!! */}
                    {(!isWrong1 && !isWrong2 && !isWrong3 && !showComment) ? (
                    <View className={isWinnerScreenVisible ? "show" : "hide"}>
                        <View className="black-box">
                            <h3>WINNER!</h3>
                            <View>Important Documents! <br /> Maybe the rich person will give you a reward!</View>
                            <View>
                                <View  className="safe-on-table z-index-not-clicked show">
                                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/open-safe.png" />
                                </View>
                                <View marginRight="10px" className="safe-on-table z-index-not-clicked show">
                                    <Image  src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/important-documents.png"/>
                                </View>
                            </View>
                        </View>
                        <View className="bottom z-index125">
                            <View color="white">Total Time: {gameTimeTotal}</View>
                            <Button className="button small" onClick={() => leaveComment(setShowComment)}>Tap to Leave Comment (to help make game better)</Button>
                        </View>
                    </View>
                    ): null }

                    {(showComment)?
                        (
                            <CommentWindow setGameComments={setGameComments} gameComments={gameComments} />
                        ): null
                    }
                    <View className={isHelpVisible ? "cover-screen show-gradual" : "hide"}>
                        <View className="all-screen show">
                            <Button className="close-button" onClick={() => toggleHelp(isHelpVisible,setIsHelpVisible)}>X</Button>
                            <View width="100%" padding="10px">
                                <View paddingBottom="10px">
                                    <strong>Game Stop</strong>: <span className="font-small">{gameStop}</span>
                                </View>
                                <View paddingBottom="10px">
                                    <strong>How to Play:</strong> Click around - some items will disappear and then appear in
                                    your backpack. If it is in your backpack you may be able to use it by clicking on it.
                                </View>
                                <View paddingBottom="10px">
                                    <strong>Goal for this stop:</strong>  open the safe!
                                </View>
                                <View paddingBottom="10px">
                                    <strong>Hints:</strong> Clicking on a Hint costs <span className="italics"> 5 Minutes!</span> Use Hints if you really need them.
                                </View>
                                <Flex wrap="wrap">
                                    <Button className={(hintTime1 == 0)? "button small" : "hide"} onClick={() => toggleHint1(setHintTime1, isHint1Visible, setIsHint1Visible, hintTime1,  setGameTimeHint, gameTimeHint)}>Open Hint (north restaurant) - adds 5 minutes</Button>
                                    <Button className={(hintTime1 == 0)? "hide" : "button small"} onClick={() => toggleHint1(setHintTime1, isHint1Visible, setIsHint1Visible, hintTime1,  setGameTimeHint, gameTimeHint)}>Open Hint (north restaurant) - free now</Button>
                                    <Button className={(hintTime2 == 0)? "button small" : "hide"} onClick={() => toggleHint2(setHintTime2,isHint2Visible,setIsHint2Visible, hintTime2,  setGameTimeHint, gameTimeHint)}>Open Hint (hot sauce place) - adds 5 minutes</Button>
                                    <Button className={(hintTime2 == 0)? "hide" : "button small"} onClick={() => toggleHint2(setHintTime2,isHint2Visible,setIsHint2Visible, hintTime2,  setGameTimeHint, gameTimeHint)}>Open Hint (hot sauce place) - free now</Button>
                                    <Button className={(hintTime3 == 0)? "button small" : "hide"} onClick={() => toggleHint3(setHintTime3,isHint3Visible,setIsHint3Visible, hintTime3,  setGameTimeHint, gameTimeHint)}>Open Hint (shop south) - adds 5 minutes</Button>
                                    <Button className={(hintTime3 == 0)? "hide" : "button small"} onClick={() => toggleHint3(setHintTime3,isHint3Visible,setIsHint3Visible, hintTime3,  setGameTimeHint, gameTimeHint)}>Open Hint (shop south) - free now</Button>

                                </Flex>
                                <br/><br/>
                                <View className={isHint4Visible ? "cover-screen show-gradual" : "hide"}>
                                    <View className="winner show">
                                        <strong>Hint for somewhere order of numbers for safe:</strong>
                                        <br /><br />The diary had a little rhyme.  This rhyme tells you the order of the words. For example - what is the name of the cat you learned about?
                                        <View width="100%" textAlign='center'>
                                            <Button className="button action-button" onClick={() => toggleHint4(setHintTime4,isHint4Visible,setIsHint4Visible, hintTime4,  setGameTimeHint, gameTimeHint)}>tap to close hint 4</Button>
                                        </View>
                                    </View>
                                </View>
                                <View className={isHint3Visible ? "cover-screen show-gradual" : "hide"}>
                                    <View className="winner show">
                                        <strong>Hint for shop south:</strong>
                                        <br /><br />lattitude 32 - 25% of 32 is 8
                                        <br /><br />
                                        <View width="100%" textAlign='center'>
                                            <Button className="button action-button" onClick={() => toggleHint3(setHintTime3,isHint3Visible,setIsHint3Visible, hintTime3,  setGameTimeHint, gameTimeHint)}>tap to close hint 3</Button>
                                        </View>
                                    </View>
                                </View>
                                <View className={isHint2Visible ? "cover-screen show-gradual" : "hide"}>
                                    <View className="winner show">
                                        <strong>Hint for hot sauce place:</strong><br /><br />Inferno.<br /><br />
                                        <View width="100%" textAlign='center'>
                                            <Button className="button action-button" onClick={() => toggleHint2(setHintTime2,isHint2Visible,setIsHint2Visible, hintTime2,  setGameTimeHint, gameTimeHint)}>tap to close hint 2</Button>
                                        </View>
                                    </View>
                                </View>
                                <View className={isHint1Visible ? "cover-screen show-gradual" : "hide"}>
                                    <div className="winner show">
                                        <strong>Hint for north restaurant:</strong> <br /><br />HUCAPOOS - POO<br /><br />
                                        <View width="100%" textAlign='center'>
                                            <Button className="button action-button" onClick={() => toggleHint1(setHintTime1, isHint1Visible, setIsHint1Visible, hintTime1,  setGameTimeHint, gameTimeHint)}>tap to close hint 1</Button>
                                        </View>
                                    </div>
                                </View>
                                <View width="100%" textAlign='center'>
                                    <Button className="button action-button" onClick={() => toggleHelp(isHelpVisible,setIsHelpVisible)}>tap to close help</Button>
                                    <Button className="link-button" onClick={() => toggleMap(isMapVisible,setIsMapVisible)}>tap to see location on map</Button>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* intro(s) */}
                    <View className={isIntroVisible? "cover-screen show-gradual" : "hide"}>
                        <View ariaLabel="stop 1 intro" textAlign="center" className="all-screen show">
                            <h3>Stop 1 Intro</h3>
                            <h3>Game Goals: Open the Safe!</h3>
                            <View marginBottom="5px">Location: 1 Stop at Tybean Coffee Bar</View>
                            <View>
                                <span className="small"> <strong>Remember, your time to complete the game is your score and is calculated when you start playing. Hints add 5 minutes.</strong> </span><br />
                                <strong>Start Playing when you are here:</strong>
                            </View>
                            <View>
                                <Image maxHeight="150px" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/background-game-tybean-porch.jpg" />
                            </View>
                            <Button className="button" onClick={() => toggleIntro(isIntroVisible,setIsIntroVisible,setStopClock,gameTime, setGameTime, setRealTimeStart)}>tap to play (time will start)</Button>
                            <Button className="link-button " onClick={() => toggleMap(isMapVisible,setIsMapVisible)}>tap to see location on map</Button>
                            <View className="navigate-message">(please use buttons to navigate, back button doesn't work as well)</View>
                        </View>
                    </View>

                    <GameIntro isGameIntroVisible={isGameIntroVisible} setIsGameIntroVisible={setIsGameIntroVisible} numberOfPlayersError={numberOfPlayersError} numberOfPlayers={numberOfPlayers} setNumberOfPlayers={setNumberOfPlayers} teamName={teamName} setTeamName={setTeamName} gameStopNameArray={gameStopNameArray} setNumberOfPlayersError={setNumberOfPlayersError} setIsIntroVisible={setIsIntroVisible}/>

                    <View className={isAlertVisible ? "alert-container show" : "hide"}>
                        <div className='alert-inner'>{alertText}</div>
                    </View>

                    <View className={isMapVisible? "cover-screen show-gradual" : "hide"}>
                        <View textAlign="center" className="all-screen show">
                                <Image maxHeight="300px" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/tybean-map.png" />
                            <Link
                                href="https://goo.gl/maps/GTDCK2z3Jr1xYonL8?coh=178571&entry=tt"
                                isExternal={true}
                            >link to google maps</Link><br />
                                <Button className="button action-button" onClick={() => toggleHelp(isMapVisible,setIsMapVisible)}>tap to close map</Button>
                        </View>
                    </View>

                </View> {/* end main-content */}
            </View>{/* end main-container */}
            <TimeBlock gameTimeHint = {gameTimeHint} realTimeStart = {realTimeStart} />
            <NotesOpen areNotesVisible={areNotesVisible} clues={clues} setClues={setClues} setAreNotesVisible={setAreNotesVisible} toggleNotes={toggleNotes} gameNotes={gameNotes} setGameNotes={setGameNotes} setGameNotesFunction={setGameNotesFunction}/>
        </View>
    )
}


