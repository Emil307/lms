import { InvalidateOptions, InvalidateQueryFilters, QueryKey } from "@tanstack/react-query";

export type InvalidateQueriesKey = { queryKey?: QueryKey; filters?: InvalidateQueryFilters<unknown>; options?: InvalidateOptions };
