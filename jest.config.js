module.exports = {
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    setupFilesAfterEnv: ["<rootDir>/__test__/setupTests.js"],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "@/components/(.*)": "<rootDir>/components/$1",
        "@/styles/(.*)": "<rootDir>/styles/$1",
        "@/hooks/(.*)": "<rootDir>/hooks/$1",
        "@/hooks": "<rootDir>/hooks",
        "@/constants/(.*)": "<rootDir>/constants/$1",
        "@/lib/(.*)": "<rootDir>/lib/$1",
        "@/controller/(.*)": "<rootDir>/controller/$1",
        "@/shared/(.*)": "<rootDir>/shared/$1",
    },
};
