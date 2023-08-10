import { Flex, FlexProps } from "@mantine/core";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { LastUpdatedInfo, Paragraph, Switch } from "@shared/ui";
import { useAdminCoursePackage, useUpdateCoursePackageActivity } from "@entities/coursePackage";
import useStyles from "./InfoPanel.styles";

export interface InfoPanelProps extends Omit<FlexProps, "children"> {
    id: string;
}

const InfoPanel = ({ id, ...props }: InfoPanelProps) => {
    const { classes, cx } = useStyles();
    const { data: coursePackageData } = useAdminCoursePackage(id);

    const { mutate: updateActivityStatus } = useUpdateCoursePackageActivity(id);

    const labelActivitySwitch = coursePackageData?.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    return (
        <Flex {...props} className={cx(classes.root, props.className)}>
            <Flex gap={8}>
                <Paragraph variant="text-small-m" color="gray45">
                    ID:
                </Paragraph>
                <Paragraph variant="text-small-m">{coursePackageData?.id}</Paragraph>
            </Flex>
            <Flex align="center" gap={8}>
                <Paragraph variant="text-small-m" color="gray45">
                    Статус:
                </Paragraph>
                <Switch
                    checked={coursePackageData?.isActive}
                    onChange={handleChangeActiveStatus}
                    variant="secondary"
                    label={labelActivitySwitch}
                    labelPosition="left"
                />
            </Flex>
            <Flex gap={8}>
                <Paragraph variant="text-small-m" color="gray45">
                    Создание:
                </Paragraph>
                <Paragraph variant="text-small-m">
                    {coursePackageData?.createdAt ? dayjs(coursePackageData.createdAt).format("DD.MM.YYYY HH:mm") : "-"}
                </Paragraph>
            </Flex>
            <LastUpdatedInfo data={coursePackageData?.lastUpdated} />
        </Flex>
    );
};

export default InfoPanel;
