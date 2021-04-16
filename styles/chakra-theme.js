import { extendTheme } from "@chakra-ui/react";
import { Global } from "@emotion/react";

/**
 * Using <Global /> from @emotion/react to add styles to the global stylesheet
 * We're using the @import method to add the font directly in the CSS file.
 *
 * <Fonts /> is used in `_app.tsx`
 */
export const Fonts = () => (
    <Global
        styles={
            '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");'
        }
    />
);

/**
 * Using the `extendTheme()` to create a custom chakra-configuration
 * We pass it as `theme` argument on the ChakraProvider in the `_app.tsx`
 */
export default extendTheme({
    fonts: {
        heading: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        body: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    },
    fontWeights: {
        thin: 300,
        normal: 400,
        regular: 500,
        medium: 600,
        bold: 700,
    },
    config: {
        initialColorMode: "light",
        useSystemColorMode: false,
    },
    colors: {
        gray: {
            50: "#F8FAFF",
            900: "#1B202B",
        },
    },
    styles: {
        global: () => ({
            "html, body": {
                transition: "background 0s",
                WebkitTapHighlightColor: "transparent",
            },
            "html, body, #__next": {
                height: "100%",
                width: "100%",
            },
        }),
    },
});
