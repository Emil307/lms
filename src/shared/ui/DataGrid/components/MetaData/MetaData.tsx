import { TDisplayMeta } from "@shared/ui/DataGrid/types";
import { Flex } from "@mantine/core";
import React from "react";
import { Paragraph } from "@shared/ui";

export type TMetaDataProps<M> = {
    meta?: M;
    displayMeta?: TDisplayMeta<M>;
};

function MetaData<M extends Record<string, any>>({ meta, displayMeta }: TMetaDataProps<M>) {
    if (!meta || !displayMeta) {
        return null;
    }

    return (
        <Flex>
            <Paragraph variant="text-small-m" color="neutral_gray">
                {displayMeta.name || "Итого:"}
            </Paragraph>
            <Paragraph variant="text-small-m" color="dark">
                {displayMeta.value(meta)}
            </Paragraph>
        </Flex>
    );
}

export default MetaData;
