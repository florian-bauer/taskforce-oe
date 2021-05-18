const getBadgeColor = ({ role }) => (role === "admin" ? "red" : "blue");

const filter = (searchTerm, list) => {
    const compare = (value) => {
        return value.toUpperCase().includes(searchTerm.toUpperCase());
    };

    return list.filter(({ name, email, role }) => {
        return compare(name) || compare(email) || compare(role);
    });
};

export { getBadgeColor, filter };
