import { Button as ChakraButton, Heading } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CardButton = ({ label, icon, ...props }) => (
    <ChakraButton
        bg="gray.50"
        // border="1px solid"
        // borderColor="rgba(0, 0, 0, .25)"
        // borderStyle="dashed"
        borderRadius={10}
        p={12}
        w="100%"
        mx="auto"
        maxWidth="1400px"
        alignItems="center"
        justifyContent="center"
        {...props}
    >
        {icon}
        <Heading ml={4} fontWeight="semibold" fontSize="18px">
            {label}
        </Heading>
    </ChakraButton>
);

CardButton.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.node,
};

export { CardButton };
