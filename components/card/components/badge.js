import { Badge as ChakraBadge } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Badge = ({ colorScheme, children }) => (
    <ChakraBadge
        colorScheme={colorScheme}
        position="absolute"
        top={0}
        right={6}
        transform="translateY(-50%)"
        fontSize="sm"
        userSelect="none"
    >
        {children}
    </ChakraBadge>
);

Badge.propTypes = {
    colorScheme: PropTypes.string.isRequired,
};

export { Badge };
