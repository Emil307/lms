import { queryClient } from "@app/providers";
import { EntityNames, QueryKeys } from "@shared/constant";

export interface InvalidateQueriesWithPredicateProps {
    entityName: EntityNames;
    exclude?: QueryKeys[];
}

export const invalidateQueriesWithPredicate = ({ entityName, exclude = [] }: InvalidateQueriesWithPredicateProps) =>
    queryClient.invalidateQueries({
        predicate: ({ queryKey }) => {
            if (queryKey.length > 1 && Array.isArray(queryKey[1])) {
                if (exclude.includes(queryKey[0] as QueryKeys)) {
                    return false;
                }
                return queryKey[1].includes(entityName);
            }
            return false;
        },
    });
