import { Box, Divider, Flex, Spoiler as MSpoiler, Text, ThemeIcon } from "@mantine/core";
import { ChangeEvent, useRef, useState } from "react";
import { useEventListener } from "@mantine/hooks";
import { ChevronDown, ChevronUp } from "react-feather";
import { FieldArray, FormikProps } from "formik";
import { AdminArticleCategory, AdminArticleTag, ArticleCategoryFilters } from "@entities/article";
import { getPluralString } from "@shared/utils";
import { Button, Checkbox, Search } from "@shared/ui";
import useStyles from "./FilterList.styles";

export interface FilterListProps {
    field: "tags" | "subcategories";
    filterName: string;
    searchPlaceholder: string;
    labelsPluralString: [string, string, string];
    filterData: AdminArticleCategory[] | AdminArticleTag[];
}

const FilterList = ({ field, filterName, searchPlaceholder, labelsPluralString, filterData }: FilterListProps) => {
    const spoilerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const { classes } = useStyles({ isOpen });

    const spoilerControlRef = useEventListener("click", () => {
        spoilerRef.current?.children[0].scrollTo({ top: 0, behavior: "smooth" });
    });

    const handleChangeOpen = () => setIsOpen((prev) => !prev);

    const showLabel = () => {
        const hiddenCountCourse = filterData.length - 3;
        return (
            <Flex gap={8} onClick={handleChangeOpen}>
                <Text className={classes.spoilerLabelText}>{`Еще ${hiddenCountCourse} ${getPluralString(
                    hiddenCountCourse,
                    ...labelsPluralString
                )}`}</Text>
                <ThemeIcon variant="outline" color="dark" sx={{ border: "none" }}>
                    <ChevronDown />
                </ThemeIcon>
            </Flex>
        );
    };

    const hideLabel = (
        <Flex gap={8} onClick={handleChangeOpen}>
            <Text className={classes.spoilerLabelText}>Свернуть</Text>
            <ThemeIcon variant="outline" color="dark" sx={{ border: "none" }}>
                <ChevronUp />
            </ThemeIcon>
        </Flex>
    );

    const renderItems = (form: FormikProps<ArticleCategoryFilters>) =>
        filterData.map((item, index) => {
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
            return <Checkbox key={item.id} checked={isChecked} onChange={handleChange} label={item.name + index} />;
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
