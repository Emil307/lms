import { useFormikContext } from "formik";
import { ChangeEvent, memo } from "react";
import { Checkbox } from "@shared/ui";
import { ArticleAndArticleCategoryFiltersForm, ArticleCategory, ArticleTag } from "@entities/article";

export interface FilterItemProps {
    field: "tags" | "subcategoryIds";
    data: ArticleCategory | ArticleTag;
}

const MemoizedFilterItem = memo(function FilterItem({ field, data }: FilterItemProps) {
    const { setFieldValue, values } = useFormikContext<ArticleAndArticleCategoryFiltersForm>();

    const isChecked = !![...values[field]].find((value) => value === data.id?.toString());

    const handleChange = (newValue: ChangeEvent<HTMLInputElement>) => {
        if (newValue.target.checked) {
            const array = [...values[field]];

            array.push(String(data.id));
            return setFieldValue(field, array);
        }

        setFieldValue(
            field,
            [...values[field]].filter((value) => value !== data.id?.toString())
        );
    };

    return <Checkbox checked={isChecked} onChange={handleChange} label={data.name} />;
});

export default MemoizedFilterItem;
