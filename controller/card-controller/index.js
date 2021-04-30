import { Card } from "@/components/card";
import {
    getAuthor,
    getParticipants,
    isUserAdministrator,
    addVote,
    removeVote,
} from "@/controller/card-controller/lib";
import { useAuthUser } from "next-firebase-auth";
import { useState } from "react";

const CardController = ({
    _id: taskId,
    title,
    description,
    status,
    createdBy,
    votes,
    participants: rawParticipants,
}) => {
    const { id, getIdToken } = useAuthUser();

    const [token, setToken] = useState(null);
    const [administrator, setAdministrator] = useState(null);
    const [author, setAuthor] = useState(null);
    const [participants, setParticipants] = useState(null);
    const [isVoter, setIsVoter] = useState(votes.includes(id));

    // Getting the Token that is need for request authorization
    if (!token) {
        getIdToken().then((_token) => setToken(_token));
    }

    if (!administrator) {
        isUserAdministrator({
            uid: id,
            onResponse: ({ data }) => setAdministrator(data),
        });
    }

    if (!author) {
        getAuthor({
            uid: createdBy,
            onResponse: ({ data }) => {
                const { name, picture } = data;
                setAuthor({ name, picture });
            },
        });
    }

    if (!participants) {
        getParticipants({
            rawParticipants,
            onResponse: ({ data }) => setParticipants(data),
        });
    }

    return (
        <Card
            title={title}
            description={description}
            status={status}
            name={author?.name || ""}
            avatar={author?.picture || ""}
            participants={participants || []}
            is={{
                owner: createdBy === id,
                administrator: administrator || false,
                voter: isVoter,
                participant: true,
            }}
            events={{
                onVoteAdd: () => {
                    addVote({
                        token,
                        taskId,
                        onSuccess: () => setIsVoter(true),
                    });
                },
                onVoteRemove: () => {
                    removeVote({
                        token,
                        taskId,
                        onSuccess: () => setIsVoter(false),
                    });
                },
                onParticipantAdd: () => console.log("Add Participant"),
                onParticipantRemove: () => console.log("Remove Participant"),
                onShowParticipants: () => console.log("Show All Participants"),
                onChangeStatus: () =>
                    console.log("Open Modal for Changing Status"),
                onEdit: () => console.log("Open Modal for Editing"),
                onDelete: () => console.log("Open Delete Confirm Modal"),
                onPermanentDelete: () =>
                    console.log("Open Permanent Delete Confirm Modal"),
                onRestore: () => console.log("Restore Task"),
            }}
        />
    );
};

export { CardController };
