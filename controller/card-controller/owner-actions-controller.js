import { Button } from "@/components/button";
import { Menu } from "@/components/menu";
import { DELETED, PROGRESS, VOTING } from "@/constants/status";
import { ParticipantController } from "@/controller/participant-controller";
import { ShowParticipantsController } from "@/controller/show-participants-controller";
import { VoteController } from "@/controller/vote-controller";
import { MenuItem } from "@chakra-ui/menu";

const OwnerActionsController = ({ data }) => {
    if (data.status === VOTING) {
        return (
            <>
                <VoteController taskId={data._id} votes={data.votes} />
                <ParticipantController
                    taskId={data._id}
                    participants={data.participants}
                />
                <Menu
                    list={[
                        <ShowParticipantsController
                            open={(onOpen) => (
                                <MenuItem onClick={onOpen}>
                                    Helfer:innen anzeigen
                                </MenuItem>
                            )}
                            participants={data.participants}
                        />,
                    ]}
                />
                {/* Task bearbeiten */}
                {/* Task Löschen */}
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
                {/* Wiederherstellen */}
                {/* Endgültig löschen */}
            </>
        );
    }

    return <></>;
};

export { OwnerActionsController };
