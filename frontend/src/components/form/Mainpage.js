import '../../App.css';
import { Link } from 'react-router-dom';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { visitedSite } from "../NavB";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { CardHeader } from "@mui/material";
import Card from "@mui/material/Card";

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

function Mainpage({ setMatchingStart, isDisclaimer, setWorkflow }) {

    const [maske, setMaske] = React.useState('');

    const handleChange = (event) => {
        setMaske(event.target.value);
    };

    const [open, setOpen] = React.useState({ isDisclaimer });

    const handleClose = () => {
        setOpen(false);
    };



    return (

        <Card sx={{ borderRadius: '10px 10px 10px 10px' }}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{ fontSize: 14, color: "text.secondary" }}
                sx={{ backgroundColor: "#E9F0FF", width: "100%" }}
            />

            <CardContent sx={{
                width: '100%',
                height: '500px',
                border: '1px solid black',
                padding: '10px',
                position: 'relative'
            }}>








                <div sx={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px'
                }}>

                    <Link style={{ textDecoration: "none" }} to='/Datenquelle' onClick={() => {
                        setWorkflow("Datenquelle");
                        visitedSite("datenquelle");
                    }}>
                        <Button >
                            Start
                        </Button>
                    </Link>

                </div>


            </CardContent>
        </Card>


    );
}

export default Mainpage;
