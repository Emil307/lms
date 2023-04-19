import { useState } from "react";
import { ArticleFilter } from "@entities/article";
import { TPaginationResponse } from "@shared/utils";
import { FilterList } from "../FilterList";

export interface FilterByTagsProps {
    initialFilterData: TPaginationResponse<ArticleFilter[]>;
}

const FilterByTags = ({ initialFilterData }: FilterByTagsProps) => {
    const [filterData, _setFilterData] = useState<TPaginationResponse<ArticleFilter[]>>(initialFilterData);
    //TODO: После того как будет готов эндпоинт для фильтров нужно отправлять запросы по links.next и класть в setFilterData
    const handleOnLoad = (_nextUrl: string) => undefined;

    return (
        <FilterList
            field="tags"
            filterName="Теги"
            searchPlaceholder="Найти теги"
            showLabelPluralString={{
                one: "тег",
                two: "тега",
                five: "тегов",
            }}
            filterData={filterData}
            onLoad={handleOnLoad}
        />
    );
};

export default FilterByTags;
