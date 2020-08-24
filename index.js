import express from "express";
import path from "path";
import bodyParser from "body-parser";
import {loginRouter} from "./router/login-router.js"
import {menteeDashboardRouter} from "./router/mentee/mentee-dashboard-router";
import cors from 'cors';
import session from 'express-session';
import {userRouter} from "./router/user-router";
import {welcomePageRouter} from "./router/welcome-router";
import {menteeRouter} from "./router/mentee/mentee_router";
import {mentorRouter} from "./router/mentor/mentor_router";
import {mentorDashboardRouter} from "./router/mentor/mentor-dashboard-router";
import {logoutRouter} from "./router/logout-router";
import {requestRouter} from "./router/request-router";
import {menteeHistoryRouter} from "./router/menteeHistoryRouter";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

app.use(cors())

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');

app.use("/", welcomePageRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

app.use('/u/dashboard', menteeDashboardRouter);
app.use('/m/dashboard', mentorDashboardRouter);
app.use('/api/user', userRouter);
app.use('/api/mentee', menteeRouter);
app.use('/api/mentor', mentorRouter);
app.use('/api/request', requestRouter);
app.use('/m/history', menteeHistoryRouter);

app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
