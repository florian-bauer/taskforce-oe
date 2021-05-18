import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { MenuItem } from "@chakra-ui/react";

const UserRolesController = ({ uid, role }) => {
    if (role === "user") {
        return <MenuItem icon={<ArrowUpIcon />}>zu Admin upgraden</MenuItem>;
    }

    if (role === "admin") {
        return <MenuItem icon={<ArrowDownIcon />}>zu User downgraden</MenuItem>;
    }
};

export { UserRolesController };
