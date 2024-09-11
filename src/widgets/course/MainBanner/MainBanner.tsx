import { Box, BoxProps, Flex } from "@mantine/core";
import Image from "next/image";
import { CourseDetails } from "@entities/course";
import RatingInfo from "@widgets/course/MainBanner/components/RatingInfo/RatingInfo";
import useStyles from "./MainBanner.styles";

export interface MainBannerProps extends Omit<BoxProps, "children"> {
    data: CourseDetails;
}
const MainBanner = ({ data, ...props }: MainBannerProps) => {
    const { classes } = useStyles();
    return (
        <Flex {...props} justify="center" pos="relative">
            <Box className={classes.image}>
                {data.cover && <Image src={data.cover.absolutePath} fill sizes="100vw" alt={data.cover.name} />}
            </Box>
            <Flex className={classes.iconPosition}>
                <RatingInfo data={data.rating}></RatingInfo>
            </Flex>
        </Flex>
    );
};

export default MainBanner;
