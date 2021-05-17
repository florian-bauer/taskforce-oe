import { Menu as MenuComponent } from "@/components/menu";
import { MenuItem } from "@chakra-ui/react";

export default {
    title: "Menu",
    component: MenuComponent,
};

const Template = (args) => <MenuComponent {...args} />;

export const Menu = Template.bind({});
Menu.args = {
    list: [
        <MenuItem>Item 1</MenuItem>,
        <MenuItem>Item 2</MenuItem>,
        <MenuItem>Item 3</MenuItem>,
        <MenuItem>Item 4</MenuItem>,
    ],
};
