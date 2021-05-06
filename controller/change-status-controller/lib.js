const updateStatus = async ({
    taskId,
    token,
    title,
    description,
    status,
    onSuccess,
}) => {
    if (!token || !taskId) return;

    const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
            authorization: token,
        },
        body: JSON.stringify({
            title,
            description,
            status,
        }),
    });

    const data = await response.json();

    if (data?.success) {
        onSuccess();
    }
};

export { updateStatus };
