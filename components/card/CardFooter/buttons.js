import { useBoolean } from "@/hooks";
import { Button } from "@/components/button";

const VoteButton = ({ isVoter, onVoteAdd, onVoteRemove }) => {
    const { useFlag } = useBoolean(isVoter);
    const props = useFlag(
        {
            label: "Vote entfernen",
            onClick: onVoteRemove,
            background: "red.500",
            _hover: { bg: "red.400" },
            _active: { bg: "red.300" },
        },
        {
            label: "Vote hinzufügen",
            onClick: onVoteAdd,
        }
    );

    return <Button primary w="100%" {...props} />;
};

const ParticipantButton = ({
    isParticipant,
    onParticipantAdd,
    onParticipantRemove,
}) => {
    const { useFlag } = useBoolean(isParticipant);
    const props = useFlag(
        {
            label: "Als Helfer:in entfernen",
            onClick: onParticipantRemove,
            background: "red.500",
            _hover: { bg: "red.400" },
            _active: { bg: "red.300" },
        },
        {
            label: "Als Helfer:in eintragen",
            onClick: onParticipantAdd,
        }
    );

    return <Button primary w="100%" {...props} />;
};

export { VoteButton, ParticipantButton };
