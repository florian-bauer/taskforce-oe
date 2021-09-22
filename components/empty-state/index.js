import { Flex, Heading, Text } from "@chakra-ui/react";

const EmptyState = ({ title, subtitle }) => (
    <Flex
        flexDir="column"
        height="100%"
        alignItems="center"
        justifyContent="center"
        userSelect="none"
    >
        <Heading size="md">{title}</Heading>
        <Text mt={1}>{subtitle}</Text>
    </Flex>
);
export { EmptyState };
