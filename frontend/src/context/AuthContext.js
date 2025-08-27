import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Mock-Benutzer für Testing
const MOCK_USERS = {
    'testuser': {
        id: 1,
        username: 'testuser',
        email: 'n.al-hasnawi@dkfz-heidelberg.de',
        password: '123123',
        first_name: 'Admin',
        last_name: 'User',
        created_at: '2024-08-01T10:00:00Z'
    }
};

// Mock-Matching-Prozesse für den Testbenutzer
const MOCK_SAVED_PROCESSES = [
    {
        id: 1,
        name: 'Herzinsuffizienz Matching',
        created_at: '2024-08-20T10:30:00Z',
        matching_method: 'Propensity Score',
        algorithm: 'nearest',
        target_variable: 'icu_mort',
        control_variables: ['age', 'sex', 'charlScore'],
        result_count: 500,
        status: 'completed'
    },
    {
        id: 2,
        name: 'Diabetes Studie',
        created_at: '2024-08-18T14:15:00Z',
        matching_method: 'Exaktes Matching',
        algorithm: 'optimal',
        target_variable: 'diabetes',
        control_variables: ['age', 'bmi', 'blood_pressure'],
        result_count: 320,
        status: 'completed'
    },
    {
        id: 3,
        name: 'COVID-19 Analyse',
        created_at: '2024-08-15T09:45:00Z',
        matching_method: 'Propensity Score',
        algorithm: 'nearest',
        target_variable: 'covid_positive',
        control_variables: ['age', 'sex', 'comorbidities'],
        result_count: 750,
        status: 'completed'
    }
];

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [savedProcesses, setSavedProcesses] = useState([]);

    // Check if user is logged in on app start
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                
                // Load saved processes from localStorage or use mock data
                const savedProcessesKey = `savedProcesses_${parsedUser.id}`;
                const storedProcesses = localStorage.getItem(savedProcessesKey);
                
                if (storedProcesses) {
                    try {
                        const parsedProcesses = JSON.parse(storedProcesses);
                        setSavedProcesses(parsedProcesses);
                    } catch (error) {
                        console.error('Error parsing saved processes:', error);
                        setSavedProcesses(MOCK_SAVED_PROCESSES);
                    }
                } else {
                    // Load mock processes for authenticated user and save them
                    setSavedProcesses(MOCK_SAVED_PROCESSES);
                    localStorage.setItem(savedProcessesKey, JSON.stringify(MOCK_SAVED_PROCESSES));
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
            }
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            setLoading(true);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Check mock users (allow both username and email)
            let mockUser = MOCK_USERS[username];
            if (!mockUser) {
                // Try to find by email
                mockUser = Object.values(MOCK_USERS).find(u => u.email === username);
            }
            
            if (mockUser && mockUser.password === password) {
                // Generate mock token
                const token = `mock_token_${Date.now()}`;
                
                // Remove password from user object
                const { password: _, ...userWithoutPassword } = mockUser;
                
                // Store in localStorage
                localStorage.setItem('authToken', token);
                localStorage.setItem('userData', JSON.stringify(userWithoutPassword));
                
                setUser(userWithoutPassword);
                
                // Load saved processes from localStorage or use mock data
                const savedProcessesKey = `savedProcesses_${userWithoutPassword.id}`;
                const storedProcesses = localStorage.getItem(savedProcessesKey);
                
                if (storedProcesses) {
                    try {
                        const parsedProcesses = JSON.parse(storedProcesses);
                        setSavedProcesses(parsedProcesses);
                    } catch (error) {
                        console.error('Error parsing saved processes:', error);
                        setSavedProcesses(MOCK_SAVED_PROCESSES);
                        localStorage.setItem(savedProcessesKey, JSON.stringify(MOCK_SAVED_PROCESSES));
                    }
                } else {
                    setSavedProcesses(MOCK_SAVED_PROCESSES);
                    localStorage.setItem(savedProcessesKey, JSON.stringify(MOCK_SAVED_PROCESSES));
                }
                
                return { success: true };
            } else {
                throw new Error('Ungültige Anmeldedaten');
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const register = async (email, password, firstName, lastName) => {
        try {
            setLoading(true);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Check if user already exists
            const existingUser = Object.values(MOCK_USERS).find(u => u.email === email);
            if (existingUser) {
                throw new Error('Email existiert bereits');
            }
            
            // Create new mock user (for this session)
            const username = email.split('@')[0]; // Use email prefix as username
            const newUser = {
                id: Object.keys(MOCK_USERS).length + 1,
                username,
                email,
                first_name: firstName,
                last_name: lastName,
                created_at: new Date().toISOString()
            };
            
            // Add to mock users (only for this session)
            MOCK_USERS[username] = { ...newUser, password };
            
            // Generate mock token
            const token = `mock_token_${Date.now()}`;
            
            // Store in localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('userData', JSON.stringify(newUser));
            
            setUser(newUser);
            setSavedProcesses([]); // New user has no saved processes
            
            return { success: true };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setUser(null);
        setSavedProcesses([]);
    };

    const getAuthToken = () => {
        return localStorage.getItem('authToken');
    };

    // Mock API functions for saved processes
    const getSavedProcesses = async () => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        return savedProcesses;
    };

    const deleteProcess = async (processId) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        setSavedProcesses(prev => prev.filter(p => p.id !== processId));
        return { success: true };
    };

    const downloadProcessResults = async (processId) => {
        // Simulate download
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const process = savedProcesses.find(p => p.id === processId);
        if (!process) {
            throw new Error('Prozess nicht gefunden');
        }
        
        // Create mock CSV content
        const csvContent = `ID,Group,${process.control_variables.join(',')}\n1,Treatment,25,M,High\n2,Control,30,F,Low\n`;
        
        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${process.name}_results.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        return { success: true };
    };

    const saveMatchingProcess = async (processData) => {
        if (!user) {
            throw new Error('Benutzer muss angemeldet sein');
        }
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Create new process with unique ID
        const newProcess = {
            id: Date.now(), // Simple ID generation
            name: processData.name || `Matching ${new Date().toLocaleDateString()}`,
            created_at: new Date().toISOString(),
            matching_method: processData.matchingMethod,
            algorithm: processData.algorithm,
            target_variable: processData.targetVariable,
            control_variables: processData.controlVariables,
            ratio: processData.ratio,
            score_method: processData.scoreMethod,
            replacement: processData.replacement,
            tolerance: processData.tolerance,
            result_count: processData.resultCount || 0,
            status: 'saved'
        };
        
        // Add to saved processes
        setSavedProcesses(prev => [newProcess, ...prev]);
        
        // Also save to localStorage for persistence
        const updatedProcesses = [newProcess, ...savedProcesses];
        localStorage.setItem(`savedProcesses_${user.id}`, JSON.stringify(updatedProcesses));
        
        return { success: true, process: newProcess };
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading,
        getAuthToken,
        isAuthenticated: !!user,
        savedProcesses,
        getSavedProcesses,
        deleteProcess,
        downloadProcessResults,
        saveMatchingProcess
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
