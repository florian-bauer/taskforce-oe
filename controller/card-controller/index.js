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
import { useAuthUser } from "next-firebase-auth";
import { DELETED } from "@/constants/status";

const CardController = ({ data, mutate }) => {
    const { id } = useAuthUser();
    const { status, title, description, createdBy, participants } = data;

    const [creator, setCreator] = useState({ name: "", avatar: "" });
    const [_participants, setParticipants] = useState([]);

    const isOwner = data.createdBy === id;
    const [isAdmin, setIsAdmin] = useState(false);
    const isUser = !isOwner && !isAdmin;

    useEffect(async () => {
        const creatorObject = await getUser({ uid: createdBy });
        setCreator({ name: creatorObject.name, avatar: creatorObject.picture });

        const participantsObject = await getParticipants({ participants });
        setParticipants(participantsObject);

        const currentUser = await getUser({ uid: id });
        setIsAdmin(currentUser?.administrator || false);
    }, [, data]);

    const badge = getBadge({ status });

    if (status === DELETED && isUser) {
        return <></>;
    }

    return (
        <Card
            badge={badge}
            creator={creator}
            participants={_participants}
            title={title}
            description={description}
        >
            {isAdmin ? (
                <AdminActionsController data={data} mutate={mutate} />
            ) : isOwner ? (
                <OwnerActionsController data={data} mutate={mutate} />
            ) : (
                <UserActionsController data={data} mutate={mutate} />
            )}
        </Card>
    );
};

export { CardController };
