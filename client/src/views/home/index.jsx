import * as React from 'react';
import axios from 'axios';
import { getAllCourses } from 'src/services/courses';
import Hero from 'src/components/home/hero';
import FeatureList from 'src/components/home/features';
import Comments from 'src/components/home/comments';
import './home.scss';

function Home() {
    const [courses, setCourses] = React.useState({});

    React.useEffect(() => {
        const source = axios.CancelToken.source();

        getAllCourses(source)
        .then(data => setCourses(data));

        return () => source.cancel();
    }, []);


    return (
        <div className="home-page">
            <Hero />
            <FeatureList />
            <Comments />
            <div>{JSON.stringify(courses)}</div>
        </div>
    )
}

export default Home;