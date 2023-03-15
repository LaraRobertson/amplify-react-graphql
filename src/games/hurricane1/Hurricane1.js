import React, {useEffect, useState} from "react"
import {NotesOpen} from "../../components/NotesOpen";
import {shallowEqual} from "../../components/ShallowEqual";
import {Button, Heading, View, Image, TextAreaField, TextField, Text, Alert, Flex} from '@aws-amplify/ui-react';
import {useNavigate} from "react-router-dom";
import {API} from "aws-amplify";
import {gameStatsByGameID, gameStatsByUserEmail} from "../../graphql/queries";
import {createGameStats as createGameStatsMutation, updateGameStats as updateGameStatsMutation} from "../../graphql/mutations";

export function Hurricane1() {
    /* for all games */
    const [gameStatsState, setGameStatsState] = useState({});
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

    const navigate = useNavigate();
    function goHome() {
        localStorage.setItem("gameName","");
        navigate('/');
    }

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

    /* game time/scoring */
    const [haveGuessedGame1Stop1Local, setHaveGuessedGame1Stop1Local] = useState();
    async function getGameStats() {
        console.log ("get Game Stats");
        /* Waiver Signed, haveGuessedGame1Stop1 */
        /* check local host */
        var haveGuessedGame1Stop1Local = localStorage.getItem("haveGuessedGame1Stop1");
        if (haveGuessedGame1Stop1Local) {
            setHaveGuessedGame1Stop1Local(haveGuessedGame1Stop1Local);
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

    /* get gamestats and set localstorage */
    /* need to useEffect */
    useEffect(() => {
        console.log("***useEffect***: getGameStats() - just localhost");
        /* get gamestats */
        getGameStats();
    }, []);
    useEffect(() => {
        console.log("***useEffect***: gameStatsState: " + gameStatsState);
        for (const key in gameStatsState) {
            console.log(`${key}: ${gameStatsState[key]}`);
        }
    });
    const [clickTimeNow,setClickTimeNow] = useState();
    const [clickTimeThen,setClickTimeThen] = useState();
    const [clickCount,setClickCount] = useState();
    useEffect(() => {
        console.log("***useEffect***: gameTime: " + gameTime);
    });
    useEffect(() => {
        console.log("***useEffect***: isGamePaused: " + isGamePaused);
    });
    function pauseGame() {
        setIsGamePaused(true);
        setIsGamePlaying(false);
    }
    function playGame() {
        setIsGamePaused(false);
        setIsGamePlaying(true);
    }
    /* 60000 miliseconds = 1 minute */
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
    /* end for all games */




    /* stop 1 - game specific */
    const gamePage = "Jaycee Park Shelter (Hurricane)";
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
        localStorage.setItem("guess1", x);
        //check if guess is right
        if (shallowEqual(x,answer1.numbers)) {
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

    /* guessing states and answers for 2nd safe - 5 numbers */
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
        localStorage.setItem("guess2", x);
        //check if guess is right
        if (shallowEqual(x,answer2.numbers)) {
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
    /* end guessing states and answers for 2nd safe - 5 numbers */

    /* sign is hanging */
    const [isSignVisible, setIsSignVisible] = useState(false);
    function toggleSign() {
        isSignVisible ? setIsSignVisible(false) : setIsSignVisible(true);
    }
    /* need to click on safe */
    const [isSafeInfoVisible, setIsSafeInfoVisible] = useState(false);
    function toggleSafe() {
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

    /* move on to next stop */
    const [isSandbagMessageVisible, setIsSandbagMessageVisible] = useState(false);
    function toggleSandbagMessages() {
        isSandbagMessageVisible ? setIsSandbagMessageVisible(false) : setIsSandbagMessageVisible(true);
    }
    function goToStop2() {
        console.log("go to stop 2");
        navigate('/hurricane-1-stop2');
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
    const [isPrybarVisible, setIsPrybarVisible] = useState(true);
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
            default:
        }
    }
    /* end stop 1 - game specific */


    return (
        <View
              ariaLabel="Main Container"
              position="relative">
            <View
                className="image-holder image-short"
                ariaLabel="Image Holder"
                backgroundImage = "url('https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/background-jaycee-shelter.jpg')">
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
                <View
                    ariaLabel="Hanging Sign"
                    className="hanging-sign"
                    onClick={()=>toggleSign()}>
                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/hanging-sign.png" />
                </View>

                <View
                    ariaLabel="left picnic table"
                    className="left-picnic-table"
                >
                    <Image  src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/left-picnic-table.png" />
                </View>
                <View
                    ariaLabel="right picnic table"
                    className="right-picnic-table"
                >
                    <Image  src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/right-picnic-table.png" />
                </View>
                <View
                    ariaLabel="sign info"
                    className={isSignVisible ? "all-screen show" : "hide"}>
                    <Button className="close-button" onClick={()=>toggleSign()}>X</Button>
                    <br /><h3>Hanging Sign Says:</h3>
                    <br />
                    <div>I am an odd number. Take away a letter and I become even.</div>
                </View>
                <View
                    ariaLabel="Safe Shelter"
                    className="safe-shelter"
                    onClick={()=>toggleSafe()}>
                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/safe-shelter.png"/>
                </View>
                <View className={isPrybarOn && !isCementSafeOpen && isWrong2? "cement-safe show" : "hide"}
                      onClick={()=>toggleCementSafe()}>4
                    <Image className="test" alt="test" src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/03/cementsafe1.png" />
                </View>
                <View className={!isPrybarOn? "cement-safe show" : "hide"}>
                    <Image className="test" alt="test" src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/03/cementsafe1.png" />
                </View>
                <View className={isCementSafeOpen && isWrong2? "cement-safe show" : "hide"}
                    onClick={()=>toggleCementSafeInfo()}>
                    <Image className="test" alt="test" src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/03/cementsafeopen.png" />
                </View>
                <View className={!isWrong2? "cement-safe show" : "hide"}
                    onClick={()=>toggleSandbagMessages()}>
                    <Image className="test" alt="test" src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/03/cementsafeopensandbags.png" />
                </View>
            </View>
            <View className={isSafeInfoVisible ? "all-screen show" : "hide"}>
                <Button className="close-button" onClick={()=>toggleSafe()}>X</Button>
                <TextField
                    label="Try to Open Safe! (5 numbers)"
                    value={guess1.numbers}
                    onChange={(e) => setGuess1Numbers(e.currentTarget.value)}/>
                {
                    haveGuessed1 && isWrong1  ? (
                        <span className="red"> Wrong Answer!</span>
                    ) : null
                }

                { !isWrong1 && haveGuessed1  ? (
               <View>
                    <span className="right"> Right Answer!</span><br />
                   <View  className={isPrybarVisible ? "show" : "hide"}
                          onClick={pryBar}>
                       <Image className="test" src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/03/prybar.png" />
                   </View>
               </View>
                ) : (
                <div>
                    <br /><h3>Note Under Safe Says:</h3>
                    As I sit here under <span className="bold-underline">this sign <span className="small">(#?)</span></span>,<br />
                    I look South and see something near with <span className="bold-underline">vertical slots <span className="small">(#?)</span></span> that align,<br />
                    I also collected the <span className="bold-underline">discs <span className="small">(#?)</span></span>, <span className="bold-underline">balls <span className="small">(#?)</span></span>,
                    and <span className="bold-underline">water bottles <span className="small">(#?)</span></span> in record time.
                </div>
                )}
            </View>
            <View className={isCementSafeInfoVisible ? "all-screen show" : "hide"}>
                <Button className="close-button" onClick={()=>toggleCementSafeInfo()}>X</Button>

                <TextField
                    label="Try to Open Floor Safe! (4 numbers)"
                    value={guess2.numbers}
                    onChange={(e) => setGuess2Numbers(e.currentTarget.value)}/>
                {
                    haveGuessed2 && isWrong2  ? (
                        <span className="red"> Wrong Answer!</span>
                    ) : null
                }

                { !isWrong2 && haveGuessed2  ? (
                    <View>
                        <span className="right"> Right Answer!</span><br />

                    </View>
                ) : (
                    <Image className="test" src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/03/codeforcement.png" />
                )}
            </View>
            {(!isWrong1 && !isWrong2)?
                (
                    <View className="winner">
                        <h3>Good Job on Finding Sandbags!</h3>
                        But you need more.<br />
                        Next stop is at Jaycee Park Gazebo - maybe you can find some there.<br /><br />
                        <Button className="button" onClick={()=>goToStop2()}>Click here for picture of stop 2</Button>
                    </View>
                ): null }

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


