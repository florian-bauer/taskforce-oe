import { TableModal } from "@/components/table-modal";
import { ViewIcon } from "@chakra-ui/icons";
import { Avatar, Flex, MenuItem, Text } from "@chakra-ui/react";

const ShowParticipantsController = ({ participants }) => (
    <>
        {participants && (
            <TableModal
                open={(onOpen) => (
                    <MenuItem onClick={onOpen} icon={<ViewIcon />}>
                        Helfer:innen anzeigen
                    </MenuItem>
                )}
                header="Eingetragene Helfer"
                labelClose="Schließen"
                content={{
                    list: participants,
                    body: ({ name, email, avatar }) => (
                        <Flex alignItems="center">
                            <Avatar size="md" name={name} src={avatar} />
                            <Flex flexDir="column" ml={2}>
                                <Text fontSize="md" fontWeight="medium">
                                    {name}
                                </Text>
                                <Text
                                    fontSize="sm"
                                    fontWeight="normal"
                                    color="gray.500"
                                >
                                    {email}
                                </Text>
                            </Flex>
                        </Flex>
                    ),
                }}
            />
        )}
    </>
);

export { ShowParticipantsController };
