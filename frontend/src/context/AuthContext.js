import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Django Backend API Base URL
const API_BASE_URL = 'http://127.0.0.1:8000';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Prüfe beim App-Start ob ein Token vorhanden ist (mit Demo-Daten Setup)
    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        
        if (token && userData) {
            try {
                const user = JSON.parse(userData);
                
                // Wenn Demo-Benutzer, stelle sicher dass Demo-Daten vorhanden sind
                if (user.is_demo) {
                    const existingProcesses = JSON.parse(localStorage.getItem('demo_processes') || '[]');
                    const userProcesses = existingProcesses.filter(p => p.user_id === user.id);
                    
                    if (userProcesses.length === 0) {
                        const demoProcesses = createDemoProcesses(user.id);
                        const allProcesses = [...existingProcesses, ...demoProcesses];
                        localStorage.setItem('demo_processes', JSON.stringify(allProcesses));
                        console.log('✅ Demo data initialized on app start for:', user.username);
                    }
                }
                
                setCurrentUser(user);
                setIsAuthenticated(true);
                console.log('🔑 User automatically logged in:', user.username);
            } catch (error) {
                console.error('❌ Error loading user data:', error);
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user_data');
            }
        }
        
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

    // Registrierung (mit Demo-Modus Support)
    const register = async (username, password) => {
        try {
            console.log('📝 Registration attempt for:', username);
            
            // Prüfe ob Benutzername bereits als Demo-Benutzer existiert
            if (DEMO_USERS[username]) {
                return { success: false, message: 'Username already exists as demo user' };
            }
            
            // Versuche Backend-Registrierung
            const response = await fetch(`${API_BASE_URL}/api/register/`, {
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
                
                console.log('✅ Backend registration successful:', data.user.username);
                return { success: true, message: data.message, user: data.user };
            } else {
                console.error('❌ Backend registration failed:', data.error);
                return { success: false, message: data.error };
            }
        } catch (error) {
            console.error('❌ Registration network error:', error);
            
            // Falls Backend nicht erreichbar, erstelle Demo-Benutzer lokal
            console.log('🎭 Creating demo user locally:', username);
            
            const demoUser = {
                id: `demo_${username}`,
                username: username,
                name: `Demo ${username}`,
                created_at: new Date().toISOString(),
                is_demo: true
            };
            
            localStorage.setItem('auth_token', `demo_token_${username}`);
            localStorage.setItem('user_data', JSON.stringify(demoUser));
            
            setCurrentUser(demoUser);
            setIsAuthenticated(true);
            
            return { success: true, message: 'Demo user created successfully (offline mode)', user: demoUser };
        }
    };

    // Demo-Benutzer Konfiguration
    const DEMO_USERS = {
        'demo': { password: 'demo', name: 'Demo User' },
        'test': { password: 'test', name: 'Test User' },
        'admin': { password: 'admin', name: 'Admin User' }
    };

    // Demo-Beispieldaten generieren
    const createDemoProcesses = (userId) => {
        const now = new Date();
        const baseId = userId === 'demo_demo' ? 1000 : userId === 'demo_test' ? 2000 : 3000;
        
        const processes = [
            {
                id: baseId + 1,
                user_id: userId,
                name: 'Propensity Score - Treatment Analysis',
                matching_method: 'Propensity Score',
                target_variable: 'treatment_group',
                control_variables: ['age', 'gender', 'education', 'income'],
                ratio: '1',
                score_method: 'Logistic Regression',
                match_value: '0.1',
                result_count: 245,
                status: 'completed',
                algorithm: 'Nearest Neighbor',
                replacement: true,
                tolerance: '0.1',
                created_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
            },
            {
                id: baseId + 2,
                user_id: userId,
                name: 'Exact Matching - Control Study',
                matching_method: 'Exact Matching',
                target_variable: 'control_group',
                groupIndicator: 'control_group',
                matchingVariables: [
                    { var: 'age_group' },
                    { var: 'income_level' },
                    { var: 'education_level' },
                    { var: 'region' }
                ],
                matchingTolerance: ['±5 years', 'exact', 'exact', 'exact'],
                ratio: '2',
                algorithm: 'Optimal Matching',
                replacement: false,
                result_count: 189,
                status: 'completed',
                created_at: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
            },
            {
                id: baseId + 3,
                user_id: userId,
                name: 'PS Healthcare Access Study',
                matching_method: 'Propensity Score',
                target_variable: 'healthcare_access',
                control_variables: ['age', 'income', 'insurance_status', 'location', 'chronic_conditions'],
                ratio: '1',
                score_method: 'Random Forest',
                match_value: '0.05',
                result_count: 312,
                status: 'running',
                algorithm: 'Greedy Matching',
                replacement: false,
                tolerance: '0.05',
                created_at: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
            },
            {
                id: baseId + 4,
                user_id: userId,
                name: 'Education Impact Analysis',
                matching_method: 'Propensity Score',
                target_variable: 'education_program',
                control_variables: ['socioeconomic_status', 'parent_education', 'school_type'],
                ratio: '3',
                score_method: 'Logistic Regression',
                match_value: '0.2',
                result_count: 156,
                status: 'completed',
                algorithm: 'Caliper Matching',
                replacement: true,
                tolerance: '0.2',
                created_at: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
            }
        ];
        return processes;
    };

    // Anmeldung (mit Demo-Modus Fallback)
    const login = async (username, password) => {
        try {
            console.log('🔑 Login attempt for:', username);
            
            // Prüfe zuerst Demo-Benutzer
            if (DEMO_USERS[username] && DEMO_USERS[username].password === password) {
                console.log('🎭 Demo login successful for:', username);
                
                const demoUser = {
                    id: `demo_${username}`,
                    username: username,
                    name: DEMO_USERS[username].name,
                    created_at: new Date().toISOString(),
                    is_demo: true
                };
                
                // Erstelle Demo-Beispieldaten falls noch nicht vorhanden
                const existingProcesses = JSON.parse(localStorage.getItem('demo_processes') || '[]');
                const userProcesses = existingProcesses.filter(p => p.user_id === demoUser.id);
                
                if (userProcesses.length === 0) {
                    const demoProcesses = createDemoProcesses(demoUser.id);
                    const allProcesses = [...existingProcesses, ...demoProcesses];
                    localStorage.setItem('demo_processes', JSON.stringify(allProcesses));
                    console.log('✅ Demo example data created for user:', demoUser.id);
                }
                
                // Speichere Demo-Daten lokal
                localStorage.setItem('auth_token', `demo_token_${username}`);
                localStorage.setItem('user_data', JSON.stringify(demoUser));
                
                setCurrentUser(demoUser);
                setIsAuthenticated(true);
                
                return { success: true, message: 'Demo login successful', user: demoUser };
            }
            
            // Falls kein Demo-Benutzer, versuche Backend-Login
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
                
                console.log('✅ Backend login successful:', data.user.username);
                return { success: true, message: data.message, user: data.user };
            } else {
                console.error('❌ Backend login failed:', data.error);
                return { success: false, message: data.error };
            }
        } catch (error) {
            console.error('❌ Login network error:', error);
            
            // Falls Backend nicht erreichbar, prüfe nochmal Demo-Benutzer
            if (DEMO_USERS[username] && DEMO_USERS[username].password === password) {
                console.log('🎭 Fallback demo login for:', username);
                
                const demoUser = {
                    id: `demo_${username}`,
                    username: username,
                    name: DEMO_USERS[username].name,
                    created_at: new Date().toISOString(),
                    is_demo: true
                };
                
                // Erstelle Demo-Beispieldaten falls noch nicht vorhanden
                const existingProcesses = JSON.parse(localStorage.getItem('demo_processes') || '[]');
                const userProcesses = existingProcesses.filter(p => p.user_id === demoUser.id);
                
                if (userProcesses.length === 0) {
                    const demoProcesses = createDemoProcesses(demoUser.id);
                    const allProcesses = [...existingProcesses, ...demoProcesses];
                    localStorage.setItem('demo_processes', JSON.stringify(allProcesses));
                    console.log('✅ Demo example data created (fallback) for user:', demoUser.id);
                }
                
                localStorage.setItem('auth_token', `demo_token_${username}`);
                localStorage.setItem('user_data', JSON.stringify(demoUser));
                
                setCurrentUser(demoUser);
                setIsAuthenticated(true);
                
                return { success: true, message: 'Demo login successful (offline mode)', user: demoUser };
            }
            
            return { success: false, message: 'Network error during login' };
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

    // Matching-Prozess speichern (mit Demo-Modus Support)
    const saveMatchingProcess = async (processData) => {
        try {
            console.log('💾 Saving matching process:', processData);
            
            // Füge User-ID hinzu falls ein Benutzer angemeldet ist
            if (currentUser && currentUser.id) {
                processData.user_id = currentUser.id;
            }
            
            // Demo-Modus: Speichere lokal
            if (currentUser?.is_demo) {
                const savedProcesses = JSON.parse(localStorage.getItem('demo_processes') || '[]');
                const newProcess = {
                    ...processData,
                    id: Date.now(),
                    created_at: new Date().toISOString(),
                    user_id: currentUser.id
                };
                savedProcesses.push(newProcess);
                localStorage.setItem('demo_processes', JSON.stringify(savedProcesses));
                
                console.log('✅ Demo matching process saved locally');
                return { success: true, message: 'Process saved in demo mode' };
            }
            
            const response = await apiCall('/control_selection/save-request/', {
                method: 'POST',
                body: JSON.stringify(processData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('✅ Matching process successfully saved');
                return { success: true, message: data.message };
            } else {
                console.error('❌ Error saving:', data.error);
                return { success: false, message: data.error || 'Error saving' };
            }
        } catch (error) {
            console.error('❌ Network error saving:', error);
            
            // Fallback: Speichere auch bei Netzwerkfehler lokal wenn angemeldet
            if (currentUser) {
                const savedProcesses = JSON.parse(localStorage.getItem('demo_processes') || '[]');
                const newProcess = {
                    ...processData,
                    id: Date.now(),
                    created_at: new Date().toISOString(),
                    user_id: currentUser.id
                };
                savedProcesses.push(newProcess);
                localStorage.setItem('demo_processes', JSON.stringify(savedProcesses));
                
                console.log('✅ Process saved locally (fallback)');
                return { success: true, message: 'Process saved locally (offline mode)' };
            }
            
            return { success: false, message: 'Network error saving' };
        }
    };

    // Gespeicherte Matching-Prozesse laden (mit Demo-Modus Support)
    const getSavedProcesses = async () => {
        try {
            console.log('📋 Loading saved matching processes...');
            
            // Demo-Modus: Lade aus lokalem Speicher
            if (currentUser?.is_demo) {
                const savedProcesses = JSON.parse(localStorage.getItem('demo_processes') || '[]');
                const userProcesses = savedProcesses.filter(p => p.user_id === currentUser.id);
                console.log('✅ Demo processes loaded:', userProcesses.length);
                return { success: true, processes: userProcesses };
            }
            
            const response = await apiCall('/control_selection/list-requests/');
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Saved processes loaded:', data.length);
                return { success: true, processes: data };
            } else {
                console.error('❌ Error loading processes');
                return { success: false, message: 'Error loading processes' };
            }
        } catch (error) {
            console.error('❌ Network error loading processes:', error);
            
            // Fallback: Lade auch bei Netzwerkfehler lokal wenn angemeldet
            if (currentUser) {
                const savedProcesses = JSON.parse(localStorage.getItem('demo_processes') || '[]');
                const userProcesses = savedProcesses.filter(p => p.user_id === currentUser.id);
                console.log('✅ Processes loaded locally (fallback):', userProcesses.length);
                return { success: true, processes: userProcesses };
            }
            
            return { success: false, message: 'Network error loading processes' };
        }
    };

    // Einzelnen Matching-Prozess laden (mit Demo-Modus Support)
    const getMatchingProcess = async (processId) => {
        try {
            console.log('📄 Loading matching process:', processId);
            
            // Demo-Modus: Lade aus lokalem Speicher
            if (currentUser?.is_demo) {
                const savedProcesses = JSON.parse(localStorage.getItem('demo_processes') || '[]');
                const process = savedProcesses.find(p => p.id === processId);
                
                if (process) {
                    console.log('✅ Demo process loaded');
                    return { success: true, process: process };
                } else {
                    return { success: false, message: 'Process not found in demo mode' };
                }
            }
            
            const response = await apiCall(`/control_selection/get-request/${processId}/`);
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Matching process loaded');
                return { success: true, process: data };
            } else {
                console.error('❌ Error loading process');
                return { success: false, message: 'Process not found' };
            }
        } catch (error) {
            console.error('❌ Network error loading:', error);
            
            // Fallback: Suche auch bei Netzwerkfehler lokal
            if (currentUser) {
                const savedProcesses = JSON.parse(localStorage.getItem('demo_processes') || '[]');
                const process = savedProcesses.find(p => p.id === processId);
                
                if (process) {
                    console.log('✅ Process loaded locally (fallback)');
                    return { success: true, process: process };
                }
            }
            
            return { success: false, message: 'Network error loading' };
        }
    };

    // Matching-Prozess löschen (mit Demo-Modus Support)
    const deleteMatchingProcess = async (processId) => {
        try {
            console.log('🗑️ Deleting matching process:', processId);
            
            // Demo-Modus: Lösche aus lokalem Speicher
            if (currentUser?.is_demo) {
                const savedProcesses = JSON.parse(localStorage.getItem('demo_processes') || '[]');
                const filteredProcesses = savedProcesses.filter(p => p.id !== processId);
                localStorage.setItem('demo_processes', JSON.stringify(filteredProcesses));
                
                console.log('✅ Demo process deleted locally');
                return { success: true, message: 'Process deleted in demo mode' };
            }
            
            const response = await apiCall(`/control_selection/delete-request/${processId}/`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const data = await response.json();
                console.log('✅ Matching process deleted');
                return { success: true, message: data.message };
            } else {
                console.error('❌ Error deleting');
                return { success: false, message: 'Error deleting' };
            }
        } catch (error) {
            console.error('❌ Network error deleting:', error);
            
            // Fallback: Lösche auch bei Netzwerkfehler lokal wenn Demo-Benutzer
            if (currentUser?.is_demo) {
                const savedProcesses = JSON.parse(localStorage.getItem('demo_processes') || '[]');
                const filteredProcesses = savedProcesses.filter(p => p.id !== processId);
                localStorage.setItem('demo_processes', JSON.stringify(filteredProcesses));
                
                console.log('✅ Process deleted locally (fallback)');
                return { success: true, message: 'Process deleted locally (offline mode)' };
            }
            
            return { success: false, message: 'Network error deleting' };
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