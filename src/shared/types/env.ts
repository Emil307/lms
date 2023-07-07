import { z } from "zod";

const $EnvSchema = z
    .object({
        NEXT_PUBLIC_API_URL_CORE: z.string().url(),
        NEXT_PUBLIC_API_URL_AUTH: z.string().url(),
        NEXT_PUBLIC_API_URL_COURSES: z.string().url(),
        NEXT_PUBLIC_API_URL_ARTICLES: z.string().url(),
        NEXT_PUBLIC_API_ROUTES_URL: z.string().url(),
        PORT: z.number().optional().default(8080),
    })
    .strict({ message: "В .env файле присутствуют лишние переменные." });

$EnvSchema.parse(process.env);

declare global {
    namespace NodeJS {
        /**
         * NEXT_PUBLIC - префикс для переменных доступных в браузере.
         */
        interface ProcessEnv extends z.infer<typeof $EnvSchema> {}
    }
}
export {};
