import { Flex, Spoiler as MSpoiler, SpoilerProps as SpoilerProps, Text, ThemeIcon } from "@mantine/core";
import { useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { useEventListener } from "@mantine/hooks";
import { ArticlePackage } from "@entities/article";
import useStyles from "./CategoryListFromPackage.styles";
import { CategoryItem } from "./components";

export interface CategoryListFromPackageProps extends Omit<SpoilerProps, "children" | "maxHeight" | "hideLabel" | "showLabel"> {
    data: ArticlePackage;
}

//TODO: Пока просто отображает список без пагинации
const CategoryListFromPackage = ({ data, ...props }: CategoryListFromPackageProps) => {
    const spoilerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const spoilerControlRef = useEventListener("click", () => {
        setIsOpen((prev) => !prev);
        spoilerRef.current?.children[0].scrollTo({ top: 0, behavior: "smooth" });
    });

    const { classes } = useStyles({ isOpen });

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
        () => data.categories.data.map((category) => <CategoryItem key={category.id} data={category} />),
        [data.categories.data]
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
