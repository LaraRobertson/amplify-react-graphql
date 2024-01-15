import {Button, Image, SelectField, TextAreaField, TextField, View, Flex, Heading} from "@aws-amplify/ui-react";
import React from "react";
import {
    setNumPlayerFunction,
    toggleGameIntro,
    goHomeQuit,
    setTeamNameFunction,
    toggleHelp,
    toggleHint1,
    toggleHint2,
    toggleHint3,
    toggleHint4,
    toggleNotes,
    showItemContents,
    toggleBackpack,
    setCommentsFunction, goHome, toggleMap
} from "./helper";
import {useNavigate} from "react-router-dom";

export const TimeBlock = (props) => {
    console.log("props.realTimeStart: " + props.realTimeStart);
    let realTimeStart = new Date(props.realTimeStart).toLocaleString();
    return (
        <View ariaLabel="stop 1 Time" className="time">
                    <span className="small">hint time: {props.gameTimeHint} mins | time started: {realTimeStart} </span>
        </View>
    )
}
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
        <View className={props.isGameIntroVisible? "cover-screen show-gradual" : "hide"}>
        <View
            ariaLabel="stop 1 Game intro"
            textAlign="center"
            className="all-screen show-gradual">
            <h3>Game Intro</h3>
            <h2>Game Name: {localStorage.getItem("gameName")}</h2>

            <View backgroundColor="#BFD6E8" margin="10px auto" padding="5px" width="90%" lineHeight="18px">
                <View className="small"> <strong>Game Details:</strong></View>
                <View color="#0D5189"><strong>{localStorage.getItem("gameDescriptionH2")}</strong></View>
                <View>{localStorage.getItem("gameDescriptionH3")}</View>
                <View className="small italics">{localStorage.getItem("gameDescriptionP")}</View>
            </View>

            <View color="#7e0b0b">{props.numberOfPlayersError}</View>

            <TextField
                name="TeamNameField"
                margin="10px auto"
                maxWidth="300px"
                placeholder=""
                label="Your Display Name for this game?"
                required
                value={props.teamName}
                onChange={(e) => setTeamNameFunction(e.target.value,props.setTeamName)}
            />
            {(localStorage.getItem("numberOfTimes") !== null && localStorage.getItem("numberOfTimes") != 0) ? (
                <View className="small italics"  margin="0 0 5px 0"> You have played {localStorage.getItem("numberOfTimes")} time(s) before - good luck this time! </View>
            ) : null}

            <View width="90%" margin="0 auto" lineHeight="16px">
                <View color="#7e0b0b">
                    <strong>SCORE</strong>
                </View>
                <View><span className="small">Your score is your time. Time doesn't stop until you complete the stop. This game
                    has <strong>{props.gameStopNameArray.length} {stopWord}</strong></span>
                </View>
                <View marginTop="5px" marginBottom="-20px" height="50px">
                    <Image width="70px" src="https://escapeoutbucket213334-staging.s3amazonaws.com/public/help.png" />
                </View>
                <View>
                    <span className="small">Click on <strong>Help</strong> for more
                        information and links to Hints. If you <span className="italics"> click a Hint you get <strong>5 minutes</strong> </span>added to your time.</span>
                </View>
                <View marginTop="5px" marginBottom="-20px" height="50px">
                    <Image width="70px" src="https://escapeoutbucket213334-staging.s3amazonaws.com/public/notes.png" />
                </View>
                <View><span className="small">Click on <strong>Notes</strong> to write notes during
            game. These notes are not saved once you complete game.</span>
                </View>
            </View>
            <View marginTop="10px">
            <Button margin="0 0 5px 0" className="button small" onClick={() => toggleGameIntro(props.isGameIntroVisible, props.teamName, props.setIsGameIntroVisible, props.setNumberOfPlayersError, props.setIsIntroVisible)}>Go To Stop 1 Intro (time does not start yet)</Button>
            <Button className="button right-button small" onClick={() => goHomeQuit(navigate)}>Back to Game List</Button>
                <View className="navigate-message">(please use buttons to navigate, back button doesn't work as well)</View>
            </View>
        </View>
        </View>
    )
}
export const TopRight = (props) => {
    return (
        <View>
            <View
                className="z-index102 info-button clickable"
                ariaLabel="Info Button"
                onClick={() => toggleHelp(props.isHelpVisible,props.setIsHelpVisible)}>
                <Image src="https://escapeoutbucket213334-staging.s3amazonaws.com/public/help.png" />
            </View>
            <View
                className="z-index102 notes-button clickable"
                ariaLabel="Notes Button"
                onClick={() => toggleNotes(props.areNotesVisible,props.setAreNotesVisible)}>
                <Image src="https://escapeoutbucket213334-staging.s3amazonaws.com/public/notes.png" />
            </View>
            <View
                className="z-index102 backpack-image clickable"
                ariaLabel="backpack Image"
                onClick={()=>toggleBackpack(props.isBackpackVisible,props.setIsBackpackVisible)}>
                <Image src="https://escapeoutbucket213334-staging.s3amazonaws.com/public/backpack-new.png" />
            </View>
            <View className={props.isBackpackVisible ? "cover-screen show-gradual" : "hide"}>
                <View className="all-screen zIndex103 show">
                    <Button className="close-button" onClick={() => toggleBackpack(props.isBackpackVisible,props.setIsBackpackVisible)}>X</Button>
                    <h3>Backpack Contents</h3><br />
                    <Flex wrap="wrap" >
                        {props.gameBackpack.map((item) => {
                            return (
                                <View width="45%" key={item.key}>
                                    <Image alt={item.src} onClick={() => props.showItemContents(item.key)} className={item.key} src={item.src} />
                                </View>
                            )
                        })}
                    </Flex>
                    <View width="100%" textAlign='center' paddingTop="10px">
                        <Button className="button action-button" onClick={() => toggleBackpack(props.isBackpackVisible,props.setIsBackpackVisible)}>tap to close backpack</Button>
                    </View>
                </View>
            </View>
        </View>
    )

}
export const CommentWindow = (props) => {
    const navigate = useNavigate();
    return (
        <View className="cover-screen">
            <View className="winner comment-screen">
                <h3>Thank you for playing. </h3>

                <Heading level={4} className="heading">Please Comment</Heading>
                We really want to know any and all comments you have about the game.
                <TextAreaField
                    rows="6"
                    onChange={(e) => setCommentsFunction(e.currentTarget.value,props.setGameComments)}
                    descriptiveText="Any Issues or Problems?  Suggestions for improvement?"
                /><br />
                <Button className="button small" onClick={() => goHome(navigate,props.gameComments)}>Back to Games Page</Button>
            </View>
        </View>
    )
}

export const NotesOpen = (props) => {
    return (
        <View
            ariaLabel="Notes Open"
            className={props.areNotesVisible ? "notes show" : "hide"}>
            <strong>Notes:</strong>
            <View className={(props.clues != '')?"small show":"hide"}>
                <strong>clues</strong>: {props.clues}
                <View textAlign="center"><Button className="link-button small" onClick={() => props.setClues('')}>clear clues</Button></View>
            </View>
            <TextAreaField
                label="Notes"
                labelHidden
                value={props.gameNotes}
                rows="5"
                onChange={(e) =>  props.setGameNotesFunction(e.currentTarget.value,props.setGameNotes)}
                descriptiveText="Take some Notes - close when done, they will still be here"
            />
            <View width="100%" textAlign='center' paddingTop="10px">
                <Button className="button action-button small" onClick={() => props.toggleNotes(props.areNotesVisible,props.setAreNotesVisible,props.isCoverScreenVisible,props.setIsCoverScreenVisible)}>tap to close notes</Button>
            </View>
        </View>
    )
}

