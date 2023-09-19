import { useFormikContext } from "formik";
import { ChangeEvent, memo } from "react";
import { CourseCategory, CourseTag, CoursesFiltersForm } from "@entities/course";
import { Checkbox } from "@shared/ui";

export interface FilterItemProps {
    field: "tags" | "subcategoryIds";
    data: CourseTag | CourseCategory;
}

const MemoizedFilterItem = memo(function FilterItem({ field, data }: FilterItemProps) {
    const { setFieldValue, values } = useFormikContext<CoursesFiltersForm>();

    const isChecked = !![...values[field]].find((value) => value === data.id.toString());

    const handleChange = (newValue: ChangeEvent<HTMLInputElement>) => {
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

    return <Checkbox checked={isChecked} onChange={handleChange} label={data.name} />;
});

export default MemoizedFilterItem;
