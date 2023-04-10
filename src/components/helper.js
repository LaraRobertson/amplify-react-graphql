import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {API} from "aws-amplify";
import {gameScoreByGameStatsID, gameStopByGameID} from "../graphql/queries";
import {createGameHintTime, createGameStopTime, updateGameScore} from "../graphql/mutations";

export async function setGameStopFunction(setGameStop,setNumberOfTimes,setGameID,setGameStatsID,setGameStopNameArray,setGameStopName,setGameScoreID) {
    console.log("setGameStopFunction - only on mount");
    console.log ("get Game Stop: " + localStorage.getItem("gameStop"));
    console.log ("get GameID: " + localStorage.getItem("gameID"));
    console.log ("get GameStatsID: " + localStorage.getItem("gameStatsID"));
    setGameStop(localStorage.getItem("gameStop"))
    setNumberOfTimes(localStorage.getItem("numberOfTimes"));
    setGameID(localStorage.getItem("gameID"));
    setGameStatsID(localStorage.getItem("gameStatsID"));
    /* get gameStop name */
    const gameStopFromAPI = await getGameStopName();
    let gameStopNameArrayConst = gameStopFromAPI.data.gameStopByGameID.items;
    /* get gameScore Id */
    const gameScoreFromAPI = await getGameScoreID();
    let gameScoreID = gameScoreFromAPI.data.gameScoreByGameStatsID.items[0].id;
    let testObject = gameStopNameArrayConst[0];
    for (const key in testObject) {
        console.log(`${key}: ${ testObject[key]}`);
        for (const key1 in testObject[key]) {
            //console.log(`${key1}: ${testObject[key][key1]}`);
        }
    }
    let GameStopIndex = Number(localStorage.getItem("gameStop"))-1;
    setGameStopNameArray(gameStopNameArrayConst);
    setGameStopName(gameStopNameArrayConst[GameStopIndex].gameStopName);
    console.log("gameStopNameArrayConst[0].gameStopName (setGameStopFunction): " + gameStopNameArrayConst[GameStopIndex].gameStopName);
    localStorage.setItem("gameStopNameArray", gameStopFromAPI.data.gameStopByGameID.items);
    setGameScoreID(gameScoreID);
    localStorage.setItem("gameScoreID", gameScoreID);
}

async function getGameScoreID() {
    let filter = {
        completed: {
            eq: false
        }
    };
    const apiGameScore = await API.graphql({
        query: gameScoreByGameStatsID,
        variables: { filter: filter, gameStatsID: localStorage.getItem("gameStatsID")}
    }).then(response => {
        console.log(response);
        return(response);
    }).catch(e => {
        console.log("catch");
        console.log(e);
        return null;
    });

    return(apiGameScore);
}

async function getGameStopName() {
    const apiGameStop = await API.graphql({
        query: gameStopByGameID,
        variables: { gameID: localStorage.getItem("gameID")}
    }).then(response => {
        console.log(response);
        return(response);
    }).catch(e => {
        console.log("catch");
        console.log(e);
        return null;
    });

    return(apiGameStop);
}

export function toggleNotes(areNotesVisible,setAreNotesVisible) {
    areNotesVisible ? setAreNotesVisible(false) : setAreNotesVisible(true);
}

export function setNumPlayerFunction(numPlayerValue, setNumberOfPlayers) {
    console.log("numPlayerFunction: " + numPlayerValue);
    localStorage.setItem("numberOfPlayers", numPlayerValue);
    setNumberOfPlayers(numPlayerValue);
}

export function toggleGameIntro(isGameIntroVisible, teamName, numberOfPlayers, setIsGameIntroVisible, setNumberOfPlayersError, setIsIntroVisible) {
    console.log("toggleGameIntro: " + setNumberOfPlayersError);
    if (numberOfPlayers != '' && teamName != '') {
        isGameIntroVisible ? setIsGameIntroVisible(false) : setIsGameIntroVisible(true);
        setIsIntroVisible(true);
    } else {
        setNumberOfPlayersError("Please complete fields");
    }
}

