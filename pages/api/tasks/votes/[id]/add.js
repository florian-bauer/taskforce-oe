import { addVote } from "@/lib/tasks";
import { verifyIdToken } from "next-firebase-auth";

export default async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({});
    }

    try {
        // Authorize the User
        const { id: uid } = await verifyIdToken(req.headers.authorization);

        if (!uid) return res.status(401).json({});

        const { id } = req.query;
        await addVote({ id, uid });
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(401).json({});
    }
};