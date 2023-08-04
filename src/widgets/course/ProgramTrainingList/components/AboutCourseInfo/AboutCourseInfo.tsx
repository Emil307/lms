import { Flex, Group } from "@mantine/core";
import { Heading, Paragraph } from "@shared/ui";
import { GetCourseResponse } from "@entities/course";
import useStyles from "./AboutCourseInfo.styles";
import { getCourseInfoList } from "./utils";

export interface AboutCourseInfoProps {
    data: GetCourseResponse;
}

const AboutCourseInfo = ({ data }: AboutCourseInfoProps) => {
    const { classes } = useStyles();

    const renderAboutCourse = () =>
        getCourseInfoList(data).map((item, index) => (
            <Flex key={index} direction="column" gap={2}>
                <Paragraph variant="text-small-m" color="gray45">
                    {item.label}
                </Paragraph>
                <Paragraph variant="text-small-m">{item.value}</Paragraph>
            </Flex>
        ));

    return (
        <Group className={classes.root}>
            <Heading order={3} w={136}>
                О курсе
            </Heading>
            {renderAboutCourse()}
        </Group>
    );
};

export default AboutCourseInfo;
