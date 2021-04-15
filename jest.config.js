module.exports = {
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    setupFilesAfterEnv: ["<rootDir>/__test__/setupTests.js"],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "@/components/(.*)": "<rootDir>/components/$1",
        "@/styles/(.*)": "<rootDir>/components/$1",
        "@/hooks/(.*)": "<rootDir>/hooks/$1",
        "@/constants/(.*)": "<rootDir>/constants/$1",
    },
};
