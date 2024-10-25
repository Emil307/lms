import { Badge, Box, BoxProps, Flex, Group } from "@mantine/core";
import { CourseDetails } from "@entities/course";
import { Button, Heading, Paragraph } from "@shared/ui";
import { FavoriteButton } from "@features/courses";
import useStyles from "./MainInfoPanel.styles";
import { AvailableGroupInfo, DiscountInfo } from "./components";
import ModulesInfo from "./components/ModulesInfo/ModulesInfo";

export interface MainInfoPanelProps extends Omit<BoxProps, "children"> {
    data: CourseDetails;
}

const MainInfoPanel = ({ data, ...props }: MainInfoPanelProps) => {
    const { classes } = useStyles();

    const scrollToBuyCourse = () => {
        const element = document.getElementById("buy-course-block");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <Box {...props} className={classes.root}>
            <Flex className={classes.contentBody}>
                <Flex className={classes.contentBodyLeftContainer}>
                    <Flex className={classes.contentBodyTextContainer}>
                        <Group>
                            <Flex gap={8} hidden={!data.category && !data.discount}>
                                <DiscountInfo discount={data.discount} discountPrice={data.discountPrice} fullPrice={data.price} />
                                <Badge className={classes.category} hidden={!data.category}>
                                    {data.category?.name}
                                </Badge>
                            </Flex>
                        </Group>
                    </Flex>
                    <Box w="100%">
                        <Flex direction="column" gap={16} w="100%">
                            <Heading className={classes.title}>{data.name}</Heading>
                            <Paragraph variant="large" className={classes.description}>
                                {data.shortDescription}
                            </Paragraph>
                        </Flex>
                        <Flex className={classes.getCourseWrapper}>
                            <Flex gap={16} align="center">
                                <Button
                                    variant="primary"
                                    disabled={!data.availableGroup?.freePlacesCount}
                                    onClick={scrollToBuyCourse}
                                    className={classes.getCourseButton}>
                                    Получить курс
                                </Button>
                                <FavoriteButton data={data} className={classes.favoriteActionIcon} />
                            </Flex>
                            <Paragraph variant="text-small-m" color="neutralMain50" className={classes.getCourseDescription}>
                                Начните обучение <br /> прямо сейчас!
                            </Paragraph>
                        </Flex>
                        <Flex pt={24}>
                            <AvailableGroupInfo data={data} />
                        </Flex>
                    </Box>
                </Flex>
            </Flex>
            <ModulesInfo data={data} />
        </Box>
    );
};

export default MainInfoPanel;
