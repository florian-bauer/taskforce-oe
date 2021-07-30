import { Tooltip } from "@/components/list-item/components/tooltip";
import { Menu } from "@/components/menu";
import { DELETED, FINISHED, PROGRESS, VOTING } from "@/constants/status";
import { ChangeTaskStatusController } from "@/controller/change-task-status-controller";
import { DeleteTaskController } from "@/controller/delete-task-controller";
import { EditTaskController } from "@/controller/edit-task-controller";
import { FinalDeleteTaskController } from "@/controller/final-delete-task-controller";
import { ParticipantController } from "@/controller/participant-controller";
import { RestoreTaskController } from "@/controller/restore-task-controller";
import { ShowParticipantsController } from "@/controller/show-participants-controller";
import { VoteController } from "@/controller/vote-controller";
import {
    DeleteIcon,
    EditIcon,
    RepeatIcon,
    WarningIcon,
} from "@chakra-ui/icons";
import { GroupIcon } from "@/styles/icons/GroupIcon";
import { MenuItem } from "@chakra-ui/menu";
import { IconButton } from "@chakra-ui/react";

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
                <Menu
                    list={[
                        <ShowParticipantsController
                            open={(onOpen) => (
                                <MenuItem onClick={onOpen} icon={<GroupIcon />}>
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
                        <Tooltip label="Helfer:innen anzeigen">
                            <IconButton
                                onClick={onOpen}
                                colorScheme="gray"
                                aria-label="Helfer:innen anzeigen"
                                icon={<GroupIcon />}
                                size="sm"
                            />
                        </Tooltip>
                    )}
                    participants={data.participants}
                />
                <ChangeTaskStatusController
                    open={(onOpen) => (
                        <Tooltip label="Status ändern">
                            <IconButton
                                onClick={onOpen}
                                colorScheme="gray"
                                aria-label="Status ändern"
                                icon={<WarningIcon />}
                                size="sm"
                            />
                        </Tooltip>
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
                        <Tooltip label="Status ändern">
                            <IconButton
                                onClick={onOpen}
                                colorScheme="gray"
                                aria-label="Status ändern"
                                icon={<WarningIcon />}
                                size="sm"
                            />
                        </Tooltip>
                    )}
                    mutate={mutate}
                    taskId={data._id}
                    title={data.title}
                    description={data.description}
                    status={data.status}
                />
                <DeleteTaskController
                    open={(onOpen) => (
                        <Tooltip label="Vorschlag löschen">
                            <IconButton
                                onClick={onOpen}
                                colorScheme="red"
                                aria-label="Vorschlag löschen"
                                icon={<DeleteIcon />}
                                size="sm"
                            />
                        </Tooltip>
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
                        <Tooltip label="Wiederherstellen">
                            <IconButton
                                onClick={onOpen}
                                colorScheme="gray"
                                aria-label="Vorschlag wiederherstellen"
                                icon={<RepeatIcon />}
                                size="sm"
                            />
                        </Tooltip>
                    )}
                    taskId={data._id}
                    mutate={mutate}
                    title={data.title}
                    description={data.description}
                />
                <FinalDeleteTaskController
                    open={(onOpen) => (
                        <Tooltip label="Endgültig löschen">
                            <IconButton
                                onClick={onOpen}
                                colorScheme="red"
                                aria-label="Vorschlag endgültig löschen"
                                icon={<DeleteIcon />}
                                size="sm"
                            />
                        </Tooltip>
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
