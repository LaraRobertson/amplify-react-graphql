import React, {useEffect, useState} from "react"
import {Button, Heading, View, Image, TextAreaField, Text, Alert, Flex} from '@aws-amplify/ui-react';
import {useNavigate} from "react-router-dom";
import {API} from "aws-amplify";
import {gameStatsByUserEmail,gameStatsSortedByGameName} from "../graphql/queries";
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
        const gameLink = localStorage.getItem("gameLink");
        console.log("gameName: " + gameName);
        let filter = {
            userEmail: {
                eq: userEmail
            }
        };
        const apiGameStats = await API.graphql({
            query: gameStatsSortedByGameName,
            variables: { filter: filter,  gameName: {eq: gameName}, sortDirection: "DESC", type: "gameStats"}
        });
        const gamesStatsFromAPI = apiGameStats.data.gameStatsSortedByGameName.items[0];

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
        /* gameLink now */
       // let path = gameName.replace(/\s+/g, '-').toLowerCase();
        let path = gameLink.replace(/\s+/g, '-').toLowerCase();
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
                <Alert variation="info" hasIcon={false}><strong>I will respect all laws, rules, and property rights of the area.
                    I will try not to annoy those around me.</strong></Alert>
                <View>
                    <View margin="10px 0">
                    <span className="italics bold">Gameplay is entirely up to me and at my discretion and I assume all of the risks of participating in this activity.</span>
                    </View>
                    <View margin="10px 0">
                        <strong>I WAIVE, RELEASE, AND DISCHARGE </strong> from any and all liability for EscapeOut.Games and
                    its parent company (Coastal Initiative, LLC).
                    </View>
                    <View width="95%"  margin="10px auto" textAlign="center" >
                        <strong>I certify that I have read this document and I fully understand its content.
                            I am aware that this is a release of liability and a contract and I sign it of my own free will.
                        </strong>
                    </View>

                </View>
                <Flex justifyContent="center" wrap='wrap'>
                    <Button textAlign="center" className="button" onClick={() => agreeToWaiverFunction()}>I agree to Waiver - clicking indicates signing</Button>
                    <Button textAlign="center" className="button" onClick={() => goHomeQuit(navigate)}>Quit Game and go back to Game List</Button>
                </Flex>
            </View>

        </View>
    )
}