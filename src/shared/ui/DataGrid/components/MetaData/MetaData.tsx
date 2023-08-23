import React from "react";
import { Box } from "@mantine/core";
import { TDisplayMetaData } from "@shared/ui/DataGrid/types";
import { Paragraph } from "@shared/ui";

type TMetaDataProps<M> = {
    meta?: M;
    displayMeta?: TDisplayMetaData<M>;
};

function MetaData<M extends Record<string, any>>({ meta, displayMeta }: TMetaDataProps<M>) {
    if (!meta || !displayMeta) {
        return null;
    }

    return (
        <Box>
            <Paragraph variant="text-small-m" component="span" color="neutral_gray">
                {displayMeta.name || "Итого:"}
            </Paragraph>
            <Paragraph variant="text-small-m" component="span" color="dark">
                {displayMeta.value(meta)}
            </Paragraph>
        </Box>
    );
}

export default MetaData;
