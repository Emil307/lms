import { useState } from "react";
import { ArticleFilter } from "@entities/article";
import { TPaginationResponse } from "@shared/types";
import { FilterList } from "../FilterList";

export interface FilterBySubCategoriesProps {
    initialFilterData: TPaginationResponse<ArticleFilter[]>;
}

const FilterBySubCategories = ({ initialFilterData }: FilterBySubCategoriesProps) => {
    const [filterData, _setFilterData] = useState<TPaginationResponse<ArticleFilter[]>>(initialFilterData);
    //TODO: После того как будет готов эндпоинт для фильтров нужно отправлять запросы по links.next и класть в setFilterData
    const handleOnLoad = (_nextUrl: string) => undefined;

    return (
        <FilterList
            field="subCategories"
            filterName="Категории"
            searchPlaceholder="Найти категории"
            showLabelPluralString={{
                one: "категория",
                two: "категории",
                five: "категорий",
            }}
            filterData={filterData}
            onLoad={handleOnLoad}
        />
    );
};

export default FilterBySubCategories;
