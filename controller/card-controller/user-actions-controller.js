import { ParticipantController } from "@/controller/participant-controller";
import { VoteController } from "@/controller/vote-controller";

const UserActionController = ({ data }) => (
    <>
        <VoteController taskId={data._id} votes={data.votes} />
        <ParticipantController
            taskId={data._id}
            participants={data.participants}
        />
    </>
);

export { UserActionController };
