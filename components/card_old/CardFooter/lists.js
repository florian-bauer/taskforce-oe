import {
    ViewIcon,
    EditIcon,
    DeleteIcon,
    WarningTwoIcon,
} from "@chakra-ui/icons";

export const VotingOwnerList = ({ events }) => [
    {
        label: "Helfer anzeigen",
        icon: <ViewIcon />,
        onClick: events.onShowParticipants,
    },
    {
        label: "Bearbeiten",
        icon: <EditIcon />,
        onClick: events.onEdit,
    },
    {
        label: "Löschen",
        icon: <DeleteIcon />,
        onClick: events.onDelete,
        color: "red",
    },
];

export const VotingAdminList = ({ events }) => [
    {
        label: "Helfer:innen anzeigen",
        icon: <ViewIcon />,
        onClick: events.onShowParticipants,
    },
    {
        label: "Status ändern",
        icon: <WarningTwoIcon />,
        onClick: events.onChangeStatus,
    },
    {
        label: "Bearbeiten",
        icon: <EditIcon />,
        onClick: events.onEdit,
    },
    {
        label: "Löschen",
        icon: <DeleteIcon />,
        onClick: events.onDelete,
        color: "red",
    },
];
