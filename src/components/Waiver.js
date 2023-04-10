import React, {useEffect, useState} from "react"
import {Button, Heading, View, Image, TextAreaField, Text, Alert, Flex} from '@aws-amplify/ui-react';
import {useNavigate} from "react-router-dom";
import {API} from "aws-amplify";
import {gameStatsByUserEmail} from "../graphql/queries";
import {createGameStats, createGameScore, updateGameStats as updateGameStatsMutation} from "../graphql/mutations";
import {goHomeQuit} from "./helper";

export function Waiver() {

    const navigate = useNavigate();

    async function agreeToWaiverFunction() {
        //set localhost variable
        localStorage.setItem("agreeToWaiver", true);
        /* update database */
        console.log ("get Game Stats");
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

        const gameStatsValues = {
            waiverSigned: true
        }
        const newGameStats = {
            id: gamesStatsFromAPI.id,
            gameStates: JSON.stringify(gameStatsValues)
        };
        localStorage.setItem("gameStatsID",gamesStatsFromAPI.id);
        const apiGameStatsUpdate = await API.graphql({ query: updateGameStatsMutation, variables: {input: newGameStats}});

        /* create gameScore */
        const data = {
            gameStatsID: gamesStatsFromAPI.id,
            gameID: gamesStatsFromAPI.gameID,
            gameTotalTime: 0,
            completed: false,
            firstTime: true
        };
        await API.graphql({
            query: createGameScore,
            variables: { input: data },
        });
        let path = gameName.replace(/\s+/g, '-').toLowerCase();
        console.log("go to page: " + '/' + path);
        navigate('/' + path);
    }

    return (
            <View
                ariaLabel="Main Container"
                className="main-container">
            <View
                ariaLabel="Waiver"
                className="all-screen">
                <Heading level={4} marginBottom="10px">Waiver</Heading>
                <Alert variation="info">I HEREBY ASSUME ALL OF THE RISKS OF PARTICIPATING IN THIS ACTIVITY</Alert>
                <View>
                    including by way of example and not limitiation, any risks that may arise in the solving of any puzzle in
                    this game.  Gameplay is entirely up to me and at my discretion.
                    <br /><br />
                    <strong>I WAIVE, RELEASE, AND DISCHARGE </strong> from any and all liability for EscapeOut.Games and
                    its parent company (Coastal Initiative, LLC).
                    <br /><br /><strong>I CERTIFY THAT I HAVE READ THIS DOCUMENT AND I FULLY UNDERSTAND ITS CONTENT.
                    I AM AWARE THAT THIS IS A RELEASE OF LIABILITY AND A CONTRACT AND I SIGN IT OF
                    MY OWN FREE WILL.</strong>
                </View>
                <Flex justifyContent="center" wrap='wrap'>
                    <Button className="button" onClick={() => agreeToWaiverFunction()}>I agree to Waiver - clicking indicates signing</Button>
                    <Button className="button" onClick={() => goHomeQuit(navigate)}>Quit Game and go back to Home Page</Button>
                </Flex>
            </View>

        </View>
    )
}