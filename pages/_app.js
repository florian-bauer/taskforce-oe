import { ChakraProvider } from "@chakra-ui/react";
import Theme, { Fonts } from "@/styles/chakra-theme";
import { initializeAuthentication } from "@/lib/auth";

// Init the Authentication Proivders
initializeAuthentication();

const App = ({ Component, pageProps }) => (
    <ChakraProvider theme={Theme}>
        <Fonts />
        <Component {...pageProps} />
    </ChakraProvider>
);

export default App;

// TODO
// - [ ] Refactoring (alle Dateien durchgehen)
// - [ ] ShowParticipantController nur anzeigen wenn auch Participanten vorhanden sind
// - [ ] Participanten updaten wenn man hinzufügt / entfernt
