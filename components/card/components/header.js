import { Creator } from "@/components/card/components/creator";
import { Participants } from "@/components/card/components/participants";
import { Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Header = ({ creator, participants }) => (
    <Flex alignItems="center" justifyContent="space-between" width="100%">
        <Creator name={creator.name} avatar={creator.avatar} />
        <Participants participants={participants} />
    </Flex>
);

Header.propTypes = {
    creator: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
    }).isRequired,
    participants: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
};

export { Header };
