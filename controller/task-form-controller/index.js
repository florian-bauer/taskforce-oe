import { FormModal } from "@/components/form-modal";
import { useState } from "react";

const TaskFormController = ({
    open,
    header,
    labelAbort,
    labelAction,
    defaultTitle,
    defaultDescription,
    onAction,
}) => {
    const [title, setTitle] = useState(defaultTitle || "");
    const [description, setDescription] = useState(defaultDescription || "");

    return (
        <FormModal
            open={open}
            header={header}
            labelAbort={labelAbort}
            labelAction={labelAction}
            onAction={async (onClose) => {
                setTitle("");
                setDescription("");
                onAction({ title, description });
                onClose();
            }}
            inputs={[
                {
                    label: "Titel",
                    onChange: (event) => setTitle(event.target.value),
                    defaultValue: defaultTitle || "",
                },
                {
                    label: "Beschreibung",
                    onChange: (event) => setDescription(event.target.value),
                    defaultValue: defaultDescription || "",
                    textarea: true,
                },
            ]}
            disabled={
                title.trim().length <= 0 || description.trim().length <= 0
            }
        />
    );
};

export { TaskFormController };
