import { initializeAuthentication } from "@/lib/auth";
import { setAuthCookies } from "next-firebase-auth";

initializeAuthentication();

export default async (req, res) => {
    try {
        await setAuthCookies(req, res);
    } catch (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json({ success: true });
};
