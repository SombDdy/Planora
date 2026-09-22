import {createServer} from "node:http";

const server = createServer((request, response) => {
    response.end("Hello from Lunvexa API");
});

server.listen(3000, () => {
    console.log("Lunvexa API is running on port 3000")
})