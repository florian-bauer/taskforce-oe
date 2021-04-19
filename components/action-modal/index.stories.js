import { ActionModal as ActionModalComponent } from "@/components/action-modal";
import { Button } from "@/components/button";

export default {
    title: "Action Modal",
    component: ActionModalComponent,
};

const Template = (args) => <ActionModalComponent {...args} />;

export const ActionModal = Template.bind({});
ActionModal.args = {
    open: (onOpen) => <Button onClick={onOpen} label="Open" />,
    header: "Bist du dir sicher?",
    body: "Du kannst den Vorschlag danach nicht mehr herstellen!",
    labelAbort: "Vorschlag behalten",
    labelAction: "Endgültig löschen",
    onAction: (onClose) => {
        console.log("onAction");
        onClose();
    },
};
