import { TableModal } from "@/components/table-modal";
import { getParticipants } from "@/controller/show-participants-controller/lib";
import { ParticipantItemController } from "@/controller/show-participants-controller/participant-item-controller";
import { useEffect, useState } from "react";

const ShowParticipantsController = ({ open, participants }) => {
    const [data, setData] = useState([]);

    useEffect(async () => {
        const _participants = await getParticipants({ participants });
        setData(_participants);
    }, []);

    if (participants.length <= 0) {
        return <></>;
    }

    return (
        <TableModal
            open={open}
            header="Eingetragene Helfer:innen"
            labelClose="Schließen"
            content={{
                list: data,
                body: ({ name, email, avatar }) => (
                    <ParticipantItemController
                        name={name}
                        email={email}
                        avatar={avatar}
                    />
                ),
            }}
        />
    );
};

export { ShowParticipantsController };
