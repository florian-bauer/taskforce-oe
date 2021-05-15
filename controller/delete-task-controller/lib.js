import { DELETED } from "@/constants/status";

const deleteTask = async ({ token, taskId, title, description }) => {
    if (!token || !taskId) return;

    const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
            authorization: token,
        },
        body: JSON.stringify({
            title,
            description,
            status: DELETED,
        }),
    });

    const data = await response.json();
    return { data };
};

export { deleteTask };
