import { initializeAuthentication } from "@/lib/auth";
import { unsetAuthCookies } from "next-firebase-auth";

initializeAuthentication();

export default async (req, res) => {
    try {
        await unsetAuthCookies(req, res);
    } catch (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json({ success: true });
};
