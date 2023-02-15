import {Text, TextAreaField, View, Button} from "@aws-amplify/ui-react";
import React, {useState} from "react";

const NotesOpen = (props) => {
    return (
        <View
            ariaLabel="Notes Open"
            className={props.areNotesVisible ? "all-screen show-gradual" : "all-screen hide-gradual"}>
            <button className="close-button" onClick={() => props.toggleNotes()}>X</button>
            <div>Take some notes</div>
            <br/>
            <TextAreaField
                label="Notes"
                onChange={(e) => props.setNotesFunction(e.currentTarget.value)}
                descriptiveText={
                    <Text
                        as="span"
                        fontStyle="italic"
                        fontSize="var(--amplify-font-sizes-small)"
                    >
                        {props.gameNotes}
                    </Text>
                }
            />
        </View>
    )
}

export {NotesOpen};