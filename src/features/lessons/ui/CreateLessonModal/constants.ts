import { CreateLessonFormValues } from "@entities/lesson";
import { QueryKeys } from "@shared/constant";
import { InvalidateQueriesKey } from "@shared/types";

export const initialValues: CreateLessonFormValues = {
    name: "",
    description: "",
    hasTest: false,
    hasHomework: false,
};

export const keysInvalidateQueries: InvalidateQueriesKey[] = [
    { queryKey: [QueryKeys.GET_ADMIN_LESSONS] },
    { queryKey: [QueryKeys.GET_ADMIN_LESSONS_FOR_SELECT] },
];
