import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Django Backend API Base URL
const API_BASE_URL = 'http://127.0.0.1:8000';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Prüfe beim App-Start ob ein Token vorhanden ist (nur wenn explizit angemeldet)
    useEffect(() => {
        // Für jetzt: Kein automatischer Login
        // Falls später gewünscht, kann man das wieder einkommentieren:
        /*
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        
        if (token && userData) {
            try {
                const user = JSON.parse(userData);
                setCurrentUser(user);
                setIsAuthenticated(true);
                console.log('🔑 Benutzer automatisch angemeldet:', user.username);
            } catch (error) {
                console.error('❌ Fehler beim Laden der Benutzerdaten:', error);
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user_data');
            }
        }
        */
        setLoading(false);
    }, []);

    // Helper function für API calls (ohne Token-Requirement)
    const apiCall = async (endpoint, options = {}) => {
        const token = localStorage.getItem('auth_token');
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        // Token nur hinzufügen wenn vorhanden (optional)
        if (token) {
            defaultHeaders['Authorization'] = `Token ${token}`;
        }

        const config = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
        };

        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        return response;
    };

    // Registrierung (nur Benutzername + Passwort)
    const register = async (username, password) => {
        try {
            console.log('📝 Registrierungsversuch für:', username);
            
            const response = await fetch(`${API_BASE_URL}/api/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    // Default-Werte für required fields
                    email: `${username}@example.com`,
                    first_name: username,
                    last_name: '',
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Speichere Token und Benutzerdaten
                localStorage.setItem('auth_token', data.token);
                localStorage.setItem('user_data', JSON.stringify(data.user));
                
                setCurrentUser(data.user);
                setIsAuthenticated(true);
                
                console.log('✅ Registrierung erfolgreich:', data.user.username);
                return { success: true, message: data.message, user: data.user };
            } else {
                console.error('❌ Registrierung fehlgeschlagen:', data.error);
                return { success: false, message: data.error };
            }
        } catch (error) {
            console.error('❌ Registrierung Netzwerkfehler:', error);
            return { success: false, message: 'Netzwerkfehler bei der Registrierung' };
        }
    };

    // Anmeldung
    const login = async (username, password) => {
        try {
            console.log('🔑 Anmeldeversuch für:', username);
            
            const response = await fetch(`${API_BASE_URL}/api/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Speichere Token und Benutzerdaten
                localStorage.setItem('auth_token', data.token);
                localStorage.setItem('user_data', JSON.stringify(data.user));
                
                setCurrentUser(data.user);
                setIsAuthenticated(true);
                
                console.log('✅ Anmeldung erfolgreich:', data.user.username);
                return { success: true, message: data.message, user: data.user };
            } else {
                console.error('❌ Anmeldung fehlgeschlagen:', data.error);
                return { success: false, message: data.error };
            }
        } catch (error) {
            console.error('❌ Anmeldung Netzwerkfehler:', error);
            return { success: false, message: 'Netzwerkfehler bei der Anmeldung' };
        }
    };

    // Abmeldung
    const logout = async () => {
        try {
            console.log('🚪 Abmeldeversuch für:', currentUser?.username);
            
            // Backend-Logout (Token löschen)
            await apiCall('/api/logout/', {
                method: 'POST',
            });

            // Lokale Daten löschen
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            
            setCurrentUser(null);
            setIsAuthenticated(false);
            
            console.log('✅ Erfolgreich abgemeldet');
            return { success: true, message: 'Erfolgreich abgemeldet' };
        } catch (error) {
            console.error('❌ Abmeldung Netzwerkfehler:', error);
            // Auch bei Fehlern lokale Daten löschen
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            setCurrentUser(null);
            setIsAuthenticated(false);
            return { success: true, message: 'Abgemeldet (mit Fehlern)' };
        }
    };

    // Matching-Prozess speichern
    const saveMatchingProcess = async (processData) => {
        try {
            console.log('💾 Speichere Matching-Prozess:', processData);
            
            // Füge User-ID hinzu falls ein Benutzer angemeldet ist
            if (currentUser && currentUser.id) {
                processData.user_id = currentUser.id;
            }
            
            const response = await apiCall('/control_selection/save-request/', {
                method: 'POST',
                body: JSON.stringify(processData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('✅ Matching-Prozess erfolgreich gespeichert');
                return { success: true, message: data.message };
            } else {
                console.error('❌ Fehler beim Speichern:', data.error);
                return { success: false, message: data.error || 'Fehler beim Speichern' };
            }
        } catch (error) {
            console.error('❌ Netzwerkfehler beim Speichern:', error);
            return { success: false, message: 'Netzwerkfehler beim Speichern' };
        }
    };

    // Gespeicherte Matching-Prozesse laden
    const getSavedProcesses = async () => {
        try {
            console.log('📋 Lade gespeicherte Matching-Prozesse...');
            
            const response = await apiCall('/control_selection/list-requests/');
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Gespeicherte Prozesse geladen:', data.length);
                return { success: true, processes: data };
            } else {
                console.error('❌ Fehler beim Laden der Prozesse');
                return { success: false, message: 'Fehler beim Laden der Prozesse' };
            }
        } catch (error) {
            console.error('❌ Netzwerkfehler beim Laden:', error);
            return { success: false, message: 'Netzwerkfehler beim Laden' };
        }
    };

    // Einzelnen Matching-Prozess laden (mit Datensatz)
    const getMatchingProcess = async (processId) => {
        try {
            console.log('📄 Lade Matching-Prozess:', processId);
            
            const response = await apiCall(`/control_selection/get-request/${processId}/`);
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Matching-Prozess geladen');
                return { success: true, process: data };
            } else {
                console.error('❌ Fehler beim Laden des Prozesses');
                return { success: false, message: 'Prozess nicht gefunden' };
            }
        } catch (error) {
            console.error('❌ Netzwerkfehler beim Laden:', error);
            return { success: false, message: 'Netzwerkfehler beim Laden' };
        }
    };

    // Matching-Prozess löschen
    const deleteMatchingProcess = async (processId) => {
        try {
            console.log('🗑️ Lösche Matching-Prozess:', processId);
            
            const response = await apiCall(`/control_selection/delete-request/${processId}/`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const data = await response.json();
                console.log('✅ Matching-Prozess gelöscht');
                return { success: true, message: data.message };
            } else {
                console.error('❌ Fehler beim Löschen');
                return { success: false, message: 'Fehler beim Löschen' };
            }
        } catch (error) {
            console.error('❌ Netzwerkfehler beim Löschen:', error);
            return { success: false, message: 'Netzwerkfehler beim Löschen' };
        }
    };

    const value = {
        // Authentifizierung
        isAuthenticated,
        currentUser,
        loading,
        login,
        register,
        logout,
        
        // Matching-Prozesse
        saveMatchingProcess,
        getSavedProcesses,
        getMatchingProcess,
        deleteMatchingProcess,
        
        // Helper
        apiCall,
        
        // Legacy Support (für bestehende Komponenten)
        user: currentUser,
        savedProcesses: [],
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;