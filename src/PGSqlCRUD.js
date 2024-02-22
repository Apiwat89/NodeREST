const express = require(`express`);
const Sequelize = require(`sequelize`);
const app = express();

app.use(express.json());

const dbUrl = "postgres://webadmin:XCPhhq09853@node57410-apiwattest.proen.app.ruk-com.cloud:11751/Books";

const sequelize = new Sequelize(dbUrl);