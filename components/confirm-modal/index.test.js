import { ConfirmModal } from "@/components/confirm-modal";
import { Button } from "@/components/button";
import { render, fireEvent } from "@testing-library/react";

it("renders correctly", () => {
    const props = {
        open: (onOpen) => <Button onClick={onOpen} label="Open" />,
        header: "Du bist nun Administrator!",
        body:
            "Du John Doe (john.doe@example.de) bist nun Administrator und hast uneingeschränkte Berechtigung auf die Applikation.",
        labelConfirm: "Okay, verstanden",
        onConfirm: () => console.log("Confirm"),
    };
    const { queryByText } = render(<ConfirmModal {...props} />);

    expect(queryByText("Okay, verstanden")).toBeFalsy();
    fireEvent(
        queryByText("Open"),
        new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
        })
    );
    expect(queryByText("Okay, verstanden")).toBeTruthy();
});
