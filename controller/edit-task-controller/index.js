import { TaskFormController } from "@/controller/task-form-controller";
import { editTask } from "@/controller/edit-task-controller/lib";
import { useAuthUser } from "next-firebase-auth";

const EditTaskController = ({ open, mutate, taskId, title, description }) => {
    const { getIdToken } = useAuthUser();

    return (
        <TaskFormController
            open={open}
            header="Vorschlag bearbeiten"
            labelAbort="Abbrechen"
            labelAction="Änderungen übernehmen"
            defaultTitle={title}
            defaultDescription={description}
            onAction={async ({ title, description }) => {
                const token = await getIdToken();

                const { data } = await editTask({
                    taskId,
                    token,
                    title,
                    description,
                });

                if (data?.success) {
                    await mutate("/api/tasks");
                }
            }}
        />
    );
};

export { EditTaskController };
