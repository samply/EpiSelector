import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import Label from '@mui/icons-material/Label';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CircleIcon from '@mui/icons-material/Circle';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import {Link} from 'react-router-dom';


const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '&.Mui-expanded': {
            fontWeight: theme.typography.fontWeightRegular,
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: 'var(--tree-view-color)',
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: 'inherit',
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2),
        },
    },
}));

function StyledTreeItem(props) {
    const {
        bgColor,
        color,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        ...other
    } = props;

    return (
        <StyledTreeItemRoot classname="NavBStyle"
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                    <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </Box>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            {...other}
        />
    );
}

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
};

export default function GmailTreeView() {
    return (
        <TreeView
            aria-label="gmail"
            defaultExpanded={['4']}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
            sx={{ height: 700, flexGrow: 1, maxWidth: 400, overflowY: 'auto', border: 'solid' }}
        >
            <Link to='/mainpage'><StyledTreeItem nodeId="1" labelText="Startseite" labelIcon={CircleIcon} /></Link>
            <Link to='/betapage'>
                <StyledTreeItem nodeId="2" labelText="Datenimport" labelIcon={CircleIcon}>
                    <StyledTreeItem
                        nodeId="19"
                        labelText="Datenquelle"
                        labelIcon={CircleOutlinedIcon}
                        labelInfo=""
                        color="#e3742f"
                        bgColor="#fcefe3"
                    />
                    <Link to='/uploadData'><StyledTreeItem
                    nodeId="20"
                    labelText="Datei hochladen"
                    labelIcon={CircleOutlinedIcon}
                    labelInfo=""
                    color="#e3742f"
                    bgColor="#fcefe3"
                    /></Link>
                </StyledTreeItem>
            </Link>
            <StyledTreeItem nodeId="3" labelText="Matching Methode" labelIcon={CircleIcon} />
            <StyledTreeItem nodeId="4" labelText="Matching - nach Variablen" labelIcon={CircleIcon}>
                <StyledTreeItem
                    nodeId="5"
                    labelText="Matchingvariablen"
                    labelIcon={CircleOutlinedIcon}
                    labelInfo=""
                    color="#e3742f"
                    bgColor="#fcefe3"
                />
                <StyledTreeItem
                    nodeId="6"
                    labelText="Matchingtoleranz"
                    labelIcon={CircleOutlinedIcon}
                    labelInfo=""
                    color="#a250f5"
                    bgColor="#f3e8fd"
                />
                <StyledTreeItem
                    nodeId="7"
                    labelText="Matching Verhältnis"
                    labelIcon={CircleOutlinedIcon}
                    labelInfo=""
                    color="#3c8039"
                    bgColor="#e6f4ea"
                />
                <StyledTreeItem
                    nodeId="8"
                    labelText="Matching Algorithmus"
                    labelIcon={CircleOutlinedIcon}
                    labelInfo=""
                    color="#3c8039"
                    bgColor="#e6f4ea"
                />
                <StyledTreeItem
                    nodeId="9"
                    labelText="Matching Ergebnis"
                    labelIcon={CircleOutlinedIcon}
                    labelInfo=""
                    color="#3c8039"
                    bgColor="#e6f4ea"
                />
            </StyledTreeItem>
            <StyledTreeItem nodeId="11" labelText="Matching - Propensity-Score" labelIcon={CircleIcon}>
                <StyledTreeItem nodeId="12" labelText="Variablen auswählen" labelIcon={CircleIcon}>
                    <StyledTreeItem
                        nodeId="17"
                        labelText="Zielvariable"
                        labelIcon={CircleOutlinedIcon}
                        labelInfo=""
                        color="#e3742f"
                        bgColor="#fcefe3"
                    />
                    <StyledTreeItem
                        nodeId="18"
                        labelText="Kontrollvariablen"
                        labelIcon={CircleOutlinedIcon}
                        labelInfo=""
                        color="#e3742f"
                        bgColor="#fcefe3"
                    />
                </StyledTreeItem>
                <StyledTreeItem
                    nodeId="13"
                    labelText="Bereich der Übereinstimmung der Propensity Scores"
                    labelIcon={CircleOutlinedIcon}
                    labelInfo=""
                    color="#a250f5"
                    bgColor="#f3e8fd"
                />
                <StyledTreeItem
                    nodeId="14"
                    labelText="Matching Verhältnis"
                    labelIcon={CircleOutlinedIcon}
                    labelInfo=""
                    color="#3c8039"
                    bgColor="#e6f4ea"
                />
                <StyledTreeItem
                    nodeId="15"
                    labelText="Matching Algorithmus"
                    labelIcon={CircleOutlinedIcon}
                    labelInfo=""
                    color="#3c8039"
                    bgColor="#e6f4ea"
                />
                <StyledTreeItem
                    nodeId="16"
                    labelText="Matching Ergebnis"
                    labelIcon={CircleOutlinedIcon}
                    labelInfo=""
                    color="#3c8039"
                    bgColor="#e6f4ea"
                />
            </StyledTreeItem>
            <StyledTreeItem nodeId="10" labelText="Datenexport" labelIcon={CircleIcon} />
        </TreeView>
    );
}