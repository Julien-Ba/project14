import './modal.scss';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, children }) {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleEvent = (event) => {
            if (event.type === 'mousedown') {
                if (modalRef.current && !modalRef.current.contains(event.target)) {
                    onClose();
                }
            } else if (event.type === 'keydown') {
                for (const key of ['Escape', 'Enter', 'Tab']) {
                    if (event.key === key) onClose();
                }
            }
        };

        for (const eventType of ['mousedown', 'keydown']) {
            if (isOpen) document.addEventListener(eventType, handleEvent);
            return () => document.removeEventListener(eventType, handleEvent);
        }
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className='modal'>
            <div className='modal__container' ref={modalRef}>
                <button className='modal__close__btn' onClick={onClose} aria-label='Close modal'>
                    <svg
                        className='modal__close__btn-icon'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 384 512'
                    >
                        <path
                            fill='currentColor'
                            d='M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7L86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256L41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256z'
                        ></path>
                    </svg>
                </button>
                <div className='modal__content'>{children}</div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
};
