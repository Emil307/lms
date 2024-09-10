import { BoxProps, Flex } from "@mantine/core";
import dayjs from "dayjs";
import { CourseDetails } from "@entities/course";
import { Paragraph } from "@shared/ui";
import { getPlaceWord } from "@widgets/course/MainInfoPanel/components/utils";
import useStyles from "./AvailableGroupInfo.styles";

interface AvailableGroupInfoProps extends Omit<BoxProps, "children"> {
    data: CourseDetails;
    grayColor?: boolean;
}

const AvailableGroupInfo = ({ data, grayColor, ...props }: AvailableGroupInfoProps) => {
    const { classes } = useStyles({ grayColor });

    const renderFinishDate = () => {
        if (data.type === "autonomous") {
            return (
                <Flex className={classes.groupInfoButton}>
                    <Paragraph variant="text-small-m" color="gray45">{`Стартует ${dayjs(data.availableGroup?.educationStartDate).format(
                        "D MMMM"
                    )}`}</Paragraph>
                </Flex>
            );
        }
        return <Paragraph variant="text-small-m">Свободное прохождение</Paragraph>;
    };

    const renderFreePlaces = () => {
        if (data.type === "interactive" || !data.availableGroup?.freePlacesCount) {
            return null;
        }
        const freePlacesCount = data.availableGroup.freePlacesCount;
        const placeWord = getPlaceWord(freePlacesCount);

        return (
            <Flex align="center" gap={6} className={classes.groupInfoButton}>
                <Paragraph variant="text-small-m" color="gray45">
                    Осталось {freePlacesCount} {placeWord}
                </Paragraph>
            </Flex>
        );
    };

    const renderDuration = () => {
        if (!data.duration) {
            return null;
        }
        return (
            <Flex align="center" gap={6} className={classes.groupInfoButton}>
                <Paragraph variant="text-small-m" color="gray45">
                    {data.duration}
                </Paragraph>
            </Flex>
        );
    };

    return (
        <Flex {...props} className={classes.availableGroupInfoContainer}>
            <Flex align="center" gap={6}>
                {renderFinishDate()}
            </Flex>
            <Flex align="center" gap={6}>
                {renderDuration()}
            </Flex>
            {renderFreePlaces()}
        </Flex>
    );
};

export default AvailableGroupInfo;
