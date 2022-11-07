import '../../App.css';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {DataGrid} from "@mui/x-data-grid";
import {styled} from "@mui/material/styles";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import Card from "@mui/material/Card";
import {useState} from "react";
import {FormGroup} from "@material-ui/core";
import Box from "@mui/material/Box";


function MatchingAlgorithmus({setAlgorithmus}) {

    const [value, setValue] = React.useState(2);
    const [isActiveOM, setIsActiveOM] = useState(false);
    const [isActiveNNM, setIsActiveNNM] = useState(false);

    function handleClickOptionNNM(){
        if(!isActiveOM){
            setIsActiveNNM(current => !current);
            setAlgorithmus("NearestNeighbour");
        }

    }

    function handleClickOptionOM () {
        if(!isActiveNNM){
            setIsActiveOM(current => !current);
            setAlgorithmus("OptimalMatching");}


    }

    const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
      color: grey;
      &.Mui-selected {
        color: #1d4189;
      };
    `);

    return (
        <CardContent sx={{backgroundColor: "white", width: "200%"}}>

            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                Matching-Algorithmus
            </Typography>

            <table style={{width: "100%", height: "100%"}}>
                <tbody>
                <tr style={{
                    height: "85%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                }}>
                    <FormGroup style={{display:"flex", flexFlow:"row", justifyContent:"space-evenly", gap:"100px"}}>
                        <Box onClick={handleClickOptionNNM}
                             style={{
                                 backgroundColor: isActiveNNM? "#1d4189":'rgba(211,211,211, 0.8)',
                                 color: isActiveNNM? "white":"#666666",
                                 fontSize:"large",
                                 display: "flex",
                                 width: "15rem",
                                 height: "8rem",
                                 alignItems:"center",
                                 justifyContent: "space-evenly",
                                 borderRadius: "15px",
                                 boxShadow: isActiveNNM? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                             }}
                        > Nearest Neighbour <br/>Matching (NNM)
                        </Box>
                        <Box
                            style={{
                                backgroundColor: isActiveOM? "#1d4189":'rgba(211,211,211, 0.8)',
                                color: isActiveOM? "white":"#666666",
                                fontSize:"large",
                                display: "flex",
                                width: "15rem",
                                height: "8rem",
                                alignItems:"center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActiveOM ?"#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                            }}
                            onClick={handleClickOptionOM}
                        > Optimal Matching (OM)
                        </Box>
                    </FormGroup>
                </tr>

                <tr style={{ height: "15%", display:"flex", float:"right"}}>
                    <BottomNavigation showLabels value={value} onChange={(event, newValue) => {setValue(newValue);}} >
                        <BottomNavigationAction variant="outlined" label="Zurück" icon={<ArrowCircleLeftIcon/>}
                                                component={Link} to='/MethodeScoreBerechnung'/>
                        <BottomNavigationAction variant="outlined" label="Löschen" icon={<DeleteIcon/>}/>
                        <BottomNavigationAction variant="fill" label="Weiter" icon={<ArrowCircleRightIcon/>}
                                                component={Link} to='/ÜbereinstimmungPropensityScore'/>
                    </BottomNavigation>
                </tr>
                </tbody></table>
        </CardContent>
    );

}

export default MatchingAlgorithmus;
