## Guide for creating a Component

A component is stored in a folder named in dash-case (Action List would be `action-list`). The component has 3 files:

    - layout: `<component>/ìndex.js`
    - story: `<component>/index.stories.js`
    - test: `<component>/index.test.js`

## Example Component

```js
// @/components/action-list/index.js

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Children } from "react";

// Component Layout
const ActionList = ({ collection }) => (
    <Menu>
        <MenuButton
            as={IconButton}
            aria-label="Open Menu"
            icon={<ChevronDownIcon />}
        />
        <MenuList>
            {Children.toArray(
                collection.map((value) => <MenuItem>{value}</MenuItem>)
            )}
        </MenuList>
    </Menu>
);

// Component Prop-Types and optional Component default Props
ActionList.propTypes = {
    collection: PropTypes.array.isRequired,
};

// Always prefer named exports instead of default exports
export { ActionList };
```

```js
// @/components/action-list/index.stories.js

// Import the Component as <Name>Component to avoid clashing with the export
import { ActionList as ActionListComponent } from "@/components/action-list";

// Default configuration for our Storybook entry
export default {
    title: "Navigations/ActionList",
    component: ActionListComponent,
};

const Template = (args) => <ActionListComponent {...args} />;

// The name of the variable will be the variant name in the Storybook
export const ActionList = Template.bind({});

ActionList.args = {
    collection: ["Edit", "Copy", "Download", "Delete"],
};
```

```js
// @/components/action-list/index.test.js

import { ActionList } from "@/components/action-list";
import { render } from "@testing-library/react";

it("renders correctly", () => {
    const collection = ["Testing"];
    const { queryByText } = render(<ActionList collection={collection} />);

    expect(queryByText("Testing")).toBeTruthy();
});
```
