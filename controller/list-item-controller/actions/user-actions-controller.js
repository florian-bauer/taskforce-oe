import { ParticipantController } from "@/controller/participant-controller";
import { VoteController } from "@/controller/vote-controller";
import { VOTING } from "@/constants/status";

const UserActionsController = ({ data, mutate }) => {
    if (data.status === VOTING) {
        return (
            <>
                <VoteController taskId={data._id} votes={data.votes} />
                <ParticipantController
                    taskId={data._id}
                    participants={data.participants}
                    mutate={mutate}
                />
            </>
        );
    }

    return <></>;
};

export { UserActionsController };
