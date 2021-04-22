const path = require("path");
const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
    stories: ["../**/*.stories.@(js|jsx|ts|tsx)"],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    webpackFinal: async (config) => {
        config.resolve.modules = [
            path.resolve(__dirname, ".."),
            "node_modules",
        ];

        config.resolve.alias = {
            ...config.resolve.alias,
            "@/components": path.resolve(__dirname, "../components"),
            "@/styles": path.resolve(__dirname, "../styles"),
            "@/hooks": path.resolve(__dirname, "../hooks"),
            "@/constants": path.resolve(__dirname, "../constants"),
            "@/lib": path.resolve(__dirname, "../lib"),
        };
        return {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    "@emotion/core": toPath("node_modules/@emotion/react"),
                    "emotion-theming": toPath("node_modules/@emotion/react"),
                },
            },
        };
    },
};
