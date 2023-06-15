import { CreateLessonFormValues } from "@entities/lesson";

export const initialValues: CreateLessonFormValues = {
    name: "",
    description: "",
    hasTest: false,
    hasHomework: false,
};
