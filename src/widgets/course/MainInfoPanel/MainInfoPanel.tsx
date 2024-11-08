import { Badge, Box, BoxProps, Flex, Group, Stack } from "@mantine/core";
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
            <Stack spacing={48}>
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
                            <Stack spacing={24}>
                                <Stack spacing={32}>
                                    <Flex direction="column" gap={16} w="100%">
                                        <Heading order={1} color="dark">
                                            {data.name}
                                        </Heading>
                                        <Heading order={3} color="darkHover">
                                            {data.shortDescription}
                                        </Heading>
                                    </Flex>
                                    <Flex gap={16} align="center">
                                        <Button
                                            variant="primary"
                                            size="large"
                                            disabled={!data.availableGroup?.freePlacesCount}
                                            onClick={scrollToBuyCourse}>
                                            Получить курс
                                        </Button>
                                        <FavoriteButton data={data} className={classes.favoriteActionIcon} />
                                        <Paragraph variant="small-m" color="neutralMain50">
                                            Начните обучение <br /> прямо сейчас!
                                        </Paragraph>
                                    </Flex>
                                </Stack>
                                <AvailableGroupInfo data={data} />
                            </Stack>
                        </Box>
                    </Flex>
                </Flex>
                <ModulesInfo data={data} />
            </Stack>
        </Box>
    );
};

export default MainInfoPanel;
