import { ActionIcon, Box, TextProps } from "@mantine/core";
import parse, { DOMNode, Element } from "html-react-parser";
import React from "react";
import { ZoomIn as ZoomInIcon } from "react-feather";
import Image from "next/image";
import { Fancybox } from "@shared/ui";
import useStyles from "./ContentByTextEditor.styles";

export interface ContentByTextEditorProps extends TextProps {
    data?: string | null;
    hideFancybox?: boolean;
}

interface TransformNodeProps {
    reactNode: string | JSX.Element;
    domNode: DOMNode;
    classes: Record<string, string>;
    index: number;
    hideFancybox: boolean;
}

const transformNode = ({ reactNode, domNode, classes, index, hideFancybox }: TransformNodeProps) => {
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
        const cellWidth = Number(tableCell.attribs.colwidth);

        let styleForWidth = {} as React.CSSProperties;

        if (Number.isInteger(cellWidth)) {
            styleForWidth = {
                minWidth: cellWidth + "px",
            };
        }

        if (reactNode.type === "td") {
            return (
                <td {...reactNode.props} style={styleForWidth} key={index}>
                    {reactNode.props.children}
                </td>
            );
        }
        return (
            <th {...reactNode.props} style={styleForWidth} key={index}>
                {reactNode.props.children}
            </th>
        );
    }
    if (reactNode.props.className === "imageWrapper") {
        const imageWrapper = domNode as Element;
        const image = imageWrapper.firstChild as Element;
        if (hideFancybox) {
            return (
                <Box className="imageWrapper" key={index}>
                    <Image
                        src={image.attribs.src}
                        alt={image.attribs.alt}
                        fill
                        style={{
                            objectFit: "contain",
                        }}
                    />
                </Box>
            );
        }
        return (
            <a data-fancybox="gallery" className="imageWrapper" href={image.attribs.src} key={index}>
                <Image
                    src={image.attribs.src}
                    alt={image.attribs.alt}
                    fill
                    style={{
                        objectFit: "contain",
                    }}
                />
                <ActionIcon w={56} h={40} className={classes.zoomIconWrapper}>
                    <ZoomInIcon />
                </ActionIcon>
            </a>
        );
    }
    return reactNode;
};

const ContentByTextEditor = ({ data = "", hideFancybox = false, className, ...props }: ContentByTextEditorProps) => {
    const { classes, cx } = useStyles();

    if (!data) {
        return null;
    }

    const renderContent = () => {
        const content = parse(data, {
            transform: (reactNode, domNode, index) => transformNode({ reactNode, domNode, classes, index, hideFancybox }),
        });

        if (!hideFancybox) {
            return (
                <Fancybox
                    options={{
                        Carousel: {
                            infinite: true,
                        },
                    }}>
                    {content}
                </Fancybox>
            );
        }

        return content;
    };

    return (
        <Box className={cx(classes.root, className)} {...props}>
            {renderContent()}
        </Box>
    );
};

export default ContentByTextEditor;
