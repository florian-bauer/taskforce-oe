import { request } from "@/shared/request";

const addParticipant = async ({ token, taskId }) => {
    return await request({
        token,
        taskId,
        section: "participants",
        action: "add",
    });
};
const removeParticipant = async ({ token, taskId }) => {
    return await request({
        token,
        taskId,
        section: "participants",
        action: "remove",
    });
};

export { addParticipant, removeParticipant };
