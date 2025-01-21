import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

export default function DropdownSpacer({ isOpen, spacerPosition }) {
    if (!isOpen) return null;

    // place the spacer in the root to make sure its position is not relative to any parent
    return createPortal(
        <div
            className='spacer'
            style={{
                position: 'absolute',
                height: '1rem',
                left: 0,
                right: 0,
                top: `${spacerPosition}px`,
            }}
            aria-hidden='true'
        />,
        document.getElementById('root')
    );
}

DropdownSpacer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    spacerPosition: PropTypes.number.isRequired,
};
