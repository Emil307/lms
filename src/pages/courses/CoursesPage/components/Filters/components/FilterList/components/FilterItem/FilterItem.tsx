import { useFormikContext } from "formik";
import { Box, ThemeIcon } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
import { CourseCategory, CourseTag, CoursesFiltersForm } from "@entities/course";
import { Paragraph, Tooltip } from "@shared/ui";
import useStyles from "./FilterItem.styles";

export interface FilterItemProps {
    field: "tags" | "subcategoryIds";
    data: CourseTag | CourseCategory;
    selected?: boolean;
    onChangeSelected?: (id: number | null) => void;
}

const MemoizedFilterItem = function FilterItem({ field, data, selected, onChangeSelected = () => undefined }: FilterItemProps) {
    const { setFieldValue, values } = useFormikContext<CoursesFiltersForm>();

    const isSelected = !![...values[field]].find((value) => value === data.id.toString());
    const { classes } = useStyles({ selected, isSelected });

    const handleButtonClick = () => {
        onChangeSelected(data.id);

        if (isSelected) {
            setFieldValue(
                field,
                [...values[field]].filter((value) => value !== data.id.toString())
            );
        } else {
            const array = [...values[field]];
            array.push(String(data.id));
            setFieldValue(field, array);
        }
    };

    return (
        <Tooltip
            label={
                <ThemeIcon className={classes.filterIcon} onClick={handleButtonClick}>
                    <IconFilter />
                </ThemeIcon>
            }
            position="right"
            opened={selected}
            classNames={classes}
            events={{ hover: false, focus: true, touch: true }}>
            <Box className={classes.tooltipInner} onClick={handleButtonClick}>
                <Paragraph variant="text-small-semi" className={`${classes.button}`}>
                    {data.name}
                </Paragraph>
            </Box>
        </Tooltip>
    );
};

export default MemoizedFilterItem;
