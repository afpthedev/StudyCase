import React, { useState } from "react";
import NearbyPlaces from "./components/NearbyPlaces";
import Map from "./components/Map";

function App() {
    const [quickLocations] = useState([
        { name: "Istanbul", latitude: 41.0082, longitude: 28.9784 }, // İstanbul eklendi
        { name: "New York", latitude: 40.7128, longitude: -74.006 },
        { name: "London", latitude: 51.5074, longitude: -0.1278 },
        { name: "Tokyo", latitude: 35.6762, longitude: 139.6503 },
        { name: "Sydney", latitude: -33.8688, longitude: 151.2093 },
    ]);

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [places, setPlaces] = useState([]); // İşaretçiler için `places` state

    const handleQuickLocationSelect = (location) => {
        setSelectedLocation(location);
        setPlaces([location]); // İşaretçiyi haritaya ekle
    };

    const handleNearbyPlacesUpdate = (newPlaces) => {
        setPlaces(newPlaces); // NearbyPlaces bileşeninden gelen işaretçileri güncelle
    };

    return (
        <div className="App flex">
            {/* Sol taraf: Quick Locations ve NearbyPlaces */}
            <div className="w-1/2 p-4">
                <h1 className="text-2xl font-bold mb-4">Google Places API</h1>

                {/* Quick Locations */}
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Quick Locations</h2>
                    <div className="flex space-x-2">
                        {quickLocations.map((location) => (
                            <button
                                key={location.name}
                                onClick={() => handleQuickLocationSelect(location)}
                                className="bg-blue-500 text-white px-2 py-1 rounded"
                            >
                                {location.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* NearbyPlaces Bileşeni */}
                <NearbyPlaces
                    initialLocation={selectedLocation}
                    onUpdatePlaces={handleNearbyPlacesUpdate} // İşaretçileri güncellemek için
                />
            </div>

            {/* Sağ taraf: Harita */}
            <div className="w-1/2 p-4">
                <Map places={places} />
            </div>
        </div>
    );
}

export default App;
