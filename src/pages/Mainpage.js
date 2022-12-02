import '../App.css';
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
import {visitedSite} from "../components/NavB";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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

function Mainpage() {

    const [age, setAge] = React.useState('');


    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };
    return (
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Matching
                </Typography>
                <br/><br/>
                <Typography variant="h4">
                    Willkommen beim
                    Beobachtungsstudien-Assistent
                </Typography>
                <br/><br/>
                <Typography variant="h6">
                    Mithilfe des Beobachtungsstudien-Assistenten können Sie anhand verschiedener Methoden in Ihrer Patientenliste Patienten mit bestimmten Kritierien selektieren.
                </Typography>

                <br/><div>
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
                        <Typography gutterBottom>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                            consectetur ac, vestibulum at eros.
                        </Typography>
                        <Typography gutterBottom>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                        </Typography>
                        <Typography gutterBottom>
                            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                            ullamcorper nulla non metus auctor fringilla.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled" autoFocus onClick={handleClose}>
                            Verstanden
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </div><br/>
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

                <br/><br/>
                <div style={{ height: "8%", float:"right", width:"12%"}}>
                    <Link style={{textDecoration: "none"}} to ='/Datenquelle' onClick={()=>visitedSite("datenquelle")}>
                        <Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled" startIcon={<PlayCircleFilledIcon />}>
                        Start
                    </Button>
                    </Link>
                </div>
        </CardContent>

    );
}

export default Mainpage;
