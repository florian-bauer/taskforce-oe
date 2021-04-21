import { CardButton } from "@/components/card-button";
import { AddIcon } from "@chakra-ui/icons";
import { render } from "@testing-library/react";

it("renders correctly", () => {
    const { queryByText } = render(
        <CardButton label="Button Label" icon={<AddIcon />} />
    );

    expect(queryByText("Button Label")).toBeTruthy();
});
