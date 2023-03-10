import React, {useEffect, useState} from "react"
import {NotesOpen} from "../../components/NotesOpen";
import {shallowEqual} from "../../components/ShallowEqual";
import {Button, Heading, View, Image, TextAreaField, TextField, Text, Alert, Flex} from '@aws-amplify/ui-react';
import {useNavigate} from "react-router-dom";
import {API} from "aws-amplify";
import {gameStatsByGameID, gameStatsByUserEmail} from "../../graphql/queries";
import {createGameStats as createGameStatsMutation, updateGameStats as updateGameStatsMutation} from "../../graphql/mutations";

export function Hurricane1Stop2() {
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
    const [clickTimeNow,setClickTimeNow] = useState();
    const [clickTimeThen,setClickTimeThen] = useState();
    const [clickCount,setClickCount] = useState();

    const navigate = useNavigate();
    function goHome() {
        localStorage.setItem("gameName","");
        navigate('/');
    }
    function goToStop2() {
        console.log("go to stop2: hurricane-stop2");
        navigate("/hurricane-stop2");
    }
    /* TODO: get gamestats and set localstorage */
    async function getGameStats() {
        console.log ("get Game Stats");
        /* Waiver Signed, haveGuessedGame1Stop1 */
        /* check local host */
        var haveGuessed1 = localStorage.getItem("haveGuessedGame1Stop1");
        if (haveGuessed1) {
            setHaveGuessed1(haveGuessed1);
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

    /* need to useEffect */
    useEffect(() => {
        console.log("***useEffect***: getGameStats() - just localhost");
        /* get gamestats */
       // getGameStats();
    }, []);

    useEffect(() => {
        console.log("***useEffect***: gameStatsState: " + gameStatsState);
        for (const key in gameStatsState) {
            console.log(`${key}: ${gameStatsState[key]}`);
        }
    });
    function pauseGame() {
        setIsGamePaused(true);
        setIsGamePlaying(false);
    }
    function playGame() {
        setIsGamePaused(false);
        setIsGamePlaying(true);
    }
    /* 60000 miliseconds = 1 minute, timer shows 30 second intervals, should change */
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
    useEffect(() => {
        console.log("***useEffect***: gameTime: " + gameTime);
    });
    useEffect(() => {
        console.log("***useEffect***: isGamePaused: " + isGamePaused);
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
    /* end backpack functions */

    /* game/stop specific */
    const gamePage = "Jaycee Park Shelter (Hurricane)";

    /* guessing states and answers for first safe - 6 letters - trying to find order of letters*/
    const [guess1,setGuess1] = useState({'answer':''});
    const [haveGuessed1,setHaveGuessed1] = useState();
    const [isWrong1, setIsWrong1] = useState(true);
    const answer1 = {'answer':'SBOVHW'};
    useEffect(() => {
        console.log("***useEffect***: guess1.answer: " + guess1.answer);
    });
    function setGuess1Function(guess) {
        var x = guess;
        console.log("guess1 x: " + x);
        let guessObject = {"answer":x};
        setGuess1(guessObject);
        localStorage.setItem("guess1", x);
        //check if guess is right
        if (shallowEqual(x,answer1.answer)) {
            setHaveGuessed1(true);
            localStorage.setItem("haveGuessed1", true);
            setIsWrong1(false);
            localStorage.setItem("isWrong1", false);
        } else {
            console.log("wrong guess");
            setHaveGuessed1(true);
            localStorage.setItem("haveGuessed1", true);
            setIsWrong1(true);
            localStorage.setItem("isWrong1", true);
        }

    }
    /* end guessing states and answers for first safe - 5 numbers */

    /* guessing states and answers for 2nd safe - 4 numbers (adding stuff from signs) */
    const [guess2,setGuess2] = useState({'answer':''});
    const [haveGuessed2,setHaveGuessed2] = useState();
    const [isWrong2, setIsWrong2] = useState(true);

    const answer2 = {'answer':'1921'};
    useEffect(() => {
        console.log("***useEffect***: guess2.answer: " + guess2.answer);
    })
    function setGuess2Function(guess) {
        var x = guess;
        console.log("guess2 x: " + x);
        let guessObject = {"answer":x};
        setGuess2(guessObject);
        localStorage.setItem("guess2", x);
        //check if guess is right
        if (shallowEqual(x,answer2.answer)) {
            setHaveGuessed2(true);
            localStorage.setItem("haveGuessed2", true);
            setIsWrong2(false);
            localStorage.setItem("isWrong2", false);
        } else {
            console.log("wrong guess");
            setHaveGuessed2(true);
            localStorage.setItem("haveGuessed2", true);
            setIsWrong2(true);
            localStorage.setItem("isWrong2", true);
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
    const [isSignVisible, setIsSignVisible] = useState(false);
    function toggleSign() {
        isSignVisible ? setIsSignVisible(false) : setIsSignVisible(true);
    }
    /* bench has # references to signs about girlscouts on path leading to gazebo */
    const [isBenchVisible, setIsBenchVisible] = useState(false);
    function toggleBench() {
        isBenchVisible ? setIsBenchVisible(false) : setIsBenchVisible(true);
    }
    /* open safe window with note */
    const [isSafeInfoVisible, setIsSafeInfoVisible] = useState(false);
    function toggleSafe() {
        isSafeInfoVisible ? setIsSafeInfoVisible(false) : setIsSafeInfoVisible(true);
    }
    useEffect(() => {
        console.log("***useEffect***: isSafeInfoVisible: " + isSafeInfoVisible);
    });

    /* use key in key hole */
    const [isKeyUsed, setIsKeyUsed] = useState(false);
    function toggleUseKey() {
        isKeyUsed ? setIsKeyUsed(false) : setIsKeyUsed(true);
    }
    /* move on to next stop */
    const [isSandbagMessageVisible, setIsSandbagMessageVisible] = useState(false);
    function toggleSandbagMessages() {
        isSandbagMessageVisible ? setIsSandbagMessageVisible(false) : setIsSandbagMessageVisible(true);
    }
    function goToStop3() {
        console.log("go to stop 3");
        navigate('/hurricane-2-stop3');
    }

    /* backpack items: key */
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



    return (
        <View
              ariaLabel="Main Container"
              position="relative">
            <View
                className="image-holder image-short"
                ariaLabel="Image Holder"
                backgroundImage = "url('https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/background-game-jaycee-gazebo.jpg')">
                <View
                    className="z-index102 info-button"
                    ariaLabel="Info Button"
                    onClick={() => toggleInfo()}>
                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/info.png" />
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
                       onClick={()=>toggleSafe()}>
                            <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/bush-open-left.png" />
                       </View>
                   )
                }
                {
                    !isRightBushOpen  ? (
                <View
                    ariaLabel="right bush"
                    className="right-bush"
                    onClick={()=>toggleRightBush()}>
                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/bush-right.png" />
                </View>
                    ) : (
                <View
                    ariaLabel="right bush"
                    className="right-bush"
                    onClick={()=>toggleUseKey()}>
                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/bush-open-right.png" />
                </View>
                    )
                }
                <View
                    ariaLabel="words on string"
                    className="words-on-string"
                    onClick={()=>toggleSign()}>
                    <Image src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/03/words-small.png" />
                </View>
                <View
                    ariaLabel="bench"
                    className="bench"
                    onClick={()=>toggleBench()}>
                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/bench.png" />
                </View>
                <View
                    ariaLabel="sign info"
                    className={isSignVisible ? "all-screen show" : "hide"}>
                    <Button className="close-button" onClick={()=>toggleSign()}>X</Button>
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
                <View className={isKeyOn && isKeyUsed && !isWrong2 && !isWrong1? "cement-safe show" : "hide"}
                      onClick={()=>toggleSandbagMessages()}>4
                    <Image className="test" alt="test" src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/03/sandbags2.png" />
                </View>
            </View>
            <View className={isSafeInfoVisible ? "all-screen show" : "hide"}>
                <Button className="close-button" onClick={()=>toggleSafe()}>X</Button>
                <h3>Try to Open Safe</h3>
                <TextField
                    label="6 Letters"
                    value={guess1.answer}
                    onChange={(e) => setGuess1Function(e.currentTarget.value)}/>
                {
                    haveGuessed1 && isWrong1  ? (
                        <span className="red"> Wrong Answer!</span>
                    ) : null
                }
                {
                    !isWrong1  ? (
                        <span  className="right"> Right Answer!</span>
                    ) : null
                }
                <TextField
                    label="4 numbers"
                    value={guess2.answer}
                    onChange={(e) => setGuess2Function(e.currentTarget.value)}/>
                {
                    haveGuessed2 && isWrong2 ? (
                        <span className="red"> This is wrong.</span>
                    ) : null
                }
                {
                    !isWrong2  ? (
                        <span  className="right"> Right Answer!</span>
                    ) : null
                }
                { !isWrong1 && !isWrong2 && haveGuessed1 && haveGuessed2  ? (
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
                <Button className="bottom-button" onClick={() => goHome()}>Home</Button>
                <span className="small"> | hint time: {gameTimeHint} mins | real time: {gameTime} mins | tot: time: {gameTimeTotal} min</span>
            </View>
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
                            <Button className="button" onClick={() => goHome()}>Home</Button>
                            &nbsp; | Thief 1 -> {gamePage}
                        </div><br />
                        <strong>How to Play:</strong> Click around - some items will disappear and then appear in your backpack.  If it is in your backpack you may be able to use it by clicking on it.
                        <br /><br />
                        <strong>Goal for this stop:</strong> find the thief's stolen goods.  Use Hints if you really need them.
                        <br /><br />
                        <Button className="button small" onClick={() => toggleHint3()}>Open Hint (light)</Button>
                        <Button className="button small" onClick={() => toggleHint4()}>Open Hint (order of words)</Button>
                        <Button className="button small" onClick={() => toggleHint2()}>Open Hint (game)</Button>
                        <Button className="button small" onClick={() => toggleHint1()}>Open Hint (shops)</Button>



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
                        <Button className="button" onClick={() => toggleInfo()}>Close Info and Play</Button>
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
        </View>
    )
}


