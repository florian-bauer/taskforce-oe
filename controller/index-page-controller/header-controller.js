import { Button } from "@/components/button";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, Image, Skeleton } from "@chakra-ui/react";
import firebase from "firebase";

const HeaderController = () => (
    <Flex p={6} alignItems="center" justifyContent="space-between">
        <Image
            src="/Logo.png"
            alt="BCM Solutions Logo"
            height={[8, 12, 14]}
            fallback={<Skeleton width="163px" height="64px" />}
        />
        <Button
            label="Log Out"
            rightIcon={<ChevronRightIcon />}
            size="sm"
            onClick={async () => await firebase.auth().signOut()}
        />
    </Flex>
);

export { HeaderController };
