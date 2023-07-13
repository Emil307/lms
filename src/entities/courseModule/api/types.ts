import { z } from "zod";
import { $getFiltersRequestType, $getPaginationResponseType } from "@shared/types";

export type CourseModule = z.infer<typeof $CourseModule>;

export type GetCourseModulesRequest = z.infer<typeof $GetCourseModulesRequest>;
export type GetCourseModulesResponse = z.infer<typeof $GetCourseModulesResponse>;
export type GetCourseModuleRequest = z.infer<typeof $GetCourseModuleRequest>;
export type GetCourseModuleResponse = z.infer<typeof $GetCourseModuleResponse>;
export type CreateCourseModuleRequest = z.infer<typeof $CreateCourseModuleRequest>;
export type CreateCourseModuleResponse = z.infer<typeof $CreateCourseModuleResponse>;
export type CreateCourseModuleFormValues = z.infer<typeof $CreateCourseModuleFormValues>;
export type UpdateCourseModuleRequest = z.infer<typeof $UpdateCourseModuleRequest>;
export type UpdateCourseModuleResponse = z.infer<typeof $UpdateCourseModuleResponse>;
export type UpdateCourseModuleFormValues = z.infer<typeof $UpdateCourseModuleFormValues>;
export type UpdateCourseModuleActivityRequest = z.infer<typeof $UpdateCourseModuleActivityRequest>;
export type UpdateCourseModuleActivityResponse = z.infer<typeof $UpdateCourseModuleActivityResponse>;
export type DeleteCourseModuleRequest = z.infer<typeof $DeleteCourseModuleRequest>;
export type UpdateCourseModuleOrderRequest = z.infer<typeof $UpdateCourseModuleOrderRequest>;
export type UpdateCourseModuleOrderResponse = z.infer<typeof $UpdateCourseModuleOrderResponse>;
export type AttachLessonFromCourseModuleRequest = z.infer<typeof $AttachLessonToCourseModuleRequest>;
export type DetachLessonFromCourseModuleRequest = z.infer<typeof $DetachLessonFromCourseModuleRequest>;

export const $CourseModule = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    isActive: z.boolean(),
    createdAt: z.coerce.date(),
});

export const $GetCourseModulesRequest = $getFiltersRequestType(
    z.object({
        courseId: z.string(),
    })
);

export const $GetCourseModulesResponse = $getPaginationResponseType($CourseModule);

export const $GetCourseModuleRequest = z.object({
    courseId: z.string(),
    moduleId: z.string(),
});

export const $GetCourseModuleResponse = $CourseModule;

export const $CreateCourseModuleFormValues = z.object({
    name: z.string({ required_error: "Введите название" }),
    description: z.string({ required_error: "Введите описание" }),
});

export const $CreateCourseModuleRequest = $CreateCourseModuleFormValues
    .pick({
        name: true,
        description: true,
    })
    .extend({
        courseId: z.string(),
    });

export const $CreateCourseModuleResponse = $CourseModule;

export const $UpdateCourseModuleFormValues = $CreateCourseModuleFormValues;

export const $UpdateCourseModuleRequest = $CreateCourseModuleRequest.extend({
    moduleId: z.string(),
});

export const $UpdateCourseModuleResponse = $CourseModule;

export const $UpdateCourseModuleActivityRequest = z.object({
    courseId: z.string(),
    moduleId: z.string(),
    isActive: z.boolean(),
});
export const $UpdateCourseModuleActivityResponse = $UpdateCourseModuleActivityRequest.pick({
    isActive: true,
});

export const $DeleteCourseModuleRequest = z.object({
    courseId: z.string(),
    moduleId: z.string(),
});

export const $UpdateCourseModuleOrderRequest = z.object({
    courseId: z.string(),
    moduleId: z.string(),
    after: z.number(),
});

export const $UpdateCourseModuleOrderResponse = $CourseModule;

export const $AttachLessonToCourseModuleRequest = z.object({
    courseId: z.string(),
    moduleId: z.string(),
    ids: z.array(z.string()),
});

export const $DetachLessonFromCourseModuleRequest = z.object({
    courseId: z.string(),
    moduleId: z.string(),
    ids: z.array(z.string()),
});
