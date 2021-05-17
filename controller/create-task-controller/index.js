import { TaskFormController } from "@/controller/task-form-controller";
import { createTask } from "@/controller/create-task-controller/lib";
import { useAuthUser } from "next-firebase-auth";
import { useToast } from "@chakra-ui/react";

const CreateTaskController = ({ open, onCreate }) => {
    const { getIdToken } = useAuthUser();
    const toast = useToast();

    return (
        <TaskFormController
            open={open}
            header="Vorschlag erstellen"
            labelAbort="Abbrechen"
            labelAction="Vorschlag erstellen"
            onAction={async ({ title, description }) => {
                const token = await getIdToken();
                const { data } = await createTask({
                    token,
                    title,
                    description,
                });

                if (data?.success) {
                    toast({
                        title: "Vorschlag erfolgreich erstellt",
                        isClosable: true,
                        duration: 9000,
                        status: "success",
                    });

                    onCreate();
                }
            }}
        />
    );
};

export { CreateTaskController };
