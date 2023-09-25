import { useFormikContext } from "formik";
import { ChangeEvent, useEffect } from "react";
import { Box, ThemeIcon } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
import { useTimeout } from "@mantine/hooks";
import { CourseCategory, CourseTag, CoursesFiltersForm } from "@entities/course";
import { Checkbox, Tooltip } from "@shared/ui";
import useStyles from "./FilterItem.styles";

export interface FilterItemProps {
    field: "tags" | "subcategoryIds";
    data: CourseTag | CourseCategory;
    selected?: boolean;
    onChangeSelected?: (id: number | null) => void;
}

const MemoizedFilterItem = function FilterItem({ field, data, selected, onChangeSelected }: FilterItemProps) {
    const { classes } = useStyles({ selected });
    const { start } = useTimeout(() => onChangeSelected?.(null), 5000);
    const { setFieldValue, values, handleSubmit, isSubmitting } = useFormikContext<CoursesFiltersForm>();

    const isChecked = !![...values[field]].find((value) => value === data.id.toString());

    //Нужен для сброса плавующей иконки фильтра при submit'e формы
    useEffect(() => {
        onChangeSelected?.(null);
    }, [isSubmitting]);

    const handleChange = (newValue: ChangeEvent<HTMLInputElement>) => {
        onChangeSelected?.(data.id);
        start();

        if (newValue.target.checked) {
            const array = [...values[field]];

            array.push(String(data.id));
            return setFieldValue(field, array);
        }

        setFieldValue(
            field,
            [...values[field]].filter((value) => value !== data.id.toString())
        );
    };

    const handleIconSubmit = () => handleSubmit();

    return (
        <Tooltip
            label={
                <ThemeIcon className={classes.filterIcon} onClick={handleIconSubmit}>
                    <IconFilter />
                </ThemeIcon>
            }
            position="right"
            opened={selected}
            classNames={classes}
            events={{ hover: false, focus: true, touch: true }}>
            <Box className={classes.tooltipInner}>
                <Checkbox checked={isChecked} onChange={handleChange} label={data.name} />
            </Box>
        </Tooltip>
    );
};

export default MemoizedFilterItem;
