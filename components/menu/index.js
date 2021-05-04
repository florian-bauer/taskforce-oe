import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    IconButton,
    Menu as ChakraMenu,
    MenuButton,
    MenuList,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Children } from "react";

const Menu = ({ list }) => (
    <ChakraMenu w="100%">
        <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<ChevronDownIcon />}
            borderRadius={10}
        />
        <MenuList>
            {Children.toArray(list.map((Component) => Component))}
        </MenuList>
    </ChakraMenu>
);

Menu.propTypes = {
    list: PropTypes.arrayOf(PropTypes.node.isRequired).isRequired,
};

export { Menu };
