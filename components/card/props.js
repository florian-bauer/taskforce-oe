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
        voter: PropTypes.bool.isRequired,
        participant: PropTypes.bool.isRequired,
    }).isRequired,
    events: PropTypes.shape({
        onVoteAdd: PropTypes.func.isRequired,
        onVoteRemove: PropTypes.func.isRequired,
        onParticipantAdd: PropTypes.func.isRequired,
        onParticipantRemove: PropTypes.func.isRequired,
        onShowParticipants: PropTypes.func.isRequired,
        onChangeStatus: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        onPermanentDelete: PropTypes.func.isRequired,
        onRestore: PropTypes.func.isRequired,
    }),
    components: PropTypes.shape({
        showParticipants: PropTypes.node,
    }),
};

export const defaultProps = {
    participants: [],
};
