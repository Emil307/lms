import { AdminLessonFromList, UpdateLessonFormValues } from "@entities/lesson";

export const getInitialValues = ({ name, description, hasTest, hasHomework }: AdminLessonFromList): UpdateLessonFormValues => ({
    name,
    description,
    hasTest,
    hasHomework,
});
