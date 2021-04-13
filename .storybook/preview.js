import { ChakraProvider } from "@chakra-ui/react";
import { addDecorator } from "@storybook/react";
import Theme, { Fonts } from "../styles/chakra-theme";

/**
 * Adding the Charka Provider to enable
 * Chakra Components in the Storybook
 */
addDecorator((storyFn) => (
    <ChakraProvider theme={Theme}>
        <Fonts />
        {storyFn()}
    </ChakraProvider>
));

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
