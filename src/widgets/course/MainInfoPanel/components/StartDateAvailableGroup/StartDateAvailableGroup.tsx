import { Flex, ThemeIcon } from "@mantine/core";
import dayjs from "dayjs";
import { CourseDetails } from "@entities/course";
import { Paragraph } from "@shared/ui";
import IconCalendar from "public/icons/calendar.svg";
import useStyles from "./StartDateAvailableGroup.styles";

export interface StartDateAvailableGroupProps {
    data: CourseDetails;
}

const StartDateAvailableGroup = ({ data }: StartDateAvailableGroupProps) => {
    const { classes } = useStyles();

    const renderStartDate = () => {
        if (data.type === "interactive") {
            return (
                <Paragraph variant="text-small-m">{`Доступ: до ${dayjs(data.availableGroup?.educationStartDate).format(
                    "D MMMM YYYY"
                )}`}</Paragraph>
            );
        }
        return <Paragraph variant="text-small-m">Свободное прохождение</Paragraph>;
    };

    return (
        <Flex className={classes.root}>
            <ThemeIcon className={classes.icon}>
                <IconCalendar />
            </ThemeIcon>
            {renderStartDate()}
        </Flex>
    );
};

export default StartDateAvailableGroup;
