import React, { useState } from "react";
import NearbyPlaces from "./components/NearbyPlaces";
import Map from "./components/Map";
import './App.css';  // Assuming styles are defined in App.css

function App() {
    const [quickLocations] = useState([
        { name: "Istanbul", latitude: 41.0082, longitude: 28.9784 },
        { name: "New York", latitude: 40.7128, longitude: -74.006 },
        { name: "London", latitude: 51.5074, longitude: -0.1278 },
        { name: "Tokyo", latitude: 35.6762, longitude: 139.6503 },
        { name: "Sydney", latitude: -33.8688, longitude: 151.2093 },
    ]);

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [places, setPlaces] = useState([]);

    const handleQuickLocationSelect = (location) => {
        setSelectedLocation(location);
        setPlaces([location]);
    };

    const handleNearbyPlacesUpdate = (newPlaces) => {
        setPlaces(newPlaces);
    };

    return (
        <div className="App flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-4">
                <h1 className="text-2xl font-bold mb-4 text-center">Explore Places</h1>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Quick Locations</h2>
                    <div className="flex flex-wrap space-x-2">
                        {quickLocations.map((location) => (
                            <button
                                key={location.name}
                                onClick={() => handleQuickLocationSelect(location)}
                                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                {location.name}
                            </button>
                        ))}
                    </div>
                </div>
                <NearbyPlaces
                    initialLocation={selectedLocation}
                    onUpdatePlaces={handleNearbyPlacesUpdate}
                />
            </div>

            <div className="w-full md:w-1/2 p-4">
                <Map places={places} />
            </div>
        </div>
    );
}

export default App;