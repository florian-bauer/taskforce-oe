import { Menu as MenuComponent } from "@/components/menu";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";

export default {
    title: "Menu",
    component: MenuComponent,
};

const Template = (args) => <MenuComponent {...args} />;

export const Menu = Template.bind({});
Menu.args = {
    list: [
        {
            label: "Helfer anzeigen",
            icon: <ViewIcon />,
        },
        {
            label: "Bearbeiten",
            icon: <EditIcon />,
        },
        {
            label: "Löschen",
            icon: <DeleteIcon />,
            color: "red",
        },
    ],
};
