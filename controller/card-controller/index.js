import { Card } from "@/components/card";
import {
    getBadge,
    getParticipants,
    getUser,
} from "@/controller/card-controller/lib";
import { UserActionController } from "@/controller/card-controller/user-actions-controller";
import { useEffect, useState } from "react";

const CardController = ({ data }) => {
    const { status, title, description, createdBy, participants } = data;

    const [creator, setCreator] = useState({ name: "", avatar: "" });
    const [_participants, setParticipants] = useState([]);

    useEffect(async () => {
        const creatorObject = await getUser({ uid: createdBy });
        setCreator({ name: creatorObject.name, avatar: creatorObject.picture });

        const participantsObject = await getParticipants({ participants });
        setParticipants(participantsObject);
    }, []);

    const badge = getBadge({ status });

    return (
        <Card
            badge={badge}
            creator={creator}
            participants={_participants}
            title={title}
            description={description}
        >
            <UserActionController data={data} />
        </Card>
    );
};

export { CardController };
