import { Button } from "@/components/button";
import { Menu } from "@/components/menu";
import { DELETED, PROGRESS, VOTING } from "@/constants/status";
import { DeleteTaskController } from "@/controller/delete-task-controller";
import { EditTaskController } from "@/controller/edit-task-controller";
import { FinalDeleteTaskController } from "@/controller/final-delete-task-controller";
import { ParticipantController } from "@/controller/participant-controller";
import { RestoreTaskController } from "@/controller/restore-task-controller";
import { ShowParticipantsController } from "@/controller/show-participants-controller";
import { VoteController } from "@/controller/vote-controller";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { MenuItem } from "@chakra-ui/menu";

const OwnerActionsController = ({ data, mutate }) => {
    if (data.status === VOTING) {
        return (
            <>
                <VoteController taskId={data._id} votes={data.votes} />
                <ParticipantController
                    taskId={data._id}
                    participants={data.participants}
                    mutate={mutate}
                />
                <Menu
                    list={[
                        <ShowParticipantsController
                            open={(onOpen) => (
                                <MenuItem onClick={onOpen} icon={<ViewIcon />}>
                                    Helfer:innen anzeigen
                                </MenuItem>
                            )}
                            participants={data.participants}
                        />,
                        <EditTaskController
                            open={(onOpen) => (
                                <MenuItem onClick={onOpen} icon={<EditIcon />}>
                                    Vorschlag bearbeiten
                                </MenuItem>
                            )}
                            mutate={mutate}
                            taskId={data._id}
                            title={data.title}
                            description={data.description}
                        />,
                        <DeleteTaskController
                            open={(onOpen) => (
                                <MenuItem
                                    onClick={onOpen}
                                    icon={<DeleteIcon />}
                                    color="red"
                                >
                                    Vorschlag löschen
                                </MenuItem>
                            )}
                            taskId={data._id}
                            mutate={mutate}
                            title={data.title}
                            description={data.description}
                        />,
                    ]}
                />
            </>
        );
    }

    if (data.status === PROGRESS) {
        return (
            <>
                <ShowParticipantsController
                    open={(onOpen) => (
                        <Button
                            label="Helfer:innen anzeigen"
                            onClick={onOpen}
                            primary
                            w="100%"
                        />
                    )}
                    participants={data.participants}
                />
            </>
        );
    }

    if (data.status === DELETED) {
        return (
            <>
                <RestoreTaskController
                    open={(onOpen) => (
                        <Button
                            onClick={onOpen}
                            label="Wiederherstellen"
                            primary
                            w="100%"
                        />
                    )}
                    taskId={data._id}
                    mutate={mutate}
                    title={data.title}
                    description={data.description}
                />
                <FinalDeleteTaskController
                    open={(onOpen) => (
                        <Button
                            onClick={onOpen}
                            label="Endgültig löschen"
                            primary
                            w="100%"
                            background="red.500"
                            _hover={{ bg: "red.400" }}
                            _active={{ bg: "red.300" }}
                        />
                    )}
                    taskId={data._id}
                    mutate={mutate}
                />
            </>
        );
    }

    return <></>;
};

export { OwnerActionsController };
