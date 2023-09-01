import { Box, Divider, Flex, Spoiler as MSpoiler } from "@mantine/core";
import { ChangeEvent, useRef, useState } from "react";
import { useEventListener } from "@mantine/hooks";
import { ChevronDown, ChevronUp } from "react-feather";
import { FieldArray, FormikProps } from "formik";
import { getPluralString } from "@shared/utils";
import { Button, Checkbox, Paragraph, Search } from "@shared/ui";
import { CourseCategory, CourseTag, CoursesFiltersForm } from "@entities/course";
import { MAX_HEIGHT_FILTER_CONTENT } from "./constants";
import useStyles from "./FilterList.styles";

export interface FilterListProps {
    field: "tags" | "subcategoryIds";
    filterName: string;
    searchPlaceholder: string;
    labelsPluralString: [string, string, string];
    data?: CourseTag[] | CourseCategory[];
}

const FilterList = ({ field, filterName, searchPlaceholder, labelsPluralString, data }: FilterListProps) => {
    const spoilerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const { classes } = useStyles({ isOpen, hasSpoiler: (spoilerRef.current?.clientHeight ?? 0) > MAX_HEIGHT_FILTER_CONTENT });

    const spoilerControlRef = useEventListener("click", () => {
        spoilerRef.current?.children[0].scrollTo({ top: 0, behavior: "smooth" });
    });

    const handleChangeOpen = () => setIsOpen((prev) => !prev);

    const showLabel = () => {
        const hiddenCountCourse = data ? data.length - 5 : 0;
        return (
            <Button variant="text" rightIcon={<ChevronDown />} size="small" onClick={handleChangeOpen}>
                {`Еще ${hiddenCountCourse} ${getPluralString(hiddenCountCourse, ...labelsPluralString)}`}
            </Button>
        );
    };

    const hideLabel = (
        <Button variant="text" rightIcon={<ChevronUp />} size="small" onClick={handleChangeOpen}>
            Свернуть
        </Button>
    );

    const renderItems = (form: FormikProps<CoursesFiltersForm>) => {
        const foundItems = data?.filter((item) => item.name.includes(searchValue));

        if (!foundItems?.length && searchValue) {
            return <Paragraph variant="text-small-m" color="gray45" pb={16}>{`По запросу "${searchValue}" ничего не найдено`}</Paragraph>;
        }

        return foundItems?.map((item) => {
            const isChecked = !![...form.values[field]].find((value) => value === item.id.toString());

            const handleChange = (newValue: ChangeEvent<HTMLInputElement>) => {
                if (newValue.target.checked) {
                    const array = [...form.values[field]];

                    array.push(String(item.id));
                    return form.setFieldValue(field, array);
                }

                form.setFieldValue(
                    field,
                    [...form.values[field]].filter((value) => value !== item.id.toString())
                );
            };
            return <Checkbox key={item.id} checked={isChecked} onChange={handleChange} label={item.name} />;
        });
    };

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
                                maxHeight={MAX_HEIGHT_FILTER_CONTENT}
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
