import React, { useState, useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import '../App.css';
import Typography from '@mui/material/Typography';
import { Button, Box, Menu, MenuItem, Avatar, IconButton } from '@mui/material';
import { Person, AccountCircle } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import AppContext from '../AppContext';
import LoginDialog from './auth/LoginDialog';


function TopNav({setWorkflow, setDatenquelle, setDatei, setMatchingMethode, setZielvariable, setKontrollvariablen, setVerhältnis, setScoreMethode, setAlgorithmus,setErsetzung, setÜbereinstimmungswert}) {
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { currentUser, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    
    // AppContext für fallback falls Props nicht verfügbar sind
    const appContext = useContext(AppContext);

    const linkStyle = {
        textDecoration: "none",
        color: 'white'
    };

    const deleteAllData = () => {
        // Verwende Props falls verfügbar, ansonsten AppContext
        const setters = {
            setDatenquelle: setDatenquelle || appContext?.setDatenquelle,
            setDatei: setDatei || appContext?.setDatei,
            setMatchingMethode: setMatchingMethode || appContext?.setMatchingMethode,
            setZielvariable: setZielvariable || appContext?.setZielvariable,
            setKontrollvariablen: setKontrollvariablen || appContext?.setKontrollvariablen,
            setVerhältnis: setVerhältnis || appContext?.setVerhältnis,
            setScoreMethode: setScoreMethode || appContext?.setScoreMethode,
            setAlgorithmus: setAlgorithmus || appContext?.setAlgorithmus,
            setErsetzung: setErsetzung || appContext?.setErsetzung,
            setÜbereinstimmungswert: setÜbereinstimmungswert || appContext?.setÜbereinstimmungswert,
            setWorkflow: setWorkflow || appContext?.setWorkflow
        };

        // Nur aufrufen wenn verfügbar
        if (setters.setDatenquelle) setters.setDatenquelle("defaultQuelle");
        if (setters.setDatei) setters.setDatei("defaultQuelle");
        if (setters.setMatchingMethode) setters.setMatchingMethode("defaultMethode");
        if (setters.setZielvariable) setters.setZielvariable("defaultZielvariable");
        if (setters.setKontrollvariablen) setters.setKontrollvariablen("defaultKontrollvariablen");
        if (setters.setVerhältnis) setters.setVerhältnis("defaultVerhältnis");
        if (setters.setScoreMethode) setters.setScoreMethode("defaultScoreMethode");
        if (setters.setAlgorithmus) setters.setAlgorithmus("defaultAlgo");
        if (setters.setErsetzung) setters.setErsetzung("defaultErsetz");
        if (setters.setÜbereinstimmungswert) setters.setÜbereinstimmungswert("defaultÜberinstimmungswert");
        if (setters.setWorkflow) setters.setWorkflow("Startseite");
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleMenuClose();
        deleteAllData(); // Reset all form data on logout
    };

    const handleProfileClick = () => {
        handleMenuClose();
        navigate('/profile'); // Navigate to profile page
    };

    return (
        <div className="TopNav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ paddingTop:"1%", paddingBottom:"0.5%", paddingLeft:"2%"}}>
                <Link to='/Startseite' onClick={deleteAllData} style={linkStyle}>EpiSelector</Link>
            </Typography>
            
            <Box sx={{ paddingRight: "2%", display: 'flex', alignItems: 'center', gap: 1 }}>
                {isAuthenticated ? (
                    <>
                        <Typography variant="body2" sx={{ color: 'white', mr: 1 }}>
                            Willkommen, {currentUser?.first_name || currentUser?.username}
                        </Typography>
                        <IconButton
                            onClick={handleMenuOpen}
                            sx={{ color: 'white' }}
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleProfileClick}>
                                Mein Profil
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                Abmelden
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Button
                        variant="outlined"
                        sx={{ 
                            color: 'white', 
                            borderColor: 'white',
                            '&:hover': {
                                borderColor: 'white',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                        onClick={() => setLoginDialogOpen(true)}
                        startIcon={<Person />}
                    >
                        Login
                    </Button>
                )}
            </Box>
            
            <LoginDialog
                open={loginDialogOpen}
                onClose={() => setLoginDialogOpen(false)}
            />
        </div>
    );
}

export default TopNav;
