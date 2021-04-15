import { Button } from "@/components/button";
import {
    VotingAdminList,
    VotingOwnerList,
} from "@/components/card/CardFooter/lists";
import { Wrapper } from "@/components/card/CardFooter/wrapper";
import { Menu } from "@/components/menu";
import { DELETED, FINISHED, PROGRESS, VOTING } from "@/constants/status";

const CardFooter = ({ status, is, ...props }) => {
    if (status === VOTING) {
        return (
            <Wrapper {...props}>
                <Button label="Vote hinzufügen" primary w="100%" />
                <Button label="Als Helfer:in eintragen" primary w="100%" />
                {is.administrator && <Menu list={VotingAdminList} />}
                {is.owner && !is.administrator && (
                    <Menu list={VotingOwnerList} />
                )}
            </Wrapper>
        );
    }

    // Users (non-owners & non-admins) can't interact with the card after Voting state
    if (!is.administrator && !is.owner) return <></>;

    if (status === PROGRESS) {
        return (
            <Wrapper {...props}>
                <Button label="Helfer:innen anzeigen" primary w="100%" />
                {is.administrator && (
                    <Button label="Status ändern" primary w="100%" />
                )}
            </Wrapper>
        );
    }

    if (status === DELETED) {
        return (
            <Wrapper {...props}>
                <Button label="Wiederherstellen" primary w="100%" />
                <Button
                    label="Endgültig löschen"
                    background="red.500"
                    _hover={{ bg: "red.400" }}
                    _active={{ bg: "red.300" }}
                    primary
                    w="100%"
                />
            </Wrapper>
        );
    }

    // Users & non-owners should not be able to interact with the card when it's marked as finisehd
    // Only Administrators should be able to change the state of the proposal
    if (!is.administrator) return <></>;

    if (status === FINISHED) {
        return (
            <Wrapper {...props}>
                <Button label="Status ändern" primary w="100%" />
                <Button
                    label="Löschen"
                    background="red.500"
                    _hover={{ bg: "red.400" }}
                    _active={{ bg: "red.300" }}
                    primary
                    w="100%"
                />
            </Wrapper>
        );
    }
};

export { CardFooter };
