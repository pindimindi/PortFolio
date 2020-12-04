import React from 'react';

const Card = (props) => {
    const { category } = props
    // console.log("category fro the card", category);
    return (
        <div className='card'>
            <div className='card-image'>
                <img alt="" className='image' src={category.coverPhoto} />
            </div>
            <div className='card-text'>
                <span>{category.name}</span>
            </div>
        </div>
    )
};

export default Card