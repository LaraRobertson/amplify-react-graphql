import React, {useEffect, useState} from "react"
import {Button, View, Image, TextAreaField, TextField, Flex, Heading} from '@aws-amplify/ui-react';
import {useNavigate} from "react-router-dom";
import {toggleIntro, toggleHelp, toggleBackpack,
    toggleNotes, goHomeQuit, setGameStopFunction,
    intervalFunction, goHome, leaveComment, winGameFunction, toggleHint1,toggleHint2,toggleHint3, toggleHint4, setCommentsFunction} from "../../components/helper";
import {shallowEqual} from "../../components/ShallowEqual";
import {NotesOpen, GameIntro, CoverScreenView, HelpScreen} from "../../components/sharedComponents";

export function Hurricane1Easy() {

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
            setIsAlertVisible, setAlertText, setIsCoverScreenVisible);
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

    /* STOP 1 */
    /* guessing states and answers for 1st safe - 3 words */
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

    /* end guessing states and answers for 1st safe - 3 words */

    function setGame1Word1Stop1HurricaneLetters(guess) {
        var x = guess;
        console.log("game1 word1 x: " + x);
        let guessObject = {"game1Word1Stop1HurricaneLetters":x};
        setGame1Word1Stop1HurricaneGuess(guessObject);
        //check if guess is right
        if (shallowEqual(x, game1Word1Stop1HurricaneAnswer.game1Word1Stop1HurricaneLetters)) {
            setHaveGuessedGame1Word1Stop1Hurricane(true);
            setIsGame1Word1Stop1HurricaneWrong(false);
        } else {
            console.log("wrong guess");
            setHaveGuessedGame1Word1Stop1Hurricane(true);
            setIsGame1Word1Stop1HurricaneWrong(true);
        }

    }
    function setGame1Word2Stop1HurricaneLetters(guess) {
        var x = guess;
        console.log("game1 word2 x: " + x);
        let guessObject = {"game1Word2Stop1HurricaneLetters":x};
        setGame1Word2Stop1HurricaneGuess(guessObject);
        //check if guess is right
        if (shallowEqual(x, game1Word2Stop1HurricaneAnswer.game1Word2Stop1HurricaneLetters)) {
            setHaveGuessedGame1Word2Stop1Hurricane(true);
            setIsGame1Word2Stop1HurricaneWrong(false);
        } else {
            console.log("wrong guess");
            setHaveGuessedGame1Word2Stop1Hurricane(true);
            setIsGame1Word2Stop1HurricaneWrong(true);
        }
    }
    function setGame1Word3Stop1HurricaneLetters(guess) {
        var x = guess;
        console.log("game1 word3 x: " + x);
        let guessObject = {"game1Word3Stop1HurricaneLetters":x};
        setGame1Word3Stop1HurricaneGuess(guessObject);
        //check if guess is right
        if (shallowEqual(x, game1Word3Stop1HurricaneAnswer.game1Word3Stop1HurricaneLetters)) {
            setHaveGuessedGame1Word3Stop1Hurricane(true);
            setIsGame1Word3Stop1HurricaneWrong(false);
        } else {
            console.log("wrong guess");
            setHaveGuessedGame1Word3Stop1Hurricane(true);
            setIsGame1Word3Stop1HurricaneWrong(true);
        }
    }
    /* end guessing states and answers for 1st  safe - 3 words */

    /* FINAL: guessing states and answers for 2nd safe - 1 word */
    const [guess1,setGuess1] = useState({'answer':''});
    const [haveGuessed1,setHaveGuessed1] = useState();
    const [isWrong1, setIsWrong1] = useState(true);
    const answer1 = {'answer':'wus'};
    function setGuess1Numbers(guess) {
        var x = guess;
        console.log("guess1 x: " + x);
        let guessObject = {"answer":x};
        setGuess1(guessObject);
        //check if guess is right
        if (shallowEqual(x,answer1.answer)) {
            setHaveGuessed1(true);
            setIsWrong1(false);
            /* completing stop 1 */
            console.log("stop 1 win game");
            setStopClock(true);
            setGameComplete(true);
            winGameFunction(true,gameScoreID,gameTime,gameStop,gameTimeTotal,gameTimeHint,numberOfPlayers,teamName);
        } else {
            console.log("wrong guess");
            setHaveGuessed1(true);
            setIsWrong1(true);
        }

    }
    /* end guessing states and answers for 2nd safe - 1 word */
    /* sign is hanging */
    const [isSignVisible, setIsSignVisible] = useState(false);
    function toggleSign() {
        isSignVisible ? setIsSignVisible(false) : setIsSignVisible(true);
        isCoverScreenVisible ? setIsCoverScreenVisible(false) : setIsCoverScreenVisible(true);
    }
    /* torn diary with message */
    const [isTornDiaryVisible, setIsTornDiaryVisible] = useState(false);
    function toggleTornDiary() {
        isTornDiaryVisible ? setIsTornDiaryVisible(false) : setIsTornDiaryVisible(true);
        isCoverScreenVisible ? setIsCoverScreenVisible(false) : setIsCoverScreenVisible(true);
    }
    /* diary with message */
    const [isDiaryVisible, setIsDiaryVisible] = useState(false);
    function toggleDiary() {
        isDiaryVisible ? setIsDiaryVisible(false) : setIsDiaryVisible(true);
        isCoverScreenVisible ? setIsCoverScreenVisible(false) : setIsCoverScreenVisible(true);
    }
    /* need to click on safe */
    const [isSafeInfoVisible, setIsSafeInfoVisible] = useState(false);
    function toggleSafe() {
        isSafeInfoVisible ? setIsSafeInfoVisible(false) : setIsSafeInfoVisible(true);
        isCoverScreenVisible ? setIsCoverScreenVisible(false) : setIsCoverScreenVisible(true);
    }
    useEffect(() => {
        console.log("***useEffect***: isSafeInfoVisible: " + isSafeInfoVisible);
    });
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

    /* Finish Game (not move on to next stop) */
    const [isSandbagMessageVisible, setIsSandbagMessageVisible] = useState(false);
    function toggleSandbagMessages() {
        isSandbagMessageVisible ? setIsSandbagMessageVisible(false) : setIsSandbagMessageVisible(true);
    }
    /* backpack functions */
    /* backpack items: key */
    /* key is used to open sandbag vault */
    const [isKeyOn, setIsKeyOn] = useState(false);
    useEffect(() => {
        console.log("***useEffect***: isKeyOn: " + isKeyOn);
    });
    /* remove key from window and put in backpack and turn off on in backpack */
    const [isKeyVisible, setIsKeyVisible] = useState(true);
    function keyFunction() {
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
            console.log("push key to backpack");
            gameBackpack.push({
                src: 'https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/key-not-using.png',
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
    /* end stop 1 - game specific */

    return (
        <View position="relative" height="100%">
        <View
            ariaLabel="Main Container"
            className="main-container">
            <View
                className="image-holder image-short"
                ariaLabel="Image Holder"
                backgroundImage = "url('https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/background-game-jaycee-shelter.jpg')">

                {/* all games */}
                {/* push to helperComponent vs Helper Function*/}
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
                    ariaLabel="Torn Diary"
                    className="torn-diary-jaycee"
                    onClick={()=>toggleTornDiary()}>
                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/torndiarypage.png" />
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
                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/diary.png" />
                </View>

                <View
                    className={isDiaryVisible ? "all-screen show" : "hide"}
                >
                    <Button className="close-button" onClick={()=>toggleDiary()}>X</Button>
                    <View className="diary-big-jaycee">
                        Dear Diary, <br /><br />I love playing.<br/><br/>the sport<br /><br />on the field<br /><br />closest to the shelter.
                    </View>
                </View>
                <View
                    className={isTornDiaryVisible ? "all-screen show" : "hide"}
                >
                    <Button className="close-button" onClick={()=>toggleTornDiary()}>X</Button>
                    <View className="torn-diary-big-jaycee">
                        What is the name of the <br /><br />house Northwest <br /><br />of here? (not a bathroom)
                    </View>
                </View>
                <View
                    ariaLabel="sign info"
                    className={isSignVisible ? "all-screen  show" : "hide"}>
                    <Button className="close-button" onClick={()=>toggleSign()}>X</Button>

                    <View className="hanging-sign-big-jaycee">What is the name of the <br /><br />Field close to here?</View>
                </View>

                { !isGame1Word3Stop1HurricaneWrong && !isGame1Word2Stop1HurricaneWrong && !isGame1Word2Stop1HurricaneWrong  ? (
                    <View>

                        <View className="safe-shelter show">
                            <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/open-safe.png" />
                            <View marginBottom="10px" marginRight="10px" className={isKeyVisible ? "safe-shelter inside-safe show" : "hide"}
                                  onClick={keyFunction}>
                                <Image  src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/key.png"/>
                            </View>
                        </View>
                    </View>
                ) :  <View
                    ariaLabel="Safe Shelter"
                    className="safe-shelter"
                    onClick={()=>toggleSafe()}>
                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/safe.png"/>
                </View> }
                <View className={!isKeyOn? "cement-safe show" : "hide"}>
                    <Image alt="test" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/cementsafe-closed-keyhole.png" />
                </View>
                <View className={isKeyOn? "cement-safe show" : "hide"}
                      onClick={()=>toggleCementSafe()}>
                    <Image alt="test" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/cementsafe-closed-keyhole.png" />
                </View>
                <View className={isCementSafeOpen && isKeyOn? "cement-safe show" : "hide"}
                      onClick={()=>toggleCementSafe()}>
                    <Image alt="test" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/cementsafeopencode.png" />
                </View>
                <View className={isCementSafeOpen && isKeyOn? "cement-safe show" : "hide"}
                      onClick={()=>toggleCementSafeInfo()}>
                    <Image alt="test" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/cementsafeopencode.png" />
                </View>
                <View className={(!isWrong1)? "cement-safe show" : "hide"}
                      onClick={()=>toggleSandbagMessages()}>
                    <Image alt="test" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/cementsafe-shelter-easy-discs.png" />
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
                        <View>Now you have lots of Discs!</View>
                        <span className="small">hint time: {gameTimeHint} mins | real time: {gameTime} mins
                        <br />tot: time: { Number((gameTime + gameTimeHint + gameTimeTotal).toFixed(2))} min</span>
                        <br />
                        <Button className="button small" onClick={() => leaveComment(setShowComment,isCoverScreenVisible,setIsCoverScreenVisible)}>Tap to Comment</Button>
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



            <View className={isHelpVisible ? "all-screen show" : "all-screen hide"}>
                <Button className="close-button" onClick={() => toggleHelp(isHelpVisible,setIsHelpVisible,isCoverScreenVisible,setIsCoverScreenVisible)}>X</Button>
                <View width="100%" padding="10px">
                    <View paddingBottom="10px">
                        <strong>Game Stop</strong>: <span className="font-small">{gameStop}</span>
                    </View>
                    <View paddingBottom="10px">
                        <strong>How to Play:</strong> Click around - some items will disappear and then appear in your backpack.  If it is in your backpack you may be able to use it by clicking on it.
                    </View>
                    <View paddingBottom="10px">
                        <strong>Goal for this stop:</strong> Get More Discs!
                    </View>
                    <View paddingBottom="10px">
                        <strong>Hints:</strong> Clicking on a Hint costs <span className="italics"> 5 Minutes!</span> Use Hints if you really need them.
                    </View>
                    <Flex wrap="wrap">
                        <Button className="button small" onClick={() => toggleHint1(setHintTime1,isHint1Visible,setIsHint1Visible)}>Open Hint (engraved on panel)</Button>
                        <Button className="button small" onClick={() => toggleHint2(setHintTime2,isHint2Visible,setIsHint2Visible)}>Open Hint (name of house)</Button>
                        <Button className="button small" onClick={() => toggleHint3(setHintTime3,isHint3Visible,setIsHint3Visible)}>Open Hint (sport)</Button>
                        <Button className="button small" onClick={() => toggleHint4(setHintTime4,isHint4Visible,setIsHint4Visible)}>Open Hint (name of field)</Button>
                    </Flex>
                    <br /><br />
                    <div className={isHint1Visible ? "winner show" : "all-screen hide"}>
                        <Button className="close-button" onClick={() => toggleHint1(setHintTime1,isHint1Visible,setIsHint1Visible)}>X</Button>
                        <strong>Hint for engraved on panel:</strong> <br /><br />
                        The <span className="bold-underline">first</span> is in reference to the first letter of the named field.
                        And the pattern continues with name of house and name of sport.
                    </div>
                    <div className={isHint2Visible ? "winner show" : "all-screen hide"}>
                        <Button className="close-button" onClick={() => toggleHint2(setHintTime2,isHint2Visible,setIsHint2Visible)}>X</Button>
                        <strong>Hint for name of house:</strong> <br /><br />
                        Near the intersection of Solomon and N. Campbell there is a house that people use for events.<br /><br />
                        Go over there and look for the name.
                    </div>
                    <div className={isHint3Visible ? "winner show" : "all-screen hide"}>
                        <Button className="close-button" onClick={() => toggleHint3(setHintTime3,isHint3Visible,setIsHint3Visible)}>X</Button>
                        <strong>Hint for Sport:</strong>
                        <br /><br />People do play soccer and disc golf but the closest field to the shelter is the baseball field.
                        <br /><br />
                    </div>
                    <div className={isHint4Visible ? "winner show" : "all-screen hide"}>
                        <Button className="close-button" onClick={() => toggleHint4(setHintTime4,isHint4Visible,setIsHint4Visible)}>X</Button>
                        <strong>Hint for name of field</strong>
                        <br /><br />There is a large sign on the fence at the field with the name.
                        <br /><br />

                    </div>
                    <Button className="button action-button small" onClick={() => toggleHelp(isHelpVisible,setIsHelpVisible,isCoverScreenVisible,setIsCoverScreenVisible)}>Close Help and Play</Button>
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
            <View className="time">
                       <span className="small">hint time: {gameTimeHint} mins | real time: {gameTime} mins |
                        tot: time: { Number((gameTime + gameTimeHint + gameTimeTotal).toFixed(2))} min</span>
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
