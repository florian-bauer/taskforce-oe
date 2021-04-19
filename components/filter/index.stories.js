import { Filter as FilterComponent } from "@/components/filter";

export default {
    title: "Filter",
    component: FilterComponent,
};

const Template = (args) => <FilterComponent {...args} />;

export const Filter = Template.bind({});
Filter.args = {
    collection: [
        {
            label: "Alle",
            color: "blue",
        },
        {
            label: "Voting",
            color: "purple",
        },
        {
            label: "In Arbeit",
            color: "orange",
        },
        {
            label: "Abgearbeitet",
            color: "green",
        },
        {
            label: "Gelöscht",
            color: "red",
        },
    ],
    onChange: console.log,
    name: "Status",
    defaultValue: "Alle",
};
