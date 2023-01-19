import { Flex, Image, useTheme } from "@aws-amplify/ui-react";

export function Header() {
    const { tokens } = useTheme();

    return (
        <Flex justifyContent="center">
            <Image
                alt="logo"
                src="https://escapeoutgames.tybeewebdesign.com/wp-content/uploads/2022/02/logo-escapeout.png"
                padding={tokens.space.medium}
            />
        </Flex>
    );
}