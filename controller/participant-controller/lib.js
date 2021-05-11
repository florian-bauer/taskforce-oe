const request = async ({ token, taskId, action }) => {
    if (!token || !taskId) return;

    const response = await fetch(
        `/api/tasks/participants/${taskId}/${action}`,
        {
            method: "POST",
            headers: {
                authorization: token,
            },
        }
    );

    const data = await response.json();
    return { data };
};

const addParticipant = async ({ token, taskId }) => {
    return await request({ token, taskId, action: "add" });
};
const removeParticipant = async ({ token, taskId }) => {
    return await request({ token, taskId, action: "remove" });
};
const isParticipant = ({ participants, uid }) => participants.includes(uid);

export { addParticipant, removeParticipant, isParticipant };
