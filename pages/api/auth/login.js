import { initializeAuthentication } from "@/lib/auth";
import { setAuthCookies, verifyIdToken } from "next-firebase-auth";
import { refreshUser } from "@/lib/user";

initializeAuthentication();

export default async (req, res) => {
    try {
        await setAuthCookies(req, res);

        const { id, email, claims } = await verifyIdToken(
            req.headers.authorization
        );

        const user = {
            id,
            email,
            name: claims.name,
            picture: claims.picture,
        };

        await refreshUser({ user });
    } catch (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json({ success: true });
};
