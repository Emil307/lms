import { Box, Flex, FlexProps } from "@mantine/core";
import React from "react";
import { AlignLeft } from "react-feather";
import { IconClipboardText } from "@tabler/icons-react";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField, Heading, Paragraph } from "@shared/ui";
import { InfoCard } from "@components/InfoCard";
import { useAdminCourseReview, useUpdateCourseReviewPublishingStatus } from "@entities/courseReview";
import { fields } from "./constants";
import useStyles from "./CourseReviewSettings.styles";
import { CourseReviewCardInfoFields } from "./types";
import { getDataInfoCard } from "./utils";
import { DeleteCourseReviewButton } from "./components";

export interface CourseReviewSettingsProps extends Omit<FlexProps, "children"> {
    id: string;
}

const CourseReviewSettings = ({ id, ...props }: CourseReviewSettingsProps) => {
    const { classes } = useStyles();
    const { data: courseReviewData } = useAdminCourseReview({ id });
    const { mutate: updatePublishingStatus } = useUpdateCourseReviewPublishingStatus({ id });

    const labelPublishingSwitch = courseReviewData?.isPublished ? "Снять с публикации" : "Опубликовать";
    const variantPublishButton = courseReviewData?.isPublished ? "border" : "secondary";

    const dataInfoCard = getDataInfoCard(courseReviewData);

    const handleChangePublishingStatus = () => updatePublishingStatus({ isPublished: !courseReviewData?.isPublished });

    return (
        <Flex className={classes.info} {...props}>
            <Flex className={classes.settingsInfo}>
                <Flex className={classes.headingSettingsInfo}>
                    <Heading order={2}>Данные автора</Heading>
                    <DeleteCourseReviewButton data={courseReviewData} />
                </Flex>
                <Flex direction="column" gap={{ base: 24, md: 32 }}>
                    <Fieldset label="Детали" icon={<IconClipboardText />}>
                        <DisplayField label="ФИО" value={dataInfoCard.fio} />
                        <DisplayField label="Курс" value={courseReviewData?.group.course.name} />
                        <DisplayField label="Группа ученика" value={courseReviewData?.group.name} />
                        <DisplayField
                            label="Оценка ученика"
                            render={() => (
                                <Flex gap={4}>
                                    <Flex align="center" gap={2}>
                                        <Paragraph variant="small-semi">{courseReviewData?.score}</Paragraph>
                                    </Flex>
                                    <Paragraph variant="small-m" color="gray45">
                                        из 5
                                    </Paragraph>
                                </Flex>
                            )}
                        />
                    </Fieldset>

                    <Fieldset label="Содержание отзыва" icon={<AlignLeft />}>
                        <Paragraph variant="small-m" color="dark">
                            {courseReviewData?.content}
                        </Paragraph>
                    </Fieldset>
                </Flex>
            </Flex>
            <Box>
                <InfoCard<CourseReviewCardInfoFields>
                    avatar={{
                        src: courseReviewData?.user.profile.avatar?.absolutePath,
                    }}
                    values={dataInfoCard}
                    variant="whiteBg"
                    fields={fields}
                    actionSlot={
                        <Button variant={variantPublishButton} onClick={handleChangePublishingStatus}>
                            {labelPublishingSwitch}
                        </Button>
                    }
                />
            </Box>
        </Flex>
    );
};

export default CourseReviewSettings;
