import { ActionIcon, Box, TextProps } from "@mantine/core";
import useStyles from "./ContentByTextEditor.styles";
import parse, { Element } from "html-react-parser";
import { Fancybox } from "@shared/ui";
import React from "react";
import { ZoomIn as ZoomInIcon } from "react-feather";

export interface ContentByTextEditorProps extends TextProps {
    data?: string;
}

const ContentByTextEditor = ({ data = "", className, ...props }: ContentByTextEditorProps) => {
    const { classes, cx } = useStyles();

    if (!data) {
        return null;
    }

    return (
        <Box className={cx(classes.root, className)} {...props}>
            <Fancybox
                options={{
                    Carousel: {
                        infinite: true,
                    },
                }}>
                {parse(data, {
                    transform: (reactNode, domNode, index) => {
                        if (typeof reactNode !== "string" && reactNode?.type === "img") {
                            const image = domNode as Element;
                            return (
                                <a data-fancybox="gallery" className={classes.imageWrapper} href={image.attribs.src} key={index}>
                                    <img src={image.attribs.src} alt={image.attribs.alt} />
                                    <ActionIcon w={56} h={40} className={classes.zoomIconWrapper}>
                                        <ZoomInIcon />
                                    </ActionIcon>
                                </a>
                            );
                        }
                        return reactNode;
                    },
                })}
            </Fancybox>
        </Box>
    );
};

export default ContentByTextEditor;
