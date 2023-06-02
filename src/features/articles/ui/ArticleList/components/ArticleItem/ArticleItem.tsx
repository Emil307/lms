import { Flex, FlexProps, ThemeIcon, Text, Group, Title, ActionIcon } from "@mantine/core";
import { memo } from "react";
import { FileText, Heart, Lock, ThumbsDown, ThumbsUp } from "react-feather";
import { useRouter } from "next/router";
import { ArticleFromList } from "@entities/article";
import { Button } from "@shared/ui";
import useStyles from "./ArticleItem.styles";

export interface ArticleItemProps extends FlexProps {
    data: ArticleFromList;
}

const MemoizedArticleItem = memo(function ArticleItem({ data, ...props }: ArticleItemProps) {
    const router = useRouter();
    const { classes } = useStyles({ isAvailable: data.isAvailable, isFavorite: data.isFavorite });

    const handleFavorite = () => undefined;

    const openArticle = () => router.push({ pathname: "/articles/favorite/[articleId]", query: { articleId: String(data.id) } });

    return (
        <Flex {...props} className={classes.root} onClick={openArticle}>
            <Group sx={{ flex: 1 }}>
                <ThemeIcon variant="outline" className={classes.wrapperDocumentIcon}>
                    {data.isAvailable ? <FileText width={24} height={24} /> : <Lock width={24} height={24} />}
                </ThemeIcon>
                <Flex direction="column" gap={2}>
                    <Title order={4} color="dark">
                        {data.name}
                    </Title>
                    <Text className={classes.categoryName}>{data.category.name}</Text>
                </Flex>
            </Group>
            <Flex gap={8}>
                <Button className={classes.reactionButton} variant="text" leftIcon={<ThumbsUp />} disabled={!data.isAvailable}>
                    {data.likesCount}
                </Button>
                <Button className={classes.reactionButton} variant="text" leftIcon={<ThumbsDown />} disabled={!data.isAvailable}>
                    {data.dislikesCount}
                </Button>
                {data.isAvailable && (
                    <ActionIcon className={classes.favoriteActionIcon} onClick={handleFavorite}>
                        <Heart />
                    </ActionIcon>
                )}
            </Flex>
        </Flex>
    );
});

export default MemoizedArticleItem;
