import { PlayerController } from "./controller/PlayerController";
import express from 'express';

const app = express()
app.use(express.json())

PlayerController(app)

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`[INFO] App listening on port ${port}`))