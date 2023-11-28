import { queryClient } from "@app/providers";
import { EntityNames, QueryKeys } from "@shared/constant";

export interface InvalidateQueriesWithPredicateProps {
    entityName: EntityNames;
    // include?: EntityNames[];
    exclude?: QueryKeys[];
}

export const invalidateQueriesWithPredicate = ({ entityName, exclude = [] }: InvalidateQueriesWithPredicateProps) =>
    queryClient.invalidateQueries({
        predicate: ({ queryKey }) => {
            if (queryKey.length > 1 && Array.isArray(queryKey[1])) {
                if (exclude.includes(queryKey[0] as QueryKeys)) {
                    return false;
                }
                // if (include.length) {
                //     return queryKey[1].every((key) => include.includes(key)) && queryKey[1].includes(entityName);
                // }
                return queryKey[1].includes(entityName);
            }
            return false;
        },
    });
