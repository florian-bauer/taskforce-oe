import { Button } from "@/components/button";
import { Filter } from "@/components/filter";
import { CardController } from "@/controller/card-controller";
import { CreateTaskModal } from "@/controller/create-task-modal";
import { authorizeUsersOrganization } from "@/lib/auth/provider";
import { fetcher } from "@/lib/fetcher";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
    Divider,
    Flex,
    Image,
    SimpleGrid,
    Skeleton,
    useBreakpointValue,
} from "@chakra-ui/react";
import firebase from "firebase";
import {
    AuthAction,
    setAuthCookies,
    useAuthUser,
    withAuthUser,
    withAuthUserTokenSSR,
} from "next-firebase-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { Children, useEffect, useState } from "react";
import useSWR from "swr";
import { HeaderController } from "@/controller/index-page-controller/header-controller";
import { authorizeOrganization } from "@/lib/auth/organization";

/**
 * TODO(developer):
 *  - [x] User Authorizen (auch den query param richtig schreiben)
 *  - [x] Sign Out functionallity
 *  - [ ] Task fetching
 *  - [ ] Task Responsiveness
 */
const IndexPageController = () => {
    const { email, signOut } = useAuthUser();
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!email) return;

        const isAuthozied = authorizeOrganization({ email });

        if (!isAuthozied) {
            // Sign the User out because he isn't part of the allowed Organisation
            signOut().then(() => {
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
        <Flex flexDirection="column">{authorized && <HeaderController />}</Flex>
    );
};

export { IndexPageController };
