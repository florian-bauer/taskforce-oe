import { Button } from "@/components/button";
import {
    VotingAdminList,
    VotingOwnerList,
} from "@/components/card_old/CardFooter/lists";
import { Wrapper } from "@/components/card_old/CardFooter/wrapper";
import { Menu } from "@/components/menu";
import { DELETED, FINISHED, PROGRESS, VOTING } from "@/constants/status";
import {
    VoteButton,
    ParticipantButton,
} from "@/components/card_old/CardFooter/buttons";

/**
 * TODO(developer):
 *  - [ ] Capsulate Vote Buttons and different Menu Entries in Components
 *  - [ ] Add both Variants of the Vote and Participant Buttons
 *  - [ ] Fire the Events
 *
 */

const CardFooter = ({ status, is, events, components, ...props }) => {
    if (status === VOTING) {
        return (
            <Wrapper {...props}>
                <VoteButton
                    isVoter={is.voter}
                    onVoteAdd={events.onVoteAdd}
                    onVoteRemove={events.onVoteRemove}
                />
                <ParticipantButton
                    isParticipant={is.participant}
                    onParticipantAdd={events.onParticipantAdd}
                    onParticipantRemove={events.onParticipantRemove}
                />
                {is.administrator && (
                    <Menu
                        list={[
                            components.showParticipants,
                            components.changeStatus,
                            components.edit,
                            components.delete,
                        ]}
                    />
                )}
                {is.owner && !is.administrator && (
                    <Menu
                        list={[
                            components.showParticipants,
                            components.edit,
                            components.delete,
                        ]}
                    />
                )}
            </Wrapper>
        );
    }

    // Users (non-owners & non-admins) can't interact with the card after Voting state
    if (!is.administrator && !is.owner) return <></>;

    if (status === PROGRESS) {
        return (
            <Wrapper {...props}>
                <Button
                    label="Helfer:innen anzeigen"
                    onClick={events.onShowParticipants}
                    primary
                    w="100%"
                />
                {is.administrator && (
                    <Button
                        label="Status ändern"
                        onClick={events.onChangeStatus}
                        primary
                        w="100%"
                    />
                )}
            </Wrapper>
        );
    }

    if (status === DELETED) {
        return (
            <Wrapper {...props}>
                <Button
                    label="Wiederherstellen"
                    onClick={events.onRestore}
                    primary
                    w="100%"
                />
                <Button
                    label="Endgültig löschen"
                    onClick={events.onPermanentDelete}
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
                <Button
                    label="Status ändern"
                    onClick={events.onChangeStatus}
                    primary
                    w="100%"
                />
                <Button
                    label="Löschen"
                    onClick={events.onDelete}
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
