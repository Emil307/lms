import { Flex } from "@mantine/core";
import { Heading, Paragraph } from "@shared/ui";
import { CourseDetails } from "@entities/course";
import useStyles from "./AboutCourseInfo.styles";
import { getCourseInfoList } from "./utils";

export interface AboutCourseInfoProps {
    data: CourseDetails;
}
/**
    Deprecated
 */
const AboutCourseInfo = ({ data }: AboutCourseInfoProps) => {
    const { classes } = useStyles();

    const renderAboutCourse = () =>
        getCourseInfoList(data).map((item) => (
            <Flex key={item.id} direction="column" gap={2}>
                <Paragraph variant="text-small-m" color="neutralMain50">
                    {item.label}
                </Paragraph>
                <Paragraph variant="text-small-m">{item.value}</Paragraph>
            </Flex>
        ));

    return (
        <Flex className={classes.root}>
            <Heading order={3} w={136}>
                О курсе
            </Heading>
            <Flex className={classes.aboutInfoList}>{renderAboutCourse()}</Flex>
        </Flex>
    );
};

export default AboutCourseInfo;
