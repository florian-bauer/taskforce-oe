import { CardButton } from "@/components/card-button";
import { FormModal } from "@/components/form-modal";
import { CreateTask } from "@/controller/create-task-modal/lib";
import { AddIcon } from "@chakra-ui/icons";
import { useAuthUser } from "next-firebase-auth";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

const CreateTaskModal = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { getIdToken } = useAuthUser();
    const toast = useToast();

    return (
        <FormModal
            open={(onOpen) => (
                <CardButton
                    label="Vorschlag erstellen"
                    icon={<AddIcon />}
                    onClick={onOpen}
                />
            )}
            header="Vorschlag erstellen"
            labelAbort="Abbrechen"
            labelAction="Vorschlag erstellen"
            onAction={async (onClose) => {
                setTitle("");
                setDescription("");

                const token = await getIdToken();
                if (!token) {
                    toast({
                        title: "Fehler beim erstellen des Vorschlags!",
                        description:
                            "Es scheint als wärst du nicht authentifiziert um diese Handlung durch zu führen",
                        isClosable: true,
                        duration: 9000,
                        status: "error",
                    });
                    return onClose();
                }

                await CreateTask({
                    title,
                    description,
                    token,
                    onResponse: ({ data }) => {
                        if (data.success) {
                            toast({
                                title: "Vorschlag erfolgreich erstellt",
                                isClosable: true,
                                duration: 9000,
                                status: "success",
                            });
                        }
                    },
                });

                return onClose();
            }}
            inputs={[
                {
                    label: "Titel",
                    onChange: (event) => setTitle(event.target.value),
                },
                {
                    label: "Beschreibung",
                    onChange: (event) => setDescription(event.target.value),
                },
            ]}
            disabled={
                title.trim().length <= 0 || description.trim().length <= 0
            }
        />
    );
};

export { CreateTaskModal };
