import { Button } from "@/components/button";
import { TableSearchModal } from "@/components/table-search-modal";
import { Body as body } from "@/controller/user-list-controller/body";
import { filter, getUsers } from "@/controller/user-list-controller/lib";
import { ViewIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

const UserListController = () => {
    const [list, setList] = useState([]);

    useEffect(async () => {
        const { users } = await getUsers();

        setList(
            users.map((user) => ({
                uid: user._id,
                name: user.name,
                email: user.email,
                role: user?.administrator ? "admin" : "user",
            }))
        );
    }, []);

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
