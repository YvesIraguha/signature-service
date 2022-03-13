"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const deviceRoutes_1 = __importDefault(require("./src/deviceRoutes"));
const transactionRoutes_1 = __importDefault(require("./src/transactionRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.status(200).send({ message: 'Welcome to signature service API' });
});
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Signature-device API',
            version: '1.0.0',
            description: 'A signature service for managing devices to sign transactions   ',
            contact: {
                name: 'Signature Device API support',
                // url: "http://www.exmaple.com/support",
                email: 'iragahaivos@gmail.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Signature device server'
            }
        ]
    },
    apis: ['./src/deviceRoutes.ts', './src/transactionRoutes.ts']
};
const specs = (0, swagger_jsdoc_1.default)(options);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
app.use(deviceRoutes_1.default);
app.use(transactionRoutes_1.default);
exports.default = app;
