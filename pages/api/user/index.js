import { getUsers } from "@/lib/user";

export default async (req, res) => {
    const result = await getUsers();
    res.send(result);
};
