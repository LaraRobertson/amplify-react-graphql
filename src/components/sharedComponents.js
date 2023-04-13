import {Button, Image, SelectField, TextAreaField, TextField, View, Flex} from "@aws-amplify/ui-react";
import React from "react";
import {
    setNumPlayerFunction,
    toggleGameIntro,
    goHomeQuit,
    setTeamNameFunction,
    toggleHelp,
    toggleHint1, toggleHint2, toggleHint3, toggleHint4
} from "./helper";
import {useNavigate} from "react-router-dom";

export const GameIntro = (props) => {
    let gameStopName = "NA";
    if (props.gameStopNameArray[0]) {
        gameStopName = props.gameStopNameArray[0].gameStopName;
    }
    const navigate = useNavigate();
    let stopWord = "stop.";
    if (props.gameStopNameArray.length > 1) {
        stopWord = "stops. Your time between stops is not counted.";
    }
    return (
        <View
            ariaLabel="stop 1 Game intro"
            textAlign="center"
            className={props.isGameIntroVisible ? "all-screen show-gradual" : "hide-gradual"}>
            <h3>{gameStopName}</h3>
            <View color="#7e0b0b">{props.numberOfPlayersError}</View>

            <TextField
                name="TeamNameField"
                className="black-text-field"
                placeholder=""
                label="Team Name?"
                required
                value={props.teamName}
                onChange={(e) => setTeamNameFunction(e.target.value,props.setTeamName)}
            />
            {(localStorage.getItem("numberOfTimes") !== null && localStorage.getItem("numberOfTimes") != 0) ? (
                <div> You have played {localStorage.getItem("numberOfTimes")} time(s) before - good luck this time! </div>
            ) : null}

            <View width="80%" margin="0 auto">
                <View color="#7e0b0b">
                    <strong>SCORE</strong>
                </View>
                <View><span className="small">Your score is your time. Time doesn't stop until you complete the stop. This game
                    has {props.gameStopNameArray.length} {stopWord}</span>
                </View>
                <View marginTop="15px" marginBottom="-10px">
                    <Image width="70px" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/help.png" />
                </View>
                <View>
                    <span className="small">Click on <strong>Help</strong> for more
                        information and links to Hints. If you <span className="italics"> click a Hint you get <strong>5 minutes</strong> </span>added to your time.</span>
                </View>
                <View marginTop="15px" marginBottom="-10px">
                    <Image width="70px" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/notes.png" />
                </View>
                <View><span className="small">Click on <strong>Notes</strong> to write notes during
            game. These notes are not saved once you complete game.</span>
                </View>
            </View>
            <View marginTop="10px">
            <Button className="button" onClick={() => toggleGameIntro(props.isGameIntroVisible, props.teamName, props.setIsGameIntroVisible, props.setNumberOfPlayersError, props.setIsIntroVisible)}>Go To Stop 1 Intro</Button>
            <Button className="button right-button" onClick={() => goHomeQuit(navigate)}>Back to All Games</Button>
            </View>
        </View>
    )
}

export const NotesOpen = (props) => {
    return (
        <View
            ariaLabel="Notes Open"
            className={props.areNotesVisible ? "all-screen show" : "all-screen hide"}>
            <Button className="close-button" onClick={() => props.toggleNotes(props.areNotesVisible,props.setAreNotesVisible,props.isCoverScreenVisible,props.setIsCoverScreenVisible)}>X</Button>
            <div>Take some notes</div>
            <br/>
            <TextAreaField
                label="Notes"
                onChange={(e) =>  props.setGameNotes(e.currentTarget.value)}
                descriptiveText="Take some Notes - close when done, they will still be here"
            />
        </View>
    )
}
export const HelpScreen = (props) => {
    return (
        <View className={props.isHelpVisible ? "all-screen show" : "all-screen hide"}>
            <Button className="close-button" onClick={() => toggleHelp(props.isHelpVisible,props.setIsHelpVisible,props.isCoverScreenVisible,props.setIsCoverScreenVisible)}>X</Button>
            <View width="100%" padding="10px">
                <View paddingBottom="10px">
                    <strong>Game Stop</strong>: <span className="font-small">{props.gameStop}</span>
                </View>
                <View paddingBottom="10px">
                    <strong>How to Play:</strong> Click around - some items will disappear and then appear in your backpack.  If it is in your backpack you may be able to use it by clicking on it.
                </View>
                <View paddingBottom="10px">
                    <strong>Goal for this stop:</strong> {props.Goal}  Use Hints if you really need them.
                </View>
                <Flex wrap="wrap">
                    <Button className="button small" onClick={() => toggleHint1(props.setHintTime1,props.isHint1Visible,props.setIsHint1Visible)}>{props.Hint1Link}</Button>
                    <Button className="button small" onClick={() => toggleHint2(props.setHintTime2,props.isHint2Visible,props.setIsHint2Visible)}>{props.Hint2Link}</Button>
                    <Button className="button small" onClick={() => toggleHint3(props.setHintTime3,props.isHint3Visible,props.setIsHint3Visible)}>{props.Hint3Link}</Button>
                    <Button className="button small" onClick={() => toggleHint4(props.setHintTime4,props.isHint4Visible,props.setIsHint4Visible)}>{props.Hint4Link}</Button>
                </Flex>
                <br /><br />
                <div className={props.isHint1Visible ? "winner show" : "all-screen hide"}>
                    <Button className="close-button" onClick={() => toggleHint1(props.setHintTime1,props.isHint1Visible,props.setIsHint1Visible)}>X</Button>
                    <strong>{props.Hint1Title}:</strong> <br /><br />
                    {props.Hint1Description}
                </div>
                <div className={props.isHint2Visible ? "winner show" : "all-screen hide"}>
                    <Button className="close-button" onClick={() => toggleHint2(props.setHintTime2,props.isHint2Visible,props.setIsHint2Visible)}>X</Button>
                    <strong>Hint for name of house:</strong> <br /><br />
                    Near the intersection of Solomon and N. Campbell there is a house that people use for events.<br /><br />
                    Go over there and look for the name.
                </div>
                <div className={props.isHint3Visible ? "winner show" : "all-screen hide"}>
                    <Button className="close-button" onClick={() => toggleHint3(props.setHintTime3,props.isHint3Visible,props.setIsHint3Visible)}>X</Button>
                    <strong>Hint for Sport:</strong>
                    <br /><br />People do play soccer and disc golf but the closest field to the shelter is the baseball field.
                    <br /><br />
                </div>
                <div className={props.isHint4Visible ? "winner show" : "all-screen hide"}>
                    <Button className="close-button" onClick={() => toggleHint4(props.setHintTime4,props.isHint4Visible,props.setIsHint4Visible)}>X</Button>
                    <strong>Hint for name of field</strong>
                    <br /><br />There is a large sign on the fence at the field with the name.
                    <br /><br />

                </div>
                <Button className="button action-button small" onClick={() => toggleHelp(props.isHelpVisible,props.setIsHelpVisible,props.isCoverScreenVisible,props.setIsCoverScreenVisible)}>Close Help and Play</Button>
            </View>
        </View>
    )
}
export const CoverScreenView = (props) => {
    let gameDetailClass = "cover-screen hide-gradual";
    if (props.isCoverScreenVisible) gameDetailClass = "cover-screen show-gradual";
    return (
        <View className={gameDetailClass}>
        </View>
    )
}