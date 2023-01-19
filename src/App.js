import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";

import { Home } from "./Home";
import { Login } from "./Login";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

export default function App() {
    const { user } = useAuthenticator();
    console.log("user: " + user);
    if (user) {
        return <Home />;
    }
    return <Login />;

};

