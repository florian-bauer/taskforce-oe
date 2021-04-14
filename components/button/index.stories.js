import { Button as ButtonComponent } from "@/components/button";
import { AtSignIcon } from "@chakra-ui/icons";

export default {
    title: "Button",
    component: ButtonComponent,
};

const Template = (args) => <ButtonComponent {...args} />;

/**
 * Primary Variant
 */
export const Primary = Template.bind({});
Primary.args = {
    primary: true,
    label: "Button",
};

/**
 * Secondary Variant
 */
export const Secondary = Template.bind({});
Secondary.args = {
    label: "Button",
};

/**
 * Primary with Icon Variant
 */
export const IconPrimary = Template.bind({});
IconPrimary.args = {
    primary: true,
    label: "Button",
    leftIcon: <AtSignIcon />,
};

/**
 * Primary with Icon Variant
 */
export const IconSecondary = Template.bind({});
IconSecondary.args = {
    label: "Button",
    leftIcon: <AtSignIcon />,
};
