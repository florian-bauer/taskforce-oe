import { RadioCard } from "@/components/filter/RadioCard";
import { Flex, HStack, useRadioGroup } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Children } from "react";

const Filter = ({ collection, onChange, name, defaultValue, ...props }) => {
    const { getRootProps, getRadioProps } = useRadioGroup({
        name,
        defaultValue,
        onChange,
    });

    const group = getRootProps();

    return (
        <Flex overflowY="auto" width="100%" {...props}>
            <HStack {...group}>
                {Children.toArray(
                    collection.map(({ label, color }) => (
                        <RadioCard
                            {...getRadioProps({ value: label })}
                            label={label}
                            color={color}
                        />
                    ))
                )}
            </HStack>
        </Flex>
    );
};

Filter.propTypes = {
    collection: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            color: PropTypes.string,
        }).isRequired
    ),
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.string.isRequired,
};

export { Filter };
