import React, { useMemo } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "400px",
};

const Map = ({ places = [] }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // API Key
    });

    const { center, zoom } = useMemo(() => {
        const validPlaces = places.filter(
            (place) =>
                place.latitude &&
                place.longitude &&
                !isNaN(parseFloat(place.latitude)) &&
                !isNaN(parseFloat(place.longitude))
        );

        if (validPlaces.length === 0) {
            return { center: { lat: 0, lng: 0 }, zoom: 2 };
        }

        if (validPlaces.length === 1) {
            return {
                center: {
                    lat: parseFloat(validPlaces[0].latitude),
                    lng: parseFloat(validPlaces[0].longitude),
                },
                zoom: 12,
            };
        }

        const lats = validPlaces.map((p) => parseFloat(p.latitude));
        const lngs = validPlaces.map((p) => parseFloat(p.longitude));

        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLng = Math.min(...lngs);
        const maxLng = Math.max(...lngs);

        return {
            center: {
                lat: (minLat + maxLat) / 2,
                lng: (minLng + maxLng) / 2,
            },
            zoom: validPlaces.length > 5 ? 8 : 10,
        };
    }, [places]);

    if (!isLoaded) return <div>Loading...</div>;
    if (places.length === 0) return <div>No locations to display</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
        >
            {places.map((place, index) => (
                <Marker
                    key={index}
                    position={{
                        lat: parseFloat(place.latitude),
                        lng: parseFloat(place.longitude),
                    }}
                    title={place.name}
                    label={{
                        text: `${index + 1}`,
                        color: "white",
                        fontSize: "12px",
                        fontWeight: "bold",
                    }}
                />
            ))}
        </GoogleMap>
    );
};

export default Map;
