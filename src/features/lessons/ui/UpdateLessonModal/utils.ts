import { AdminLessonFromList, UpdateLessonFormValues } from "@entities/lesson";
import { CourseModuleLesson } from "@entities/courseModule";

export const getInitialValues = ({
    name,
    description,
    hasTest,
    hasHomework,
}: AdminLessonFromList | CourseModuleLesson): UpdateLessonFormValues => ({
    name,
    description,
    hasTest,
    hasHomework,
});
