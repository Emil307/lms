import { Box, Divider, Flex, Spoiler as MSpoiler, Text, ThemeIcon } from "@mantine/core";
import { useEffect, useMemo, useRef, useState } from "react";
import { useEventListener, useTimeout } from "@mantine/hooks";
import { ChevronDown, ChevronUp } from "react-feather";
import { FieldArray } from "formik";
import { ArticleCategory, ArticleTag } from "@entities/article";
import { getPluralString } from "@shared/utils";
import { Button, Paragraph, Search } from "@shared/ui";
import useStyles from "./FilterList.styles";
import { DELAY_VISABILITY_FILTER_ICON, HEIGHT_CONTENT_INDENT, INITIAL_MAX_HEIGHT_SPOILER_CONTAINER } from "./constants";
import { FilterItem, FilterItemProps } from "./components";

export interface FilterListProps {
    field: FilterItemProps["field"];
    filterName: string;
    searchPlaceholder: string;
    labelsPluralString: [string, string, string];
    data?: ArticleCategory[] | ArticleTag[];
}

const FilterList = ({ field, filterName, searchPlaceholder, labelsPluralString, data }: FilterListProps) => {
    const spoilerRef = useRef<HTMLDivElement>(null);
    const spoilerContentRef = useRef<HTMLDivElement>(null);
    const [maxHeightSpoilerContainer, setMaxHeightSpoilerContainer] = useState(INITIAL_MAX_HEIGHT_SPOILER_CONTAINER);
    const [selectedFilterItemId, setSelectedFilterItemId] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const { start, clear } = useTimeout(() => setSelectedFilterItemId(null), DELAY_VISABILITY_FILTER_ICON);
    const { classes } = useStyles({ isOpen, hasSpoiler: (spoilerRef.current?.clientHeight ?? 0) > maxHeightSpoilerContainer });

    const spoilerControlRef = useEventListener("click", () => {
        spoilerRef.current?.children[0].scrollTo({ top: 0, behavior: "smooth" });
    });

    //Для определения высоты контента для компонента Spoiler для 5 элементов с отступами
    const getMaxHeightSpoilerContainer = async () => {
        const elements = Array.from(spoilerContentRef.current?.children || []);
        const firstFiveElements = elements.slice(0, 5);

        const heightIndents = (firstFiveElements.length - 1) * HEIGHT_CONTENT_INDENT;

        const heightElements = firstFiveElements.reduce((acc, currentElement) => {
            return acc + currentElement.clientHeight;
        }, 0);

        setMaxHeightSpoilerContainer(heightElements + heightIndents);
    };

    //Нужен для определения высоты контента для компонента Spoiler для 5 элементов с отступами
    //timeout - для того чтобы успевало просчитывать высоту элементов
    useEffect(() => {
        setTimeout(() => {
            getMaxHeightSpoilerContainer();
        }, 1);
    }, [data, spoilerContentRef.current]);

    const handleChangeSelectFilterItem = (itemId: number | null) => {
        clear();
        if (itemId) {
            start();
        }
        setSelectedFilterItemId(itemId);
    };

    const renderItems = useMemo(() => {
        const foundItems = data?.filter((item) => item.name.includes(searchValue));

        if (!foundItems?.length && searchValue) {
            return (
                <Paragraph variant="text-small-m" className={classes.notFound}>{`По запросу "${searchValue}" ничего не найдено`}</Paragraph>
            );
        }

        return foundItems?.map((item) => {
            const isSelected = selectedFilterItemId === item.id;

            return (
                <FilterItem key={item.id} data={item} field={field} selected={isSelected} onChangeSelected={handleChangeSelectFilterItem} />
            );
        });
    }, [searchValue, data, selectedFilterItemId, maxHeightSpoilerContainer]);

    const handleChangeOpen = () => setIsOpen((prev) => !prev);

    const showLabel = () => {
        const hiddenCountItems = data && data.length > 5 ? data.length - 5 : 0;
        return (
            <Flex gap={8} onClick={handleChangeOpen}>
                <Text className={classes.spoilerLabelText}>{`Еще ${hiddenCountItems} ${getPluralString(
                    hiddenCountItems,
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
