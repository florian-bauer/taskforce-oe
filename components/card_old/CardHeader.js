import {
    Avatar,
    AvatarGroup,
    Flex,
    Text,
    useBreakpointValue,
    Tooltip,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Children } from "react";

const CardHeader = ({ name, avatar, participants, ...props }) => {
    // Hiding the Name on the sm breakpoint
    const isNameVisible = useBreakpointValue({ base: false, sm: true });

    return (
        <Flex
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            {...props}
        >
            <Tooltip hasArrow label="Ersteller" bg="gray.900" color="gray.100">
                <Flex alignItems="center">
                    <Avatar size="md" name={name} src={avatar} />

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

            <Tooltip
                hasArrow
                label="Helfer:innen"
                bg="gray.900"
                color="gray.100"
            >
                <AvatarGroup size="md" max={2}>
                    {Children.toArray(
                        participants.map(({ name, avatar }) => (
                            <Avatar name={name} src={avatar} />
                        ))
                    )}
                </AvatarGroup>
            </Tooltip>
        </Flex>
    );
};

CardHeader.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
        })
    ),
};

CardHeader.defaultProps = {
    participants: [],
};

export { CardHeader };
