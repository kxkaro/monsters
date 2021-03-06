import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Typography, Fade } from '@material-ui/core';
import Layout from '../components/layouts/Main';
import { AppFormLayout } from '../components/forms/AppForm';
import authService from '../services/authService';
import { ModeType, UserType } from '../logic/types';
import { PATHS } from '../constants/data';
const { home } = PATHS;

// TODO: sort this page out 

interface Props {
    user: UserType,
    mode: ModeType,
    setDarkMode: any,
    onSuccess: any,
}

const Logout = ({ user, mode, setDarkMode, onSuccess }: Props) => {

    const [logoutRequestDone, setLogoutRequestDone] = useState(false);

    useEffect(() => {
        if (!logoutRequestDone) {
            setTimeout(() => {
                authService
                .logout()
                .then(() => onSuccess())
                // .catch(showError)
                .finally(() => setLogoutRequestDone(true));
            }, 3000);
        }
    });

    if (logoutRequestDone) {
        return <Redirect to={home} />;
    } else {
        return (
            <Layout
                user={user}
                mode={mode}
                setDarkMode={setDarkMode}
            >
                <AppFormLayout>
                    <Fade timeout={1000} in={true}>
                        <Typography variant="h4">
                            Bye, bye, monster!
                        </Typography>
                    </Fade>
                </AppFormLayout>
            </Layout>
        );
    }
};

// export default withShowError(Logout);
export default Logout;
