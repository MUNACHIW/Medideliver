// hooks/useFavorites.js
import { useState, useEffect, useCallback } from 'react';

const FAVORITES_STORAGE_KEY = 'healthcare-favorites';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState(new Set());
    const [isLoaded, setIsLoaded] = useState(false);

    // Load favorites from localStorage on mount
    useEffect(() => {
        try {
            const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
            if (savedFavorites) {
                const parsedFavorites = JSON.parse(savedFavorites);
                setFavorites(new Set(parsedFavorites));
            }
        } catch (error) {
            console.error('Error loading favorites from localStorage:', error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Save favorites to localStorage whenever favorites change
    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...favorites]));
            } catch (error) {
                console.error('Error saving favorites to localStorage:', error);
            }
        }
    }, [favorites, isLoaded]);

    const toggleFavorite = useCallback((providerId) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(providerId)) {
                newFavorites.delete(providerId);
            } else {
                newFavorites.add(providerId);
            }
            return newFavorites;
        });
    }, []);

    const addFavorite = useCallback((providerId) => {
        setFavorites(prev => new Set(prev).add(providerId));
    }, []);

    const removeFavorite = useCallback((providerId) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            newFavorites.delete(providerId);
            return newFavorites;
        });
    }, []);

    const isFavorite = useCallback((providerId) => {
        return favorites.has(providerId);
    }, [favorites]);

    const clearAllFavorites = useCallback(() => {
        setFavorites(new Set());
    }, []);

    return {
        favorites,
        isLoaded,
        toggleFavorite,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearAllFavorites,
        favoriteCount: favorites.size
    };
};