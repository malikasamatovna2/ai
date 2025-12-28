import React from 'react';
import './button.css';

export default function Button({ children, variant='primary', className='', ...props }){
  return (
    <button className={`btn btn-${variant} ${className}`} {...props}>{children}</button>
  );
}
