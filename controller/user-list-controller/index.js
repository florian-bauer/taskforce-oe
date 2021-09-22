import { Button } from "@/components/button";
import { TableSearchModal } from "@/components/table-search-modal";
import { Body as body } from "@/controller/user-list-controller/body";
import { filter } from "@/controller/user-list-controller/lib";
import { useAuthUser } from "next-firebase-auth";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { GroupIcon } from "@/styles/icons/GroupIcon";

const UserListController = () => {
    const { id } = useAuthUser();
    const [list, setList] = useState([]);

    const { data, mutate } = useSWR("/api/user", (url) =>
        fetch(url).then((res) => res.json())
    );

    useEffect(async () => {
        if (!data || !data.map || !data.filter) return;

        const users = data
            .filter((user) => user._id !== id)
            .map((user) => ({
                uid: user._id,
                name: user.name,
                email: user.email,
                role: user?.administrator ? "admin" : "user",
                mutate,
            }));

        setList(users);
    }, [data]);

    return (
        <TableSearchModal
            open={(onOpen) => (
                <Button
                    label="User List"
                    rightIcon={<GroupIcon />}
                    size="sm"
                    onClick={onOpen}
                />
            )}
            header="Alle Benutzer:innen"
            labelClose="Schließen"
            content={{ list, body }}
            filter={filter}
        />
    );
};

export { UserListController };
