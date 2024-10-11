import { CourseModuleWithoutLessons, UpdateCourseModuleFormValues } from "@entities/courseModule";

export const getInitialValues = ({ name, description, isActive }: CourseModuleWithoutLessons): UpdateCourseModuleFormValues => ({
    name,
    description,
    isActive,
});
