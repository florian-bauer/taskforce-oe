import { ActionModal } from "@/components/action-modal";
import { Filter } from "@/components/filter";
import { FINISHED, PROGRESS, VOTING } from "@/constants/status";
import { updateStatus } from "@/controller/change-status-controller/lib";
import { useOptions } from "@/hooks";
import { WarningIcon } from "@chakra-ui/icons";
import { MenuItem, useToast } from "@chakra-ui/react";
import { useState } from "react";

const ChangeStatusController = ({
    taskId,
    title,
    description,
    token,
    status,
}) => {
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
    const toast = useToast();

    return (
        <ActionModal
            open={(onOpen) => (
                <MenuItem onClick={onOpen} icon={<WarningIcon />}>
                    Status bearbeiten
                </MenuItem>
            )}
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
                />
            }
            labelAbort="Abbrechen"
            labelAction="Änderungen übernehmen"
            onAction={async (onClose) => {
                onClose();

                const convertedStatus = useOptions(selectedStatus, [
                    { is: labels.voting, be: VOTING },
                    { is: labels.progress, be: PROGRESS },
                    { is: labels.finished, be: FINISHED },
                ]);

                await updateStatus({
                    taskId,
                    token,
                    title,
                    description,
                    status: convertedStatus,
                    onSuccess: () => {
                        toast({
                            title: "Vorschlag Status geändert",
                            isClosable: true,
                            duration: 9000,
                            status: "success",
                        });
                    },
                });
            }}
        />
    );
};

export { ChangeStatusController };
