const getUser = async ({ uid }) => {
    const response = await fetch(`/api/user/${uid}`);
    return await response.json();
};

const getAuthor = async ({ uid, onResponse }) => {
    const data = await getUser({ uid });
    onResponse({ data });
};

const isUserAdministrator = async ({ uid, onResponse }) => {
    const data = await getUser({ uid });
    if (data.administrator) {
        return onResponse({ data: data.administrator });
    }

    return onResponse({ data: false });
};

const getParticipants = async ({ rawParticipants, onResponse }) => {
    const participants = [];

    for (const participant of rawParticipants) {
        const { name, picture } = await getUser({ uid: participant });
        participants.push({
            name,
            avatar: picture,
        });
    }

    onResponse({ data: participants });
};

const action = async ({ token, taskId, onSuccess, section, action }) => {
    if (!token || !taskId) return;

    const response = await fetch(`/api/tasks/${section}/${taskId}/${action}`, {
        method: "POST",
        headers: {
            authorization: token,
        },
    });

    const data = await response.json();

    if (data?.success) {
        onSuccess();
    }
};

const addVote = async ({ token, taskId, onSuccess }) => {
    await action({
        token,
        taskId,
        onSuccess,
        section: "votes",
        action: "add",
    });
};

const removeVote = async ({ token, taskId, onSuccess }) => {
    await action({
        token,
        taskId,
        onSuccess,
        section: "votes",
        action: "remove",
    });
};

const addParticipant = async ({ token, taskId, onSuccess }) => {
    await action({
        token,
        taskId,
        onSuccess,
        section: "participants",
        action: "add",
    });
};

const removeParticipant = async ({ token, taskId, onSuccess }) => {
    await action({
        token,
        taskId,
        onSuccess,
        section: "participants",
        action: "remove",
    });
};

export {
    getAuthor,
    getParticipants,
    isUserAdministrator,
    addVote,
    removeVote,
    addParticipant,
    removeParticipant,
};
