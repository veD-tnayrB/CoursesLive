import uniqid from 'uniqid';
import List from "src/components/common/list";
import Preload from "./";

const NUMBER_OF_ELEMENTS_BY_DEFAULT = 20;

export default function PreloadList() {
    const preloadElements = Array(NUMBER_OF_ELEMENTS_BY_DEFAULT).fill().map(() => (
        <Preload key={uniqid()} />
    ));

    return (
        <List>
            {preloadElements}
        </List>
    )
}