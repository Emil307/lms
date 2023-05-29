import { Box, Divider, Flex, Spoiler as MSpoiler, Text, ThemeIcon } from "@mantine/core";
import { ChangeEvent, useRef, useState } from "react";
import { useEventListener } from "@mantine/hooks";
import { ChevronDown, ChevronUp } from "react-feather";
import { FieldArray, FormikProps } from "formik";
import { getPluralString } from "@shared/utils";
import { Button, Checkbox, Search } from "@shared/ui";
import { CourseSubCategory, CourseTag, CoursesFiltersForm } from "@entities/course";
import useStyles from "./FilterList.styles";

export interface FilterListProps {
    field: "tags" | "subcategoryIds";
    filterName: string;
    searchPlaceholder: string;
    labelsPluralString: [string, string, string];
    data?: CourseTag[] | CourseSubCategory[];
}

const FilterList = ({ field, filterName, searchPlaceholder, labelsPluralString, data }: FilterListProps) => {
    const spoilerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const { classes } = useStyles({ isOpen });

    const spoilerControlRef = useEventListener("click", () => {
        spoilerRef.current?.children[0].scrollTo({ top: 0, behavior: "smooth" });
    });

    const handleChangeOpen = () => setIsOpen((prev) => !prev);

    const showLabel = () => {
        const hiddenCountCourse = data ? data.length - 3 : 0;
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

    const renderItems = (form: FormikProps<CoursesFiltersForm>) =>
        data
            ?.filter((item) => item.name.includes(searchValue))
            .map((item) => {
                const isChecked = !![...form.values[field]].find((value) => value === item.id.toString());

                const handleChange = (newValue: ChangeEvent<HTMLInputElement>) => {
                    if (newValue.target.checked) {
                        const array = [...form.values[field]];

                        array.push(String(item.id));
                        return form.setFieldValue(field, array);
                    }

                    form.setFieldValue(
                        field,
                        [...form.values[field]].filter((value) => value === item.id.toString())
                    );
                };
                return <Checkbox key={item.id} checked={isChecked} onChange={handleChange} label={item.name} />;
            });

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
