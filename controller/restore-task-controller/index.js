import { ActionModal } from "@/components/action-modal";
import { restoreTask } from "@/controller/restore-task-controller/lib";
import { useAuthUser } from "next-firebase-auth";

const RestoreTaskController = ({
    open,
    taskId,
    mutate,
    title,
    description,
}) => {
    const { getIdToken } = useAuthUser();

    return (
        <ActionModal
            open={open}
            header="Vorschlag wiederherstellen?"
            body="Möchtest du diesen Vorschlag wiederherstellen?"
            labelAbort="Nein, abbrechen"
            labelAction="Ja, Vorschlag wiederherstellen"
            onAction={async (onClose) => {
                const token = await getIdToken();

                const { data } = await restoreTask({
                    token,
                    taskId,
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

export { RestoreTaskController };
