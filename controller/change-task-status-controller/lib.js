const changeStatus = async ({ token, taskId, title, description, status }) => {
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
    return { data };
};

export { changeStatus };
