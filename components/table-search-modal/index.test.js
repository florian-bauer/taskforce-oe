import { Button } from "@/components/button";
import { TableSearchModal } from "@/components/table-search-modal";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { render, fireEvent } from "@testing-library/react";

it("renders correctly", () => {
    const props = {
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
        },
        filter: (value, list) =>
            list.filter(
                ({ name, email }) =>
                    name.includes(value) || email.includes(value)
            ),
    };
    const { queryByText } = render(<TableSearchModal {...props} />);

    expect(queryByText("john.doe@example.com")).toBeFalsy();
    fireEvent(
        queryByText("Open"),
        new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
        })
    );
    expect(queryByText("john.doe@example.com")).toBeTruthy();
});
