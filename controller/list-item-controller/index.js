import { ListItem } from "@/components/list-item";
import { Tooltip } from "@/components/list-item/components/tooltip";
import { DELETED } from "@/constants/status";
import { EditTaskController } from "@/controller/edit-task-controller";
import {
    AdminActionsController,
    OwnerActionsController,
    UserActionsController,
} from "@/controller/list-item-controller/actions";
import {
    getBadge,
    getParticipants,
    getUser,
} from "@/controller/list-item-controller/lib";
import { EditIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useAuthUser } from "next-firebase-auth";
import { useEffect, useState } from "react";

const ListItemController = ({ data, mutate }) => {
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
        <ListItem
            title={title}
            participants={_participants}
            badge={badge}
            description={description}
            creator={creator}
            headChildren={
                <>
                    {!isUser && (
                        <EditTaskController
                            open={(onOpen) => (
                                <Tooltip label="Vorschlag bearbeiten">
                                    <IconButton
                                        onClick={onOpen}
                                        colorScheme="gray"
                                        aria-label="Vorschlag bearbeiten"
                                        icon={<EditIcon />}
                                        size="sm"
                                    />
                                </Tooltip>
                            )}
                            mutate={mutate}
                            taskId={data._id}
                            title={data.title}
                            description={data.description}
                        />
                    )}
                </>
            }
        >
            {isAdmin ? (
                <AdminActionsController data={data} mutate={mutate} />
            ) : isOwner ? (
                <OwnerActionsController data={data} mutate={mutate} />
            ) : (
                <UserActionsController data={data} mutate={mutate} />
            )}
        </ListItem>
    );
};

export { ListItemController };
