import React from "react";
import { Box } from "@mantine/core";
import { TDisplayMetaData } from "@shared/ui/DataGrid/types";
import { Paragraph } from "@shared/ui";
import {useCurrentMetaData} from "@shared/ui/DataGrid/utils";

type TMetaDataProps<M> = {
    meta?: M;
    displayMeta?: TDisplayMetaData<M>;
};

function MetaData<M extends Record<string, any>>({ meta, displayMeta }: TMetaDataProps<M>) {
    const metaData = useCurrentMetaData(meta);

    if (!displayMeta || !metaData) {
        return null;
    }

    return (
        <Box>
            <Paragraph variant="text-small-m" component="span" color="neutral_gray">
                {displayMeta.name || "Итого:"}
            </Paragraph>
            <Paragraph variant="text-small-m" component="span" color="dark">
                {displayMeta.value(metaData)}
            </Paragraph>
        </Box>
    );
}

export default MetaData;
