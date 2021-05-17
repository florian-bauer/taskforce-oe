import { connect } from "@/lib/mongodb";
import { VOTING } from "@/constants/status";
import { ObjectId } from "mongodb";

const createTask = async ({ title, description, uid }) => {
    const { db } = await connect();

    try {
        const now = new Date().toISOString();

        const result = await db.collection("tasks").insertOne({
            title,
            description,
            votes: [],
            participants: [],
            status: VOTING,
            statusSince: now,
            createdBy: uid,
            createdOn: now,
        });
    } catch (error) {
        console.error(error);
    }
};

const getTasks = async () => {
    const { db } = await connect();

    try {
        return db.collection("tasks").find({}).toArray();
    } catch (error) {
        console.error(error);
    }

    return [];
};

const updateTask = async ({ id, title, description, status, uid }) => {
    const { db } = await connect();

    try {
        const now = new Date().toISOString();

        await db.collection("tasks").updateOne(
            { _id: ObjectId(id) },
            {
                $set: {
                    title,
                    description,
                    status,
                    statusSince: now,
                    editedBy: uid,
                    editedOn: now,
                },
            }
        );
    } catch (error) {
        console.error(error);
    }
};

const deleteTask = async ({ id }) => {
    const { db } = await connect();

    try {
        await db.collection("tasks").deleteOne({ _id: ObjectId(id) });
    } catch (error) {
        console.error(error);
    }
};

const addVote = async ({ id, uid }) => {
    const { db } = await connect();

    try {
        const { votes } = await db
            .collection("tasks")
            .findOne({ _id: ObjectId(id) });

        if (!votes.includes(uid)) {
            votes.push(uid);
        }

        await db
            .collection("tasks")
            .updateOne({ _id: ObjectId(id) }, { $set: { votes } });
    } catch (error) {
        console.error(error);
    }
};

const removeVote = async ({ id, uid }) => {
    const { db } = await connect();

    try {
        const { votes } = await db
            .collection("tasks")
            .findOne({ _id: ObjectId(id) });

        const newVotes = votes.filter((_uid) => _uid !== uid);

        await db
            .collection("tasks")
            .updateOne({ _id: ObjectId(id) }, { $set: { votes: newVotes } });
    } catch (error) {
        console.error(error);
    }
};

const addParticipant = async ({ id, uid }) => {
    const { db } = await connect();

    try {
        const { participants } = await db
            .collection("tasks")
            .findOne({ _id: ObjectId(id) });

        if (!participants.includes(uid)) {
            participants.push(uid);
        }

        await db
            .collection("tasks")
            .updateOne({ _id: ObjectId(id) }, { $set: { participants } });
    } catch (error) {
        console.error(error);
    }
};

const removeParticipant = async ({ id, uid }) => {
    const { db } = await connect();

    try {
        const { participants } = await db
            .collection("tasks")
            .findOne({ _id: ObjectId(id) });

        const newParticipants = participants.filter((_uid) => _uid !== uid);

        await db
            .collection("tasks")
            .updateOne(
                { _id: ObjectId(id) },
                { $set: { participants: newParticipants } }
            );
    } catch (error) {
        console.error(error);
    }
};

export {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    addVote,
    removeVote,
    addParticipant,
    removeParticipant,
};
