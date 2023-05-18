import { ActionIcon, Divider, Flex, Text } from "@mantine/core";
import { memo } from "react";
import { Info } from "react-feather";
import { ArticleCategory } from "@entities/article";
import { getPluralString } from "@shared/utils";
import { Tooltip } from "@shared/ui";
import useStyles from "./CategoryItem.styles";

export interface CategoryItemProps {
    data: ArticleCategory;
    onClick: (categoryId: number) => void;
}

const MemoizedCategoryItem = memo(function CategoryItem({ data, onClick }: CategoryItemProps) {
    const { classes } = useStyles();

    const handleClickItem = () => onClick(data.id);

    return (
        <Flex key={data.id} gap={24}>
            <Flex align="center" gap={8}>
                <Text className={classes.name}>{data.name}</Text>
                <Tooltip label="Подробнее о статьях">
                    <ActionIcon className={classes.iconLink} onClick={handleClickItem}>
                        <Info />
                    </ActionIcon>
                </Tooltip>
            </Flex>
            <Divider my="xs" sx={{ flex: 1 }} color="gray45" variant="dashed" />
            <Text className={classes.price}>{`${data.articlesCount} ${getPluralString(
                data.articlesCount,
                "статья",
                "статьи",
                "статей"
            )} `}</Text>
        </Flex>
    );
});

export default MemoizedCategoryItem;
