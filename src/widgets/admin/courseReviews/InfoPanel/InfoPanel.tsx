import { Box, Flex } from "@mantine/core";
import React, { ChangeEvent, useState } from "react";
import dayjs from "dayjs";
import { Prompt, Switch } from "@shared/ui";
import { useAdminCourseReview, useUpdateCourseReviewPublishingStatus } from "@entities/courseReview";
import useStyles from "./InfoPanel.styles";

interface InfoPanelProps {
    id: string;
}

const InfoPanel = ({ id }: InfoPanelProps) => {
    const { classes } = useStyles();
    const [openedPrompt, setOpenedPrompt] = useState(true);
    const { data } = useAdminCourseReview({ id });

    const { mutate: updatePublishingStatus } = useUpdateCourseReviewPublishingStatus({ id });

    const labelPublishingSwitch = data?.isPublished ? "Опубликован" : "Скрыт";

    const handleChangePublishingStatus = (newValue: ChangeEvent<HTMLInputElement>) =>
        updatePublishingStatus({ isPublished: newValue.target.checked });

    const handleClosePrompt = () => setOpenedPrompt(false);

    return (
        <Flex direction="column" gap={24}>
            <Flex gap={32} align="center">
                <Box className={classes.infoItem}>
                    ID: <span>{data?.id}</span>
                </Box>
                <Flex gap={8} align="center" className={classes.infoItem}>
                    Статус:
                    <Switch
                        variant="secondary"
                        label={labelPublishingSwitch}
                        labelPosition="left"
                        checked={data?.isPublished}
                        onChange={handleChangePublishingStatus}
                    />
                </Flex>
                <Box className={classes.infoItem}>
                    Дата отзыва: <span>{data?.createdAt ? dayjs(data.createdAt).format("DD.MM.YYYY HH:mm") : "-"}</span>
                </Box>
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
