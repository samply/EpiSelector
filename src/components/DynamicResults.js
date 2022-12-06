import '../App.css';
import CardContent from '@mui/material/CardContent';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import {CardHeader} from "@mui/material";
import Card from "@mui/material/Card";


function DynamicResults() {

    return (
<div className="dynamicResults">
        <Card sx={{width:"100%", minHeight:"100%"}}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize:14, color:"text.secondary"}}
                sx={{backgroundColor:"#E9F0FF", minWidth:"100%"}}/>

            <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Matching-Ergebnisse
                    </Typography>
                </CardContent>
        </Card>
</div>
    );
}

export default DynamicResults;
