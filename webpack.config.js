module.exports = {
    mode: "production",
    optimization: { minimize: false },
    entry: {
        background: "./src/background.js",
        foreground: "./src/foreground.js"
    }
};