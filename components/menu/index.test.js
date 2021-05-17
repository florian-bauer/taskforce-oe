import { Menu } from "@/components/menu";
import { render } from "@testing-library/react";
import { MenuItem } from "@chakra-ui/react";

it("renders correctly", () => {
    const { queryByText } = render(<Menu list={[<MenuItem>@</MenuItem>]} />);

    expect(queryByText("@")).toBeTruthy();
});
