import React, { Component } from 'react';
import style from '../../style/headerTransformer.scss';

export default function HeaderTransformer () {
  return (
    <div className='header-transformer'>
      <img className='logo-img' src='../../static/autobot.png'/>
      <img className='logo-img' src='../../static/deception.png'/>
      <h1 className='header'>War of Transformers</h1>
    </div>
  );
}
