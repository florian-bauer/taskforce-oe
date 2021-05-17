import { Button } from "@/components/button";
import { Menu } from "@/components/menu";
import { DELETED, FINISHED, PROGRESS, VOTING } from "@/constants/status";
import { DeleteTaskController } from "@/controller/delete-task-controller";
import { EditTaskController } from "@/controller/edit-task-controller";
import { FinalDeleteTaskController } from "@/controller/final-delete-task-controller";
import { ParticipantController } from "@/controller/participant-controller";
import { RestoreTaskController } from "@/controller/restore-task-controller";
import { ShowParticipantsController } from "@/controller/show-participants-controller";
import { VoteController } from "@/controller/vote-controller";
import { DeleteIcon, EditIcon, ViewIcon, WarningIcon } from "@chakra-ui/icons";
import { MenuItem } from "@chakra-ui/menu";
import { ChangeTaskStatusController } from "@/controller/change-task-status-controller";

const AdminActionsController = ({ data, mutate }) => {
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
                        <ChangeTaskStatusController
                            open={(onOpen) => (
                                <MenuItem
                                    onClick={onOpen}
                                    icon={<WarningIcon />}
                                >
                                    Status ändern
                                </MenuItem>
                            )}
                            mutate={mutate}
                            taskId={data._id}
                            title={data.title}
                            description={data.description}
                            status={data.status}
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
                            w="100%"
                        />
                    )}
                    participants={data.participants}
                />
                <ChangeTaskStatusController
                    open={(onOpen) => (
                        <Button
                            label="Status ändern"
                            onClick={onOpen}
                            primary
                            w="100%"
                        />
                    )}
                    mutate={mutate}
                    taskId={data._id}
                    title={data.title}
                    description={data.description}
                    status={data.status}
                />
            </>
        );
    }

    if (data.status === FINISHED) {
        return (
            <>
                <ChangeTaskStatusController
                    open={(onOpen) => (
                        <Button
                            label="Status ändern"
                            onClick={onOpen}
                            primary
                            w="100%"
                        />
                    )}
                    mutate={mutate}
                    taskId={data._id}
                    title={data.title}
                    description={data.description}
                    status={data.status}
                />
                <DeleteTaskController
                    open={(onOpen) => (
                        <Button
                            onClick={onOpen}
                            label="Vorschlag löschen"
                            primary
                            w="100%"
                            background="red.500"
                            _hover={{ bg: "red.400" }}
                            _active={{ bg: "red.300" }}
                        />
                    )}
                    taskId={data._id}
                    mutate={mutate}
                    title={data.title}
                    description={data.description}
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

export { AdminActionsController };
