import { Avatar, Flex, Text } from "@chakra-ui/react";

const ParticipantItemController = ({ name, avatar, email }) => {
    return (
        <Flex alignItems="center">
            <Avatar size="md" name={name} src={avatar} />
            <Flex flexDir="column" ml={2}>
                <Text fontSize="md" fontWeight="medium">
                    {name}
                </Text>
                <Text fontSize="sm" fontWeight="normal" color="gray.500">
                    {email}
                </Text>
            </Flex>
        </Flex>
    );
};

export { ParticipantItemController };
