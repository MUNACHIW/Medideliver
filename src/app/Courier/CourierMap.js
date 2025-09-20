"use client";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import {
    StarIcon,
    MapPinIcon,
    ClockIcon,
    TruckIcon,
    PhoneIcon,
    ChatBubbleOvalLeftIcon,
    ShieldCheckIcon,
    XMarkIcon,
    UserIcon,
    CheckCircleIcon
} from "@heroicons/react/24/solid";

// Custom styles for the map
const mapStyles = `
  .courier-marker-icon {
    border: 3px solid #10B981;
    border-radius: 50%;
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .courier-marker-icon.express {
    border-color: #F59E0B;
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
  }
  
  .courier-marker-icon.available-now {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
    }
  }
  
  .leaflet-popup-content-wrapper {
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border: none;
    z-index: 1000 !important;
  }
  
  .leaflet-popup-tip {
    background: white;
    border: none;
    box-shadow: none;
    z-index: 1000 !important;
  }
  
  .leaflet-popup {
    z-index: 1000 !important;
  }
  
  .leaflet-control-zoom {
    border: none;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 100 !important;
  }
  
  .leaflet-control-zoom a {
    border-radius: 12px;
    border: none;
    background: white;
    color: #374151;
    font-weight: bold;
    box-shadow: none;
  }
  
  .leaflet-control-zoom a:hover {
    background: #F3F4F6;
  }

  .leaflet-control {
    z-index: 100 !important;
  }

  .leaflet-bottom, .leaflet-top {
    z-index: 100 !important;
  }

  .leaflet-marker-icon {
    z-index: 50 !important;
  }
`;

// Enhanced courier icon creation
function createCourierIcon(courier) {
    const iconHtml = `
        <div style="
            width: 48px; 
            height: 48px; 
            border-radius: 50%; 
            border: 3px solid ${courier.isExpress ? '#F59E0B' : '#10B981'};
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            ${courier.availability.includes('now') ? 'animation: pulse 2s infinite;' : ''}
            position: relative;
        ">
            <img 
                src="${courier.image}" 
                style="
                    width: 38px; 
                    height: 38px; 
                    border-radius: 50%; 
                    object-fit: cover;
                " 
                alt="${courier.name}"
            />
            ${courier.availability.includes('now') ? `
                <div style="
                    position: absolute;
                    bottom: -2px;
                    right: -2px;
                    width: 16px;
                    height: 16px;
                    background: #10B981;
                    border: 2px solid white;
                    border-radius: 50%;
                "></div>
            ` : ''}
        </div>
    `;

    return L.divIcon({
        html: iconHtml,
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        popupAnchor: [0, -48],
        className: 'courier-marker-custom'
    });
}

// User location marker
function createUserIcon() {
    const iconHtml = `
        <div style="
            width: 24px; 
            height: 24px; 
            border-radius: 50%; 
            background: #3B82F6;
            border: 3px solid white;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
            animation: pulse 2s infinite;
        "></div>
    `;

    return L.divIcon({
        html: iconHtml,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        className: 'user-location-marker'
    });
}

