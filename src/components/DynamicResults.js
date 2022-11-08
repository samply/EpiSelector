import '../App.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import * as React from 'react';
import Typography from '@mui/material/Typography';


function DynamicResults() {

    return (
    <Box>
        <Card variant="outlined" className="dynamicResults">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Matching-Ergebnisse
                    </Typography>
                </CardContent>
        </Card>
    </Box>
    );
}

export default DynamicResults;
