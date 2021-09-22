import { Tooltip } from "@/components/list-item/components/tooltip";
import { Avatar, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Creator = ({ name, avatar }) => {
    // Hiding the Name on the sm breakpoint
    const isNameVisible = useBreakpointValue({ base: false, sm: true });

    return (
        <Tooltip label="Ersteller:in">
            <Flex alignItems="center">
                <Avatar size="sm" name={name} src={avatar} userSelect="none" />

                {isNameVisible && (
                    <Text
                        ml={2}
                        fontSize="md"
                        fontWeight="medium"
                        maxW={56}
                        isTruncated
                    >
                        {name}
                    </Text>
                )}
            </Flex>
        </Tooltip>
    );
};

Creator.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
};

export { Creator };
