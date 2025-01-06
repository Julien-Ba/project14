import './App.scss';
import PropTypes from 'prop-types';
import Provider from 'jotai';

export default function App({ children }) {
    return <Provider>{children}</Provider>;
}

App.propTypes = {
    children: PropTypes.node,
};
