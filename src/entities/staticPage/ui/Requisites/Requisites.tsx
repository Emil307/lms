import { Box } from "@mantine/core";
import React from "react";
import { ContentByTextEditor } from "@shared/ui";
import useStyles from "./Requisites.styles";

interface RequisitesProps {
    data: string;
}

const Requisites = ({ data }: RequisitesProps) => {
    const { classes } = useStyles();

    return (
        <Box className={classes.root}>
            <ContentByTextEditor data={data} className={classes.content} />
        </Box>
    );
};

export default Requisites;
