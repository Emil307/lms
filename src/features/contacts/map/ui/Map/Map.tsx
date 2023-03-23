import { Box } from "@mantine/core";
import { Map as YMap, MapState, YMaps, Placemark as YPlacemark } from "react-yandex-maps";

export interface MapProps {}

export const defaultMapState: MapState = {
    center: [57.626867, 39.886259],
    zoom: 14,
    controls: ["zoomControl", "fullscreenControl", "geolocationControl", "searchControl", "typeSelector"],
};

const Map = (_props: MapProps) => {
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
