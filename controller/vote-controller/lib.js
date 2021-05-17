const request = async ({ token, taskId, action }) => {
    if (!token || !taskId) return;

    const response = await fetch(`/api/tasks/votes/${taskId}/${action}`, {
        method: "POST",
        headers: {
            authorization: token,
        },
    });

    const data = await response.json();
    return { data };
};

const addVote = async ({ token, taskId }) => {
    return await request({ token, taskId, action: "add" });
};
const removeVote = async ({ token, taskId }) => {
    return await request({ token, taskId, action: "remove" });
};
const isVoter = ({ votes, uid }) => votes.includes(uid);

export { addVote, removeVote, isVoter };
