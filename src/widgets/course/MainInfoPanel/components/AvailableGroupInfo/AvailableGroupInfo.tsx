import { Flex, ThemeIcon } from "@mantine/core"
import dayjs from "dayjs"
import IconUsers from "public/icons/users.svg";
import { CourseDetails } from "@entities/course"
import { Paragraph } from "@shared/ui"
import IconCalendar from "public/icons/calendar.svg";
import useStyles from "./AvailableGroupInfo.styles"

interface AvailableGroupInfoProps {
    data: CourseDetails
}

const AvailableGroupInfo = ({ data }: AvailableGroupInfoProps) => {
    const { classes, cx } = useStyles()

    const renderFinishDate = () => {
        if (data.type === "autonomous") {
            return (
                <Paragraph variant="text-small-m">{`Доступ: до ${dayjs(data.availableGroup?.educationFinishDate).format(
                    "D MMMM YYYY",
                )}`}</Paragraph>
            );
        }
        return <Paragraph variant="text-small-m">Свободное прохождение</Paragraph>
    }

    const renderFreePlaces = () => {
        if (data.type === "interactive" || !data.availableGroup?.freePlacesCount) {
            return null
        }
        return (
            <Flex align="center" gap={6}>
                <ThemeIcon className={classes.icon}>
                    <IconUsers />
                </ThemeIcon>
                <Paragraph variant="text-small-m">Мест осталось: {data.availableGroup.freePlacesCount}</Paragraph>
            </Flex>
        )
    }

    return (
        <Flex className={classes.availableGroupInfoContainer}>
            <Flex align="center" gap={6}>
                <ThemeIcon className={cx(classes.icon, classes.iconCalendar)}>
                    <IconCalendar />
                </ThemeIcon>
                {renderFinishDate()}
            </Flex>
            {renderFreePlaces()}
        </Flex>
    )

}

export default AvailableGroupInfo
