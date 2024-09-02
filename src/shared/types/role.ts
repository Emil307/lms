import { z } from "zod";

export enum Roles {
    administrator = "administrator",
    manager = "manager",
    teacher = "teacher",
    //TODO: нужно убрать employee когда бэк удалит его у себя
    employee = "employee",
    student = "student",
}

export type RoleName = z.infer<typeof $RoleName>;
export const $RoleName = z
    .literal("administrator")
    .or(z.literal("manager"))
    .or(z.literal("teacher"))
    .or(z.literal("student"))
    //TODO: нужно убрать employee когда бэк удалит его у себя
    .or(z.literal("employee"));

export type Role = z.infer<typeof $Role>;

export const $Role = z.object({
    id: z.number(),
    name: $RoleName,
    displayName: z.string(),
});
