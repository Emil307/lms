import { ActionIcon, Divider, Flex, Text } from "@mantine/core";
import { memo } from "react";
import { Info } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { ArticleCategory } from "@entities/article";
import { getPluralString } from "@shared/utils";
import { Tooltip } from "@shared/ui";
import { ArticleListFromCategory } from "@features/articles";
import useStyles from "./CategoryItem.styles";

export interface CategoryItemProps {
    data: ArticleCategory;
}

const MemoizedCategoryItem = memo(function CategoryItem({ data }: CategoryItemProps) {
    const { classes } = useStyles();

    //TODO: Вызов модалки скорее всего нужно будет позднее вынести на уровни выше
    // тк сейчас feature импортирует feature
    const handleCloseModal = () => closeModal("CATEGORY_ARTICLE_LIST");

    const handleClickButton = () =>
        openModal({
            styles: { modal: { position: "relative" } },
            modalId: "CATEGORY_ARTICLE_LIST",
            title: data.name,
            centered: true,
            size: 456,
            children: <ArticleListFromCategory categoryId={data.id} onClose={handleCloseModal} />,
        });

    return (
        <Flex key={data.id} gap={24}>
            <Flex align="center" gap={8}>
                <Text className={classes.name}>{data.name}</Text>
                <Tooltip label="Подробнее о статьях">
                    <ActionIcon className={classes.iconLink} onClick={handleClickButton}>
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
