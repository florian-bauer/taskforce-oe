import { Badge } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CardBadge = ({ colorScheme, label, ...props }) => (
    <Badge
        colorScheme={colorScheme}
        position="absolute"
        top={0}
        right={6}
        transform="translateY(-50%)"
        fontSize="sm"
        {...props}
    >
        {label}
    </Badge>
);

CardBadge.propTypes = {
    colorScheme: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export { CardBadge };
