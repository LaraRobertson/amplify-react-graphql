/* Write an Input component */

import React from 'react';

const Input = (props) => {

    return (

        <input className={props.className} type={props.type} id={props.id} value={props.value} onChange={props.onChange} />

    );

}

export {Input};