// components/Home.js
import React, {useEffect, useState} from 'react';
import {
    Flex,
    Button,
    useTheme,
    Heading,
    View,
    Card,
    Text,
    TextField,
    TextAreaField,
    useAuthenticator
} from '@aws-amplify/ui-react';
import {API, Auth} from "aws-amplify";
import {gameScoreByGameID, gameStatsByGameID} from "../graphql/queries";
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom';

export function MyStats() {
    const [myStats, setMyStats] = useState([]);
    async function myStatsFunction() {
        console.log("myStats");
        let filter = {
            userEmail: {
                eq: true
            }
        };
        const apiData = await API.graphql({
            query: gameStatsByGameID,
            variables: {filter: filter}
        });
        const myStatsFromAPI = apiData.data.gameStatsByGameID.items;
        /*await Promise.all(
            gamesFromAPI.map(async (game) => {
                if (game.gameImage) {
                    const url = await Storage.get(game.gameName);
                    game.gameImage = url;
                    console.log("url: " + url);
                }
                return game;
            })
        );*/
        setMyStats(myStatsFromAPI);
    }
    const navigate = useNavigate();
    useEffect(() => {
        console.log("***useEffect***:  myStatsFunction()");
        myStatsFunction();
    }, []);
    return (
        <View margin="1rem 0"
              maxWidth="800px"
              margin="10px auto 10px auto">

            <View
                maxWidth="800px"
                margin="10px auto 10px auto"
            >
                <Heading level={2}>LeaderBoard</Heading>
                <Heading level={3}>{localStorage.getItem("gameName")}</Heading>
                <div className="table-container" role="table" aria-label="Destinations">
                    <div className="flex-table header" role="rowgroup">
                        <div className="flex-row first" role="columnheader">Team Name</div>
                        <div className="flex-row" role="columnheader">Rank</div>
                        <div className="flex-row" role="columnheader">Team Score</div>
                        <div className="flex-row" role="columnheader"># Players</div>
                        <div className="flex-row" role="columnheader">Played</div>
                    </div>
                    {myStats.map((game, index) => (
                        <div className="flex-table row" role="rowgroup" key={game.id}>
                            <div className="flex-row first" role="cell">{game.teamName}</div>
                            <div className="flex-row" role="cell">{index}</div>
                            <div className="flex-row" role="cell">{game.gameTotalTime} mins</div>
                            <div className="flex-row" role="cell">{game.numberOfPlayers}</div>
                            <div className="flex-row" role="cell"> {format(new Date(game.createdAt), "MM/dd/yyyy H:mma")}</div>
                        </div>
                    ))}
                </div>
            </View>
        </View>
    );
}