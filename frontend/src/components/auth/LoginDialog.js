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
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [registerData, setRegisterData] = useState({ 
        username: '',
        password: '', 
        confirmPassword: ''
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

        if (!loginData.username || !loginData.password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        console.log('🔑 Login attempt for:', loginData.username);
        
        const result = await login(loginData.username, loginData.password);
        
        if (result.success) {
            console.log('✅ Login successful');
            onClose();
            setLoginData({ username: '', password: '' });
        } else {
            console.error('❌ Login failed:', result.message);
            setError(result.message || 'Login failed');
        }
        setLoading(false);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!registerData.username || !registerData.password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        if (registerData.password !== registerData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (registerData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        console.log('📝 Registration attempt for:', registerData.username);

        const result = await register(registerData.username, registerData.password);
        
        if (result.success) {
            console.log('✅ Registration successful');
            onClose();
            setRegisterData({ 
                username: '',
                password: '', 
                confirmPassword: ''
            });
        } else {
            console.error('❌ Registration failed:', result.message);
            setError(result.message || 'Registration failed');
        }
        setLoading(false);
    };

    const handleClose = () => {
        setError('');
        setLoginData({ username: '', password: '' });
        setRegisterData({ 
            username: '',
            password: '', 
            confirmPassword: ''
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Tabs value={tabValue} onChange={handleTabChange} centered>
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>
            </DialogTitle>
            
            <DialogContent>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                
                {/* Demo Login Information */}
                <Alert severity="info" sx={{ mb: 2 }}>
                    <strong>Demo Mode Available:</strong><br/>
                    Username: <code>demo</code> | Password: <code>demo</code><br/>
                    Username: <code>test</code> | Password: <code>test</code><br/>
                    Username: <code>admin</code> | Password: <code>admin</code>
                </Alert>

                {/* Login Tab */}
                <TabPanel value={tabValue} index={0}>
                    <form onSubmit={handleLogin}>
                        <TextField
                            fullWidth
                            label="Username"
                            value={loginData.username}
                            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Password"
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
                            label="Username"
                            value={registerData.username}
                            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={registerData.password}
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Confirm Password"
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
                    Cancel
                </Button>
                {tabValue === 0 ? (
                    <Button 
                        onClick={handleLogin} 
                        variant="contained"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        Login
                    </Button>
                ) : (
                    <Button 
                        onClick={handleRegister} 
                        variant="contained"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        Register
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

export default LoginDialog;
