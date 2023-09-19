import { NextAdapter } from "next-query-params";
import { ReactElement } from "react";
import { QueryParamAdapter } from "use-query-params";

export const Adapter = (
    props: JSX.IntrinsicAttributes & { shallow?: boolean | undefined; children(adapter: QueryParamAdapter): ReactElement | null }
) => {
    return <NextAdapter {...props} shallow />;
};
