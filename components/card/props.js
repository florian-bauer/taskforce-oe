import PropTypes from "prop-types";

export const propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
        })
    ),
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    is: PropTypes.shape({
        owner: PropTypes.bool.isRequired,
        administrator: PropTypes.bool.isRequired,
    }).isRequired,
};

export const defaultProps = {
    participants: [],
};
