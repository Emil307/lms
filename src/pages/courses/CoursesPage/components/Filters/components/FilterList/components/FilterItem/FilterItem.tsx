import { useFormikContext } from "formik";
import { CourseCategory, CourseTag, CoursesFiltersForm } from "@entities/course";
import { ButtonSwitch } from "@shared/ui";

export interface FilterItemProps {
    field: "tags" | "subcategoryIds" | "categoryIds";
    data: CourseTag | CourseCategory;
    onChangeSelected?: (id: number | null) => void;
}

const MemoizedFilterItem = function FilterItem({ field, data, onChangeSelected = () => undefined }: FilterItemProps) {
    const { setFieldValue, values } = useFormikContext<CoursesFiltersForm>();

    const isSelected = !![...values[field]].find((value) => value === data.id.toString());

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
        <ButtonSwitch active={isSelected} onClick={handleButtonClick}>
            {data.name}
        </ButtonSwitch>
    );
};

export default MemoizedFilterItem;
