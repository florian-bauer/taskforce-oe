import { Button as ChakraButton, use } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Button = ({ label, primary, ...props }) => {
    // TODO(developer): Write a Hook that handles colors depending on boolean
    const bg = primary ? "gray.900" : "gray.100";
    const bgHover = primary ? "gray.700" : "gray.300";
    const bgActive = primary ? "gray.600" : "gray.400";
    const color = primary ? "gray.100" : "gray.900";
    const fontWeight = primary ? "medium" : "regular";

    return (
        <ChakraButton
            bg={bg}
            color={color}
            borderRadius={10}
            fontSize="sm"
            fontWeight={fontWeight}
            _hover={{ bg: bgHover }}
            _active={{ bg: bgActive }}
            {...props}
        >
            {label}
        </ChakraButton>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    primary: PropTypes.bool,
};

Button.defaultProps = {
    primary: false,
};

export { Button };
