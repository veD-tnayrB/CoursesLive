import { useSearchContext } from "../searchbar.context";

export default function Filter({ filter }) {
    const { search, setSearch } = useSearchContext();
    const isFilterSelected = search.selectedFilter === filter.value;
    const filterSelectedClass = isFilterSelected ? 'selected' : '';

    function selectFilter() {
        if (isFilterSelected) return setSearch({...search, selectedFilter: ''});
        setSearch({...search, selectedFilter: filter.value});
    }

    return (
        <button 
            className={`filter ${filterSelectedClass}`}
            onClick={selectFilter}
        >
            {filter.label}
        </button>
    )
}