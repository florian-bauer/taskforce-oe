import { initializeAuthentication } from "@/lib/auth";
import { setAuthCookies, verifyIdToken } from "next-firebase-auth";
import { refreshUser } from "@/lib/user";
import { authorizeOrganization } from "@/lib/auth/organization";

initializeAuthentication();

export default async (req, res) => {
    try {
        await setAuthCookies(req, res);

        // Get User Information from the Autorization Token
        const { id, email, claims } = await verifyIdToken(
            req.headers.authorization
        );

        const user = {
            id,
            email,
            name: claims.name,
            picture: claims.picture,
        };

        const authorized = authorizeOrganization({ email });

        if (authorized) {
            await refreshUser({ user });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json({ success: true });
};
