const finalDeleteTask = async ({ token, taskId }) => {
    if (!token || !taskId) return;

    const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
            authorization: token,
        },
    });

    const data = await response.json();
    return { data };
};

export { finalDeleteTask };
