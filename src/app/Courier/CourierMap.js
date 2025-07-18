"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function createCourierIcon(imageUrl) {
    return L.icon({
        iconUrl: imageUrl,
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        popupAnchor: [0, -48],
        className: "courier-marker-icon",
    });
}

export default function CourierMap({ couriers }) {
    return (
        <MapContainer
            center={[40.7128, -74.0060]}
            zoom={11}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {couriers.map(courier => (
                <Marker
                    key={courier.id}
                    position={[courier.lat, courier.lng]}
                    icon={createCourierIcon(courier.image)}
                >
                    <Popup>
                        <div className="flex flex-col items-center">
                            <img
                                src={courier.image}
                                alt={courier.name}
                                width={60}
                                height={60}
                                style={{
                                    borderRadius: "50%",
                                    marginBottom: 8,
                                    objectFit: "cover"
                                }}
                            />
                            <strong>{courier.name}</strong><br />
                            {courier.location}<br />
                            {courier.availability}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}