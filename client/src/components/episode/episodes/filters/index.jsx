import * as React from 'react';
import Filter from './filter';

export default function Filters({ selectedFilter, setSelectedFilter }) {
    return (
        <ul className="filters">
            <Filter selectedValue={selectedFilter} setSelectedValue={setSelectedFilter} value="All" />
            <Filter selectedValue={selectedFilter} setSelectedValue={setSelectedFilter} value="Last" />
            <Filter selectedValue={selectedFilter} setSelectedValue={setSelectedFilter} value="Viewed" />
        </ul>
    );
}
