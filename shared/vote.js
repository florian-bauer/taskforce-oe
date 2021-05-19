import { request } from "@/shared/request";

const addVote = async ({ token, taskId }) => {
    return await request({ token, taskId, section: "votes", action: "add" });
};
const removeVote = async ({ token, taskId }) => {
    return await request({ token, taskId, section: "votes", action: "remove" });
};

export { addVote, removeVote };
