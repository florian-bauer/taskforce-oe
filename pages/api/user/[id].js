import { getUser } from "@/lib/user";

export default async (req, res) => {
    const { id } = req.query;

    const user = await getUser({ id });
    res.send({ user });
};
