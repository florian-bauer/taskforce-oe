import { DELETED, FINISHED, PROGRESS, VOTING } from "@/constants/status";
import { useOptions } from "@/hooks";

const getBadge = ({ status }) => {
    const badge = useOptions(status, [
        {
            is: VOTING,
            be: {
                colorScheme: "purple",
                label: "Voting",
            },
        },
        {
            is: PROGRESS,
            be: {
                colorScheme: "orange",
                label: "In Arbeit",
            },
        },
        {
            is: FINISHED,
            be: {
                colorScheme: "green",
                label: "Abgeschlossen",
            },
        },
        {
            is: DELETED,
            be: {
                colorScheme: "red",
                label: "Gelöscht",
            },
        },
    ]);

    return badge;
};

const getUser = async ({ uid }) => {
    const response = await fetch(`/api/user/${uid}`);
    return await response.json();
};

const getParticipants = async ({ participants }) => {
    const _participants = [];

    for (const participantId of participants) {
        const { name, email, picture: avatar } = await getUser({
            uid: participantId,
        });
        _participants.push({ name, email, avatar });
    }

    return _participants;
};

export { getBadge, getUser, getParticipants };
