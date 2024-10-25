import { ActionIcon, Divider, Flex, Text } from "@mantine/core";
import { memo } from "react";
import { Info } from "react-feather";
import { ArticleCategoryFromList } from "@entities/article";
import { getPluralString } from "@shared/utils";
import { Paragraph, Tooltip } from "@shared/ui";
import useStyles from "./CategoryItem.styles";

export interface CategoryItemProps {
    data: ArticleCategoryFromList;
    onClick: (categoryId: number | null) => void;
}

const MemoizedCategoryItem = memo(function CategoryItem({ data, onClick }: CategoryItemProps) {
    const { classes } = useStyles();

    const handleClickItem = () => onClick(data.id);

    return (
        <Flex className={classes.root}>
            <Flex align="center" gap={8}>
                <Text className={classes.name}>{data.name}</Text>
                <Tooltip label="Подробнее о статьях">
                    <ActionIcon className={classes.iconLink} onClick={handleClickItem}>
                        <Info />
                    </ActionIcon>
                </Tooltip>
            </Flex>
            <Divider my="xs" sx={{ flex: 1 }} color="neutralMain50" variant="dashed" />
            <Paragraph variant="text-small-semi" className={classes.articlesCount}>{`${data.articlesCount} ${getPluralString(
                data.articlesCount,
                "статья",
                "статьи",
                "статей",
            )} `}</Paragraph>
        </Flex>
    );
});

export default MemoizedCategoryItem;
