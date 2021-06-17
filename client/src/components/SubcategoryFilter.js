import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getSubcategories } from 'actions/subcategories';
import Dropdown from './styled/DropdownMenu';
import DropdownList from './styled/DropdownList';
import DropdownListItem from './styled/DropdownListItem';

const SubcategoryFilter = ({ selection, categoryId, subcategories, getSubcategories, onClick }) => {

    useEffect(() => {
        getSubcategories(categoryId);
    }, []);

    return (
        <Dropdown placeholder='Filter by Subcategory' selection={selection}>
            <DropdownList>
                {subcategories[0] ? subcategories.map(item => (
                    <DropdownListItem key={item._id} onClick={onClick}>{item.name}</DropdownListItem>
                )) : 'No Subactegories'}
            </DropdownList>
        </Dropdown>
    )
};

const mapStateToProps = state => ({
    subcategories: state.subcategories
});

export default connect(mapStateToProps, { getSubcategories })(SubcategoryFilter);