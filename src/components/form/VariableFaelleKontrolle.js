import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import { AutoSizer, Column, Table } from 'react-virtualized';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";

const classes = {
    flexContainer: 'ReactVirtualizedDemo-flexContainer',
    tableRow: 'ReactVirtualizedDemo-tableRow',
    tableRowHover: 'ReactVirtualizedDemo-tableRowHover',
    tableCell: 'ReactVirtualizedDemo-tableCell',
    noClick: 'ReactVirtualizedDemo-noClick',
};

const styles = ({ theme }) => ({
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
        ...(theme.direction === 'rtl' && {
            paddingLeft: '0 !important',
        }),
        ...(theme.direction !== 'rtl' && {
            paddingRight: undefined,
        }),
    },
    [`& .${classes.flexContainer}`]: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    [`& .${classes.tableRow}`]: {
        cursor: 'pointer',
    },
    [`& .${classes.tableRowHover}`]: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    [`& .${classes.tableCell}`]: {
        flex: 1,
    },
    [`& .${classes.noClick}`]: {
        cursor: 'initial',
    },
});

class MuiVirtualizedTable extends React.PureComponent {
    static defaultProps = {
        headerHeight: 48,
        rowHeight: 48,
    };

    getRowClassName = ({ index }) => {
        const { onRowClick } = this.props;

        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };

    cellRenderer = ({ cellData, columnIndex }) => {
        const { columns, rowHeight, onRowClick } = this.props;
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{ height: rowHeight }}
                align={
                    (columnIndex != null && columns[columnIndex].numeric) || false
                        ? 'right'
                        : 'left'
                }
            >
                {cellData}
            </TableCell>
        );
    };

    headerRenderer = ({ label, columnIndex }) => {
        const { headerHeight, columns } = this.props;

        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{ height: headerHeight }}
                align={columns[columnIndex].numeric || false ? 'right' : 'left'}
            >
                <span>{label}</span>
            </TableCell>
        );
    };

    render() {
        const { columns, rowHeight, headerHeight, ...tableProps } = this.props;
        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        height={height}
                        width={width}
                        rowHeight={rowHeight}
                        gridStyle={{
                            direction: 'inherit',
                        }}
                        headerHeight={headerHeight}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                    >
                        {columns.map(({ dataKey, ...other }, index) => {
                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={(headerProps) =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index,
                                        })
                                    }
                                    className={classes.flexContainer}
                                    cellRenderer={this.cellRenderer}
                                    dataKey={dataKey}
                                    {...other}
                                />
                            );
                        })}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}

MuiVirtualizedTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            dataKey: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            numeric: PropTypes.bool,
            width: PropTypes.number.isRequired,
        }),
    ).isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowHeight: PropTypes.number,
};

const VirtualizedTable = styled(MuiVirtualizedTable)(styles);

// ---

const sample = [
    ['Frozen yoghurt', 159, 6.0],
    ['Ice cream sandwich', 237, 9.0],
    ['Eclair', 262, 16.0],
    ['Cupcake', 305, 3.7],
    ['Gingerbread', 356, 16.0],
];

function createData(id, variablen, gruppenindikator, fallID) {
    return { id, variablen, gruppenindikator, fallID};
}

const rows = [];

for (let i = 0; i < 200; i += 1) {
    const randomSelection = sample[Math.floor(Math.random() * sample.length)];
    rows.push(createData(i, ...randomSelection));
}

export default function VariableFaelleKontrolle() {

    const [value, setValue] = React.useState(2);
    const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
      color: grey;
      &.Mui-selected {
        color: #1d4189;
      };
    `);

    return (
        <React.Fragment className="Mainpage">
            <CardContent sx={{backgroundColor: "white", width: "100%"}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Variable Fälle und Kontrolle
                </Typography>
                <br/>
                <div style={{display:"flex",  height: 330, width: '60%', paddingLeft:"20%" }}>
            <VirtualizedTable
                rowCount={rows.length}
                rowGetter={({ index }) => rows[index]}
                columns={[
                    {
                        width: 200,
                        label: 'Variablen',
                        dataKey: 'variablen',
                    },
                    {
                        width: 200,
                        label: 'Gruppenindikator',
                        dataKey: '<checkbox/>',
                        numeric: true,
                    },
                    {
                        width: 200,
                        label: 'Fall-ID',
                        dataKey: '<checkbox/>',
                        numeric: true,
                    }

                ]}
            />
                </div>
                <br/>
    <BottomNavigation showLabels value={value} onChange={(event, newValue) => {setValue(newValue);}} >
        <BottomNavigationAction label="Zurück" icon={<ArrowCircleLeftIcon />} component={Link} to='/Matchingtoleranz'/>
        <BottomNavigationAction label="Löschen" icon={<DeleteIcon />} />
        <BottomNavigationAction label="Weiter" icon={<ArrowCircleRightIcon />} component={Link} to='/Matching-Verhältnis' />
    </BottomNavigation>
            </CardContent>
        </React.Fragment>
);
}
