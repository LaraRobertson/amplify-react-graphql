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
import {gameScoreByGameID} from "../graphql/queries";
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom';

export function LeaderBoard() {
    const [leaderBoard, setLeaderBoard] = useState([]);
    const [showAllTimeButton, setShowAllTimeButton] = useState(false);
    async function leaderBoardFunction(date) {
        console.log("date: " + date);
        console.log("leaderboard");
        /* show all time button if today is selected */
        (date !== "2021-04-01" )? setShowAllTimeButton(true) : setShowAllTimeButton(false);
        let filter = {
            completed: {
                eq: true
            },
            firstTime: {
                eq: true
            },
            createdAt: {
                gt: date
            }
        };
        const apiData = await API.graphql({
            query: gameScoreByGameID,
            variables: {filter: filter, sortDirection: "ASC", gameID:localStorage.getItem("gameID")}
        });
        const leaderBoardFromAPI = apiData.data.gameScoreByGameID.items;
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
        setLeaderBoard(leaderBoardFromAPI);
    }
    const navigate = useNavigate();
    useEffect(() => {
        console.log("***useEffect***:  LeaderBoard()");
        leaderBoardFunction("2021-04-01");
    }, []);

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    return (
        <View className="main-container">
            <View className="main-content">
                <Heading level={2} className="heading">LeaderBoard</Heading>
                <View className="small">Only games played the first time will show on leaderboard.</View>
                <Heading level={5} className="heading2">Game Name: {localStorage.getItem("gameName")}</Heading>

                <Button className={showAllTimeButton ? "hide" : "button"} onClick={() => leaderBoardFunction(yesterday.toLocaleDateString('en-CA'))}>
                    tap to see today</Button>&nbsp;
                <Button className={showAllTimeButton ? "button" : "hide"} onClick={() => leaderBoardFunction("2021-04-01")}>
                    tap to see all time</Button>
                <Heading level={3} className={showAllTimeButton ? "heading" : "hide"} >Today</Heading>
                <Heading level={3} className={showAllTimeButton ? "hide" : "heading"} >All Time</Heading>
                <div className="table-container" role="table" aria-label="Destinations">
                    <div className="flex-table header" role="rowgroup">
                        <div className="flex-row first fourths" role="columnheader">Team Name</div>
                        <div className="flex-row fourths" role="columnheader">Rank</div>
                        <div className="flex-row fourths" role="columnheader">Team Score</div>
                        <div className="flex-row fourths" role="columnheader">Played</div>
                    </div>
                    {leaderBoard.map((game, index) => (
                        <div className="flex-table row" role="rowgroup" key={game.id}>
                            <div className="flex-row  fourths" role="cell">{game.teamName}</div>
                            <div className="flex-row fourths" role="cell">{index}</div>
                            <div className="flex-row fourths" role="cell">{game.gameTotalTime} mins</div>
                            <div className="flex-row fourths" role="cell"> {format(new Date(game.createdAt), "MM/dd/yyyy H:mma")}</div>
                        </div>
                    ))}
                </div>
            </View>
        </View>
    );
}