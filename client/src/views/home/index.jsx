import useFetch from "../../hooks/useFetch";

const GET_COURSES_URL = '/courses/'

function Home() {
    const [courses, isLoading, error] = useFetch(GET_COURSES_URL, {}, 'get');

    return (
        <div>{JSON.stringify(courses)}</div>
    )
}

export default Home;