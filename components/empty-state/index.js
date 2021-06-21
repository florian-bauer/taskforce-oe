import { Flex, Heading, Text } from "@chakra-ui/react";

const EmptyState = ({ title, subtitle }) => (
    <Flex flexDir="column">
        <Heading size="md">{title}</Heading>
        <Text mt={1}>{subtitle}</Text>
    </Flex>
);
export { EmptyState };
