import { Button } from "@/components/button";
import { Menu } from "@/components/menu";
import { TableSearchModal } from "@/components/table-search-modal";
import { filter, getBadgeColor } from "@/controller/user-list-controller/lib";
import { ViewIcon } from "@chakra-ui/icons";
import { Avatar, Badge, Flex, Text, Grid } from "@chakra-ui/react";

const UserListController = () => {
    const body = ({ name, email, role }) => (
        <Grid templateColumns="auto 20% 10%" alignItems="center">
            <Flex w="100%" overflow="hidden">
                <Avatar size="sm" name={name} src="" />
                <Flex flexDir="column" ml={2}>
                    <Text
                        fontSize="sm"
                        fontWeight="medium"
                        isTruncated
                        maxW={56}
                    >
                        {name}
                    </Text>
                    <Text
                        fontSize="sm"
                        fontWeight="normal"
                        color="gray.500"
                        isTruncated
                        maxW={56}
                    >
                        {email}
                    </Text>
                </Flex>
            </Flex>
            <Badge colorScheme={getBadgeColor({ role })} w="max-content">
                {role}
            </Badge>
            <Menu
                list={[]}
                menuButtonProps={{
                    background: "gray.900",
                    _hover: { background: "gray.700" },
                    _active: { background: "gray.600" },
                    color: "gray.100",
                }}
            />
        </Grid>
    );

    const list = [
        {
            name: "John Doe",
            email: "john.doe@example.com",
            role: "user",
        },
        {
            name: "Florian Bauer",
            email: "florian.bauer@bcm.com",
            role: "admin",
        },
        {
            name: "Tommy MorgeTommyAsdTiasdiasdIasOdiAhdnUadshasdasd",
            email: "tommy.morgen@asd.com",
            role: "user",
        },
    ];

    return (
        <TableSearchModal
            open={(onOpen) => (
                <Button
                    label="User List"
                    rightIcon={<ViewIcon />}
                    size="sm"
                    onClick={onOpen}
                />
            )}
            header="Alle Benutzer"
            labelClose="Schließen"
            content={{ list, body }}
            filter={filter}
        />
    );
};

export { UserListController };
