"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    HeartIcon,
    StarIcon,
    MapPinIcon,
    ClockIcon,
    PhoneIcon,
    ChatBubbleOvalLeftIcon,
    ShieldCheckIcon,
    TruckIcon,
    UserIcon,
    XMarkIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/solid';

// Create Favorites Context
const FavoritesContext = createContext();

// Favorites Provider Component
export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState({
        couriers: new Set(),
        providers: new Set()
    });

    // Load favorites from localStorage on mount (if available)
    useEffect(() => {
        try {
            const savedFavorites = {
                couriers: new Set(),
                providers: new Set()
            };

            // Since we can't use localStorage in Claude.ai, we'll start with empty favorites
            // In a real app, you would load from localStorage here
            setFavorites(savedFavorites);
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    }, []);

    // Save favorites to localStorage when they change (if available)
    useEffect(() => {
        try {
            // In a real app, you would save to localStorage here
            // localStorage.setItem('favorites', JSON.stringify({
            //     couriers: Array.from(favorites.couriers),
            //     providers: Array.from(favorites.providers)
            // }));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    }, [favorites]);

    const addToFavorites = (id, type) => {
        setFavorites(prev => ({
            ...prev,
            [type]: new Set([...prev[type], id])
        }));
    };

    const removeFromFavorites = (id, type) => {
        setFavorites(prev => {
            const newSet = new Set(prev[type]);
            newSet.delete(id);
            return {
                ...prev,
                [type]: newSet
            };
        });
    };

    const toggleFavorite = (id, type) => {
        if (favorites[type].has(id)) {
            removeFromFavorites(id, type);
        } else {
            addToFavorites(id, type);
        }
    };

    const isFavorite = (id, type) => {
        return favorites[type].has(id);
    };

    const getFavoritesByType = (type) => {
        return Array.from(favorites[type]);
    };

    const getAllFavoritesCount = () => {
        return favorites.couriers.size + favorites.providers.size;
    };

    const clearAllFavorites = () => {
        setFavorites({
            couriers: new Set(),
            providers: new Set()
        });
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
        getFavoritesByType,
        getAllFavoritesCount,
        clearAllFavorites
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

