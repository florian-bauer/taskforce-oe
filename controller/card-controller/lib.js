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

const addVote = async ({ token, taskId, onSuccess }) => {
    if (!token || !taskId) return;

    const response = await fetch(`/api/tasks/votes/${taskId}/add`, {
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

const removeVote = async ({ token, taskId, onSuccess }) => {
    if (!token || !taskId) return;

    const response = await fetch(`/api/tasks/votes/${taskId}/remove`, {
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

const addParticipant = async ({ token, taskId, onSuccess }) => {
    if (!token || !taskId) return;

    const response = await fetch(`/api/tasks/participants/${taskId}/add`, {
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

const removeParticipant = async ({ token, taskId, onSuccess }) => {
    if (!token || !taskId) return;

    const response = await fetch(`/api/tasks/participants/${taskId}/remove`, {
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

export {
    getAuthor,
    getParticipants,
    isUserAdministrator,
    addVote,
    removeVote,
    addParticipant,
    removeParticipant,
};
