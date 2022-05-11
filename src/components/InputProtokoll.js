import '../App.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import * as React from 'react';
import Typography from '@mui/material/Typography';



function InputProtokoll() {
    return (
        <Box>
            <Card variant="outlined" className="InputProtokoll">
                <React.Fragment>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Eingaben
                        </Typography>
                    </CardContent>
                </React.Fragment>
            </Card>
        </Box>

    );
}

export default InputProtokoll;