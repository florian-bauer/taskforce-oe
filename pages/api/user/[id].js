import { getUser } from "@/lib/user";

export default async (req, res) => {
    const { id } = req.query;

    const { _id, ...user } = await getUser({ id });
    res.send({ id: _id, ...user });
};
