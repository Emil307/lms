import { Box, Divider, Flex, Spoiler as MSpoiler } from "@mantine/core";
import { useEffect, useMemo, useRef, useState } from "react";
import { useEventListener } from "@mantine/hooks";
import { ChevronDown, ChevronUp } from "react-feather";
import { FieldArray } from "formik";
import { getPluralString } from "@shared/utils";
import { Button, Paragraph, Search } from "@shared/ui";
import { CourseCategory, CourseTag } from "@entities/course";
import { HEIGHT_CONTENT_INDENT } from "./constants";
import useStyles from "./FilterList.styles";
import { FilterItem, FilterItemProps } from "./components";

export interface FilterListProps {
    field: FilterItemProps["field"];
    filterName: string;
    searchPlaceholder: string;
    labelsPluralString: [string, string, string];
    data?: CourseTag[] | CourseCategory[];
}

const FilterList = ({ field, filterName, searchPlaceholder, labelsPluralString, data }: FilterListProps) => {
    const spoilerRef = useRef<HTMLDivElement>(null);
    const spoilerContentRef = useRef<HTMLDivElement>(null);
    const [maxHeightSpoilerContainer, setMaxHeightSpoilerContainer] = useState(152);
    const [selectedFilterItem, setSelectedFilterItem] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
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

    const renderItems = useMemo(() => {
        const foundItems = data?.filter((item) => item.name.includes(searchValue));

        if (!foundItems?.length && searchValue) {
            return <Paragraph variant="text-small-m" color="gray45" pb={16}>{`По запросу "${searchValue}" ничего не найдено`}</Paragraph>;
        }

        return foundItems?.map((item) => {
            const isSelected = selectedFilterItem === item.id;
            return <FilterItem key={item.id} data={item} field={field} selected={isSelected} onChangeSelected={setSelectedFilterItem} />;
        });
    }, [searchValue, data, selectedFilterItem, maxHeightSpoilerContainer]);

    const handleChangeOpen = () => setIsOpen((prev) => !prev);

    const showLabel = () => {
        const hiddenCountItems = data && data.length > 5 ? data.length - 5 : 0;
        return (
            <Button variant="text" rightIcon={<ChevronDown />} size="small" onClick={handleChangeOpen}>
                {`Еще ${hiddenCountItems} ${getPluralString(hiddenCountItems, ...labelsPluralString)}`}
            </Button>
        );
    };

    const hideLabel = (
        <Button variant="text" rightIcon={<ChevronUp />} size="small" onClick={handleChangeOpen}>
            Свернуть
        </Button>
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
                };
                return (
                    <Box>
                        <Paragraph variant="text-small-semi" mb={16}>
                            {filterName}
                        </Paragraph>
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
