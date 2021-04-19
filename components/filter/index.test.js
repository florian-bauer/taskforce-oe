import { Filter } from "@/components/filter";
import { render } from "@testing-library/react";

it("renders correctly", () => {
    const collection = [
        {
            label: "Alle",
            color: "blue",
        },
        {
            label: "Voting",
            color: "purple",
        },
        {
            label: "In Arbeit",
            color: "orange",
        },
        {
            label: "Abgearbeitet",
            color: "green",
        },
        {
            label: "Gelöscht",
            color: "red",
        },
    ];

    const { queryAllByRole } = render(
        <Filter name="Status" defaultValue="Alle" collection={collection} />
    );

    expect(queryAllByRole("radio")).toBeTruthy();
    expect(queryAllByRole("radio").length).toBe(5);
});
