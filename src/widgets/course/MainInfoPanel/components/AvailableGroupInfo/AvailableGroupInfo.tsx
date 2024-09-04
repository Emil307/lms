import { Flex } from "@mantine/core";
import dayjs from "dayjs";
import { CourseDetails } from "@entities/course";
import { Paragraph } from "@shared/ui";
import useStyles from "./AvailableGroupInfo.styles";

interface AvailableGroupInfoProps {
    data: CourseDetails;
    grayColor?: boolean;
}

const AvailableGroupInfo = ({ data, grayColor }: AvailableGroupInfoProps) => {
    const { classes } = useStyles({ grayColor });

    const renderFinishDate = () => {
        if (data.type === "autonomous") {
            return (
                <Flex className={classes.groupInfoButton}>
                    <Paragraph variant="text-small-m" color="gray45">{`Стартует ${dayjs(data.availableGroup?.educationFinishDate).format(
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
        return (
            <Flex align="center" gap={6} className={classes.groupInfoButton}>
                <Paragraph variant="text-small-m" color="gray45">
                    Осталось {data.availableGroup.freePlacesCount} места
                </Paragraph>
            </Flex>
        );
    };

    return (
        <Flex className={classes.availableGroupInfoContainer}>
            <Flex align="center" gap={6}>
                {renderFinishDate()}
            </Flex>
            {renderFreePlaces()}
        </Flex>
    );
};

export default AvailableGroupInfo;
