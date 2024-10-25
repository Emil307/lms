import { Flex, FlexProps } from "@mantine/core";
import React, { ChangeEvent, useState } from "react";
import dayjs from "dayjs";
import { Paragraph, Prompt, Switch } from "@shared/ui";
import { useAdminCourseReview, useUpdateCourseReviewPublishingStatus } from "@entities/courseReview";
import useStyles from "./InfoPanel.styles";

export interface InfoPanelProps extends Omit<FlexProps, "children"> {
    id: string;
}

const InfoPanel = ({ id, ...props }: InfoPanelProps) => {
    const { classes, cx } = useStyles();
    const [openedPrompt, setOpenedPrompt] = useState(true);
    const { data } = useAdminCourseReview({ id });

    const { mutate: updatePublishingStatus } = useUpdateCourseReviewPublishingStatus({ id });

    const labelPublishingSwitch = data?.isPublished ? "Опубликован" : "Скрыт";

    const handleChangePublishingStatus = (newValue: ChangeEvent<HTMLInputElement>) =>
        updatePublishingStatus({ isPublished: newValue.target.checked });

    const handleClosePrompt = () => setOpenedPrompt(false);

    return (
        <Flex {...props} className={cx(classes.root, props.className)}>
            <Flex className={classes.inner}>
                <Flex gap={8}>
                    <Paragraph variant="text-small-m" color="neutralMain50">
                        ID:
                    </Paragraph>
                    <Paragraph variant="text-small-m">{data?.id}</Paragraph>
                </Flex>
                <Flex align="center" gap={8}>
                    <Paragraph variant="text-small-m" color="neutralMain50">
                        Статус:
                    </Paragraph>
                    <Switch
                        variant="secondary"
                        label={labelPublishingSwitch}
                        labelPosition="left"
                        checked={data?.isPublished}
                        onChange={handleChangePublishingStatus}
                    />
                </Flex>
                <Flex gap={8}>
                    <Paragraph variant="text-small-m" color="neutralMain50">
                        Дата отзыва:
                    </Paragraph>
                    <Paragraph variant="text-small-m">{data?.createdAt ? dayjs(data.createdAt).format("DD.MM.YYYY HH:mm") : "-"}</Paragraph>
                </Flex>
            </Flex>
            <Prompt
                isOpened={openedPrompt}
                content="Опубликованный отзыв отображается в актуальных подборках на сайте."
                onClose={handleClosePrompt}
            />
        </Flex>
    );
};

export default InfoPanel;
