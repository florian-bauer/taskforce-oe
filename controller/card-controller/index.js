import { Card } from "@/components/card";
import {
    addParticipant,
    addVote,
    getAuthor,
    getParticipants,
    isUserAdministrator,
    removeParticipant,
    removeVote,
} from "@/controller/card-controller/lib";
import { Flex, Text, Avatar, MenuItem } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ViewIcon, WarningIcon } from "@chakra-ui/icons";
import { useAuthUser } from "next-firebase-auth";
import { useState } from "react";
import { TableModal } from "@/components/table-modal";
import { ActionModal } from "@/components/action-modal";
import { FormModal } from "@/components/form-modal";
import { Filter } from "@/components/filter";

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
                    <TableModal
                        open={(onOpen) => (
                            <MenuItem onClick={onOpen} icon={<ViewIcon />}>
                                Helfer:innen anzeigen
                            </MenuItem>
                        )}
                        header="Eingetragene Helfer"
                        labelClose="Schließen"
                        content={{
                            list: [
                                {
                                    name: "John Doe",
                                    email: "john.doe@example.com",
                                },
                                {
                                    name: "John Doe",
                                    email: "john.doe@example.com",
                                },
                                {
                                    name: "John Doe",
                                    email: "john.doe@example.com",
                                },
                            ],
                            body: ({ name, email }) => (
                                <Flex alignItems="center">
                                    <Avatar size="md" name={name} src="" />
                                    <Flex flexDir="column" ml={2}>
                                        <Text fontSize="md" fontWeight="medium">
                                            {name}
                                        </Text>
                                        <Text
                                            fontSize="sm"
                                            fontWeight="normal"
                                            color="gray.500"
                                        >
                                            {email}
                                        </Text>
                                    </Flex>
                                </Flex>
                            ),
                        }}
                    />
                ),
                changeStatus: (
                    <ActionModal
                        open={(onOpen) => (
                            <MenuItem onClick={onOpen} icon={<WarningIcon />}>
                                Status bearbeiten
                            </MenuItem>
                        )}
                        header="Status bearbeiten"
                        body={
                            <Filter
                                collection={[
                                    {
                                        label: "Voting",
                                        color: "purple",
                                    },
                                    {
                                        label: "In Arbeit",
                                        color: "orange",
                                    },
                                    {
                                        label: "Abgearbeitet",
                                        color: "green",
                                    },
                                ]}
                                onChange={console.log}
                                name="Status"
                                defaultValue="Voting"
                                direction="column"
                            />
                        }
                        labelAbort="Abbrechen"
                        labelAction="Änderungen übernehmen"
                        onAction={(onClose) => {
                            onClose();
                            console.log("Change Status");
                        }}
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
