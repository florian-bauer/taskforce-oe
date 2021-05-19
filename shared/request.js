const request = async ({ token, taskId, section, action }) => {
    if (!token || !taskId) return;

    const response = await fetch(`/api/tasks/${section}/${taskId}/${action}`, {
        method: "POST",
        headers: {
            authorization: token,
        },
    });

    const data = await response.json();
    return { data };
};

export { request };
