import * as React from 'react';
import Hero from 'src/components/home/hero';
import FeatureList from 'src/components/home/features';
import Comments from 'src/components/home/comments';
import Footer from 'src/components/common/footer';
import './home.scss';

export default function Home() {

    return (
        <div className="home-page">
            <Hero />
            <FeatureList />
            <Comments />
        </div>
    )
}