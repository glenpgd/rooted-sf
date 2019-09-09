import React from 'react';

import './custom-buttton.component';

const CustomButton = ({children, ...otherProps}) => (
    <button className='custom-button' {...otherProps}>
        {children}
    </button>
)

export default CustomButton;