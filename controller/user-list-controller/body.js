import { Menu } from "@/components/menu";
import { getBadgeColor } from "@/controller/user-list-controller/lib";
import { UserRolesController } from "@/controller/user-roles-controller";
import { Avatar, Badge, Flex, Grid, Text } from "@chakra-ui/react";

const Body = ({ uid, name, email, role, mutate }) => (
    <Grid templateColumns="auto 20% 10%" alignItems="center">
        <Flex w="100%" overflow="hidden">
            <Avatar size="sm" name={name} src="" />
            <Flex flexDir="column" ml={2}>
                <Text fontSize="sm" fontWeight="medium" isTruncated maxW={56}>
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
            list={[
                <UserRolesController
                    uid={uid}
                    name={name}
                    email={email}
                    role={role}
                    mutate={mutate}
                />,
            ]}
            menuButtonProps={{
                background: "gray.900",
                _hover: { background: "gray.700" },
                _active: { background: "gray.600" },
                color: "gray.100",
            }}
        />
    </Grid>
);

export { Body };
