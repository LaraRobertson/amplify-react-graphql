import {Button, Image, SelectField, TextAreaField, TextField, View, Flex} from "@aws-amplify/ui-react";
import React from "react";
import {setNumPlayerFunction, toggleGameIntro, goHomeQuit, setTeamNameFunction} from "./helper";
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
            <SelectField
                label="Number Of Players"
                className="num-Player"
                labelHidden
                isRequired
                size="small"
                width="200px"
                marginTop="10px"
                placeholder="How Many Players?"
                value={props.numberOfPlayers}
                onChange={(e) => setNumPlayerFunction(e.target.value, props.setNumberOfPlayers)}
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </SelectField>
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
            information and links to Hints. If you click a Hint you get 5 minutes added to your time.</span>
                </View>
                <View marginTop="15px" marginBottom="-10px">
                    <Image width="70px" src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/notes.png" />
                </View>
                <View><span className="small">Click on <strong>Notes</strong> to write notes during
            game. These notes are not saved once you complete game.</span>
                </View>
            </View>
            <View marginTop="10px">
            <Button className="button" onClick={() => toggleGameIntro(props.isGameIntroVisible, props.teamName, props.numberOfPlayers, props.setIsGameIntroVisible, props.setNumberOfPlayersError, props.setIsIntroVisible)}>Go To Stop 1 Intro</Button>
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
            <Button className="close-button" onClick={() => props.toggleNotes(props.areNotesVisible,props.setAreNotesVisible)}>X</Button>
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
export const CoverScreenView = (props) => {
    let gameDetailClass = "cover-screen hide-gradual";
    if (props.isCoverScreenVisible) gameDetailClass = "cover-screen show-gradual";
    return (
        <View className={gameDetailClass}>
        </View>
    )
}