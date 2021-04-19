import { DeleteModal as DeleteModalComponent } from "@/components/delete-modal";

export default {
    title: "Delete Modal",
    component: DeleteModalComponent,
};

const Template = (args) => <DeleteModalComponent {...args} />;

export const DeleteModal = Template.bind({});
DeleteModal.args = {
    onDelete: () => console.log("onDelete"),
};
