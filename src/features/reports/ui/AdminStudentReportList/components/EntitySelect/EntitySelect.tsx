import { useDebouncedState } from "@mantine/hooks";
import { useEffect } from "react";
import { FSelect, SelectProps, prepareOptionsForSelect } from "@shared/ui";
import { AdminTransactionableTypeName, useAdminStudentReportEntities } from "@entities/report";
import { useIntersection } from "@shared/utils";
import { initialParams } from "./constants";

export interface EntitySelectProps extends Omit<SelectProps, "data"> {
    name: string;
    entityType: AdminTransactionableTypeName;
}

const EntitySelect = ({ name, entityType, ...props }: EntitySelectProps) => {
    const [query, setQuery] = useDebouncedState("", 500);
    const {
        data: entitiesResourcesData,
        hasNextPage,
        fetchNextPage,
        isLoading,
        isFetching,
        isRefetching,
    } = useAdminStudentReportEntities({ ...initialParams, query, entityType, filter: {} });

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry && entry.isIntersecting && hasNextPage && !isFetching && !isRefetching) {
            fetchNextPage();
        }
    }, [entry]);

    const getOptions = () => {
        switch (entityType) {
            case "course":
                return prepareOptionsForSelect({ data: entitiesResourcesData?.data, value: "id", label: "name" });
            case "course_package":
                return prepareOptionsForSelect({ data: entitiesResourcesData?.data, value: "id", label: "name" });
            case "article_package":
                return prepareOptionsForSelect({ data: entitiesResourcesData?.data, value: "id", label: "name" });
            default:
                return [];
        }
    };

    return (
        <>
            <FSelect
                {...props}
                name={name}
                size="sm"
                data={getOptions()}
                clearable
                label="Сущность"
                searchable
                variantSearhableSelect="default"
                disabled={isLoading || isFetching || !entityType}
                lastElementRef={lastElemRef}
                onSearchChange={setQuery}
                maxDropdownHeight={150}
            />
        </>
    );
};

export default EntitySelect;
