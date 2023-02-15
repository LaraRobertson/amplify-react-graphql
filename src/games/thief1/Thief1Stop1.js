import React, {useEffect, useState} from "react"
import data from "./gameConstants";
import {NotesOpen} from "../../components/NotesOpen";
import {Button, Heading, View, Image, TextAreaField, Text, Alert, Flex} from '@aws-amplify/ui-react';
import {useNavigate} from "react-router-dom";
import {API} from "aws-amplify";
import {gameStatsByGameID, gameStatsByUserEmail} from "../../graphql/queries";
import {createGameStats as createGameStatsMutation, updateGameStats as updateGameStatsMutation} from "../../graphql/mutations";

const shallowEqual = (object1, object2) => {
    const keys1 = Object.keys(object1);
    console.log("keys1: " + keys1.length);
    const keys2 = Object.keys(object2);
    console.log("keys2: " + keys2.length);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        console.log("object1[key]: " + object1[key]);
        console.log("object2[key]: " + object2[key]);
        console.log("typeof object1[key]: " + typeof object1[key]);
        console.log("typeof object2[key]: " + typeof object2[key]);
        if (object1[key] !== object2[key]) {
            console.log("false");
            return false;
        }
    }
    return true;
}


export function Thief1Stop1() {
    const [gameStatsState, setGameStatsState] = useState({});
    const [waiverClass, setWaiverClass] = useState();
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

    /* game specific */
    const [isLightVisible, setIsLightVisible] = useState(true);
    const [isDiaryInsideVisible, setIsDiaryInsideVisible] = useState(false);
    const [isLegsAvailable, setIsLegsAvailable] = useState(false);
    const [isLightOn, setIsLightOn] = useState(false);
    const [isNumBusAvailable, setIsNumBusAvailable] = useState(false);


    const [game1Num1Page1,setGame1Num1Page1] = useState('');
    const [game1Num2Page1,setGame1Num2Page1] = useState('');
    const [game1NumPage1guess,setGame1NumPage1guess] = useState( {Num1:"",Num2:""});
    const [haveGuessedGame1Stop1,setHaveGuessedGame1Stop1] = useState(false);
    const [isGame1Page1Wrong, setIsGame1Page1Wrong] = useState(true);

    const gamePage = "Tybean Lower Porch (thief)";

    const navigate = useNavigate();

    function goHome() {
        localStorage.setItem("gameName","");
        navigate('/');
    }

    function SetGuessGame1() {
        const elementID1 = "game1Num1Page1";
        const elementID2 = "game1Num2Page1";
        var x = document.getElementById(elementID1).value;
        var y = document.getElementById(elementID2).value;
        console.log("x: " + x);
        setGame1Num1Page1(x);
        setGame1Num2Page1(y);
        console.log("game1Num1Page1:" + game1Num1Page1);
        console.log("game1Num2Page1:" + game1Num2Page1);
        let updatedValue = {};
        updatedValue = {Num1:x,Num2:y};
        console.log("updatedValue.Num1: " + updatedValue.Num1);
        console.log("updatedValue.Num2: " + updatedValue.Num2);
        setGame1NumPage1guess(game1NumPage1guess => ({
            ...game1NumPage1guess,
            ...updatedValue
        }));
        //check if guess is right
        if (shallowEqual(updatedValue, data.game1NumPage1)) {
            console.log("right guess");
            setHaveGuessedGame1Stop1(true);
            localStorage.setItem("haveGuessedGame1Page1", true);
            setIsGame1Page1Wrong(false);
            localStorage.setItem("isGame1Page1Wrong", false);
        } else {
            console.log("wrong guess");
            setHaveGuessedGame1Stop1(true);
            localStorage.setItem("haveGuessedGame1Page1", true);
            setIsGame1Page1Wrong(true);
            localStorage.setItem("isGame1Page1Wrong", true);
        }
    }

    async function getGameStats() {
        console.log ("get Game Stats");
        /* Waiver Signed, haveGuessedGame1Stop1 */
        /* check local host */
        var haveGuessedGame1Stop1Local = localStorage.getItem("haveGuessedGame1Stop1");
        if (haveGuessedGame1Stop1Local) {
            setHaveGuessedGame1Stop1(haveGuessedGame1Stop1Local);
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
            for (const key in gameStatsState) {
                console.log(`${key}: ${gameStatsState[key]}`);
            }
        }
        /* localhost beats saved stats */

    }

    /* get gamestats and set localstorage */
    /* need to useEffect */
    useEffect(() => {
        console.log("***useEffect***: getGameStats - just localhost");
        /* get gamestats */
        getGameStats();
    }, []);

    useEffect(() => {
        console.log("***useEffect***: gameStatsState: " + gameStatsState);
        for (const key in gameStatsState) {
            console.log(`${key}: ${gameStatsState[key]}`);
        }
    });
    useEffect(() => {
        console.log("***useEffect***: waiverClass: " + waiverClass);
    });

    function goHome() {
        localStorage.setItem("gameName","");
        navigate('/');
    }
    /* hint functions */
    function toggleHint1() {
        isHint1Visible ? setIsHint1Visible(false) : setIsHint1Visible(true);
        console.log("isHint1Visible: " + isHint1Visible);
    }
    function toggleHint2() {
        isHint2Visible ? setIsHint2Visible(false) : setIsHint2Visible(true);
        console.log("isHint2Visible: " + isHint2Visible);
    }
    function toggleHint3() {
        isHint3Visible ? setIsHint3Visible(false) : setIsHint3Visible(true);
        console.log("isHint3Visible: " + isHint3Visible);
    }
    function toggleHint4() {
        isHint4Visible ? setIsHint4Visible(false) : setIsHint4Visible(true);
        console.log("isHint4Visible: " + isHint4Visible);
    }
    /* info functions */
    function toggleInfo() {
        isInfoVisible ? setIsInfoVisible(false) : setIsInfoVisible(true);
        console.log("isInfoVisible: " + isInfoVisible);
    }
    /* notes functions */
    function toggleNotes() {
        areNotesVisible ? setAreNotesVisible(false) : setAreNotesVisible(true);
        console.log("areNotesVisible: " + areNotesVisible);
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
        console.log("isBackpackVisible: " + isBackpackVisible);
    }
    function backpackLight () {
        setIsLightVisible(false);
        console.log("put light in backpack (thief)");
        localStorage.setItem("light", "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/04/blacklight-off.png");
        //write to backpack big
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
                    src: 'https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/04/blacklight-off.png',
                    key: 'light'
                })
            }
        } else {
            console.log("push light to backpack");
            gameBackpack.push({
                src: 'https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/04/blacklight-off.png',
                key: 'light'
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

    function showItemContents (value) {
        console.log("show contents value: " + value);
        switch (value) {
            case 'diary':
                console.log("show diary");
                /* diary is visible */
                setIsDiaryInsideVisible(true);
                break;
            case 'light':
                setIsLightOn(!isLightOn);
                console.log("turn on/off light - local storage");
                if (isLightOn) {
                    setIsLegsAvailable(true);
                    setIsNumBusAvailable(true);
                } else {
                    setIsLegsAvailable(false);
                    setIsNumBusAvailable(false);
                }
                // change image
                for (var i = 0; i < gameBackpack.length; i++) {
                    if (gameBackpack[i].key === "light") {
                        console.log("turn on/off light - state");
                        if (!isLightOn) {
                            gameBackpack[i].src = "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/blacklight-on.png"
                            localStorage.setItem("light", "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/04/blacklight-on.png");
                        } else {
                            gameBackpack[i].src = "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/04/blacklight-off.png"
                            localStorage.setItem("light", "https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/04/blacklight-off.png");
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
                className="image-holder"
                ariaLabel="Image Holder"
                backgroundImage = "url('https://escapeoutbucket213334-staging.s3.amazonaws.com/public/lower-porch-background-new3.png')">
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
                    ariaLabel="Red Table 4 chairs"
                    max-width="200px"
                    position="absolute"
                    right="10%"
                    top="37%"
                    width="28%"
                    zindex="22">
                    <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/table-palette-knife.png" />
                </View>
                <View
                    className={isLightVisible ? "zIndex20 show" : "hide"}
                    max-width="40px"
                    margin="auto"
                    position="absolute"
                    bottom="15%"
                    right="39%"
                    width="10%"
                    onClick={()=>backpackLight()}
                >
                    <Image src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/02/blacklight.png" />
                </View>
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
                            <Button onClick={() => goHome()}>Home</Button>
                            &nbsp; | Thief 1 -> {gamePage}
                        </div><br />
                        <strong>How to Play:</strong> Click around - some items will disappear and then appear in your backpack.  If it is in your backpack you may be able to use it by clicking on it.
                        <br /><br />
                        <strong>Goal for this stop:</strong> find the thief's stolen goods.  Use Hints if you really need them.
                        <br /><br />
                        <Button className="button-small" onClick={() => toggleHint1()}>Open Hint (game)</Button>
                        <Button className="button-small" onClick={() => toggleHint2()}>Open Hint (shops)</Button>
                        <Button className="button-small" onClick={() => toggleHint3()}>Open Hint (light)</Button>
                        <Button className="button-small" onClick={() => toggleHint4()}>Open Hint (order of numbers)</Button>

                        <br /><br />
                        <div className={isHint4Visible ? "hint-holder show-gradual" : "hint-holder hide-gradual"}>
                            <Button className="button-small" onClick={() => toggleHint4()}>X</Button>
                            <strong>Hint for somewhere order of numbers for safe:</strong>
                            <br /><br />The diary had a little rhyme.  This rhyme tells you the order of the numbers.
                            <br /><br />

                        </div>
                        <div className={isHint3Visible ? "hint-holder show-gradual" : "hint-holder hide-gradual"}>
                            <Button className="button-small" onClick={() => toggleHint3()}>X</Button>
                            <strong>Hint for light (in backpack):</strong>
                            <br /><br />Once you click on light it should go into your backpack. This is a blacklight and when you
                            use it (click it in backpack to turn on) and click on objects you will see more clues.
                            <br /><br />

                        </div>
                        <div className={isHint2Visible ? "hint-holder show-gradual" : "hint-holder hide-gradual"}>
                            <Button className="button-small" onClick={() => toggleHint2()}>X</Button>
                            <strong>Hint for game clue:</strong> <br /><br />You may have to ask someone about this contest.
                            It happened in July of 2021. Or you can look on their facebook/instagram feed.
                            <br /><br />OR if you
                            happen to know the name of the animal prowling around then you know the answer to this puzzle.<br /><br />

                        </div>
                        <div className={isHint1Visible ? "hint-holder show-gradual" : "hint-holder hide-gradual"}>
                            <Button className="button-small" onClick={() => toggleHint1()}>X</Button>
                            <strong>Hint for shops clue:</strong> <br /><br />There are many little shops along the west side of the Tybee Oaks area - Inferno, Glazed and Confused are in the north part.
                            The southern most shop on the west side is "Tipsy Mermaid Art", then "granny flounders", then "The Tybee Gallery", then "Rachel Vogel Designs".
                            The third letter of the first (most southern) shop is "p".<br /><br />

                        </div>
                        <Button onClick={() => toggleInfo()}>Close Info and Play</Button>
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


