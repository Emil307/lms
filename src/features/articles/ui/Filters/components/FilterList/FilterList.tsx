import { Box, Divider, Flex, Spoiler as MSpoiler, Text, ThemeIcon } from "@mantine/core";
import { useEffect, useMemo, useRef, useState } from "react";
import { useEventListener } from "@mantine/hooks";
import { ChevronDown, ChevronUp } from "react-feather";
import { FieldArray } from "formik";
import { ArticleCategory, ArticleTag } from "@entities/article";
import { getPluralString } from "@shared/utils";
import { Button, Paragraph, Search } from "@shared/ui";
import useStyles from "./FilterList.styles";
import { HEIGHT_CONTENT_INDENT } from "./constants";
import { FilterItem } from "./components";

export interface FilterListProps {
    field: "tags" | "subcategoryIds";
    filterName: string;
    searchPlaceholder: string;
    labelsPluralString: [string, string, string];
    data?: ArticleCategory[] | ArticleTag[];
}

const FilterList = ({ field, filterName, searchPlaceholder, labelsPluralString, data }: FilterListProps) => {
    const spoilerRef = useRef<HTMLDivElement>(null);
    const spoilerContentRef = useRef<HTMLDivElement>(null);
    const [maxHeightSpoilerContainer, setMaxHeightSpoilerContainer] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const { classes } = useStyles({ isOpen, hasSpoiler: (spoilerRef.current?.clientHeight ?? 0) > maxHeightSpoilerContainer });

    const spoilerControlRef = useEventListener("click", () => {
        spoilerRef.current?.children[0].scrollTo({ top: 0, behavior: "smooth" });
    });

    //Нужен для определения высоты контента для компонента Spoiler для 5 элементов с отступами
    useEffect(() => {
        const elements = Array.from(spoilerContentRef.current?.children || []);
        const firstFiveElements = elements.slice(0, 5);

        const heightIndents = (firstFiveElements.length - 1) * HEIGHT_CONTENT_INDENT;

        const heightElements = firstFiveElements.reduce((acc, currentElement) => {
            return acc + currentElement.clientHeight;
        }, 0);

        setMaxHeightSpoilerContainer(heightElements + heightIndents);
    }, [data]);

    const renderItems = useMemo(() => {
        const foundItems = data?.filter((item) => item.name.includes(searchValue));

        if (!foundItems?.length && searchValue) {
            return (
                <Paragraph variant="text-small-m" className={classes.notFound}>{`По запросу "${searchValue}" ничего не найдено`}</Paragraph>
            );
        }

        return foundItems?.map((item) => <FilterItem key={item.id} data={item} field={field} />);
    }, [searchValue, data, maxHeightSpoilerContainer]);

    const handleChangeOpen = () => setIsOpen((prev) => !prev);

    const showLabel = () => {
        const hiddenCountCourse = data ? data.length - 5 : 0;
        return (
            <Flex gap={8} onClick={handleChangeOpen}>
                <Text className={classes.spoilerLabelText}>{`Еще ${hiddenCountCourse} ${getPluralString(
                    hiddenCountCourse,
                    ...labelsPluralString
                )}`}</Text>
                <ThemeIcon color="dark">
                    <ChevronDown />
                </ThemeIcon>
            </Flex>
        );
    };

    const hideLabel = (
        <Flex gap={8} onClick={handleChangeOpen}>
            <Text className={classes.spoilerLabelText}>Свернуть</Text>
            <ThemeIcon color="dark">
                <ChevronUp />
            </ThemeIcon>
        </Flex>
    );

    if (!data?.length) {
        return null;
    }

    return (
        <FieldArray name={field}>
            {({ form }) => {
                const handleReset = () => {
                    setSearchValue("");
                    form.setFieldValue(field, []);
                    form.handleSubmit();
                };
                return (
                    <Box>
                        <Text className={classes.filterName}>{filterName}</Text>
                        <Flex className={classes.filterContainer}>
                            {isOpen && (
                                <>
                                    <Search
                                        styleVariant="course"
                                        placeholder={searchPlaceholder}
                                        value={searchValue}
                                        setValue={setSearchValue}
                                    />
                                    <Divider color="gray20" />
                                </>
                            )}

                            <MSpoiler
                                ref={spoilerRef}
                                classNames={classes}
                                controlRef={spoilerControlRef}
                                maxHeight={maxHeightSpoilerContainer}
                                showLabel={showLabel()}
                                hideLabel={hideLabel}>
                                <Flex ref={spoilerContentRef} direction="column" gap={HEIGHT_CONTENT_INDENT}>
                                    {renderItems}
                                </Flex>
                            </MSpoiler>
                            {!!form.values[field]?.length && (
                                <Button className={classes.resetButton} type="button" variant="text" onClick={handleReset}>
                                    Сбросить
                                </Button>
                            )}
                        </Flex>
                    </Box>
                );
            }}
        </FieldArray>
    );
};

export default FilterList;
