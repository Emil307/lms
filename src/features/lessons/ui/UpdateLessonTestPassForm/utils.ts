import { GetTestPassResponse, GetTestResponse, UpdateTestPassRequest } from "@entities/lesson";
import { InvalidateQueriesKey } from "@shared/types";
import { EntityNames, QueryKeys } from "@shared/constant";
import { UpdateLessonTestPassFormValidation } from "./types";

export const getInitialValues = (testData?: GetTestResponse, testPassData?: GetTestPassResponse): UpdateLessonTestPassFormValidation => {
    return {
        progressCounter: 0,
        tasks:
            testData?.tasks.map((task) => {
                const prevPossibleAnswers = testPassData?.answers?.find(({ id }) => id === task.id);

                return {
                    id: task.id,
                    order: task.order,
                    content: task.content,
                    answers: task.answers.map((answer) => {
                        const isPrevSelected = !!prevPossibleAnswers?.answer.find((prevAnswer) => prevAnswer.id === answer.id)?.isSelected;
                        return {
                            ...answer,
                            isSelected: false,
                            isPrevSelected,
                        };
                    }),
                    isCheckbox: task.isCheckbox,
                };
            }) || [],
    };
};

export const adaptUpdateLessonTestPassRequest = (
    data: UpdateLessonTestPassFormValidation
): Omit<UpdateTestPassRequest, "lessonId" | "courseId"> => {
    const { tasks } = data;
    return {
        answers: tasks.map((task) => ({
            testTaskId: task.id,
            selections: task.answers.filter((answer) => answer.isSelected).map(({ order }) => order),
        })),
    };
};

interface GetKeysInvalidateQueriesParams {
    lessonId: string;
    courseId: string;
}

export const getKeysInvalidateQueries = ({ lessonId, courseId }: GetKeysInvalidateQueriesParams): InvalidateQueriesKey[] => [
    { queryKey: [QueryKeys.GET_LESSON_TEST_PASS] },
    {
        queryKey: [
            QueryKeys.GET_LESSON,
            [EntityNames.LESSON, EntityNames.LESSON_HOMEWORK, EntityNames.LESSON_TEST, EntityNames.MATERIAL],
            lessonId,
            courseId,
        ],
    },
    { queryKey: [QueryKeys.GET_GROUP_MODULES] },
];
