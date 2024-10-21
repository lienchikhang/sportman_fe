import React from 'react';
import Button from './Button';
import '../../libs/styles/ui/error.scss';

const Error = () => {
    return (
        <div className='error'>
            <h2 className='error__heading'>Something is wrong! Please try again.</h2>
            <Button
                callback={() => window.location.reload()}
                primary
                text='Reload'
            />
        </div>
    )
}

export default Error