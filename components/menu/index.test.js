import { Menu } from "@/components/menu";
import { render } from "@testing-library/react";
import { AtSignIcon } from "@chakra-ui/icons";

it("renders correctly", () => {
    const { queryByText } = render(
        <Menu
            list={[{ label: "@", icon: <AtSignIcon />, onClick: () => {} }]}
        />
    );

    expect(queryByText("@")).toBeTruthy();
});
