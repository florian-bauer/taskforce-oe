import { Button } from "@/components/button";
import { TableModal as TableModalComponent } from "@/components/table-modal";
import { Avatar, Flex, Text } from "@chakra-ui/react";

export default {
    title: "Modals/Table",
    component: TableModalComponent,
};

const Template = (args) => <TableModalComponent {...args} />;

export const TableModal = Template.bind({});
TableModal.args = {
    open: (onOpen) => <Button onClick={onOpen} label="Open" />,
    header: "Eingetragene Helfer",
    labelClose: "Schließen",
    content: {
        list: [
            {
                name: "John Doe",
                email: "john.doe@example.com",
            },
            {
                name: "John Doe",
                email: "john.doe@example.com",
            },
            {
                name: "John Doe",
                email: "john.doe@example.com",
            },
        ],
        body: ({ name, email }) => (
            <Flex alignItems="center">
                <Avatar size="md" name={name} src="" />
                <Flex flexDir="column" ml={2}>
                    <Text fontSize="md" fontWeight="medium">
                        {name}
                    </Text>
                    <Text fontSize="sm" fontWeight="normal" color="gray.500">
                        {email}
                    </Text>
                </Flex>
            </Flex>
        ),
    },
};
