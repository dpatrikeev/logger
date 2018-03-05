import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from 'material-ui/styles';
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { LinearProgress } from 'material-ui/Progress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ErrorsTable from '../ErrorsTable';

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    progress: {
        width: '100%',
        height: '3px',
    },
});

const muiTheme = createMuiTheme({
    palette: {
        secondary: {
            light: 'rgba(249, 192, 173, 0.5)',
            main: '#F9C0AD',
        },
    },
});


class User extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        userId: PropTypes.string,
        getUserErrors: PropTypes.func.isRequired,
    };

    static defaultProps = {
        userId: 'Загрузка...',
    };

    constructor(props) {
        super(props);
        this.state = { userErrors: undefined };
    }

    handleChange = userId => (event, expanded) => {
        if (expanded) {
            this.props.getUserErrors(userId)
                .then((json) => {
                    const errorList = json.map(el => ({
                        id: el._id,
                        error: el.error,
                        date: el.date,
                    }));

                    setTimeout(() => {
                        this.setState(() => ({ userErrors: errorList }));
                    }, 500);
                })
                .catch(error => global.console.log(error));
        }
    };

    render() {
        const {
            classes,
            userId,
        } = this.props;

        const { userErrors } = this.state;

        return (
            <ExpansionPanel onChange={this.handleChange(userId)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>
                        {userId}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {userErrors === undefined
                        ? (
                            <MuiThemeProvider theme={muiTheme}>
                                <LinearProgress
                                    variant="query"
                                    color="secondary"
                                    className={classes.progress}
                                />
                            </MuiThemeProvider>
                        )
                        : (
                            <ErrorsTable
                                userErrors={userErrors}
                            />
                        )
                    }
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}


export default withStyles(styles)(User);
