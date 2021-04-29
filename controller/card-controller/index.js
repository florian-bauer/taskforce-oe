import { Card } from "@/components/card";
import {
    getAuthor,
    getParticipants,
    isUserAdministrator,
} from "@/controller/card-controller/lib";
import { useAuthUser } from "next-firebase-auth";
import { useState } from "react";

const CardController = ({
    title,
    description,
    status,
    createdBy,
    participants: rawParticipants,
}) => {
    const { id } = useAuthUser();
    const [administrator, setAdministrator] = useState(null);

    if (!administrator) {
        isUserAdministrator({
            uid: id,
            onResponse: ({ data }) => setAdministrator(data),
        });
    }

    const [author, setAuthor] = useState(null);
    const [participants, setParticipants] = useState(null);

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
            }}
        />
    );
};

export { CardController };
