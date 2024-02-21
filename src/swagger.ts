import swaggerAutogen from 'swagger-autogen';


const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Vendor Machine app',
        description: 'Rest API for Vendor Machine scenario'
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
            description: ''
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            }
        }
    },
    security: [{ bearerAuth: [] }],
};

const outputFile = './swagger_output.json';
const routes = ['./src/routes.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);