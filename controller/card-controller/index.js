import { Card } from "@/components/card";
import {
    getBadge,
    getParticipants,
    getUser,
} from "@/controller/card-controller/lib";
import { UserActionsController } from "@/controller/card-controller/actions/user-actions-controller";
import { OwnerActionsController } from "@/controller/card-controller/actions/owner-actions-controller";
import { AdminActionsController } from "@/controller/card-controller/actions/admin-actions-controller";
import { useEffect, useState } from "react";

const CardController = ({ data, mutate }) => {
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
            {/* <UserActionsController data={data} mutate={mutate} /> */}
            {/* <OwnerActionsController data={data} mutate={mutate} /> */}
            <AdminActionsController data={data} mutate={mutate} />
        </Card>
    );
};

export { CardController };
