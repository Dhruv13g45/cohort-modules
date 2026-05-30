import express from "express";
import dotenv from "dotenv";
export function main() {
    try {
        const app = express();
        app.use(express.json());
        dotenv.config({
            path: "./env"
        });
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
        });
    }
    catch (error) {
        console.log("Error while creating the server application in main function", error);
    }
}
main();
//# sourceMappingURL=index.js.map