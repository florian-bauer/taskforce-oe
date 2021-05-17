import { RadioCard } from "@/components/filter/RadioCard";
import { useOptions } from "@/hooks";
import { Flex, HStack, useRadioGroup, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Children, useEffect } from "react";

const Filter = ({
    collection,
    onChange,
    name,
    defaultValue,
    direction,
    p,
    ...props
}) => {
    const { getRootProps, getRadioProps } = useRadioGroup({
        name,
        defaultValue,
        onChange,
    });

    const group = getRootProps();

    const Wrapper = useOptions(direction, [
        { is: "row", be: HStack },
        { is: "column", be: VStack },
    ]);

    useEffect(() => {
        // fire the onChange Event for an init state of the default Value
        onChange(defaultValue);
    }, []);

    return (
        <Flex overflowY="auto" width="100%" p={p} {...props}>
            <Wrapper {...group} alignItems="stretch" width="100%">
                {Children.toArray(
                    collection.map(({ label, color }, index, array) => (
                        <RadioCard
                            {...getRadioProps({ value: label })}
                            label={label}
                            color={color}
                            pr={
                                direction === "row" &&
                                index === array.length - 1 &&
                                p
                            }
                        />
                    ))
                )}
            </Wrapper>
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
    direction: PropTypes.string,
    p: PropTypes.number,
};

Filter.defaultProps = {
    direction: "row",
    p: 0,
};

export { Filter };
