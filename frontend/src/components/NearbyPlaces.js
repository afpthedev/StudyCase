import React, { useState } from "react";
import axios from "axios";
import Map from "./Map";
import "./../styles.css";

const NearbyPlaces = () => {
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [radius, setRadius] = useState("");
    const [places, setPlaces] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get("http://localhost:8070/api/places", {
                params: {
                    longitude,
                    latitude,
                    radius,
                },
            });
            setPlaces(response.data);
        } catch (error) {
            console.error("API çağrısı sırasında hata oluştu:", error);
        }
    };

    return (
        <div className="nearby-places">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Longitude:</label>
                    <input
                        type="text"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder="Enter longitude"
                    />
                </div>
                <div>
                    <label>Latitude:</label>
                    <input
                        type="text"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder="Enter latitude"
                    />
                </div>
                <div>
                    <label>Radius (meters):</label>
                    <input
                        type="number"
                        value={radius}
                        onChange={(e) => setRadius(e.target.value)}
                        placeholder="Enter radius"
                    />
                </div>
                <button type="submit">Search</button>
            </form>

            {places.length > 0 && (
                <div>
                    <h2>Nearby Places</h2>
                    <ul>
                        {places.map((place, index) => (
                            <li key={index}>
                                <strong>{place.name}</strong>
                                <p>{place.address}</p>
                            </li>
                        ))}
                    </ul>
                    <Map places={places} />
                </div>
            )}
        </div>
    );
};

export default NearbyPlaces;
