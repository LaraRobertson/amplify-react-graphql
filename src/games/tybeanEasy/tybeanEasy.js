import React, {useEffect, useState} from "react"
import {Button, View, Image, TextAreaField, TextField, Flex, Heading} from '@aws-amplify/ui-react';
import {useNavigate} from "react-router-dom";
import {toggleIntro, toggleHelp, toggleBackpack,
    toggleNotes, goHomeQuit, setGameStopFunction,
    intervalFunction, goHome, goToStop, leaveComment, winGameFunction, toggleHint1,toggleHint2,toggleHint3, toggleHint4, setCommentsFunction} from "../../components/helper";
import {shallowEqual} from "../../components/ShallowEqual";
import {NotesOpen, HelpScreen, GameIntro, CoverScreenView} from "../../components/sharedComponents";

export function TybeanEasy() {

    /* for all games */
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertText, setAlertText] = useState('');
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
        setGameStopFunction(setGameStop,setNumberOfTimes,setGameID,setGameStatsID,setGameStopNameArray,
            setGameStopName,setGameScoreID,setIsGameIntroVisible,setIsIntroVisible, gameTime,setGameTime,setGameTimeHint,
            setIsAlertVisible, setAlertText, setIsCoverScreenVisible, setTeamName);
    }, []);

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
        console.log("***useEffect***: isIntroVisible: " + isIntroVisible);
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

    /* stop 1 - game specific */

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

    const game1Word1Page1ThiefAnswer = {'game1Word1Page1ThiefLetters':'poo'};
    const game1Word2Page1ThiefAnswer = {'game1Word2Page1ThiefLetters':'i'};
    const game1Word3Page1ThiefAnswer = {'game1Word3Page1ThiefLetters':'8'};
    const game1Word4Page1ThiefAnswer= {'game1Word4Page1ThiefLetters':'inferno'};
    /* end guessing states and answers for safe - 4 words */


    /* need to click on safe */
    const [isSafeInfoVisible, setIsSafeInfoVisible] = useState(false);
    function toggleSafeInfo() {
        isSafeInfoVisible ? setIsSafeInfoVisible(false) : setIsSafeInfoVisible(true);
        isCoverScreenVisible ? setIsCoverScreenVisible(false) : setIsCoverScreenVisible(true);
    }

    /* backpack functions */
    function toggleBackpack() {
        isBackpackVisible ? setIsBackpackVisible(false) : setIsBackpackVisible(true);
    }


    function showItemContents(value) {
        console.log("show contents value: " + value);
        switch (value) {
            case 'light':
                //console.log("isLightOn 1: " + isLightOn);
                //setIsLightOn(!isLightOn);
                //lightFunctions(!isLightOn);
                // change image
                for (var i = 0; i < gameBackpack.length; i++) {
                   /* if (gameBackpack[i].key === "light") {
                        console.log("turn on/off light - state");
                        if (!isLightOn) {
                            gameBackpack[i].src = "https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/light-on.png"
                            localStorage.setItem("light", "https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/light-on.png");
                        } else {
                            gameBackpack[i].src = "https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/blacklight.png"
                            localStorage.setItem("light", "https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/blacklight.png");
                        }
                    }*/
                }
                break;

            default:
        }
    }

    function setGame1Word1Page1ThiefLetters(guess) {
        var x = guess;
        console.log("game1 word1 x: " + x);
        let guessObject = {"game1Word1Page1ThiefLetters":x};
        setGame1Word1Page1ThiefGuess(guessObject);
        //check if guess is right
        if (shallowEqual(x, game1Word1Page1ThiefAnswer.game1Word1Page1ThiefLetters)) {
            setHaveGuessedGame1Word1Page1Thief(true);
            setIsGame1Word1Page1ThiefWrong(false);

        } else {
            console.log("wrong guess");
            setHaveGuessedGame1Word1Page1Thief(true);
            setIsGame1Word1Page1ThiefWrong(true);
        }

    }
    function setGame1Word2Page1ThiefLetters(guess) {
        var x = guess;
        console.log("game1 word2 x: " + x);
        let guessObject = {"game1Word2Page1ThiefLetters":x};
        setGame1Word2Page1ThiefGuess(guessObject);
        //check if guess is right
        if (shallowEqual(x, game1Word2Page1ThiefAnswer.game1Word2Page1ThiefLetters)) {
            setHaveGuessedGame1Word2Page1Thief(true);
            setIsGame1Word2Page1ThiefWrong(false);
        } else {
            console.log("wrong guess");
            setHaveGuessedGame1Word2Page1Thief(true);
            setIsGame1Word2Page1ThiefWrong(true);
        }
    }
    function setGame1Word3Page1ThiefLetters(guess) {
        var x = guess;
        console.log("game1 word3 x: " + x);
        let guessObject = {"game1Word3Page1ThiefLetters":x};
        setGame1Word3Page1ThiefGuess(guessObject);
        //check if guess is right
        if (shallowEqual(x, game1Word3Page1ThiefAnswer.game1Word3Page1ThiefLetters)) {
            setHaveGuessedGame1Word3Page1Thief(true);
            setIsGame1Word3Page1ThiefWrong(false);
        } else {
            console.log("wrong guess");
            setHaveGuessedGame1Word3Page1Thief(true);
            setIsGame1Word3Page1ThiefWrong(true);
        }
    }
    function setGame1Word4Page1ThiefLetters(guess) {
        var x = guess;
        console.log("game1 word4 x: " + x);
        let guessObject = {"game1Word4Page1ThiefLetters":x};
        setGame1Word4Page1ThiefGuess(guessObject);
        //check if guess is right
        if (shallowEqual(x, game1Word4Page1ThiefAnswer.game1Word4Page1ThiefLetters)) {
            setHaveGuessedGame1Word4Page1Thief(true);
            setIsGame1Word4Page1ThiefWrong(false);
            console.log("stop 1 win game");
            setStopClock(true);
            setGameComplete(true);
            winGameFunction(true,gameScoreID,gameTime,gameStop,gameTimeTotal,gameTimeHint,numberOfPlayers,teamName);
        } else {
            console.log("wrong guess");
            setHaveGuessedGame1Word4Page1Thief(true);
            setIsGame1Word4Page1ThiefWrong(true);
        }
    }

    /* end stop 1 - game specific */
    return (
        <View position="relative" height="100%">
            <View
                ariaLabel="Main Container"
                className="main-container">
                <View
                    className="image-holder image-short"
                    ariaLabel="Image Holder"
                    backgroundImage = "url('https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/background-game-new.jpg')">
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
                        <Flex wrap="wrap" >
                            {gameBackpack.map((item) => {
                                return (
                                    <View width="45%" key={item.key}>
                                        <Image alt={item.src} onClick={() => showItemContents(item.key)} className={item.key} src={item.src} />
                                    </View>
                                )
                            })}
                        </Flex>
                    </View>
                    <NotesOpen areNotesVisible={areNotesVisible} setAreNotesVisible={setAreNotesVisible} isCoverScreenVisible={isCoverScreenVisible} setIsCoverScreenVisible={setIsCoverScreenVisible} toggleNotes={toggleNotes} gameNotes={gameNotes} setGameNotes={setGameNotes}/>

                    {/* end all games */}

                    {/* show closed safe if haven't guessed or guess is wrong */}
                    {(!isGame1Word1Page1ThiefWrong && !isGame1Word2Page1ThiefWrong && !isGame1Word3Page1ThiefWrong)? (
                        <View>
                            <View  className="safe-on-table show">
                                <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/open-safe.png" />

                            </View>
                            <View marginRight="10px" className="safe-on-table show">
                                <Image  src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/important-documents.png"/>
                            </View>

                        </View>
                    ) : <View
                        ariaLabel="Safe Shelter"
                        className="safe-on-table"
                        onClick={() => toggleSafeInfo()}>
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/safe-shelter.png"/>
                    </View>
                    }


                <View
                    ariaLabel="Back Picnic Table"
                    className="back-picnic-table"
                 >
                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/blue-table-right.png"/>
                </View>



                <View
                    ariaLabel="Tree Circle"
                    className="tree-circle"
                >
                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/brown-circle.png"/>
                </View>

                    <View
                        ariaLabel="Tree with Sign"
                        className="tree-with-sign">
                        <Image  src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/tree-without-sign.png" />
                    </View>



                        <View
                            ariaLabel="Palm Tree"
                            className="palm-tree"
                        >
                            <Image  src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/palm-tree.png" />

                        </View>

                        <View
                            ariaLabel="Red Table 2 chairs"
                            className="red-table-2-chairs"            >
                            <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/red-table-left.png"/>
                        </View>


                        <View
                            ariaLabel="Bottom Blue Table"
                            className="bottom-blue-table">
                            <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/blue-table-left.png"/>
                        </View>


            </View>
            <View className={isSafeInfoVisible ? "all-screen show" : "hide"}>
                <Button className="close-button" onClick={()=>toggleSafeInfo()}>X</Button>
                <div>Try to Open Safe!</div>
                <br />
                <TextField
                    label="3 letters"
                    className="poo"
                    value={game1Word1Page1ThiefGuess.game1Word1Page1ThiefLetters}
                    onChange={(e) => setGame1Word1Page1ThiefLetters(e.currentTarget.value)}/>
             &nbsp;&nbsp;&nbsp;
                <TextField
                    label="1 letter"
                    className="short-one-letter"
                    value={game1Word2Page1ThiefGuess.game1Word2Page1ThiefLetters}
                    onChange={(e) => setGame1Word2Page1ThiefLetters(e.currentTarget.value)}/>

                S                 &nbsp;&nbsp;&nbsp;GR
                <TextField
                    label="1 number"
                    className="short-one-letter"
                    value={game1Word3Page1ThiefGuess.game1Word3Page1ThiefLetters}
                    onChange={(e) => setGame1Word3Page1ThiefLetters(e.currentTarget.value)}/>

                {(isGame1Word1Page1ThiefWrong || isGame1Word2Page1ThiefWrong || isGame1Word3Page1ThiefWrong)? (
                    <View className="torn-diary-big-jaycee big-width">
                        Letters <span className="bold-underline">#5, #6, #7</span> of restaurant <br />
                        north of here.<br /><br />
                      First letter of Hot Sauce Place.<br /><br />
                        25% of Shop South of here.
                    </View>
                ): (<span className="green"> Right Answer!</span>)}
            </View>
            {(!isGame1Word1Page1ThiefWrong && !isGame1Word2Page1ThiefWrong && !isGame1Word3Page1ThiefWrong) ? (
             <View className="winner fade-in bottom">
                 <h3>WINNER!</h3>
                 <View>Important Documents!Maybe the rich person will give you a reward!</View>
                 <Button className="button small" onClick={() => leaveComment(setShowComment,isCoverScreenVisible,setIsCoverScreenVisible)}>Please Tap to Leave Comment</Button>

             </View>
                ): null }

                {(showComment)?
                    (
                        <View className="winner comment-screen">
                            <h3>Thank you for playing. </h3>

                            <Heading level={4} className="heading">Please Comment</Heading>
                            We really want to know any and all comments you have about the game.
                            <TextAreaField
                                rows="6"
                                onChange={(e) => setCommentsFunction(e.currentTarget.value,setGameComments)}
                                descriptiveText="Any Issues or Problems?  Suggestions for improvement?"
                            /><br />
                            <Button className="button small" onClick={() => goHome(navigate,gameComments)}>Go back to Games List</Button>
                        </View>
                    ): null }
                <View ariaLabel="stop 1 Time" className="time">
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
                            <strong>Goal for this stop:</strong>  open the safe!
                        </View>
                        <View paddingBottom="10px">
                            <strong>Hints:</strong> Clicking on a Hint costs <span className="italics"> 5 Minutes!</span> Use Hints if you really need them.
                        </View>
                        <Flex wrap="wrap">
                            <Button className="button small" onClick={() => toggleHint1(setHintTime1,isHint1Visible,setIsHint1Visible)}>Open Hint (shops)</Button>
                            <Button className="button small" onClick={() => toggleHint2(setHintTime2,isHint2Visible,setIsHint2Visible)}>Open Hint (famous cat)</Button>
                            <Button className="button small" onClick={() => toggleHint3(setHintTime3,isHint3Visible,setIsHint3Visible)}>Open Hint (light)</Button>
                            <Button className="button small" onClick={() => toggleHint4(setHintTime4,isHint4Visible,setIsHint4Visible)}>Open Hint (order of numbers for safe)</Button>
                        </Flex>

                        <br/><br/>
                        <div className={isHint4Visible ? "winner show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint4(setHintTime4,isHint4Visible,setIsHint4Visible)}>X</Button>
                            <strong>Hint for somewhere order of numbers for safe:</strong>
                            <br /><br />The diary had a little rhyme.  This rhyme tells you the order of the words. For example - what is the name of the cat you learned about?

                        </div>
                        <div className={isHint3Visible ? "winner show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint3(setHintTime3,isHint3Visible,setIsHint3Visible)}>X</Button>
                            <strong>Hint for light (in backpack):</strong>
                            <br /><br />Once you click on light it should go into your backpack. This is a blacklight and when you
                            use it (click it in backpack to turn on) and click on objects you will see more clues.
                            <br /><br />

                        </div>
                        <div className={isHint2Visible ? "winner show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint2(setHintTime2,isHint2Visible,setIsHint2Visible)}>X</Button>
                            <strong>Hint for famous cat:</strong><br /><br />The famous cat has an awesome name for the Tybean Art & Coffee Bar (bean).<br /><br />

                        </div>
                        <div className={isHint1Visible ? "winner show" : "all-screen hide"}>
                            <Button className="close-button" onClick={() => toggleHint1(setHintTime1,isHint1Visible,setIsHint1Visible)}>X</Button>
                            <strong>Hint for shops clue:</strong> <br /><br />There are many little shops along the west side of the Tybee Oaks area - Inferno, Glazed and Confused are in the north part.
                            The southern most shop on the west side is "Tipsy Mermaid Art", then "granny flounders", then "The Tybee Gallery", then "Rachel Vogel Designs".
                            The 6th letter of the first (most southern) shop is "M".<br /><br />
                        </div>
                        <Button className="button action-button  small" onClick={() => toggleHelp(isHelpVisible,setIsHelpVisible,isCoverScreenVisible,setIsCoverScreenVisible)}>Close Help and
                            Play</Button>
                    </View>
                </View>
                <View
                    ariaLabel="stop 1 intro"
                    textAlign="center"
                    className={isIntroVisible ? "all-screen show" : "hide"}>
                    <h3>Game Goals: Open the Safe!</h3>
                    <h4>Start Playing Game when you are here:</h4>
                    <View>
                        <Image maxHeight="150px" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/thief1/background-game-tybean-porch.jpg" />
                    </View>
                    <View>
                        <span className="small"> <strong>Remember, clock doesn't stop until you complete the stop.</strong></span></View>

                    <Button className="button" onClick={() => toggleIntro(isIntroVisible,setIsIntroVisible,setStopClock,setIsCoverScreenVisible)}>I Want To Play!</Button>
                </View>
                <GameIntro isGameIntroVisible={isGameIntroVisible} setIsGameIntroVisible={setIsGameIntroVisible} numberOfPlayersError={numberOfPlayersError} numberOfPlayers={numberOfPlayers} setNumberOfPlayers={setNumberOfPlayers} teamName={teamName} setTeamName={setTeamName} gameStopNameArray={gameStopNameArray} setNumberOfPlayersError={setNumberOfPlayersError} setIsIntroVisible={setIsIntroVisible}/>
                <View className={isAlertVisible ? "alert-container show" : "hide"}>
                    <div className='alert-inner'>{alertText}</div>
                </View>
            </View>
            <CoverScreenView isCoverScreenVisible={isCoverScreenVisible}/>
        </View>
    )
}


