import { ChakraProvider } from "@chakra-ui/react";
import Theme, { Fonts } from "@/styles/chakra-theme";

const App = ({ Component, pageProps }) => (
    <ChakraProvider theme={Theme}>
        <Fonts />
        <Component {...pageProps} />
    </ChakraProvider>
);

export default App;
