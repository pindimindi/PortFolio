import React from 'react';
import styled from 'styled-components';
import searchImage from '../../images/search.svg';

import Input from './Input';


const SearchHolder = styled.label`
    float: right;
    margin-right: 5px;
    position: relative;

    &:before {
        content: "";
	    position: absolute;
	    left: 10px;
	    top: 12px;
	    bottom: 0;
	    width: 20px;
	    height: 25px;
        background: url(${searchImage}) no-repeat;
    }
`;

const Search = () => {
    return (
        <form>
            <SearchHolder>
                <Input search></Input>
            </SearchHolder>
        </form>
    )
};

export default Search;

