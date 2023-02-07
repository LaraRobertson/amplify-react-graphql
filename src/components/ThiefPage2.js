import React, {useState} from "react"
import data from "./gameConstants";
import {Button, Heading, View, Image, TextAreaField, Text} from '@aws-amplify/ui-react';

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
export function ThiefPage2() {
    const [gamePage, setGamePage] = useState();
    const [isGameDetailVisible, setIsGameDetailVisible] = useState(false);
    const [areNotesVisible, setAreNotesVisible] = useState(false);
    const [thiefNotes,setThiefNotes] = useState('');
    const [game1Num1Page1,setGame1Num1Page1] = useState('');
    const [game1Num2Page1,setGame1Num2Page1] = useState('');
    const [game1NumPage1guess,setGame1NumPage1guess] = useState( {Num1:"",Num2:""});
    const [haveGuessedGame1Page1,setHaveGuessedGame1Page1] = useState(false);
    const [isGame1Page1Wrong, setIsGame1Page1Wrong] = useState(true);

    /* classes */
    let buttonDetailClassHide = "button-small hide";
    let buttonDetailClassShow = "button-small show";
    let gameDetailClass = "game-detail hide";
    if (isGameDetailVisible === true) {
        buttonDetailClassHide = "button-small show";
        buttonDetailClassShow = "button-small hide";
        gameDetailClass = "game-detail hide";
    } else {
        buttonDetailClassHide = "button-small hide";
        buttonDetailClassShow = "button-small show";
        gameDetailClass = "game-detail show";
    }

    function showGameDetail() {
        setIsGameDetailVisible(true);
        console.log("isGameDetailVisible: " + isGameDetailVisible);
    }
    function hideGameDetail() {
        setIsGameDetailVisible(false);
        console.log("isGameDetailVisible: " + isGameDetailVisible);
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
            setHaveGuessedGame1Page1(true);
            localStorage.setItem("haveGuessedGame1Page1", true);
            setIsGame1Page1Wrong(false);
            localStorage.setItem("isGame1Page1Wrong", false);
        } else {
            console.log("wrong guess");
            setHaveGuessedGame1Page1(true);
            localStorage.setItem("haveGuessedGame1Page1", true);
            setIsGame1Page1Wrong(true);
            localStorage.setItem("isGame1Page1Wrong", true);
        }
    }

    function GoToPage2() {
        if (haveGuessedGame1Page1 === true && isGame1Page1Wrong === false) {
            let value = "Tybean Lower Porch (thief)";
            setGamePage(value);
            console.log("gamePage: " + gamePage);
            localStorage.setItem("gamePageThief", "Tybean Lower Porch (thief)");
        }
    }
    function toggleNotesThief() {
        areNotesVisible ? setAreNotesVisible(false) : setAreNotesVisible(true);
        console.log("areNotesVisible: " + areNotesVisible);
    }
    function setThiefNotesFunction({notes}) {
       console.log('notes: ' + notes);
       setThiefNotes(notes);
    }
    return (
        <View
              ariaLabel="Main Container"
              maxWidth="800px"
              padding="10px"
              backgroundColor="var(--amplify-colors-white)"
              margin="auto">
            <View
                className="backgroundCoverTopCenter"
                ariaLabel="Image Holder"
                position="relative"
                height="calc(100vh - 60px)"
                maxHeight="400px"
                display="block"
                backgroundImage = "url('https://escapeoutbucket213334-staging.s3.amazonaws.com/public/lower-porch-background-new.jpg')">
              <View
                    className="zIndex102"
                    ariaLabel="Notes Button"
                    position="absolute"
                    right="3%"
                    top="12%"
                    width="7%"
                    maxWidth="50px"
                    fontSize="10px"
                    marginBottom="20px"
                    zindex="102">

                    <button className="exit-small" onClick={toggleNotesThief}>
                        <Image src="http://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/notes.png" />
                    </button>
              </View>
              <View
                  arialLabel="Notes Open"
                  className={areNotesVisible ? "show" : "hide"} >
                  <button className="close-button"  onClick={toggleNotesThief}>X</button>
                      <div>Take some notes</div>
                      <br />
                      <TextAreaField
                          label="Notes"
                          onChange={(e) => setThiefNotesFunction(e.currentTarget.value)}
                          descriptiveText={
                              <Text
                                  as="span"
                                  fontStyle="italic"
                                  fontSize="var(--amplify-font-sizes-small)"
                              >
                                  {thiefNotes}
                              </Text>
                          }
                      />
              </View>
              <View
                  arialLabel="Red Table 4 chairs"
                  max-width="200px"
                  position="absolute"
                  right="10%"
                  top="37%"
                  width="28%"
                  zindex="22"
              >
                  <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/table-palette-knife.png" />
              </View>
            <View
                arialLabel="backpack Image"
                maxWidth="51px"
                position="absolute"
                right="10%"
                top="2%"
                width="28%"
                zindex="102"
                >

                        <Image src="https://escapeoutbucket213334-staging.s3.amazonaws.com/public/backpack-new.png" />


            </View>
            </View>
        </View>
    )
}


