import { BoxProps, Flex } from "@mantine/core";
import dayjs from "dayjs";
import { CourseDetails } from "@entities/course";
import { getPlaceWord } from "@widgets/course/MainInfoPanel/components/utils";
import useStyles from "./AvailableGroupInfo.styles";
import { AvailableGroupInfoBadge } from "./components";

interface AvailableGroupInfoProps extends Omit<BoxProps, "children"> {
    data: CourseDetails;
    grayColor?: boolean;
}

const AvailableGroupInfo = ({ data, grayColor, ...props }: AvailableGroupInfoProps) => {
    const { classes } = useStyles();

    const renderFinishDate = () => {
        if (data.type === "autonomous" && data.availableGroup?.educationStartDate) {
            return (
                <AvailableGroupInfoBadge
                    grayColor={grayColor}
                    title={`Стартует ${dayjs(data.availableGroup.educationStartDate).format("D MMMM")}`}
                />
            );
        }
        return <AvailableGroupInfoBadge grayColor={grayColor} title="Свободное прохождение" />;
    };

    const renderFreePlaces = () => {
        if (data.type === "interactive" || !data.availableGroup?.freePlacesCount) {
            return null;
        }
        const freePlacesCount = data.availableGroup.freePlacesCount;
        const placeWord = getPlaceWord(freePlacesCount);

        return <AvailableGroupInfoBadge title={`Осталось ${freePlacesCount} ${placeWord}`} />;
    };

    return (
        <Flex {...props} className={classes.availableGroupInfoContainer}>
            {renderFinishDate()}
            <AvailableGroupInfoBadge grayColor={grayColor} title={data.duration} />
            {renderFreePlaces()}
        </Flex>
    );
};

export default AvailableGroupInfo;
