import http from "node:http";
import createServerApplication from "./app/index.js";
function runServerApplication() {
    const server = http.createServer(createServerApplication());
    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () => {
        console.log("Server running on port", PORT);
    });
}
runServerApplication();
//# sourceMappingURL=index.js.map