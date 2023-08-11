import { Flex, ThemeIcon } from "@mantine/core";
import dayjs from "dayjs";
import { Paragraph } from "@shared/ui";
import IconCalendar from "public/icons/calendar.svg";
import { CourseFromList } from "@entities/course";
import useStyles from "./StartDateBlock.styles";

export interface StartDateBlockProps {
    data: CourseFromList;
}

const StartDateBlock = ({ data }: StartDateBlockProps) => {
    const { classes } = useStyles();

    const renderStartDate = () => {
        if (data.type === "autonomous") {
            return (
                <Paragraph variant="text-small-m">{`Начало: ${
                    data.availableGroup?.educationStartDate ? dayjs(data.availableGroup.educationStartDate).format("D MMMM YYYY") : "-"
                }`}</Paragraph>
            );
        }
        return <Paragraph variant="text-small-m">Свободное прохождение</Paragraph>;
    };

    return (
        <Flex gap={8} align="center">
            <ThemeIcon className={classes.wrapperCalendarIcon}>
                <IconCalendar />
            </ThemeIcon>
            {renderStartDate()}
        </Flex>
    );
};

export default StartDateBlock;
