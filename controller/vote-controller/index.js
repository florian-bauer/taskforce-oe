import { isVoter } from "@/controller/vote-controller/lib";
import { addVote, removeVote } from "@/shared/vote";
import { useAuthUser } from "next-firebase-auth";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Tooltip } from "@/components/list-item/components/tooltip";

const VoteController = ({ taskId, votes }) => {
    const { id: uid, getIdToken } = useAuthUser();
    const [voter, setVoter] = useState(isVoter({ votes, uid }));
    const [amount, setAmount] = useState(votes.length);

    if (voter) {
        return (
            <Tooltip label="Vote entfernen">
                <Button
                    size="sm"
                    colorScheme="red"
                    leftIcon={<ChevronDownIcon />}
                    onClick={async () => {
                        const token = await getIdToken();
                        const { data } = await removeVote({ token, taskId });

                        if (data?.success) {
                            setVoter(false);
                            setAmount(amount - 1);
                        }
                    }}
                >
                    {amount}
                </Button>
            </Tooltip>
        );
    } else {
        return (
            <Tooltip label="Vote hinzufügen">
                <Button
                    size="sm"
                    leftIcon={<ChevronUpIcon />}
                    onClick={async () => {
                        const token = await getIdToken();
                        const { data } = await addVote({ token, taskId });

                        if (data?.success) {
                            setVoter(true);
                            setAmount(amount + 1);
                        }
                    }}
                >
                    {amount}
                </Button>
            </Tooltip>
        );
    }
};

export { VoteController };
