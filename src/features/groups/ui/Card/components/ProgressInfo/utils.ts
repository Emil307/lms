import { GroupFromList, GroupStatusName } from "@entities/group";
import { getPluralString } from "@shared/utils";

export const getCountsInfo = (data: GroupFromList, status: GroupStatusName) => {
    const { practiceCount, lessonsCount } = data;

    if (status === "inProgress") {
        return {
            lessons: `${lessonsCount.passed}/${lessonsCount.total} ${getPluralString(lessonsCount.total, "урок", "урока", "уроков")}`,
            practice: `${practiceCount.passed}/${practiceCount.total} ${getPluralString(
                practiceCount.total,
                "практика",
                "практики",
                "практик"
            )}`,
        };
    }
    return {
        lessons: `${lessonsCount.total} ${getPluralString(lessonsCount.total, "урок", "урока", "уроков")}`,
        practice: `${practiceCount.total} ${getPluralString(practiceCount.total, "практика", "практики", "практик")}`,
    };
};
