import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Info, Person, Lock } from '@mui/icons-material';

function DemoInfo() {
    return (
        <Card sx={{ 
            position: 'fixed', 
            bottom: 20, 
            right: 20, 
            maxWidth: 300, 
            zIndex: 1000,
            backgroundColor: '#f5f5f5',
            border: '2px solid #2196f3'
        }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Info color="primary" />
                    <Typography variant="h6" color="primary">
                        Demo-Modus
                    </Typography>
                </Box>
                
                <Typography variant="body2" sx={{ mb: 2 }}>
                    Testbenutzer für Demo:
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Person fontSize="small" />
                        <Typography variant="body2">
                            <strong>Benutzername:</strong> testuser
                        </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Lock fontSize="small" />
                        <Typography variant="body2">
                            <strong>Passwort:</strong> 123123
                        </Typography>
                    </Box>
                </Box>
                
                <Box sx={{ mt: 2 }}>
                    <Chip 
                        label="Nur Frontend-Demo" 
                        size="small" 
                        color="info" 
                        variant="outlined"
                    />
                </Box>
            </CardContent>
        </Card>
    );
}

export default DemoInfo;
