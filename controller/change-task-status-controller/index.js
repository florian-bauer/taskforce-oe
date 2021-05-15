import { ActionModal } from "@/components/action-modal";
import { Filter } from "@/components/filter";
import { FINISHED, PROGRESS, VOTING } from "@/constants/status";
import { changeStatus } from "@/controller/change-task-status-controller/lib";
import { useOptions } from "@/hooks";
import { useAuthUser } from "next-firebase-auth";
import { useState } from "react";

const ChangeTaskStatusController = ({
    open,
    mutate,
    status,
    taskId,
    title,
    description,
}) => {
    const { getIdToken } = useAuthUser();

    const labels = {
        voting: "Voting",
        progress: "In Arbeit",
        finished: "Abgearbeitet",
    };

    const defaultStatus = useOptions(status, [
        { is: VOTING, be: labels.voting },
        { is: PROGRESS, be: labels.progress },
        { is: FINISHED, be: labels.finished },
    ]);

    const [selectedStatus, setSelectedStatus] = useState(defaultStatus);

    return (
        <ActionModal
            open={open}
            header="Status bearbeiten"
            body={
                <Filter
                    collection={[
                        {
                            label: labels.voting,
                            color: "purple",
                        },
                        {
                            label: labels.progress,
                            color: "orange",
                        },
                        {
                            label: labels.finished,
                            color: "green",
                        },
                    ]}
                    onChange={setSelectedStatus}
                    name="Status"
                    defaultValue={defaultStatus}
                    direction="column"
                    p={2}
                />
            }
            labelAbort="Abbrechen"
            labelAction="Status aktualisieren"
            onAction={async (onClose) => {
                const token = await getIdToken();

                const convertedStatus = useOptions(selectedStatus, [
                    { is: labels.voting, be: VOTING },
                    { is: labels.progress, be: PROGRESS },
                    { is: labels.finished, be: FINISHED },
                ]);

                const { data } = await changeStatus({
                    taskId,
                    token,
                    status: convertedStatus,
                    title,
                    description,
                });

                if (data?.success) {
                    onClose();
                    await mutate("/api/tasks");
                }
            }}
        />
    );
};

export { ChangeTaskStatusController };