export function setGameTimeFunction(gameTime, setGameTime, gameTimeValue) {
    let gameTimeNum = Number( gameTimeValue);
    console.log("gametimefunction: " + gameTimeNum.toFixed(2));
    localStorage.setItem("gameTime",gameTimeNum.toFixed(2));
    setGameTime(gameTimeNum);
}

export function toggleIntro(isIntroVisible,setIsIntroVisible,setStopClock,setIsCoverScreenVisible) {
    isIntroVisible ? setIsIntroVisible(false) : setIsIntroVisible(true);
    setIsCoverScreenVisible(false);
    setStopClock(false);
}

export function toggleHelp(isHelpVisible,setIsHelpVisible) {
    isHelpVisible ? setIsHelpVisible(false) : setIsHelpVisible(true);
}
export function toggleBackpack(isBackpackVisible,setIsBackpackVisible,isCoverScreenVisible,setIsCoverScreenVisible) {
    isBackpackVisible ? setIsBackpackVisible(false) : setIsBackpackVisible(true);
    isCoverScreenVisible ? setIsCoverScreenVisible(false) : setIsCoverScreenVisible(true);
}
export function toggleHint1(setHintTime1,isHint1Visible,setIsHint1Visible) {
    setHintTime1(5);
    isHint1Visible ? setIsHint1Visible(false) : setIsHint1Visible(true);
}
export function toggleHint2(setHintTime2,isHint2Visible,setIsHint2Visible) {
    setHintTime2(5);
    isHint2Visible ? setIsHint2Visible(false) : setIsHint2Visible(true);
}
export function toggleHint3(setHintTime3,isHint3Visible,setIsHint3Visible) {
    setHintTime3(5);
    isHint3Visible ? setIsHint3Visible(false) : setIsHint3Visible(true);
}
export function toggleHint4(setHintTime4,isHint4Visible,setIsHint4Visible) {
    setHintTime4(5);
    isHint4Visible ? setIsHint4Visible(false) : setIsHint4Visible(true);
}
export function setCommentsFunction(notes,setGameComments) {
    console.log('comments: ' + notes);
    /* set localhost variable */
    setGameComments(notes);
}
export function goHomeQuit(navigate) {
    removeLocalStorage();
    navigate('/');
}

export function leaveComment(setShowComments,isCoverScreenVisible,setIsCoverScreenVisible) {
    console.log('showComments');
    isCoverScreenVisible ? setIsCoverScreenVisible(false) : setIsCoverScreenVisible(true);
    setShowComments(true);
}

export async function goHome(navigate,gameComments) {
    console.log("game comments: " + gameComments);
    const newGameStats = {
        id: localStorage.getItem("gameScoreID"),
        gameComments: gameComments,
        completed: true
    };
    const apiGameScoreUpdate = await API.graphql({ query: updateGameScore, variables: {input: newGameStats}});
    removeLocalStorage();
    navigate('/');
}

export async function winGameFunction(props,gameScoreID,gameTime,gameStop,gameTimeTotal,gameTimeHint,numberOfPlayers,teamName) {
    console.log("props: " + props);
    console.log("winGameFunction");
    /* for end of game: clearInterval(interval);*/
    console.log("stop has been won");
    /* update gameScore based on stop - */
    updateGameScoreFunction(props,gameScoreID,gameTime,gameStop,gameTimeTotal,gameTimeHint,numberOfPlayers,teamName);
    createGameStopFunction(gameScoreID,gameTime,gameStop);
    createGameHintFunction(gameScoreID,gameTimeHint,gameStop);
}

export async function createGameStopFunction(gameScoreID,gameTime,gameStop) {
    const data = {
        gameScoreID: gameScoreID,
        gameStopTime: gameTime,
        gameStop: gameStop
    };
    await API.graphql({
        query: createGameStopTime,
        variables: { input: data },
    });
}

async function createGameHintFunction(gameScoreID,gameTimeHint,gameStop) {
    const data = {
        gameScoreID: gameScoreID,
        gameHintTime: gameTimeHint,
        gameStop: gameStop
    };
    await API.graphql({
        query: createGameHintTime,
        variables: { input: data },
    });
}

