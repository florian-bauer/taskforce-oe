import { Button } from "@/components/button";
import { isParticipant } from "@/controller/participant-controller/lib";
import { addParticipant, removeParticipant } from "@/shared/participant";
import { useAuthUser } from "next-firebase-auth";
import { useState } from "react";

const ParticipantController = ({ taskId, participants, mutate }) => {
    const { id: uid, getIdToken } = useAuthUser();
    const [participant, setParticipant] = useState(
        isParticipant({ participants, uid })
    );

    if (participant) {
        return (
            <Button
                label="Als Helfer:in entfernen"
                background="red.500"
                _hover={{ bg: "red.400" }}
                _active={{ bg: "red.300" }}
                primary
                w="100%"
                onClick={async () => {
                    const token = await getIdToken();
                    const { data } = await removeParticipant({ token, taskId });

                    if (data?.success) {
                        setParticipant(false);
                        await mutate("/api/tasks");
                    }
                }}
            />
        );
    } else {
        return (
            <Button
                label="Als Helfer:in hinzufügen"
                primary
                w="100%"
                onClick={async () => {
                    const token = await getIdToken();
                    const { data } = await addParticipant({ token, taskId });

                    if (data?.success) {
                        setParticipant(true);
                        await mutate("/api/tasks");
                    }
                }}
            />
        );
    }
};

export { ParticipantController };
