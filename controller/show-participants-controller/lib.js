const getUser = async ({ uid }) => {
    const response = await fetch(`/api/user/${uid}`);
    return await response.json();
};

const getParticipants = async ({ participants }) => {
    const _participants = [];

    for (const participantId of participants) {
        const { name, email, picture: avatar } = await getUser({
            uid: participantId,
        });
        _participants.push({ name, email, avatar });
    }

    return _participants;
};

export { getParticipants };
