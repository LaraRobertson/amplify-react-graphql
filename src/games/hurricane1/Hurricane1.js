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
    const [isHint1Visible, setIsHint1Visible] = useState(false);
    const [isHint2Visible, setIsHint2Visible] = useState(false);
    const [isHint3Visible, setIsHint3Visible] = useState(false);
    const [isHint4Visible, setIsHint4Visible] = useState(false);
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
    const [numberOfPlayers, setNumberOfPlayers] = useState('');
    const [numberOfPlayersError, setNumberOfPlayersError] = useState('');
    const [hintTime1,setHintTime1] = useState(0);
    const [hintTime2,setHintTime2] = useState(0);
    const [hintTime3,setHintTime3] = useState(0);
    const [hintTime4,setHintTime4] = useState(0);
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
        localStorage.removeItem("key");
        localStorage.removeItem("game1Word1Stop1HurricaneLetters");
        localStorage.removeItem("haveGuessedGame1Word1Stop1Hurricane");
        localStorage.removeItem("isGame1Word1Stop1HurricaneWrong");
        localStorage.removeItem("game1Word2Stop1HurricaneLetters");
        localStorage.removeItem("haveGuessedGame1Word2Stop1Hurricane");
        localStorage.removeItem("isGame1Word2Stop1HurricaneWrong");
        localStorage.removeItem("game1Word3Stop1HurricaneLetters");
        localStorage.removeItem("haveGuessedGame1Word3Stop1Hurricane");
        localStorage.removeItem("isGame1Word3Stop1HurricaneWrong");
        localStorage.removeItem("guess1");
        localStorage.removeItem("haveGuessed1");
        localStorage.removeItem("isWrong1");
        navigate('/');
    }
    const [isIntroVisible, setIsIntroVisible] = useState(true);
    function toggleIntro() {
        /* check numberOfPlayers */
        if (numberOfPlayers != '') {
            isIntroVisible ? setIsIntroVisible(false) : setIsIntroVisible(true);
        } else {
            setNumberOfPlayersError("Please choose number of players");
        }

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
                let gameTimeNum = Number(gameTime);
                gameTimeNum = gameTimeNum + .05;
                console.log('game time: ' + gameTimeNum.toFixed(2));
                /* add 1 minute */
                if (!isIntroVisible && !stopClock) {
                    localStorage.setItem("gameTime",gameTimeNum.toFixed(2));
                    let GameTimeTotalNum = Number(gameTimeNum.toFixed(2));
                    setGameTime(GameTimeTotalNum);
                    let hintTimeTotalNum = hintTime1 + hintTime2 + hintTime3 + hintTime4;
                    setGameTimeTotal(GameTimeTotalNum + hintTimeTotalNum);
                    setGameTimeHint(hintTimeTotalNum);
                    localStorage.setItem("gameTimeTotal", gameTimeNum.toFixed(2));
                }
                if (stopClock) winGameFunction(interval);

            } else {
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
        clearInterval(interval);
        console.log("game has been won");
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
        let gameTimeArray = [];
        let gameTimeTotalArray = [];
        let numberOfPlayersArray = [];
        let gameStatsGameTimeValues = '';
        console.log("gameStop (values): " + gameStop);
        let gameStatsGameStateValues = '{"waiverSigned":true,"gameStop":"' + gameStop + '"}';
        /* need to get stats and update */

        let numberOfTimes = 1;
        if (gamesStatsFromAPI.gameTime) {
            setGameCommentsOld(JSON.parse(gamesStatsFromAPI.gameComments));
            const gameStatsGameTime = JSON.parse(gamesStatsFromAPI.gameTime);
            console.log("some gameTime data");
            numberOfTimes = Number(gameStatsGameTime.numberOfTimes + 1);
            let oldNumberOfTimes = numberOfTimes-1;
            /* is this an array? */
            console.log("gameStatsGameTime.gameTime: " + gameStatsGameTime.gameTime);
            console.log("gameStatsGameTime.gameTime isarray: " + Array.isArray(gameStatsGameTime.gameTime));
            console.log("gameStatsGameTime.gameTime typeof: " + typeof gameStatsGameTime.gameTime);
            gameTimeArray = [...gameStatsGameTime.gameTime];
            gameTimeTotalArray = [...gameStatsGameTime.gameTimeTotal]
            numberOfPlayersArray = [...gameStatsGameTime.numberOfPlayers]
            gameTimeArray[oldNumberOfTimes] = gameTime;
            gameTimeTotalArray[oldNumberOfTimes] = gameTimeTotal;
            numberOfPlayersArray[oldNumberOfTimes] = numberOfPlayers;
            console.log("gameTimeArray: " + JSON.stringify(gameTimeArray));
            gameStatsGameTimeValues = '{"numberOfTimes":' + numberOfTimes +',"numberOfPlayers":' + JSON.stringify(numberOfPlayersArray) + ',"gameTime":' + JSON.stringify(gameTimeArray) + ',"gameTimeTotal":' + JSON.stringify(gameTimeTotalArray) + '}';
        } else {
            console.log("no gameTime data");
            gameTimeArray[0] = gameTime;
            gameTimeTotalArray[0] = gameTimeTotal;
            numberOfPlayersArray[0] = numberOfPlayers;
            gameStatsGameTimeValues = '{"numberOfTimes":1,"numberOfPlayers":' + JSON.stringify(numberOfPlayersArray) + ',"gameTime":' + JSON.stringify(gameTimeArray) + ',"gameTimeTotal":' + JSON.stringify(gameTimeTotalArray) + '}';
        }
        const newGameStats = {
            id: gamesStatsFromAPI.id,
            gameStates: gameStatsGameStateValues,
            gameTime: gameStatsGameTimeValues
        };
        localStorage.setItem("GameStatsID",gamesStatsFromAPI.id);
        const apiGameStatsUpdate = await API.graphql({ query: updateGameStatsMutation, variables: {input: newGameStats}});
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
        localStorage.setItem("gameStop",gameStop);
    }

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
        localStorage.setItem("guess2", x);
        //check if guess is right
        if (shallowEqual(x,answer2.numbers)) {
            setHaveGuessed2(true);
            localStorage.setItem("haveGuessed2", true);
            setIsWrong2(false);
            setStopClock(true);
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
                      onClick={()=>toggleCementSafe()}>
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
            <View className={isHelpVisible ? "all-screen show-gradual" : "all-screen hide-gradual"}>
                <Button className="close-button" onClick={() => toggleHelp()}>X</Button>
                <View width="100%" padding="10px">
                    <View paddingBottom="10px">
                        <strong>Game Stop</strong>: <span className="font-small">{gameStop}</span>
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
                    <Button className="button small" onClick={() => goHomeQuit()}>Quit Game and Go Home</Button> | <Button className="button small" onClick={() => toggleHelp()}>Close Help and Play</Button>
                </View>
            </View>
            <View
                ariaLabel="stop 1 intro"
                textAlign="center"
                className={isIntroVisible ? "all-screen show" : "hide"}>
                <h3>Game Goals: Find more Discs!</h3>
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
                    <div> You have played {localStorage.getItem("numberOfTimes")} time(s) before - good luck this time! </div>
                ) : null}
                <h4>Start Playing Game When You are Here:</h4>
                <View>
                    <Image maxHeight="150px" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/hurricane/game-picture-jaycee-shelter.jpg" />
                </View>
                <Button className="button" onClick={() => toggleIntro()}>I Want To Play!</Button>
                |
                <Button className="button" onClick={() => goHomeQuit()}>Back Home</Button>
            </View>
        </View>
    )
}


