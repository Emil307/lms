import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    title: {
        fontSize: 42,
        color: theme.colors.dark[0],
        textAlign: "center",
    },
    description: {
        fontSize: 20,
        color: theme.colors.dark[0],
        textAlign: "center",
        opacity: 0.5,
    },
    viewport: {
        marginBottom: 48,
    },
    // TODO: отвечают за стилизацию при наличии emblaApi у carousel элемент, мож
    // container: {
    //     // height: 475,
    //     // alignItems: "center",
    // },
    // slide: {
    //     // height: 432,
    // },
    // activeSlide: {
    //     backgroundColor: theme.colors.neutralLight[0],
    //     borderRadius: 35,
    //     transform: "scale(1.1)",
    //     transition: "all 0.3s",
    //     marginRight: "48px",
    //     marginLeft: "24px",
    //     // padding: 0,
    //     // paddingRight: 0,
    // },
    // controls: {
    //     padding: 0,
    //     position: "relative",
    //     justifyContent: "center",
    //     gap: 8,
    // },
    // control: {
    //     width: 56,
    //     height: 56,
    //     borderRadius: 48,
    //     border: "none",
    //     color: theme.colors.dark[0],
    //     opacity: 1,
    //
    //     "&[data-inactive]": {
    //         opacity: 0,
    //     },
    //
    //     ":hover": {
    //         boxShadow: "drop-shadow(0px 1px 2px rgba(0, 18, 110, 0.04)) drop-shadow(0px 0px 16px rgba(0, 18, 110, 0.04));",
    //     },
    // },
}));
