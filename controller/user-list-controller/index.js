import { Button } from "@/components/button";
import { TableSearchModal } from "@/components/table-search-modal";
import { Body as body } from "@/controller/user-list-controller/body";
import { filter, getUsers } from "@/controller/user-list-controller/lib";
import { ViewIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import useSWR from "swr";

const UserListController = () => {
    const [list, setList] = useState([]);

    const { data, mutate } = useSWR("/api/user", (url) =>
        fetch(url).then((res) => res.json())
    );

    useEffect(async () => {
        if (!data || !data.map) return;

        setList(
            data.map((user) => ({
                uid: user._id,
                name: user.name,
                email: user.email,
                role: user?.administrator ? "admin" : "user",
                mutate,
            }))
        );
    }, [data]);

    return (
        <TableSearchModal
            open={(onOpen) => (
                <Button
                    label="User List"
                    rightIcon={<ViewIcon />}
                    size="sm"
                    onClick={onOpen}
                />
            )}
            header="Alle Benutzer"
            labelClose="Schließen"
            content={{ list, body }}
            filter={filter}
        />
    );
};

export { UserListController };
