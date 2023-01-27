// components/Login.js
import React, {useEffect, useState} from "react";

import {Authenticator, Button, useAuthenticator, View} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { useNavigate, useLocation } from 'react-router';

export function Login() {
    const { route } = useAuthenticator((context) => [context.route]);
    const location = useLocation();
    const navigate = useNavigate();
    const [homeDetail, setHomeDetail] = useState();
    let from = location.state?.from?.pathname || '/';
    useEffect(() => {
        if (route === 'authenticated') {
            navigate(from, { replace: true });
        }
    }, [route, navigate, from]);
    function goToHome() {
        console.log("go to home (login)");
        console.log("homeDetail2: " + homeDetail);
        navigate('/');
    }
    function setHome() {
        console.log("set home");
        setHomeDetail("show");
        console.log("homeDetail: " + homeDetail);
        //goToHome();
    }
    useEffect(() => {
        console.log("homeDetail (useEffect): " + homeDetail);
        //if (homeDetail === "show") navigate('/');
    });
    return (
        <View className="auth-wrapper">
            <div>
            <Button onClick={() => setHome()}>Home</Button>
            </div>
            <Authenticator></Authenticator>
        </View>
    );
}