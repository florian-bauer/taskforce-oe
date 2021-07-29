import { Flex } from "@chakra-ui/react";

const Wrapper = ({ children }) => (
    <Flex
        bg="gray.50"
        border="1px solid rgba(0, 0, 0, .05)"
        borderRadius={10}
        w="100%"
        p={6}
        position="relative"
        flexDirection="column"
        mt={6}
        maxWidth="1100px"
    >
        {children}
    </Flex>
);

export { Wrapper };
