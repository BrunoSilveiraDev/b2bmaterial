import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    const swaggerOptions = new DocumentBuilder()
        .setTitle("B2B Material")
        .setDescription("Contruindo pontes para quem precisa produzir")
        .setVersion("1.0")
        .addTag("hackathon")
        .build();
    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup("swagger", app, document);
    const options = {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    };
    app.enableCors(options);
    await app.listen(3000);
}
bootstrap();
