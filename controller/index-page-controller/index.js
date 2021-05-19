import { HeaderController } from "@/controller/index-page-controller/header-controller";
import { authorizeOrganization } from "@/lib/auth/organization";
import { getUser } from "@/shared/user";
import { Flex } from "@chakra-ui/react";
import firebase from "firebase";
import { useAuthUser } from "next-firebase-auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FilterController } from "./filter-controller";
import { GridController } from "./grid-controller";

const IndexPageController = () => {
    const { id, email } = useAuthUser();
    const [authorized, setAuthorized] = useState(false);
    const [filterStatus, setFilterStatus] = useState();
    const [administrator, setAdministrator] = useState(false);
    const router = useRouter();

    useEffect(async () => {
        const user = await getUser({ uid: id });
        if (user?.administrator) {
            setAdministrator(true);
        }
    }, [, id]);

    useEffect(() => {
        if (!email) return;

        const isAuthozied = authorizeOrganization({ email });

        if (!isAuthozied) {
            // Sign the User out because he isn't part of the allowed Organisation
            firebase
                .auth()
                .signOut()
                .then(() => {
                    // redirecting with query parameter so we can show a error message
                    router.push({
                        pathname: "/login",
                        query: {
                            allowed_organization: false,
                        },
                    });
                });
        } else {
            // User is Authorized and allowed to see the Content
            setAuthorized(true);
        }
    }, [email]);

    return (
        <>
            {authorized && (
                <Flex flexDirection="column">
                    <HeaderController administrator={administrator} />
                    <FilterController
                        onChange={({ status }) => setFilterStatus(status)}
                    />
                    <GridController filterStatus={filterStatus} />
                </Flex>
            )}
        </>
    );
};

export { IndexPageController };
