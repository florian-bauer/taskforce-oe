import { deleteTask, updateTask } from "@/lib/tasks";
import { verifyIdToken } from "next-firebase-auth";

export default async (req, res) => {
    let uid;
    try {
        // Authorize the User
        const { id } = await verifyIdToken(req.headers.authorization);

        if (!id) return res.status(401).json({});
        uid = id;
    } catch (error) {
        return res.status(401).json({});
    }

    const { method } = req;
    const taskId = req.query.id;

    // Validating the HTTP Request Method
    if (!["PUT", "DELETE"].includes(method)) {
        return res.status(405).json({});
    }

    if (method === "PUT") {
        const { title, description, status } = JSON.parse(req.body);

        await updateTask({
            id: taskId,
            title,
            description,
            status,
            uid,
        });

        return res.status(200).json({ success: true });
    }

    if (method === "DELETE") {
        await deleteTask({ id: taskId });

        return res.status(200).json({ success: true });
    }
};
