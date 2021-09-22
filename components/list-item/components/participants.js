import { Tooltip } from "@/components/list-item/components/tooltip";
import { Avatar, AvatarGroup } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Children } from "react";

const Participants = ({ participants }) => (
    <Tooltip label="Helfer:innen">
        <AvatarGroup size="md" max={2}>
            {Children.toArray(
                participants.map(({ name, avatar }) => (
                    <Avatar name={name} src={avatar} userSelect="none" />
                ))
            )}
        </AvatarGroup>
    </Tooltip>
);

Participants.propTypes = {
    participants: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
        })
    ),
};

export { Participants };
