import { ActionIcon, Box, TextProps } from "@mantine/core";
import parse, { Element } from "html-react-parser";
import React from "react";
import { ZoomIn as ZoomInIcon } from "react-feather";
import { Fancybox } from "@shared/ui";
import useStyles from "./ContentByTextEditor.styles";

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
                        if (typeof reactNode === "string") {
                            return reactNode;
                        }
                        if (reactNode.type === "table") {
                            return (
                                <div className="tableWrapper" key={index}>
                                    <table>{reactNode.props.children}</table>
                                </div>
                            );
                        }
                        if (reactNode.type === "td" || reactNode.type === "th") {
                            const tableCell = domNode as Element;
                            const cellWidth = tableCell.attribs.colwidth + "px";
                            if (reactNode.type === "td") {
                                return (
                                    <td {...reactNode.props} style={{ minWidth: cellWidth }} key={index}>
                                        {reactNode.props.children}
                                    </td>
                                );
                            }
                            return (
                                <th {...reactNode.props} style={{ minWidth: cellWidth }} key={index}>
                                    {reactNode.props.children}
                                </th>
                            );
                        }
                        if (reactNode.props.className === "imageWrapper") {
                            const imageWrapper = domNode as Element;
                            const image = imageWrapper.firstChild as Element;
                            return (
                                <a data-fancybox="gallery" className="imageWrapper" href={image.attribs.src} key={index}>
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
