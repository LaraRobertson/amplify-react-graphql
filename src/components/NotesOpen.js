import {Text, TextAreaField, View, Button} from "@aws-amplify/ui-react";
import React, {useState} from "react";

const NotesOpen = (props) => {
    return (
        <View
            ariaLabel="Notes Open"
            className={props.areNotesVisible ? "all-screen show-gradual" : "all-screen hide-gradual"}>
            <Button className="close-button" onClick={() => props.toggleNotes()}>X</Button>
            <div>Take some notes</div>
            <br/>
            <TextAreaField
                label="Notes"
                onChange={(e) => props.setNotesFunction(e.currentTarget.value)}
                descriptiveText="Take some Notes - close when done, they will still be here"
            />
        </View>
    )
}

export {NotesOpen};