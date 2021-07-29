import { Participants } from "@/components/list-item/components/participants";
import { Flex, Heading, HStack } from "@chakra-ui/react";

const Head = ({ title, participants, actions, onClick }) => (
    <Flex
        alignItems="center"
        justifyContent="space-between"
        onClick={onClick}
        cursor="pointer"
    >
        <Heading size="md" userSelect="none" pointerEvents="all">
            {title}
        </Heading>
        <HStack spacing={12}>
            <HStack>{actions}</HStack>
            <Participants participants={participants} />
        </HStack>
    </Flex>
);

export { Head };
