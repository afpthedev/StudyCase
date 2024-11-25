import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "400px",
};

const Map = ({ places }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
                lat: parseFloat(places[0].latitude),
                lng: parseFloat(places[0].longitude),
            }}
            zoom={12}
        >
            {places.map((place, index) => (
                <Marker
                    key={index}
                    position={{
                        lat: parseFloat(place.latitude),
                        lng: parseFloat(place.longitude),
                    }}
                    title={place.name}
                />
            ))}
        </GoogleMap>
    );
};

export default Map;
