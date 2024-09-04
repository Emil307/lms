import React from "react";
import { BoxProps, Flex } from "@mantine/core";
import { BookOpen, Edit3, Folder } from "react-feather";
import { CourseDetails } from "@entities/course";
import { Paragraph } from "@shared/ui";
import { getPluralString } from "@shared/utils";
import useStyles from "./ModulesInfo.styles";

export interface MainInfoPanelProps extends Omit<BoxProps, "children"> {
    data: CourseDetails;
}

const ModulesInfo = ({ data, ...props }: MainInfoPanelProps) => {
    const { classes } = useStyles();
    if (data.modules.length === 0 && data.lessonsCount === 0 && data.testsCount === 0) {
        return null;
    }
    const renderCountModules = () => {
        if (data.modules.length > 0) {
            return (
                <Flex className={classes.modulesContainer}>
                    <Flex className={classes.iconContainer}>
                        <Folder />
                    </Flex>
                    <Flex direction="column">
                        <Paragraph variant="text-small-m" color="gray45">
                            Курс состоит
                        </Paragraph>
                        <Paragraph variant="large">{`из ${data.modules.length} модулей`}</Paragraph>
                    </Flex>
                </Flex>
            );
        }
    };

    const renderCountLessons = () => {
        if (data.lessonsCount > 0) {
            return (
                <Flex className={classes.modulesContainer}>
                    <Flex className={classes.iconContainer}>
                        <BookOpen />
                    </Flex>
                    <Flex direction="column">
                        <Paragraph variant="text-small-m" color="gray45">
                            Всего в курсе
                        </Paragraph>
                        <Paragraph variant="large">{`${data.lessonsCount} ${getPluralString(
                            data.lessonsCount,
                            "урок",
                            "урока",
                            "уроков"
                        )}`}</Paragraph>
                    </Flex>
                </Flex>
            );
        }
    };

    const renderCountTests = () => {
        if (data.testsCount > 0) {
            return (
                <Flex className={classes.modulesContainer}>
                    <Flex className={classes.iconContainer}>
                        <Edit3 />
                    </Flex>
                    <Flex direction="column">
                        <Paragraph variant="text-small-m" color="gray45">
                            Для закрепления знаний
                        </Paragraph>
                        <Paragraph variant="large">
                            {`${data.testsCount}
                                обучающих заданий`}
                        </Paragraph>
                    </Flex>
                </Flex>
            );
        }
    };

    return (
        <Flex {...props} className={classes.root}>
            {renderCountModules()}
            {renderCountLessons()}
            {renderCountTests()}
        </Flex>
    );
};
export default ModulesInfo;
