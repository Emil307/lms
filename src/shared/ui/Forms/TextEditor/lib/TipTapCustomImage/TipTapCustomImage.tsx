/* eslint-disable @typescript-eslint/no-explicit-any */
import { Node, nodeInputRule } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/react";

import { uploadImagePlugin, UploadFn } from "./uploadImagePlugin";

/**
 * Tiptap Extension to upload images
 * @see  https://gist.github.com/slava-vishnyakov/16076dff1a77ddaca93c4bccd4ec4521#gistcomment-3744392
 * @since 7th July 2021
 *
 * Matches following attributes in Markdown-typed image: [, alt, src, title]
 *
 * Example:
 * ![Lorem](image.jpg) -> [, "Lorem", "image.jpg"]
 * ![](image.jpg "Ipsum") -> [, "", "image.jpg", "Ipsum"]
 * ![Lorem](image.jpg "Ipsum") -> [, "Lorem", "image.jpg", "Ipsum"]
 */

interface ImageOptions {
    inline: boolean;
    HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        image: {
            /**
             * Add an image
             */
            setImage: (options: { src: string; alt?: string; title?: string }) => ReturnType;
        };
    }
}

const IMAGE_INPUT_REGEX = /!\[(.+|:?)\]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

export const TipTapCustomImage = (uploadFn: UploadFn) => {
    return Node.create<ImageOptions>({
        name: "image",

        addOptions() {
            return {
                inline: false,
                HTMLAttributes: {},
            };
        },

        inline() {
            return this.options.inline;
        },

        group() {
            return this.options.inline ? "inline" : "block";
        },

        draggable: true,

        addAttributes() {
            return {
                src: {
                    default: null,
                },
                alt: {
                    default: null,
                },
                title: {
                    default: null,
                },
            };
        },
        parseHTML: () => [
            {
                tag: "img[src]",
                getAttrs: (dom: string | HTMLElement) => {
                    if (typeof dom === "string") return {};
                    const element = dom as HTMLImageElement;

                    const obj = {
                        src: element.getAttribute("src"),
                        title: element.getAttribute("title"),
                        alt: element.getAttribute("alt"),
                    };
                    return obj;
                },
            },
        ],
        renderHTML: ({ HTMLAttributes }) => {
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("imageWrapper");
            const image = document.createElement("img");
            const attributes = mergeAttributes(HTMLAttributes);
            image.src = attributes.src;
            imageWrapper.append(image);
            return { dom: imageWrapper };
        },

        addCommands() {
            return {
                setImage:
                    (attrs) =>
                    ({ state, dispatch }) => {
                        const { selection } = state;
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                        const position = selection.$head ? selection.$head.pos : selection.$to.pos;

                        const node = this.type.create(attrs);
                        const transaction = state.tr.insert(position, node);
                        return dispatch?.(transaction);
                    },
            };
        },
        addInputRules() {
            return [
                nodeInputRule({
                    find: IMAGE_INPUT_REGEX,
                    type: this.type,
                    getAttributes: (match) => {
                        const [, alt, src, title] = match;
                        return {
                            src,
                            alt,
                            title,
                        };
                    },
                }),
            ];
        },
        addProseMirrorPlugins() {
            return [uploadImagePlugin(uploadFn)];
        },
    });
};
