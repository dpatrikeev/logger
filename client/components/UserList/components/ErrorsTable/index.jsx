import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import moment from 'moment';

moment.locale('ru');

const styles = () => ({
    table: {
        width: '100%',
    },
    cell: {
        width: 'auto',
        padding: 0,
    },
    'cell-small': {
        width: '185px',
    },
    row: {
        padding: '4px',
        lineHeight: '2em',
        height: 'auto',
    },
});

function ErrorsTable(props) {
    const {
        classes,
        userErrors,
    } = props;

    return (
        <Table className={classes.table}>
            <TableHead>
                <TableRow className={classes.row}>
                    <TableCell className={`${classes.cell} ${classes['cell-small']}`}>Дата</TableCell>
                    <TableCell className={classes.cell}>Ошибка</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {userErrors.map(n => (
                    <TableRow
                        className={classes.row}
                        key={n.id}
                    >
                        <TableCell className={`${classes.cell} ${classes['cell-small']}`}>
                            {moment(n.date).format('DD.MM.YYYY, HH:MM:SS')}
                        </TableCell>
                        <TableCell className={classes.cell}>{n.error}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

ErrorsTable.propTypes = {
    classes: PropTypes.object.isRequired,
    userErrors: PropTypes.array,
};

ErrorsTable.defaultProps = {
    userErrors: [],
};

export default withStyles(styles)(ErrorsTable);
