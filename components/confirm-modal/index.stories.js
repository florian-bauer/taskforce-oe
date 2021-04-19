import { ConfirmModal as ConfirmModalComponent } from "@/components/confirm-modal";
import { Button } from "@/components/button";

export default {
    title: "Modals/Confirm",
    component: ConfirmModalComponent,
};

const Template = (args) => <ConfirmModalComponent {...args} />;

export const ConfirmModal = Template.bind({});
ConfirmModal.args = {
    open: (onOpen) => <Button onClick={onOpen} label="Open" />,
    header: "Du bist nun Administrator!",
    body:
        "Du John Doe (john.doe@example.de) bist nun Administrator und hast uneingeschränkte Berechtigung auf die Applikation.",
    labelConfirm: "Okay, verstanden",
    onConfirm: () => console.log("Confirm"),
};