async function updateGameScoreFunction(props,gameScoreID,gameTime,gameStop,gameTimeTotal,gameTimeHint,numberOfPlayers,teamName) {
    console.log("gameScoreID (update):" + gameScoreID);
    let GameTimeTotalVar = gameTimeTotal + gameTime + gameTimeHint;
    const data = {
        id: gameScoreID,
        numberOfPlayers: numberOfPlayers,
        teamName: teamName,
        gameTotalTime: Number(GameTimeTotalVar),
        completed: props
    };
    console.log("data: " + data);
    /*let testObject = data;
    for (const key in testObject) {
        console.log(`${key}: ${ testObject[key]}`);
        for (const key1 in testObject[key]) {
            //console.log(`${key1}: ${testObject[key][key1]}`);
        }
    }*/
    const apiUpdateGameScore = await API.graphql({
        query: updateGameScore,
        variables: { input: data },
    }).then(response => {
        console.log(response);
        return(response);
    }).catch(e => {
        console.log("catch apiUpdateGameScore");
        console.log(e);
        return null;
    });

    return(apiUpdateGameScore);
}

export function goToStop(setGameStop,gameStop,gameTime,setGameTime,gameTimeTotal,setGameTimeTotal,setGameTimeHint,gameTimeHint,setHintTime1,setHintTime2,setHintTime3,setHintTime4,setIsIntroVisible) {
    setGameStop(Number(gameStop) + 1);
    localStorage.setItem("gameStop",Number(gameStop) + 1);
    console.log("go to stop:" + (Number(gameStop) + 1));
    setGameTimeTotal(gameTimeTotal + gameTime + gameTimeHint);
    /* reset time */
    setHintTime1(0);
    setHintTime2(0);
    setHintTime3(0);
    setHintTime4(0);
    setGameTime(0);
    setGameTimeHint(0);
    setIsIntroVisible(true);
}

export function intervalFunction(gameTime,stopClock,setGameTime,hintTime1,hintTime2,hintTime3,hintTime4,setGameTimeHint,isIntroVisible) {
    console.log('Logs every 3 seconds');
    if (gameTime) {
        let gameTimeNum = Number((gameTime + .05).toFixed(2));
        console.log('game time: ' + gameTimeNum);
        if (!stopClock) {
            localStorage.setItem("gameTime", gameTimeNum);
            setGameTime(gameTimeNum);
            let hintTimeTotalNum = Number(hintTime1 + hintTime2 + hintTime3 + hintTime4);
            console.log("hint time total: " + hintTimeTotalNum);
            localStorage.setItem("gameTimeHint", hintTimeTotalNum);
            setGameTimeHint(hintTimeTotalNum);
        }
        console.log("stopClock: " + stopClock);

    } else {
        console.log("no gameTime");
        if (!isIntroVisible) {
            setGameTimeFunction(gameTime, setGameTime, .05);
        }
    }
}

export function setTeamNameFunction(teamNameValue,setTeamName) {
    console.log("setTeamNameFunction: " + teamNameValue);
    localStorage.setItem("teamName", teamNameValue);
    setTeamName(teamNameValue);
}



export function removeLocalStorage() {
        localStorage.removeItem("agreeToWaiver");
        localStorage.removeItem("gameStatsID");
        localStorage.removeItem("gameScoreID");
        localStorage.removeItem("gameID");
        localStorage.removeItem("gameName");
        localStorage.removeItem("teamName");
        localStorage.removeItem("gameNameID");
        localStorage.removeItem("gameTime")
        localStorage.removeItem("gameTimeHint");
        localStorage.removeItem("gameTimeTotal");
        localStorage.removeItem("gameStop");
        localStorage.removeItem("gameStopNameArray");
        localStorage.removeItem("numberOfTimes");
        localStorage.removeItem("numberOfPlayers");
        localStorage.removeItem("key");
        localStorage.removeItem("prybar");
        localStorage.removeItem("shovel");
        localStorage.removeItem("key2");
}