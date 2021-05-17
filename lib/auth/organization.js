const authorizeOrganization = ({ email }) => {
    const UserDomain = email.split("@")[1].toUpperCase();
    const AllowedDomain = `${process.env.NEXT_PUBLIC_ALLOW_AUTH_DOMAIN}`.toUpperCase();

    return UserDomain === AllowedDomain;
};

export { authorizeOrganization };
