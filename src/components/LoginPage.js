// components/Layout.js
import React, {useState} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {useAuthenticator, Button, Heading, View, Image} from '@aws-amplify/ui-react';

export function ThiefPage1() {
    const [gameName, setGameName] = useState("Thief 1");
    const [gamePage, setGamePage] = useState("Intro");
    const [homeDetail, setHomeDetail] = useState("show");
    const [isGameDetailVisible, setIsGameDetailVisible] = useState(true);
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
        buttonDetailClassHide = "button-small hide";
        buttonDetailClassShow = "button-small show";
        gameDetailClass = "game-detail hide";
    } else {
        buttonDetailClassHide = "button-small show";
        buttonDetailClassShow = "button-small hide";
        gameDetailClass = "game-detail show";
    }

    function showGameDetail() {
        setIsGameDetailVisible(false);
        console.log("isGameDetailVisible: " + isGameDetailVisible);
    }
    function hideGameDetail() {
        setIsGameDetailVisible(true);
        console.log("isGameDetailVisible: " + isGameDetailVisible);
    }
    const { route, signOut } = useAuthenticator((context) => [
        context.route,
        context.signOut,
    ]);
    const navigate = useNavigate();

    function logOut() {
        signOut();
        navigate('/login');
    }
    function goToPage2() {
        console.log("go to page 2");
        setHomeDetail("hide");
        navigate('/page2');
    }
    function goToHome() {
        console.log("go tohome");
        setHomeDetail("show");
        navigate('/');
    }
    return (
        <View>

                <header>
                    <View className={homeDetail}
                        maxWidth="800px"
                        margin="10px auto 10px auto">
                        <div className="wp-block-columns">
                            <div><Image className="test" src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/02/logo-escapeout.png" /></div>
                        </div>
                        <div>
                            <Heading
                                level={6}
                            >
                                game: {gameName}
                            </Heading>
                        </div>
                    </View>
                </header>

                <View
                    className={homeDetail}
                    maxWidth="800px"
                    margin="10px auto 10px auto">

                    <Button className={buttonDetailClassShow} onClick={showGameDetail} >Show Game Details</Button>
                    <Button className={buttonDetailClassHide} onClick={hideGameDetail} >Hide Game Details</Button>
                    <div className={gameDetailClass} >
                        <Button className="close-button" onClick={hideGameDetail}  value="X"/>

                        <strong>Game Details:</strong> This game has 1 stop. You can tell if you are at the right stop by looking at the picture on the game.
                        The picture represents the playing area and contains some extra stuff on screen for you to use to find the thief's ill-begotten gains.
                        Once you are at the stop, you need click around on the game screen to
                        try and figure out the puzzles. You also need to use details from your surroundings. (<strong>it is recommended to play in landscape mode</strong>). <br /><br /><strong>Fun Fact</strong>: The game can be played on one device or everyone can play together
                        on their own device - just click on appropriate link to access game, once you have loaded game you don't need the internet.
                        If you keep the window open gameplay will be saved over a long period of time.<br /><br />
                        <strong>Helpful Hints:</strong>
                        <div className="wp-block-columns">
                            <div className="wp-block-column-intro">
                                <img className="test" src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/02/info.png" />
                            </div>
                            <div className="wp-block-column-intro">
                                <h3>Click on Info bubble for helpful information about game</h3>
                            </div>
                        </div>
                        <div className="wp-block-columns">
                            <div className="wp-block-column-intro">
                                <img className="test" src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/05/diary-50.png" />
                            </div>
                            <div className="wp-block-column-intro">
                                <h3>Clicking on objects will sometimes open a small window with information and sometimes put them in your backpack.</h3>
                            </div>
                        </div>
                        <div className="wp-block-columns">
                            <div className="wp-block-column-intro">
                                <img className="test" src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/04/backpack.png" />
                            </div>
                            <div className="wp-block-column-intro">
                                <h3>If an object is in your backpack it will be highlighted .</h3>
                            </div>
                        </div>

                        <br /><strong>Game Description:</strong>
                    <h2>A Thief is loose at Tybee Oaks!</h2>
                    <h2>Can you Help?</h2>


                    <h4>Only Stop is the Tybean Art & Coffee Bar.</h4>
                    <div className="italics">Game is best viewed in landscape mode. Please turn your phone horizontally for gameplay at stops.</div>
                    <img className="test" src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/02/tybean-porch.png" />
                    <h4>Start Playing when you are here</h4>

                    </div>
                    <br />
                    <hr /><br />
                    <h3>Game is under development - check back soon!!!</h3>
                    <div><br />Please email us at info@escapeout.games if you are interested in beta testing.</div>
                    <br /><hr />


                </View>
            <View
                maxWidth="800px"
                margin="10px auto 10px auto">

                {route === 'authenticated' ? (
                    <div>
                        <Button onClick={() => goToPage2()}>
                            go to game
                        </Button> |  <Button onClick={() => goToHome()}>Home</Button> |  <Button onClick={() => logOut()}>Logout</Button>
                    </div>

                ) : 'Please Login'}
                <Outlet />
            </View>
        </View>
    );
}