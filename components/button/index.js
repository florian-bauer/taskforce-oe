import { useBoolean } from "@/hooks";
import { Button as ChakraButton } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Button = ({ label, primary, onClick, ...props }) => {
    const { useFlag } = useBoolean(primary);

    const bg = useFlag("gray.900", "gray.100");
    const bgHover = useFlag("gray.700", "gray.300");
    const bgActive = useFlag("gray.600", "gray.400");
    const color = useFlag("gray.100", "gray.900");
    const fontWeight = useFlag("medium", "regular");

    return (
        <ChakraButton
            bg={bg}
            color={color}
            borderRadius={10}
            fontSize="sm"
            fontWeight={fontWeight}
            _hover={{ bg: bgHover }}
            _active={{ bg: bgActive }}
            onClick={onClick}
            {...props}
        >
            {label}
        </ChakraButton>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    primary: PropTypes.bool,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    primary: false,
    onClick: () => {},
};

export { Button };
