import { Button } from "@/components/button";
import { render } from "@testing-library/react";

it("renders correctly", () => {
    const { queryByText } = render(<Button label="Button Label" />);

    expect(queryByText("Button Label")).toBeTruthy();
});
