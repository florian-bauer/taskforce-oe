import { ActionModal } from "@/components/action-modal";
import { useAuthUser } from "next-firebase-auth";
import { finalDeleteTask } from "@/controller/final-delete-task-controller/lib";

const FinalDeleteTaskController = ({ open, taskId, mutate }) => {
    const { getIdToken } = useAuthUser();

    return (
        <ActionModal
            open={open}
            header="Vorschlag endgültig löschen?"
            body="Möchtest du diesen Vorschlag unwiederruflich löschen?"
            labelAbort="Nein, Vorschlag behalten"
            labelAction="Ja, Vorschlag endgültig löschen"
            onAction={async (onClose) => {
                const token = await getIdToken();

                const { data } = await finalDeleteTask({
                    token,
                    taskId,
                });

                if (data?.success) {
                    onClose();
                    await mutate("/api/tasks");
                }
            }}
        />
    );
};

export { FinalDeleteTaskController };
