import useFetch from "../../hooks/useFetch";
import { GET_COURSES_URL } from '../../constants/routes/server';

function Home() {
    const [courses, isLoading, error] = useFetch(GET_COURSES_URL, {}, 'get');

    return (
        <div>
            <div>{JSON.stringify(courses)}</div>
            <div>{isLoading}</div>
            <div>{error.message}</div>
        </div>
    )
}

export default Home;