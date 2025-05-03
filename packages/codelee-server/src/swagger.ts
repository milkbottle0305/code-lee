import swaggerJSDoc from "swagger-jsdoc";

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CodeLee API",
      version: "1.0.0",
      description: "CodeLee 백엔드 API 문서",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: [
    "./src/routes/*.ts", // JSDoc이 들어갈 라우터 파일 경로
  ],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
