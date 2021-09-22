import { Tooltip as ChakraTooltip } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Tooltip = ({ children, label }) => (
    <ChakraTooltip hasArrow label={label} bg="gray.900" color="gray.100">
        {children}
    </ChakraTooltip>
);

Tooltip.propTypes = {
    label: PropTypes.string.isRequired,
};

export { Tooltip };
