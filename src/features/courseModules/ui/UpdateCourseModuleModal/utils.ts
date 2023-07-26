import { CourseModuleWithoutLessons, UpdateCourseModuleFormValues } from "@entities/courseModule";

export const getInitialValues = ({ name, description }: CourseModuleWithoutLessons): UpdateCourseModuleFormValues => ({
    name,
    description,
});
