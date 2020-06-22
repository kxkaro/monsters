import React from 'react';
import { useStyles } from '../../styles/main';
import { Formik, Form } from 'formik';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

interface Props {
    title: string,
    initialValues: object,
    onSubmit: any,
    children: Array<React.ReactChild>,
}


export const AppForm = ({ title, initialValues, onSubmit, children }: Props) => {
    const classes = useStyles();

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1 className={classes.center}>{title}</h1>
                    </Grid>

                    {children}

                    <Grid className={classes.center} item xs={12}>
                        <Button color="primary" type="submit">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    );
};

export const AppFormPaper = (props: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.flexCenter}>
            <Paper className={classes.formPaper}>
                <AppForm {...props} />
            </Paper>
        </div>
    );
};
