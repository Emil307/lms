import { CourseModule, UpdateCourseModuleFormValues } from "@entities/courseModule";

export const getInitialValues = ({ name, description }: CourseModule): UpdateCourseModuleFormValues => ({
    name,
    description,
});
