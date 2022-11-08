import '../App.css';
import {Link} from 'react-router-dom';
import * as React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BottomNavigation from "@mui/material/BottomNavigation";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';


function Mainpage() {

    const [age, setAge] = React.useState('');


    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <React.Fragment className="Mainpage">
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Matching
                </Typography>
<br/><br/><br/>
                <Typography variant="h4">
                    Willkommen beim
                    Beobachtungsstudien-Assistent
                </Typography>
<br/><br/>
                <Typography variant="h6">
                    Mithilfe des Beobachtungsstudien-Assistenten können Sie anhand verschiedener Methoden in Ihrer Patientenliste Patienten mit bestimmten Kritierien selektieren.
                </Typography>

                <br/><br/>
                <Typography variant="body">
                    Optional können Sie eine Maske anwenden:
                </Typography>
<br/><br/>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Maske</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={age}
                        label="Maske"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Maske 1</MenuItem>
                        <MenuItem value={20}>Maske 2</MenuItem>
                        <MenuItem value={30}>Maske 3</MenuItem>
                    </Select>
                </FormControl>

                <br/><br/><br/>
                <div style={{width:"100%", height:"30%"}}>
                    <Link to ='/Datenquelle'>
                        <Button style={{float:"right", marginRight:"5%", backgroundColor:"#4B92DB", color:"white", border:"none"}} variant="outlined" startIcon={<PlayCircleFilledIcon />}>
                        Start
                    </Button>
                    </Link>
                </div>
        </CardContent>

        </React.Fragment>
    );
}

export default Mainpage;
