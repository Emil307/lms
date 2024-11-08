import React from "react";
import { BoxProps, Flex } from "@mantine/core";
import { BookOpen, Edit3, Folder } from "react-feather";
import { CourseDetails } from "@entities/course";
import { getPluralString } from "@shared/utils";
import { ModuleInfoCard } from "./components";

export interface MainInfoPanelProps extends Omit<BoxProps, "children"> {
    data: CourseDetails;
}

const ModulesInfo = ({ data, ...props }: MainInfoPanelProps) => {
    if (!data.modules.length && !data.lessonsCount && !data.testsCount) {
        return null;
    }

    return (
        <Flex {...props} gap={12}>
            {!!data.modules.length && (
                <ModuleInfoCard description={`из ${data.modules.length} модулей`} icon={<Folder />} title="Курс состоит" />
            )}
            {!!data.lessonsCount && (
                <ModuleInfoCard
                    description={`${data.lessonsCount} ${getPluralString(data.lessonsCount, "урок", "урока", "уроков")}`}
                    icon={<BookOpen />}
                    title="Всего в курсе"
                />
            )}
            {!!data.testsCount && (
                <ModuleInfoCard
                    description={`${data.testsCount + data.homeworksCount} ${getPluralString(
                        data.testsCount + data.homeworksCount,
                        "обучающее задание",
                        "обучающих задания",
                        "обучающих заданий"
                    )}`}
                    icon={<Edit3 />}
                    title="Для закрепления знаний"
                />
            )}
        </Flex>
    );
};
export default ModulesInfo;
