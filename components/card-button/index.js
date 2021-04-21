import { Button, Heading } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CardButton = ({ label, icon, ...props }) => (
    <Button
        bg="gray.50"
        border="1px solid"
        borderColor="rgba(0, 0, 0, .25)"
        borderRadius={10}
        borderStyle="dashed"
        w="100%"
        h="100%"
        p={6}
        alignItems="center"
        justifyContent="center"
        {...props}
    >
        {icon}
        <Heading ml={4} fontWeight="semibold" fontSize="18px">
            {label}
        </Heading>
    </Button>
);

CardButton.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.node,
};

export { CardButton };
