import * as React from 'react';
import Hero from 'src/components/home/hero';
import FeatureList from 'src/components/home/features';
import Comments from 'src/components/home/comments';
import useDocumentTitle from 'src/hooks/useDocumentTitle';
import './home.scss';

export default function Home() {
    useDocumentTitle('Home - CoursesLive')

    return (
        <div className="home-page">
            <Hero />
            <FeatureList />
            <Comments />
        </div>
    )
}