import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../styles.css";

const NearbyPlaces = ({ initialLocation, onUpdatePlaces }) => {
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [radius, setRadius] = useState(1000);
    const [places, setPlaces] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (initialLocation) {
            setLongitude(initialLocation.longitude.toString());
            setLatitude(initialLocation.latitude.toString());
        }
    }, [initialLocation]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await axios.get("http://localhost:8070/api/places", {
                params: {
                    longitude: parseFloat(longitude),
                    latitude: parseFloat(latitude),
                    radius: parseInt(radius),
                },
            });

            setPlaces(response.data);
            onUpdatePlaces(response.data);
        } catch (error) {
            console.error("API Error:", error);
            setError("Failed to fetch places. Please check your input and try again.");
            setPlaces([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="nearby-places">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label className="mb-1">Longitude:</label>
                    <input
                        type="number"
                        step="any"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder="Enter longitude"
                        required
                        className="input"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1">Latitude:</label>
                    <input
                        type="number"
                        step="any"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder="Enter latitude"
                        required
                        className="input"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1">Radius (meters):</label>
                    <input
                        type="number"
                        value={radius}
                        onChange={(e) => setRadius(e.target.value)}
                        placeholder="Enter radius"
                        required
                        className="input"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn"
                >
                    {isLoading ? "Searching..." : "Search"}
                </button>
            </form>

            {error && <div className="error">{error}</div>}

            {places.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-lg font-bold mb-2">
                        Nearby Places ({places.length} found)
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border">
                            <thead>
                            <tr>
                                <th className="border p-2">#</th>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Address</th>
                                <th className="border p-2">Latitude</th>
                                <th className="border p-2">Longitude</th>
                            </tr>
                            </thead>
                            <tbody>
                            {places.map((place, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">{place.name}</td>
                                    <td className="border p-2">{place.address}</td>
                                    <td className="border p-2">{place.latitude}</td>
                                    <td className="border p-2">{place.longitude}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NearbyPlaces;