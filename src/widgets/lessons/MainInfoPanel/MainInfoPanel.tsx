import { Badge, Flex, FlexProps } from "@mantine/core";
import { Box } from "@mantine/core";
import { Heading, Paragraph } from "@shared/ui";
import { GetLessonResponse } from "@entities/lesson";
import { MyCourse } from "@entities/course";
import useStyles from "./MainInfoPanel.styles";

export interface MainInfoPanelProps extends Omit<FlexProps, "children"> {
    data: GetLessonResponse;
    myCourseData: MyCourse;
}

const MainInfoPanel = ({ data, myCourseData, ...props }: MainInfoPanelProps) => {
    const { classes } = useStyles({ status: data.lessonStatus.name });

    return (
        <Flex {...props} className={classes.root}>
            <Flex direction="column" gap={16}>
                <Badge className={classes.status}>{data.lessonStatus.displayName}</Badge>
                <Box>
                    <Paragraph variant="text-small-m">{myCourseData.name}</Paragraph>
                    <Heading>{data.name}</Heading>
                </Box>
                <Paragraph variant="small-m" color="gray45">
                    {data.description}
                </Paragraph>
                {/* //TODO: Добавить инфу о тесте и ДЗ */}
            </Flex>
            {/* //TODO: Добавить пагинацию между уроками как беки сделают это */}
        </Flex>
    );
};

export default MainInfoPanel;
