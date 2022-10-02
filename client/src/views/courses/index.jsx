import Header from 'src/components/common/header';
import CoursesSection from 'src/components/courses/courses-section';
import './courses.scss';

export default function Courses() {
    return (
        <div className="courses-page">
            <Header className="subtitle">
                <h2>Courses</h2>
            </Header>
            <CoursesSection />
        </div>
    )
}