const createTask = async ({ token, title, description }) => {
    if (!token) return;

    const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
            authorization: token,
        },
        body: JSON.stringify({
            title,
            description,
        }),
    });

    const data = await response.json();
    return { data };
};

export { createTask };
