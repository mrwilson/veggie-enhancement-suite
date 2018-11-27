module.exports = {
    mode: "production",
    optimization: { minimize: false },
    entry: {
        on_page: "./src/on_page.js",
        popup: "./src/popup.js"
    }
};