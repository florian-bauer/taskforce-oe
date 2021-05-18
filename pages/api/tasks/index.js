import { initializeAuthentication } from "@/lib/auth";
import { createTask, getTasks } from "@/lib/tasks";
import { verifyIdToken } from "next-firebase-auth";

initializeAuthentication();

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

    // Validating the HTTP Request Method
    if (!["GET", "POST"].includes(method)) {
        return res.status(405).json({});
    }

    if (method === "GET") {
        const tasks = await getTasks();
        return res.status(200).json({ tasks });
    }

    if (method === "POST") {
        const { title, description } = JSON.parse(req.body);

        await createTask({
            title,
            description,
            uid,
        });
        return res.status(200).json({ success: true });
    }
};
