import { Box, Text, useRadio, useStyleConfig } from "@chakra-ui/react";
import PropTypes from "prop-types";

const RadioCard = ({ label, color, pr, ...props }) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    const styles = useStyleConfig("Button", { variant: "solid" });

    return (
        <Box as="label" pr={pr}>
            <input
                {...input}
                style={{ width: 0, height: 0, position: "absolute" }}
            />
            <Box
                {...checkbox}
                __css={styles}
                cursor="pointer"
                userSelect="none"
                borderRadius={10}
                fontSize="sm"
                _active={{ bg: `${color}.300` }}
                _checked={{
                    bg: `${color}.100`,
                    color: `${color}.800`,
                }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="background .4s"
            >
                <Text fontWeight="medium" whiteSpace="nowrap">
                    {label.toUpperCase()}
                </Text>
            </Box>
        </Box>
    );
};

RadioCard.propTypes = {
    label: PropTypes.string.isRequired,
    color: PropTypes.string,
};

export { RadioCard };
