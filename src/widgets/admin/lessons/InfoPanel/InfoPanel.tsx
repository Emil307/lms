import { Flex, Text } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { useUserRole } from "@entities/auth";
import { Heading, LastUpdatedInfo, Loader, Paragraph, Switch } from "@shared/ui";
import { useAdminLesson, useUpdateLessonActivity } from "@entities/lesson";
import { Roles } from "@shared/types";
import useStyles from "./InfoPanel.styles";

interface InfoPanelProps {
    id: string;
}

const InfoPanel = ({ id }: InfoPanelProps) => {
    const { classes } = useStyles();
    const { data: lessonData, isLoading, isError } = useAdminLesson(id);
    const { mutate: updateActivityStatus } = useUpdateLessonActivity({ id, lessonName: lessonData?.name });

    const userRole = useUserRole();

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    const labelActivitySwitch = lessonData.isActive ? "Деактивировать" : "Активировать";

    return (
        <>
            <Heading>{lessonData.name}</Heading>
            <Flex className={classes.wrapper}>
                <Flex className={classes.item}>
                    <Paragraph variant="text-small-m" color="neutralMain50">
                        ID:
                    </Paragraph>
                    <Paragraph variant="text-small-m" color="dark">
                        {lessonData.id}
                    </Paragraph>
                </Flex>

                {userRole?.name !== Roles.teacher && (
                    <>
                        <Flex className={classes.item}>
                            <Paragraph variant="text-small-m" color="neutralMain50">
                                Статус:
                            </Paragraph>
                            <Switch
                                checked={lessonData.isActive}
                                onChange={handleChangeActiveStatus}
                                variant="secondary"
                                label={labelActivitySwitch}
                                labelPosition="left"
                            />
                        </Flex>
                        <Flex className={classes.item}>
                            <Paragraph variant="text-small-m" color="neutralMain50">
                                Создание:
                            </Paragraph>
                            <Paragraph variant="text-small-m" color="dark">
                                {dayjs(lessonData.createdAt).format("DD.MM.YYYY HH:mm")}
                            </Paragraph>
                        </Flex>
                    </>
                )}

                <LastUpdatedInfo data={lessonData.lastUpdated} hidden={userRole?.name === Roles.teacher} />
            </Flex>
        </>
    );
};

export default InfoPanel;
