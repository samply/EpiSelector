import React, { useState, useEffect, useContext } from 'react';
import { CardHeader, Typography, Box, CircularProgress } from "@mui/material";
import Card from "@mui/material/Card";
import AppContext from "../AppContext";

import FHSPSOE from '../assets/FHS_PS_OE.json';
import FHSPSME from '../assets/FHS_PS_ME.json';
import FHSEMMT from '../assets/FHS_EM_MT.json';
import FHSEMOT from '../assets/FHS_EM_OT.json';

function DynamicResults() {
    const { isMatchingMethode, isErsetzung, isToleranzBereichSet } = useContext(AppContext);

    const [loading, setLoading] = useState(true);
    const [balancedCount, setBalancedCount] = useState(0);
    const [notBalancedCount, setNotBalancedCount] = useState(0);
    const [results, setResults] = useState([]);

    useEffect(() => {
        let file;

        if (isMatchingMethode === "Propensity Score" && isErsetzung === "FALSE") {
            console.log("Loading FHSPSOE...");
            file = FHSPSOE;
        } else if (isMatchingMethode === "Propensity Score" && isErsetzung === "TRUE") {
            console.log("Loading FHSPSME...");
            file = FHSPSME;
        } else if (isMatchingMethode === "Exaktes Matching" && isToleranzBereichSet === "FALSE") {
            console.log("Loading FHSEMOT...");
            file = FHSEMOT;
        } else if (isMatchingMethode === "Exaktes Matching" && isToleranzBereichSet === "TRUE") {
            console.log("Loading FHSEMMT...");
            file = FHSEMMT;
        }

        console.log("Loaded file:", file);

        if (file) {
            let balanced = 0;
            let notBalanced = 0;

            file.forEach(item => {
                if (item.balance_covariats_post_matching === "Balanced") {
                    balanced++;
                } else {
                    notBalanced++;
                }
            });

            setBalancedCount(balanced);
            setNotBalancedCount(notBalanced);
            setResults(file);
            setLoading(false);
        }
    }, [isMatchingMethode, isErsetzung, isToleranzBereichSet]);

    return (
        <Card sx={{ width: "100%", minHeight: "100%", borderRadius: '10px 10px 10px 10px' }}>
            <CardHeader
                title="Matching-Ergebnisse"
                titleTypographyProps={{ fontSize: 14, color: "text.secondary" }}
                sx={{ backgroundColor: "#E9F0FF", minWidth: "100%" }}
            />
           {/* <Box display="flex" justifyContent="flex-start" alignItems="center" width="100%" style={{paddingLeft:"2%", paddingTop:"2%"}}>
                {!loading && (
                    <Box position="relative" display="inline-flex">
                        <CircularProgress variant="determinate" value={(balancedCount / (balancedCount + notBalancedCount)) * 100} size={200} color="primary" />
                        <Box
                            top={0}
                            left={0}
                            bottom={0}
                            right={0}
                            position="absolute"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography variant="subtitle1" component="div" color="textSecondary">
                                {`${balancedCount} von ${balancedCount + notBalancedCount} Balanced`}
                            </Typography>
                        </Box>
                    </Box>
                )}
                {loading && <CircularProgress size={200} color="primary" />}
            </Box>
            <Box display="flex" justifyContent="flex-start" mt={2} style={{paddingLeft:"2%", paddingTop:"2%"}}>
                <Typography variant="subtitle1" component="div">
                    <Box fontWeight="bold" color="primary.main">Balanced</Box>
                </Typography>
                <Typography variant="subtitle1" component="div" ml={2}>
                    <Box fontWeight="bold" color="orange">Not Balanced</Box>
                </Typography>
            </Box>*/}
        </Card>
    );
}

export default DynamicResults;
