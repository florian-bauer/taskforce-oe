import { FormModal } from "@/components/form-modal";
import { Button } from "@/components/button";
import { render, fireEvent } from "@testing-library/react";

it("renders correctly", () => {
    const props = {
        open: (onOpen) => <Button onClick={onOpen} label="Open" />,
        header: "Erstelle einen Vorschlag",
        labelAbort: "Abbrechen",
        labelAction: "Vorschlag erstellen",
        onAction: (onClose) => {
            console.log("onAction");
            onClose();
        },
        inputs: [
            {
                label: "Titel",
                onChange: (event) => console.log(event.target.value),
            },
            {
                label: "Beschreibung",
                onChange: (event) => console.log(event.target.value),
            },
        ],
    };
    const { queryByText } = render(<FormModal {...props} />);

    expect(queryByText("Vorschlag erstellen")).toBeFalsy();
    fireEvent(
        queryByText("Open"),
        new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
        })
    );
    expect(queryByText("Vorschlag erstellen")).toBeTruthy();
});
