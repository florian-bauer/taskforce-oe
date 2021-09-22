import { isParticipant } from "@/controller/participant-controller/lib";
import { addParticipant, removeParticipant } from "@/shared/participant";
import { useAuthUser } from "next-firebase-auth";
import { useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Tooltip } from "@/components/list-item/components/tooltip";

const ParticipantController = ({ taskId, participants, mutate }) => {
    const { id: uid, getIdToken } = useAuthUser();
    const [participant, setParticipant] = useState(
        isParticipant({ participants, uid })
    );

    if (participant) {
        return (
            <Tooltip label="Als Helfer:in entfernen">
                <IconButton
                    size="sm"
                    aria-label="Als Helfer:in entfernen"
                    icon={<MinusIcon />}
                    colorScheme="red"
                    onClick={async () => {
                        const token = await getIdToken();
                        const { data } = await removeParticipant({
                            token,
                            taskId,
                        });

                        if (data?.success) {
                            setParticipant(false);
                            await mutate("/api/tasks");
                        }
                    }}
                />
            </Tooltip>
        );
    } else {
        return (
            <Tooltip label="Als Helfer:in hinzufügen">
                <IconButton
                    size="sm"
                    aria-label="Als Helfer:in hinzufügen"
                    icon={<AddIcon />}
                    onClick={async () => {
                        const token = await getIdToken();
                        const { data } = await addParticipant({
                            token,
                            taskId,
                        });

                        if (data?.success) {
                            setParticipant(true);
                            await mutate("/api/tasks");
                        }
                    }}
                />
            </Tooltip>
        );
    }
};

export { ParticipantController };
