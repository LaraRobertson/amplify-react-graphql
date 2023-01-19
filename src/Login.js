import {
    Authenticator,
    Flex,
    Grid,
    Image,
    useTheme,
    View
} from "@aws-amplify/ui-react";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { SignInHeader } from "./SignInHeader";
import { SignInFooter } from "./SignInFooter";

const components = {
    Header,
    SignIn: {
        Header: SignInHeader,
        Footer: SignInFooter
    },
    Footer
};

export function Login() {
    const { tokens } = useTheme();

    return (

    <Grid
        templateColumns={{ base: '1fr', large: '1fr 1fr' }}
        templateRows={{ base: '60vh 40vh)', large: 'repeat(1, 100vh)' }}
        gap={tokens.space.small}
    >
        <Flex
            backgroundColor={tokens.colors.pink[20]}
            justifyContent="center"
        >
            <Authenticator components={components}>
                {({ signOut, user }) => (
                    <main>
                        <h1>Hello {user.username}</h1>
                        <button onClick={signOut}>Sign out</button>
                    </main>
                )}
            </Authenticator>
        </Flex>
        <View backgroundColor={tokens.colors.pink[40]} height="100vh"></View>

    </Grid>
    );
}