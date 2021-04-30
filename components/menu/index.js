import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    IconButton,
    Menu as ChakraMenu,
    MenuButton,
    MenuItem,
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
            {Children.toArray(
                list.map(({ label, icon, onClick, color }) => (
                    <MenuItem
                        icon={icon}
                        color={color && color}
                        onClick={onClick}
                    >
                        {label}
                    </MenuItem>
                ))
            )}
        </MenuList>
    </ChakraMenu>
);

Menu.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            icon: PropTypes.node.isRequired,
            color: PropTypes.string,
            onClick: PropTypes.func.isRequired,
        })
    ),
};

export { Menu };
