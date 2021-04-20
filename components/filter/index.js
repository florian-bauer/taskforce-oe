import { RadioCard } from "@/components/filter/RadioCard";
import { Flex, HStack, VStack, useRadioGroup } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Children } from "react";
import { useOptions } from "@/hooks/useOptions";

const Filter = ({
    collection,
    onChange,
    name,
    defaultValue,
    direction,
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

    return (
        <Flex overflowY="auto" width="100%" {...props}>
            <Wrapper {...group} alignItems="stretch" width="100%">
                {Children.toArray(
                    collection.map(({ label, color }) => (
                        <RadioCard
                            {...getRadioProps({ value: label })}
                            label={label}
                            color={color}
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
};

Filter.defaultProps = {
    direction: "row",
};

export { Filter };
