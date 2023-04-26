import { Box } from "@mantine/core";
import { Map as YMap, YMaps, Placemark as YPlacemark } from "@pbe/react-yandex-maps";
import { control } from "yandex-maps";

export interface IMapProps {
    behaviors?: string[] | undefined;
    bounds?: number[][] | undefined;
    center?: number[] | undefined;
    controls?: Array<string | control.ZoomControl | control.RulerControl | control.TypeSelector> | undefined;
    margin?: number[][] | number[] | undefined;
    type?: "yandex#map" | "yandex#satellite" | "yandex#hybrid" | undefined;
    zoom?: number | undefined;
}

export const defaultMapState: IMapProps = {
    center: [57.626867, 39.886259],
    zoom: 14,
    controls: ["zoomControl", "fullscreenControl", "geolocationControl", "searchControl", "typeSelector"],
};

const Map = (_props: IMapProps) => {
    return (
        <YMaps>
            <Box
                sx={{
                    height: 420,
                    width: "100%",
                    "> div > ymaps:not(:last-child)": {
                        display: "none",
                    },
                }}>
                <YMap
                    width="100%"
                    height="100%"
                    defaultState={defaultMapState}
                    modules={[
                        "SuggestView",
                        "control.ZoomControl",
                        "control.FullscreenControl",
                        "control.GeolocationControl",
                        "control.SearchControl",
                        "control.TypeSelector",
                    ]}>
                    <YPlacemark defaultGeometry={defaultMapState.center} />
                </YMap>
            </Box>
        </YMaps>
    );
};

export default Map;
