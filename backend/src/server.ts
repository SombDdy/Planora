import express from "express";
import projectsRouter from "./modules/projects/projects.routes.js"
import tasksRouter from "./modules/tasks/tasks.routes.js"
import usersRouter from "./modules/users/users.routes.js" 

const app = express();
app.use(express.json());
const PORT = 3000;

app.use("/api/projects", projectsRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/users", usersRouter);

app.listen(PORT, () => {
    console.log(`Lunvexa API is running on port ${PORT}`)
})