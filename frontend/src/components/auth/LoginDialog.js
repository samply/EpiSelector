import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Tab,
    Tabs,
    Box,
    Alert,
    CircularProgress
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function LoginDialog({ open, onClose }) {
    const [tabValue, setTabValue] = useState(0);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ 
        email: '', 
        password: '', 
        confirmPassword: '', 
        firstName: '', 
        lastName: '' 
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login, register } = useAuth();

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!loginData.email || !loginData.password) {
            setError('Bitte füllen Sie alle Felder aus');
            setLoading(false);
            return;
        }

        const result = await login(loginData.email, loginData.password);
        
        if (result.success) {
            onClose();
            setLoginData({ email: '', password: '' });
        } else {
            setError(result.error || 'Login fehlgeschlagen');
        }
        setLoading(false);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!registerData.email || !registerData.password || !registerData.firstName || !registerData.lastName) {
            setError('Bitte füllen Sie alle Felder aus');
            setLoading(false);
            return;
        }

        if (registerData.password !== registerData.confirmPassword) {
            setError('Passwörter stimmen nicht überein');
            setLoading(false);
            return;
        }

        if (registerData.password.length < 6) {
            setError('Passwort muss mindestens 6 Zeichen lang sein');
            setLoading(false);
            return;
        }

        const result = await register(
            registerData.email, 
            registerData.password, 
            registerData.firstName, 
            registerData.lastName
        );
        
        if (result.success) {
            onClose();
            setRegisterData({ 
                email: '', 
                password: '', 
                confirmPassword: '', 
                firstName: '', 
                lastName: '' 
            });
        } else {
            setError(result.error || 'Registrierung fehlgeschlagen');
        }
        setLoading(false);
    };

    const handleClose = () => {
        setError('');
        setLoginData({ email: '', password: '' });
        setRegisterData({ 
            email: '', 
            password: '', 
            confirmPassword: '', 
            firstName: '', 
            lastName: '' 
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Tabs value={tabValue} onChange={handleTabChange} centered>
                    <Tab label="Anmelden" />
                    <Tab label="Registrieren" />
                </Tabs>
            </DialogTitle>
            
            <DialogContent>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {/* Login Tab */}
                <TabPanel value={tabValue} index={0}>
                    <form onSubmit={handleLogin}>
                        <TextField
                            fullWidth
                            label="E-Mail"
                            type="email"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Passwort"
                            type="password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            margin="normal"
                            required
                        />
                    </form>
                </TabPanel>

                {/* Register Tab */}
                <TabPanel value={tabValue} index={1}>
                    <form onSubmit={handleRegister}>
                        <TextField
                            fullWidth
                            label="Vorname"
                            value={registerData.firstName}
                            onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Nachname"
                            value={registerData.lastName}
                            onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="E-Mail"
                            type="email"
                            value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Passwort"
                            type="password"
                            value={registerData.password}
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Passwort bestätigen"
                            type="password"
                            value={registerData.confirmPassword}
                            onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                            margin="normal"
                            required
                        />
                    </form>
                </TabPanel>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>
                    Abbrechen
                </Button>
                {tabValue === 0 ? (
                    <Button 
                        onClick={handleLogin} 
                        variant="contained"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        Anmelden
                    </Button>
                ) : (
                    <Button 
                        onClick={handleRegister} 
                        variant="contained"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        Registrieren
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

export default LoginDialog;
