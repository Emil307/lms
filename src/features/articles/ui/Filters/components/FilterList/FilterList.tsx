import { Box, Divider, Flex, Spoiler as MSpoiler, Text, ThemeIcon } from "@mantine/core";
import { ChangeEvent, Ref, useEffect, useRef, useState } from "react";
import { useEventListener, useIntersection } from "@mantine/hooks";
import { ChevronDown, ChevronUp } from "react-feather";
import { FieldArray, FormikProps } from "formik";
import { ArticleCategoryFilters, ArticleFilter } from "@entities/article";
import { getPluralString, TPaginationResponse } from "@shared/utils";
import { Button, Checkbox, Search } from "@shared/ui";
import useStyles from "./FilterList.styles";

export interface FilterListProps {
    field: "tags" | "subCategories";
    filterName: string;
    searchPlaceholder: string;
    showLabelPluralString: { one: string; two: string; five: string };
    filterData: TPaginationResponse<ArticleFilter[]>;
    onLoad: (nextUrl: string) => void;
}

const FilterList = ({ field, filterName, searchPlaceholder, showLabelPluralString, filterData, onLoad }: FilterListProps) => {
    const spoilerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const { ref: lastElemRef, entry } = useIntersection();
    const { classes } = useStyles({ isOpen });

    const spoilerControlRef = useEventListener("click", () => {
        setIsOpen((prev) => !prev);
        spoilerRef.current?.children[0].scrollTo({ top: 0, behavior: "smooth" });
    });

    useEffect(() => {
        if (entry?.isIntersecting && filterData.meta.pagination.links.next) {
            onLoad(filterData.meta.pagination.links.next);
        }
    }, [entry]);

    const showLabel = () => {
        const hiddenCountCourse = filterData.meta.pagination.total - 3;
        return (
            <Flex gap={8}>
                <Text className={classes.spoilerLabelText}>{`Еще ${hiddenCountCourse} ${getPluralString(
                    hiddenCountCourse,
                    showLabelPluralString.one,
                    showLabelPluralString.two,
                    showLabelPluralString.five
                )}`}</Text>
                <ThemeIcon variant="outline" color="dark" sx={{ border: "none" }}>
                    <ChevronDown />
                </ThemeIcon>
            </Flex>
        );
    };

    const hideLabel = (
        <Flex gap={8}>
            <Text className={classes.spoilerLabelText}>Свернуть</Text>
            <ThemeIcon variant="outline" color="dark" sx={{ border: "none" }}>
                <ChevronUp />
            </ThemeIcon>
        </Flex>
    );

    const renderItems = (form: FormikProps<ArticleCategoryFilters>) =>
        filterData.data.map((item, index) => {
            const isChecked = form.values[field]?.findIndex((value) => value === item.name + index) !== -1;
            const handleChange = (newValue: ChangeEvent<HTMLInputElement>) => {
                if (newValue.target.checked) {
                    const array = form.values[field];
                    array?.push(item.name + index);
                    return form.setFieldValue(field, array);
                }
                form.setFieldValue(
                    field,
                    form.values[field]?.filter((value) => value !== item.name + index)
                );
            };
            return (
                <Box key={item.id} ref={lastElemRef as Ref<HTMLDivElement>}>
                    <Checkbox checked={isChecked} onChange={handleChange} label={item.name + index} />
                </Box>
            );
        });

    return (
        <FieldArray name={field}>
            {({ form }) => {
                const handleReset = () => {
                    setSearchValue("");
                    form.setFieldValue(field, []);
                };
                return (
                    <Box>
                        <Text className={classes.filterName}>{filterName}</Text>
                        <Flex direction="column" gap={16} sx={{ position: "relative" }}>
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
                                maxHeight={152}
                                showLabel={showLabel()}
                                hideLabel={hideLabel}>
                                <Flex direction="column" gap={8}>
                                    {renderItems(form)}
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
