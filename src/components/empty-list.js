import { Cactus } from 'phosphor-react';
import React from 'react'
import '../styles/empty-list.css';

function EmptyList() {
    return (
        <div className='emptyList'>
            <Cactus size={20} />
            <p>NO PLANS</p>
        </div>
    )
}

export default EmptyList;