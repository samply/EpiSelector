import '../../App.css';
import {Link} from 'react-router-dom';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import {visitedSite} from "../NavB";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {CardHeader} from "@mui/material";
import Card from "@mui/material/Card";
import Grid from '@mui/material/Grid';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

function Mainpage({setMatchingStart, isDisclaimer, setWorkflow}) {

    const [maske, setMaske] = React.useState('');

    const handleChange = (event) => {
        setMaske(event.target.value);
    };

    const [open, setOpen] = React.useState({isDisclaimer});

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card sx={{width: "100%", borderRadius: '10px 10px 10px 10px', position: 'relative'}}>

            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize: 14, color: "text.secondary"}}
                sx={{backgroundColor: "#E9F0FF", minWidth: "100%"}}/>

            <CardContent>

                <br/>
                <Typography variant="h4">
                    Welcome to EpiSelector, <br/>
                   your observational study assistant
                </Typography>
                <br/><br/>
                <Typography variant="h6">
                    The observational study assistant helps you build comparison groups from your dataset based on criteria you define. EpiSelector offers several methods for this.
                </Typography><br/>
                <Typography component="div">
                    <strong>Please note:</strong> <br/>
                    Depending on the study design, by treated individuals or the treatment group we also mean
                   <ul>
                       <li>cases and</li>
                    <li>exposed individuals</li></ul></Typography>

                <br/>
                <div>
                    <br/>

                    <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Disclaimer
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <Typography textAlign={"justify"}>
                                This observational study assistant was created with the greatest possible care.
                                However, the provider of this application accepts no liability for the correctness
                                and currency of the matching procedures provided or the associated content and
                                information. Use of this application is at your own risk and does not replace
                                consulting a statistician or epidemiologist.
                                <br/><br/>
                                The study assistant is based on the free and openly available software R (R Core
                                Team, 2022) and R packages. Matching is performed with the “MatchIt” package
                                (Ho, 2011), covariate balance is assessed with the “cobalt” package (Greifer, 2022),
                                and graphics are created with the “ggplot2” package.<br/><br/>
                                EpiSelector does not perform data preparation or handle missing data. Users are responsible for assessing missingness and choosing an appropriate strategy, such as multiple imputation or complete-case analysis, as this may affect bias, sample size, and generalizability (<a href="https://doi.org/10.1093/ije/dyz032">Hughes et al. 2019</a>; <a href="https://doi.org/10.1136/bmj.b2393">Sterne et al. 2009</a>; <a href="https://doi.org/10.1002/sim.3944">White et al. 2010</a>).<br/><br/>
                                EpiSelector supports the selection of comparison groups but does not perform subsequent statistical analyses. Users are responsible for applying analytical methods appropriate to the matching design (e.g., 1:n matching, matching with replacement, matching sets, matching weights, and dependencies between observations); failure to account for these characteristics may lead to inaccurate standard errors and statistical inference (<a href="https://doi.org/10.1111/j.1468-0262.2006.00655.x">Abadie et al. 2006</a>; <a href="https://doi.org/10.1080/01621459.2020.1840383">Abadie et al. 2022</a>; <a href="https://doi.org/10.1080/00273171.2011.568786">Austin 2011</a>; <a href="https://doi.org/10.1002/sim.8502">Austin et al. 2020</a>; <a href="https://stat.ethz.ch/CRAN/web/packages/MatchIt/vignettes/estimating-effects.html">Greifer 2026</a>; <a href="https://doi.org/10.1002/sim.4200">Austin 2011</a>).
                            </Typography>
                            <br/>
                            <Typography textAlign={"justify"} fontSize={"x-small"} gutterBottom>
                                Daniel E. Ho, Kosuke Imai, Gary King, Elizabeth A. Stuart (2011). MatchIt: Nonparametric
                                Preprocessing for Parametric Causal Inference. Journal of Statistical Software, Vol. 42,
                                No. 8, pp. 1-28.
                                <Link
                                    href={"https://doi.org/10.18637/jss.v042.i08"}>https://doi.org/10.18637/jss.v042.i08</Link>
                            </Typography>
                            <Typography textAlign={"justify"} fontSize={"x-small"}>Greifer N (2022). _cobalt: Covariate
                                Balance Tables and Plots_. R package version 4.4.0,
                                <Link
                                    href={"https://CRAN.R-project.org/package=cobalt"}>https://CRAN.R-project.org/package=cobalt</Link></Typography>
                            <Typography textAlign={"justify"} fontSize={"x-small"}> H. Wickham. ggplot2: Elegant
                                Graphics for Data Analysis. Springer-Verlag New York, 2016.
                                <Link
                                    href={"https://ggplot2.tidyverse.org/"}>https://ggplot2.tidyverse.org/</Link></Typography>
                            <Typography textAlign={"justify"} fontSize={"x-small"}> R Core Team (2022). R: A language
                                and environment for statistical computing. R Foundation for Statistical Computing,
                                Vienna, Austria.
                                <Link href={"https://www.R-project.org/"}>https://www.R-project.org/</Link></Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button sx={{
                                height: "100%",
                                width: "auto",
                                color: "white",
                                border: "none",
                                backgroundColor: "#1d4189",
                                "&:hover": {backgroundColor: "#1d4189"}
                            }} variant="filled" autoFocus onClick={handleClose}>
                                Understood
                            </Button>
                        </DialogActions>
                    </BootstrapDialog>
                </div>
                <br/>
                {/* <Typography variant="body">
                    Optional können Sie eine Maske anwenden:
                </Typography>
                <br/><br/>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Maske</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={maske}
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
                </FormControl>*/}

                <br/><br/>

            </CardContent>
            <Grid container justifyContent="flex-end" sx={{ position: 'absolute', float:'right', bottom: 0, gap:'2%', width: '100%', padding: '8px', backgroundColor: '#f5f5f5' }}>
                <Grid item> <Link style={{textDecoration: "none"}} to='/Datenquelle' onClick={() => {
                    setWorkflow("Datenquelle");
                    visitedSite("datenquelle");
                }}>
                    <Button sx={{
                        height: "100%",
                        width: "auto",
                        color: "white",
                        border: "none",
                        backgroundColor: "#1d4189",
                        "&:hover": {backgroundColor: "#1d4189"}
                    }} variant="filled" startIcon={<PlayCircleFilledIcon/>}>
                        Start
                    </Button>
                </Link>
                </Grid>
            </Grid>
        </Card>
    );
}

export default Mainpage;
