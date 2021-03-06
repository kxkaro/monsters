import qs from 'qs';
import { withRouter } from 'react-router';
import { PATHS } from '../constants/data';
const { home } = PATHS;

// Maps a react-router's `history` object to a simple `push` function.
const historyToPush: any = (wrappedComponent: any) => (props: any) => {
    const { history } = props;
    const push = (destination: string) => history.push(destination);
    return wrappedComponent({ ...props, push });
};

// Injects a `push` property which handles client-side redirects.
export const withPush: any = (wrappedComponent: void) => withRouter(historyToPush(wrappedComponent));

// Injects a `next` property to the wrapped component which, when invoked, will redirect the client to a specified path.
// Should be applied to a component decorated with `withPush`.
export const withNext: any = (wrappedComponent: any) => (props: any) => {
    const { location, push } = props;
    const nextPath = qs.parse(location.search, { ignoreQueryPrefix: true }).next || home;
    const next = () => push(nextPath);
    return wrappedComponent({ ...props, next });
};

// TODO: define proper types for all 'wrappedComponent' props in the whole application. Temporarily defined as 'any'