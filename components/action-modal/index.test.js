import { ActionModal } from "@/components/action-modal";
import { Button } from "@/components/button";
import { render, fireEvent } from "@testing-library/react";

it("renders correctly", () => {
    const props = {
        open: (onOpen) => <Button onClick={onOpen} label="Open" />,
        header: "Bist du dir sicher?",
        body: "Du kannst den Vorschlag danach nicht mehr herstellen!",
        labelAbort: "Vorschlag behalten",
        labelAction: "Endgültig löschen",
        onAction: (onClose) => {
            console.log("onAction");
            onClose();
        },
    };
    const { queryByText } = render(<ActionModal {...props} />);

    expect(queryByText("Endgültig löschen")).toBeFalsy();
    fireEvent(
        queryByText("Open"),
        new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
        })
    );
    expect(queryByText("Endgültig löschen")).toBeTruthy();
});
