import { Cactus } from 'phosphor-react';
import React from 'react'

function EmptyList() {
    return (
        <div className='emptyList'>
            <Cactus size={20} />
            <p>NO PLANS</p>
        </div>
    )
}

export default EmptyList;