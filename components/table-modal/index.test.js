import { Button } from "@/components/button";
import { TableModal } from "@/components/table-modal";
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
            ],
            body: ({ name, email }) => (
                <Flex alignItems="center">
                    <Avatar size="md" name={name} src="" />
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
        },
    };
    const { queryByText } = render(<TableModal {...props} />);

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
