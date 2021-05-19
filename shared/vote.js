import { request } from "@/shared/request";

const addVote = async ({ token, taskId }) => {
    return await request({ token, taskId, section: "tasks", action: "add" });
};
const removeVote = async ({ token, taskId }) => {
    return await request({ token, taskId, section: "tasks", action: "remove" });
};

export { addVote, removeVote };
