import { Box } from "@mantine/core";
import { Map as YMap, YMaps, Placemark as YPlacemark } from "@pbe/react-yandex-maps";
import { control } from "yandex-maps";
import useStyles from "./Map.styles";

export interface MapProps {
    behaviors?: string[];
    bounds?: number[][];
    center?: number[];
    controls?: Array<string | control.ZoomControl | control.RulerControl | control.TypeSelector>;
    margin?: number[][] | number[];
    type?: "yandex#map" | "yandex#satellite" | "yandex#hybrid";
    zoom?: number;
}

const YanMap = (props: MapProps) => {
    const { classes } = useStyles();

    return (
        <YMaps>
            <Box className={classes.container}>
                <YMap
                    width="100%"
                    height="100%"
                    defaultState={props}
                    modules={[
                        "SuggestView",
                        "control.ZoomControl",
                        "control.FullscreenControl",
                        "control.GeolocationControl",
                        "control.SearchControl",
                        "control.TypeSelector",
                    ]}>
                    <YPlacemark defaultGeometry={props.center} />
                </YMap>
            </Box>
        </YMaps>
    );
};

export default YanMap;
