const getUser = async ({ uid }) => {
    const response = await fetch(`/api/user/${uid}`);
    return await response.json();
};

const getAuthor = async ({ uid, onResponse }) => {
    const data = await getUser({ uid });
    onResponse({ data });
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

export { getAuthor, getParticipants };
