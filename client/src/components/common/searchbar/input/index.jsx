import { useSearchContext } from "../searchbar.context"
import { inputHandleChange } from "src/utils/input";

export default function SearchInput() {
    const { searchValue, setSearchValue } = useSearchContext();

    function onChange(event) {
        inputHandleChange(event, setSearchValue);
    }

    return (
        <div className="search-input-container">
            <form>
                <input 
                    type="text" 
                    className="search-input"
                    value={searchValue}
                    onChange={onChange} 
                    placeholder="Search..."
                />

                <img 
                    src="src/assets/icons/search.svg"
                    className="search-icon"
                />
            </form>
        </div>
    )
}