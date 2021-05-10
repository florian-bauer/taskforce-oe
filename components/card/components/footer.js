import { HStack, VStack, useBreakpointValue } from "@chakra-ui/react";

const Footer = ({ children }) => {
    // Handling Responsiveness of the Footer Components
    const useVerticalStack = useBreakpointValue({ base: true, sm: false });

    if (useVerticalStack) {
        return (
            <VStack w="100%" mt={8}>
                {children}
            </VStack>
        );
    } else {
        return (
            <HStack w="100%" mt={8}>
                {children}
            </HStack>
        );
    }
};

export { Footer };
