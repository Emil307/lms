import { GetCourseResponse } from "@entities/course";
import { getPluralString, isMyCourse } from "@shared/utils";

export const getCourseInfoList = (data: GetCourseResponse) => {
    if (isMyCourse(data)) {
        return [];
    }

    return [
        {
            id: 1,
            label: "Состав",
            value: `${data.modulesCount} ${getPluralString(data.modulesCount, "модуль", "модуля", "модулей")}, ${
                data.lessonsCount
            } ${getPluralString(data.lessonsCount, "урок", "урока", "уроков")}`,
        },
        {
            id: 2,
            label: "Практических заданий",
            value: `${data.lessonHomeworksCount} ${getPluralString(
                data.lessonHomeworksCount,
                "домашнее задание",
                "домашнего задания",
                "домашних заданий"
            )}, ${data.lessonTestsCount} ${getPluralString(data.lessonTestsCount, "тест", "теста", "тестов")}`,
        },
        //TODO: добавить как бек добавит это поле
        // {
        //     id: 3,
        //     label: "Продолжительность",
        //     value:
        //         data.dateStart &&
        //         data.dateEnd &&
        //         `${getMonthDifference(data.dateStart, data.dateEnd)} ${getPluralString(
        //             getMonthDifference(data.dateStart, data.dateEnd),
        //             "месяц",
        //             "месяца",
        //             "месяцев"
        //         )}`,
        // },
    ];
};
