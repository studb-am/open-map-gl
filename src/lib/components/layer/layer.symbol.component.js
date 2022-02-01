import React from 'react';
import Layer from './layer.component';

const SymbolLayer = props => {

    const { options, ...otherProps } = props
    options.type = 'symbol';

    return <Layer {...otherProps} options={options} />
}

export default SymbolLayer;