import { Flex, Spoiler as MSpoiler, SpoilerProps as SpoilerProps, Text, ThemeIcon } from "@mantine/core";
import { useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { useEventListener } from "@mantine/hooks";
import { closeModal, openModal } from "@mantine/modals";
import { ArticlePackageFromList } from "@entities/articlePackage";
import { ArticleListFromCategory } from "@features/articlePackages";
import { CategoryItem } from "./components";
import useStyles from "./CategoryListFromPackage.styles";

export interface CategoryListFromPackageProps extends Omit<SpoilerProps, "children" | "maxHeight" | "hideLabel" | "showLabel"> {
    data: ArticlePackageFromList;
}

const CategoryListFromPackage = ({ data, ...props }: CategoryListFromPackageProps) => {
    const spoilerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const { classes } = useStyles({ isOpen });

    const spoilerControlRef = useEventListener("click", () => {
        setIsOpen((prev) => !prev);
        spoilerRef.current?.children[0].scrollTo({ top: 0, behavior: "smooth" });
    });

    const handleCloseModal = () => closeModal("CATEGORY_ARTICLE_LIST");

    const handleClickItem = (categoryId: number | null) =>
        openModal({
            styles: { modal: { position: "relative" } },
            modalId: "CATEGORY_ARTICLE_LIST",
            title: data.name,
            centered: true,
            size: 456,
            children: <ArticleListFromCategory categoryId={categoryId} articlePackageId={data.id} onClose={handleCloseModal} />,
        });

    const showLabel = (
        <Flex align="center" gap={8}>
            <Text className={classes.spoilerLabelText}>Показать еще</Text>
            <ThemeIcon variant="outline" color="dark" sx={{ border: "none" }}>
                <ChevronDown />
            </ThemeIcon>
        </Flex>
    );

    const hideLabel = (
        <Flex align="center" gap={8}>
            <Text className={classes.spoilerLabelText}>Свернуть</Text>
            <ThemeIcon variant="outline" color="dark" sx={{ border: "none" }}>
                <ChevronUp />
            </ThemeIcon>
        </Flex>
    );

    const renderCategories = useMemo(
        () => data.categories.map((category) => <CategoryItem key={category.id} data={category} onClick={handleClickItem} />),
        [data.categories]
    );

    return (
        <MSpoiler
            {...props}
            ref={spoilerRef}
            classNames={classes}
            controlRef={spoilerControlRef}
            maxHeight={56}
            showLabel={showLabel}
            hideLabel={hideLabel}>
            <Flex direction="column" gap={8}>
                {renderCategories}
            </Flex>
        </MSpoiler>
    );
};

export default CategoryListFromPackage;
