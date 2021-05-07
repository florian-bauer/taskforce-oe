import { getUser } from "@/lib/user";

export default async (req, res) => {
    const { id: userId } = req.query;

    // `_id` is the intern id field of MongoDB
    // However we're reformatting it to `id` for concistency reasons
    const { _id, ...user } = await getUser({ id: userId });
    res.send({ id: _id, ...user });
};
