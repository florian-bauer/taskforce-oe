import { Button } from "@/components/button";
import { addVote, isVoter, removeVote } from "@/controller/vote-controller/lib";
import { useAuthUser } from "next-firebase-auth";
import { useState } from "react";

const VoteController = ({ taskId, votes }) => {
    const { id: uid, getIdToken } = useAuthUser();
    const [voter, setVoter] = useState(isVoter({ votes, uid }));

    if (voter) {
        return (
            <Button
                label="Vote entfernen"
                background="red.500"
                _hover={{ bg: "red.400" }}
                _active={{ bg: "red.300" }}
                primary
                w="100%"
                onClick={async () => {
                    const token = await getIdToken();
                    const { data } = await removeVote({ token, taskId });

                    if (data?.success) {
                        setVoter(false);
                    }
                }}
            />
        );
    } else {
        return (
            <Button
                label="Vote hinzufügen"
                primary
                w="100%"
                onClick={async () => {
                    const token = await getIdToken();
                    const { data } = await addVote({ token, taskId });

                    if (data?.success) {
                        setVoter(true);
                    }
                }}
            />
        );
    }
};

export { VoteController };
