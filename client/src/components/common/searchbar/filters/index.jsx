import { useSearchContext } from "../searchbar.context"
import Filter from "./Filter"

export default function Filters() {
    const { filters } = useSearchContext();

    const filterElements = filters.map(filter => (
        <Filter 
            key={filter.label}
            filter={filter}
        />
    ))

    return (
        <div className="filters">
            <ul>
                {filterElements}
            </ul>
        </div>    
    )
}