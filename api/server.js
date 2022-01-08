const {app} = require("./main.js");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
    console.log(`Started API server at http://localhost:${PORT}`)
);
