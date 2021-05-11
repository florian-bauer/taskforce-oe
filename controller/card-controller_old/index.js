import { ActionModal } from "@/components/action-modal";
import { Card } from "@/components/card_old";
import { FormModal } from "@/components/form-modal";
import {
    addParticipant,
    addVote,
    getAuthor,
    getParticipants,
    isUserAdministrator,
    removeParticipant,
    removeVote,
} from "@/controller/card-controller_old/lib";
import { ChangeStatusController } from "@/controller/change-status-controller";
import { ShowParticipantsController } from "@/controller/show-participants-controller";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { MenuItem } from "@chakra-ui/react";
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
    const [isParticipant, setIsParticipant] = useState(
        rawParticipants.includes(id)
    );

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
                participant: isParticipant,
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
                onParticipantAdd: () => {
                    addParticipant({
                        token,
                        taskId,
                        onSuccess: () => {
                            setIsParticipant(true);

                            if (!rawParticipants.includes(id)) {
                                rawParticipants.push(id);
                            }
                            getParticipants({
                                rawParticipants,
                                onResponse: ({ data }) => setParticipants(data),
                            });
                        },
                    });
                },
                onParticipantRemove: () => {
                    removeParticipant({
                        token,
                        taskId,
                        onSuccess: () => {
                            setIsParticipant(false);

                            if (rawParticipants.includes(id)) {
                                const newRawParticipants = rawParticipants.filter(
                                    (_id) => _id !== id
                                );
                                rawParticipants = newRawParticipants;
                            }

                            getParticipants({
                                rawParticipants,
                                onResponse: ({ data }) => setParticipants(data),
                            });
                        },
                    });
                },
                onShowParticipants: () => console.log("Show All Participants"),
                onChangeStatus: () =>
                    console.log("Open Modal for Changing Status"),
                onEdit: () => console.log("Open Modal for Editing"),
                onDelete: () => console.log("Open Delete Confirm Modal"),
                onPermanentDelete: () =>
                    console.log("Open Permanent Delete Confirm Modal"),
                onRestore: () => console.log("Restore Task"),
            }}
            components={{
                showParticipants: (
                    <ShowParticipantsController participants={participants} />
                ),
                changeStatus: (
                    <ChangeStatusController
                        taskId={taskId}
                        title={title}
                        description={description}
                        token={token}
                        status={status}
                    />
                ),
                edit: (
                    <FormModal
                        open={(onOpen) => (
                            <MenuItem onClick={onOpen} icon={<EditIcon />}>
                                Vorschlag bearbeiten
                            </MenuItem>
                        )}
                        header="Änderungen übernehmen"
                        labelAbort="Abbrechen"
                        labelAction="Vorschlag bearbeiten"
                        onAction={() => {
                            console.log("on action");
                        }}
                        inputs={[
                            {
                                label: "Titel",
                                onChange: (event) =>
                                    setTitle(event.target.value),
                            },
                            {
                                label: "Beschreibung",
                                onChange: (event) =>
                                    setDescription(event.target.value),
                            },
                        ]}
                        disabled={
                            title.trim().length <= 0 ||
                            description.trim().length <= 0
                        }
                    />
                ),
                delete: (
                    <ActionModal
                        open={(onOpen) => (
                            <MenuItem
                                onClick={onOpen}
                                color="red"
                                icon={<DeleteIcon />}
                            >
                                Vorschlag löschen
                            </MenuItem>
                        )}
                        header="Bist du dir sicher?"
                        body="Möchtest du den Vorschlag wirklich löschen?"
                        labelAction="Ja, Vorschlag löschen"
                        labelAbort="Nein, Vorschlag behalten"
                        onAction={(onClose) => {
                            onClose();
                            console.log("Delete");
                        }}
                    />
                ),
            }}
        />
    );
};

export { CardController };
