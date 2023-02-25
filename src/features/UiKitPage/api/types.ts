import { z } from "zod";
import { $DateTime } from "../types";

enum Roles {
    USER = "USER",
    ADMIN = "ADMIN",
    SUPERADMIN = "ADMIN",
}

const $testData = z.object({
    name: z.string(),
    date: $DateTime,
    datetime: $DateTime,
    time: z.string(),
    role: z.enum([Roles.USER, Roles.ADMIN, Roles.SUPERADMIN] as const),
});
type TestData = z.infer<typeof $testData>;

export { $testData };

export type { TestData };
