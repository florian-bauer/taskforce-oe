import { Filter } from "@/components/filter";

const FilterController = () => (
    <Filter
        name="Status"
        collection={[
            { label: "Alle", color: "blue" },
            { label: "Voting", color: "purple" },
            { label: "In Arbeit", color: "orange" },
            { label: "Abgearbeitet", color: "green" },
        ]}
        defaultValue="Alle"
        p={6}
    />
);

export { FilterController };
