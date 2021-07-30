import { Participants } from "@/components/list-item/components/participants";
import { Flex, Heading, HStack } from "@chakra-ui/react";

const Head = ({ title, participants, actions, onClick }) => (
    <Flex
        alignItems="center"
        justifyContent="space-between"
        onClick={onClick}
        cursor="pointer"
    >
        <HStack spacing={4}>
            <Heading size="md" userSelect="none" pointerEvents="all">
                {title}
            </Heading>
            <Participants participants={participants} />
        </HStack>
        <HStack>{actions}</HStack>
    </Flex>
);

export { Head };
