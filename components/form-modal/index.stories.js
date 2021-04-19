import { FormModal as FormModalComponent } from "@/components/form-modal";
import { Button } from "@/components/button";

export default {
    title: "Modals/Form",
    component: FormModalComponent,
};

const Template = (args) => <FormModalComponent {...args} />;

export const FormModal = Template.bind({});
FormModal.args = {
    open: (onOpen) => <Button onClick={onOpen} label="Open" />,
    header: "Vorschlag erstellen",
    labelAbort: "Abbrechen",
    labelAction: "Vorschlag erstellen",
    onAction: (onClose) => {
        console.log("onAction");
        onClose();
    },
    inputs: [
        {
            label: "Titel",
            onChange: (event) => console.log(event.target.value),
        },
        {
            label: "Beschreibung",
            onChange: (event) => console.log(event.target.value),
        },
    ],
};
