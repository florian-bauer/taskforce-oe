import { Button } from "@/components/button";
import { TableSearchModal as TableSearchModalComponent } from "@/components/table-search-modal";
import { Avatar, Flex, Text } from "@chakra-ui/react";

export default {
    title: "Modals/Table Search",
    component: TableSearchModalComponent,
};

const Template = (args) => <TableSearchModalComponent {...args} />;

export const TableSearchModal = Template.bind({});
TableSearchModal.args = {
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
                name: "Florian Bauer",
                email: "florian.bauer@bcm.com",
            },
            {
                name: "Tim Schmid",
                email: "tim.schmid@daimler.com",
            },
        ],
        body: ({ name, email }) => (
            <Flex alignItems="center">
                <Avatar size="sm" name={name} src="" />
                <Flex flexDir="column" ml={2}>
                    <Text fontSize="sm" fontWeight="medium">
                        {name}
                    </Text>
                    <Text fontSize="sm" fontWeight="normal" color="gray.500">
                        {email}
                    </Text>
                </Flex>
            </Flex>
        ),
    },
    filter: (value, list) =>
        list.filter(
            ({ name, email }) => name.includes(value) || email.includes(value)
        ),
};
