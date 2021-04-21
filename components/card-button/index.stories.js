import { CardButton as CardButtonComponent } from "@/components/card-button";
import { AddIcon } from "@chakra-ui/icons";

export default {
    title: "Card Button",
    component: CardButtonComponent,
};

const Template = (args) => <CardButtonComponent {...args} />;

export const CardButton = Template.bind({});
CardButton.args = {
    label: "Vorschlag erstellen",
    icon: <AddIcon />,
};
