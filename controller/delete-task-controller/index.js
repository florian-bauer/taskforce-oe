import { ActionModal } from "@/components/action-modal";
import { deleteTask } from "@/controller/delete-task-controller/lib";
import { useAuthUser } from "next-firebase-auth";

const DeleteTaskController = ({ open, taskId, mutate, title, description }) => {
    const { getIdToken } = useAuthUser();

    return (
        <ActionModal
            open={open}
            header="Vorschlag löschen?"
            body="Bist du sicher dass du diesen Vorschlag löschen möchtest?"
            labelAbort="Nein, Vorschlag behalten"
            labelAction="Ja, Vorschlag löschen"
            onAction={async (onClose) => {
                const token = await getIdToken();

                const { data } = await deleteTask({
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

export { DeleteTaskController };
