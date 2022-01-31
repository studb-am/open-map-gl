import React from 'react';
import Layer from './layer.component';

const CircleLayer = props => {

    const { options, ...otherProps } = props
    options.type = 'circle';

    return <Layer {...otherProps} options={options} />
}

export default CircleLayer