// Map controls component
function MapControls({ onCenterUser, onToggleRadius, showRadius, selectedCourier, onCourierSelect }) {
    return (
        <div className="absolute top-4 left-4 z-[100] space-y-2">
            <div className="bg-white rounded-xl shadow-lg p-2 space-y-2">
                <button
                    onClick={onCenterUser}
                    className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors"
                    title="Center on my location"
                >
                    <MapPinIcon className="h-5 w-5" />
                </button>
                <button
                    onClick={onToggleRadius}
                    className={`w-10 h-10 ${showRadius ? 'bg-green-500' : 'bg-gray-400'} hover:bg-green-600 text-white rounded-lg flex items-center justify-center transition-colors`}
                    title="Toggle search radius"
                >
                    <span className="text-xs font-bold">R</span>
                </button>
            </div>

            {selectedCourier && (
                <div className="bg-white rounded-xl shadow-lg p-4 max-w-xs">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{selectedCourier.name}</h4>
                        <button
                            onClick={() => onCourierSelect(null)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                        >
                            <XMarkIcon className="h-4 w-4 text-gray-500" />
                        </button>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                            <TruckIcon className="h-4 w-4 mr-2 text-green-500" />
                            <span>{selectedCourier.vehicle}</span>
                        </div>
                        <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-2 text-green-500" />
                            <span>{selectedCourier.availability}</span>
                        </div>
                        <div className="flex items-center">
                            <StarIcon className="h-4 w-4 mr-2 text-yellow-500" />
                            <span>{selectedCourier.rating} ({selectedCourier.deliveries})</span>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                        <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-semibold transition-colors">
                            Book ${selectedCourier.price}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// Enhanced popup component
function CourierPopup({ courier, onBook, onSelect }) {
    return (
        <div className="p-2 min-w-[280px]">
            <div className="flex items-start gap-3">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-200">
                    <img
                        src={courier.image}
                        alt={courier.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-gray-800 text-lg">{courier.name}</h4>
                        <div className="flex gap-1">
                            {courier.verified && (
                                <ShieldCheckIcon className="h-5 w-5 text-green-500" title="Verified" />
                            )}
                            {courier.isExpress && (
                                <div className="bg-yellow-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                                    Express
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                            <TruckIcon className="h-4 w-4 mr-2 text-green-500" />
                            <span className="font-medium">{courier.vehicle}</span>
                        </div>
                        <div className="flex items-center">
                            <MapPinIcon className="h-4 w-4 mr-2 text-green-500" />
                            <span>{courier.distance}</span>
                        </div>
                        <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-2 text-green-500" />
                            <span className={courier.availability.includes('now') ? 'text-green-600 font-medium' : ''}>
                                {courier.availability}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <StarIcon className="h-4 w-4 mr-2 text-yellow-500" />
                            <span>{courier.rating} ({courier.deliveries} deliveries)</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div>
                            <span className="text-xl font-bold text-gray-800">${courier.price}</span>
                            <div className="text-xs text-gray-500">Next: {courier.nextSlot}</div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="p-2 bg-green-50 hover:bg-green-100 rounded-full transition-colors"
                                title="Message"
                            >
                                <ChatBubbleOvalLeftIcon className="h-4 w-4 text-green-600" />
                            </button>
                            <button
                                className="p-2 bg-green-50 hover:bg-green-100 rounded-full transition-colors"
                                title="Call"
                            >
                                <PhoneIcon className="h-4 w-4 text-green-600" />
                            </button>
                            <button
                                onClick={() => onBook(courier)}
                                className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2 rounded-full hover:from-green-600 hover:to-blue-700 transition-all font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Book
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Map fit bounds component
function FitBounds({ couriers }) {
    const map = useMap();

    useEffect(() => {
        if (couriers.length > 0) {
            const group = new L.featureGroup(
                couriers.map(courier => L.marker([courier.lat, courier.lng]))
            );
            map.fitBounds(group.getBounds().pad(0.1));
        }
    }, [couriers, map]);

    return null;
}

export default function CourierMap({ couriers, onBook, selectedCourier, onCourierSelect }) {
    const [userLocation, setUserLocation] = useState(null);
    const [showRadius, setShowRadius] = useState(true);
    const [mapInstance, setMapInstance] = useState(null);

    // Get user location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                },
                (error) => {
                    console.log('Location access denied');
                    // Default to Manhattan center
                    setUserLocation([40.7580, -73.9855]);
                }
            );
        } else {
            setUserLocation([40.7580, -73.9855]);
        }
    }, []);

    // Add custom styles
    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.textContent = mapStyles;
        document.head.appendChild(styleSheet);

        return () => document.head.removeChild(styleSheet);
    }, []);

    const handleCenterUser = () => {
        if (mapInstance && userLocation) {
            mapInstance.setView(userLocation, 14);
        }
    };

    const handleToggleRadius = () => {
        setShowRadius(!showRadius);
    };

    if (!userLocation) {
        return (
            <div className="h-full w-full flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading map...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-full w-full">
            <MapContainer
                center={userLocation}
                zoom={12}
                style={{ height: "100%", width: "100%", zIndex: 1 }}
                className="rounded-2xl"
                ref={setMapInstance}
                zoomControl={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* User location */}
                {userLocation && (
                    <>
                        <Marker position={userLocation} icon={createUserIcon()}>
                            <Popup>
                                <div className="text-center p-2">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                                        <UserIcon className="h-4 w-4 text-white" />
                                    </div>
                                    <strong>Your Location</strong>
                                </div>
                            </Popup>
                        </Marker>

                        {/* Search radius */}
                        {showRadius && (
                            <Circle
                                center={userLocation}
                                radius={5000} // 5km radius
                                pathOptions={{
                                    fillColor: '#10B981',
                                    fillOpacity: 0.1,
                                    color: '#10B981',
                                    weight: 2,
                                    opacity: 0.6
                                }}
                            />
                        )}
                    </>
                )}

                {/* Courier markers */}
                {couriers.map(courier => (
                    <Marker
                        key={courier.id}
                        position={[courier.lat, courier.lng]}
                        icon={createCourierIcon(courier)}
                        eventHandlers={{
                            click: () => onCourierSelect && onCourierSelect(courier)
                        }}
                    >
                        <Popup maxWidth={320} closeButton={false}>
                            <CourierPopup
                                courier={courier}
                                onBook={onBook}
                                onSelect={onCourierSelect}
                            />
                        </Popup>
                    </Marker>
                ))}

                <FitBounds couriers={couriers} />
            </MapContainer>

            <MapControls
                onCenterUser={handleCenterUser}
                onToggleRadius={handleToggleRadius}
                showRadius={showRadius}
                selectedCourier={selectedCourier}
                onCourierSelect={onCourierSelect}
            />

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white rounded-xl shadow-lg p-3 space-y-2 text-sm z-[100]">
                <div className="font-semibold text-gray-800 mb-2">Legend</div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Your Location</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                    <span className="text-gray-600">Available Courier</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full border border-white"></div>
                    <span className="text-gray-600">Express Delivery</span>
                </div>
                {showRadius && (
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border border-green-500 rounded-full"></div>
                        <span className="text-gray-600">Search Radius (5km)</span>
                    </div>
                )}
            </div>
        </div>
    );
}