import { DowngradeController } from "@/controller/user-roles-controller/downgrade-controller";
import { UpgradeController } from "@/controller/user-roles-controller/upgrade-controller";

const UserRolesController = ({ uid, name, email, role }) => {
    if (role === "user") {
        return <UpgradeController uid={uid} name={name} email={email} />;
    }

    if (role === "admin") {
        return <DowngradeController uid={uid} name={name} email={email} />;
    }

    return <></>;
};

export { UserRolesController };
