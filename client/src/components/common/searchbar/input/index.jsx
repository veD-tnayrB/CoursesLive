import { useSearchContext } from "../searchbar.context"
import { inputHandleChange } from "src/utils/input";
import SearchIcon from "./SearchIcon";
import LoadingIcon from "src/components/common/load";

export default function SearchInput() {
    const { searchValue, setSearchValue, isLoading } = useSearchContext();

    function onChange(event) {
        inputHandleChange(event, setSearchValue);
    }

    const icon = isLoading ? <LoadingIcon /> : <SearchIcon />;

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

                {icon}
            </form>
        </div>
    )
}