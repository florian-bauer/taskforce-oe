import { initializeAuthentication } from "@/lib/auth";
import { getUser, setUserRole } from "@/lib/user";
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
    if (method !== "PUT") return res.status(405).json({});

    const requestUser = await getUser({ id: uid });
    if (!requestUser?.administrator) return res.status(401).json({});

    // Updating the User Role after token and administrator role is validated
    const body = JSON.parse(req.body);
    await setUserRole({
        uid: body.uid,
        administrator: body.administrator,
    });

    return res.status(200).json({ success: true });
};
