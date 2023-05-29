import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { TRouterSelectQueries } from "./types";

export default function SelectedRowsCount() {
    const router = useRouter();
    const { select } = router.query as TRouterSelectQueries;

    return (
        <Box
            sx={(theme) => ({
                color: theme.colors.gray45[0],
                lineHeight: "16px",
                span: {
                    color: theme.colors.dark[0],
                },
            })}
            mt={32}>
            Выбрано: <span>{select?.split(",").length || 0}</span>
        </Box>
    );
}
