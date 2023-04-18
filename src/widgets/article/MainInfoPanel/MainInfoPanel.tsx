import { Flex, FlexProps, Group, Text, ThemeIcon, Title } from "@mantine/core";
import { FileText, ThumbsDown, ThumbsUp } from "react-feather";
import { Button } from "@shared/ui";
import { GetArticleDetailResponse } from "@entities/article";
import { FavoriteButton } from "@features/articles";
import { Pagination, TagList } from "./components";
import useStyles from "./MainInfoPanel.styles";

export interface MainInfoPanelProps extends Omit<FlexProps, "children"> {
    articleData: GetArticleDetailResponse;
}

const MainInfoPanel = ({ articleData: { data }, ...props }: MainInfoPanelProps) => {
    const { classes } = useStyles();

    return (
        <Flex {...props} direction="column" className={classes.root}>
            <Group>
                <Group sx={{ flex: 1 }}>
                    <ThemeIcon variant="outline" className={classes.wrapperDocumentIcon}>
                        <FileText width={26} height={26} />
                    </ThemeIcon>
                    <Flex direction="column" gap={4}>
                        <Title order={1} color="dark">
                            {data.name}
                        </Title>
                        <Text className={classes.categoryName}>{data.category}</Text>
                    </Flex>
                </Group>
                <Flex gap={8}>
                    <Button className={classes.reactionButton} variant="text" leftIcon={<ThumbsUp />}>
                        {data.likesCount}
                    </Button>
                    <Button className={classes.reactionButton} variant="text" leftIcon={<ThumbsDown />}>
                        {data.dislikesCount}
                    </Button>
                    <FavoriteButton isFavorite={data.isFavorite} />
                </Flex>
            </Group>
            <TagList data={data.tags.data} />
            <Pagination />
        </Flex>
    );
};

export default MainInfoPanel;
