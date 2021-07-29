import { Filter } from "@/components/filter";
import { FINISHED, PROGRESS, VOTING, DELETED } from "@/constants/status";
import { useOptions } from "@/hooks";

const FilterController = ({ onChange }) => {
    const labels = {
        // all: "Alle",
        voting: "Voting",
        progress: "In Arbeit",
        finished: "Abgearbeitet",
        deleted: "Gelöscht",
    };

    return (
        <Filter
            name="Status"
            collection={[
                // { label: labels.all, color: "blue" },
                { label: labels.voting, color: "purple" },
                { label: labels.progress, color: "orange" },
                { label: labels.finished, color: "green" },
                { label: labels.deleted, color: "red" },
            ]}
            defaultValue="Voting"
            p={6}
            minHeight="84px"
            onChange={(status) => {
                const convertedStatus = useOptions(status, [
                    // { is: labels.all, be: ALL },
                    { is: labels.voting, be: VOTING },
                    { is: labels.progress, be: PROGRESS },
                    { is: labels.finished, be: FINISHED },
                    { is: labels.deleted, be: DELETED },
                ]);

                onChange({ status: convertedStatus });
            }}
        />
    );
};

export { FilterController };
