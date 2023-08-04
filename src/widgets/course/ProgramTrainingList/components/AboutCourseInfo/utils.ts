import { CourseDetails } from "@entities/course";
import { getPluralString } from "@shared/utils";

export const getCourseInfoList = (data: CourseDetails) => {
    const items = [
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
    ];

    if (data.duration) {
        items.push({
            id: 3,
            label: "Продолжительность",
            value: data.duration,
        });
    }

    return items;
};
