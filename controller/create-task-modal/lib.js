const CreateTask = async ({ title, description, token, onResponse }) => {
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
    onResponse({ data });
};

export { CreateTask };
