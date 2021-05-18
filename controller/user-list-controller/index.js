import { Button } from "@/components/button";
import { TableSearchModal } from "@/components/table-search-modal";
import { Body as body } from "@/controller/user-list-controller/body";
import { filter } from "@/controller/user-list-controller/lib";
import { ViewIcon } from "@chakra-ui/icons";

const UserListController = () => {
    const list = [
        {
            name: "John Doe",
            email: "john.doe@example.com",
            role: "user",
        },
        {
            name: "Florian Bauer",
            email: "florian.bauer@bcm.com",
            role: "admin",
        },
        {
            name: "Tommy MorgeTommyAsdTiasdiasdIasOdiAhdnUadshasdasd",
            email: "tommy.morgen@asd.com",
            role: "user",
        },
    ];

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
