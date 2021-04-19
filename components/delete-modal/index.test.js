import { DeleteModal } from "@/components/delete-modal";
import { render, fireEvent } from "@testing-library/react";

it("renders correctly", () => {
    const { queryByText } = render(
        <DeleteModal label="Open" onDelete={() => {}} />
    );

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
