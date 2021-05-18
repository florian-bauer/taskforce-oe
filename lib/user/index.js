import { connect } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * Insert or Update a User in the Database
 * with the new Properties
 */
const refreshUser = async ({ user }) => {
    const { id, ...rest } = user;
    const { db } = await connect();

    try {
        await db
            .collection("users")
            .updateOne({ _id: id }, { $set: rest }, { upsert: true });
    } catch (error) {
        console.error(error);
    }
};

const getUser = async ({ id }) => {
    const { db } = await connect();

    try {
        const response = await db.collection("users").findOne({ _id: id });
        return response || {};
    } catch (error) {
        console.error(error);
    }

    return {};
};

const getUsers = async () => {
    const { db } = await connect();

    try {
        const response = await db.collection("users").find({}).toArray();
        return response || [];
    } catch (error) {
        console.error(error);
    }

    return [];
};

const setUserRole = async ({ uid, administrator }) => {
    const { db } = await connect();

    try {
        await db
            .collection("users")
            .updateOne({ _id: ObjectId(uid) }, { $set: { administrator } });
    } catch (error) {
        console.error(error);
    }
};

export { refreshUser, getUser, getUsers, setUserRole };
