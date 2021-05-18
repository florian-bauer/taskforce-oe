import { Button } from "@/components/button";
import { UserListController } from "@/controller/user-list-controller";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, HStack, Image, Skeleton } from "@chakra-ui/react";
import firebase from "firebase";

const HeaderController = () => (
    <Flex p={6} alignItems="center" justifyContent="space-between">
        <Image
            src="/Logo.png"
            alt="BCM Solutions Logo"
            height={[8, 12, 14]}
            fallback={<Skeleton width="163px" height="64px" />}
        />
        <HStack>
            <UserListController />
            <Button
                label="Log Out"
                rightIcon={<ChevronRightIcon />}
                size="sm"
                onClick={async () => await firebase.auth().signOut()}
            />
        </HStack>
    </Flex>
);

export { HeaderController };
