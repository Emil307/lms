import { Flex, Text } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { useUserRole } from "@entities/auth";
import { Heading, LastUpdatedInfo, Loader, Paragraph, Switch } from "@shared/ui";
import { useAdminCourse, useUpdateCourseActivity, useUpdateCoursePopularity, useUpdateCourseType } from "@entities/course";
import { Checkbox } from "@shared/ui/Forms";
import { Roles } from "@app/routes";
import useStyles from "./InfoPanel.styles";

interface InfoPanelProps {
    id: string;
}

const InfoPanel = ({ id }: InfoPanelProps) => {
    const { classes } = useStyles();
    const { data: courseData, isLoading, isError } = useAdminCourse(id);
    const { mutate: updateActivityStatus } = useUpdateCourseActivity({ id, name: courseData?.name });
    const { mutate: updateType } = useUpdateCourseType({ id, name: courseData?.name });
    const { mutate: updatePopularity } = useUpdateCoursePopularity({ id, name: courseData?.name });

    const userRole = useUserRole();

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) =>
        updateActivityStatus({ isActive: newValue.target.checked });
    const handleChangeType = (newValue: ChangeEvent<HTMLInputElement>) =>
        updateType(newValue.target.checked ? "interactive" : "autonomous");
    const handleChangePopularity = (newValue: ChangeEvent<HTMLInputElement>) => updatePopularity({ isPopular: newValue.target.checked });

    const labelActivitySwitch = courseData.isActive ? "Деактивировать" : "Активировать";

    const renderContent = () => {
        if (userRole === Roles.teacher) {
            return null;
        }
        return (
            <>
                <Flex className={classes.item}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Статус:
                    </Paragraph>
                    <Switch
                        checked={courseData.isActive}
                        onChange={handleChangeActiveStatus}
                        variant="secondary"
                        label={labelActivitySwitch}
                        labelPosition="left"
                    />
                </Flex>
                <Flex className={classes.item}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Тип курса:
                    </Paragraph>
                    <Checkbox label="Интерактивный" onChange={handleChangeType} checked={courseData.type === "interactive"} />
                </Flex>
                <Flex className={classes.item}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Создание:
                    </Paragraph>
                    <Paragraph variant="text-small-m">{dayjs(courseData.createdAt).format("DD.MM.YYYY HH:mm")}</Paragraph>
                </Flex>
                <Flex className={classes.item}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Отображать в популярных:
                    </Paragraph>
                    <Checkbox label="Да" onChange={handleChangePopularity} checked={courseData.isPopular} />
                </Flex>
            </>
        );
    };

    return (
        <>
            <Heading>{courseData.name}</Heading>
            <Flex className={classes.wrapper}>
                <Flex className={classes.item}>
                    <Paragraph variant="text-small-m" color="gray45">
                        ID:
                    </Paragraph>
                    <Paragraph variant="text-small-m">{courseData.id}</Paragraph>
                </Flex>
                {renderContent()}
                <LastUpdatedInfo data={courseData.lastUpdated} hidden={userRole === Roles.teacher} />
            </Flex>
        </>
    );
};

export default InfoPanel;
