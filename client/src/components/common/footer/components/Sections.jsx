import FooterSection from '../section';
import { sectionList } from '../sections-list';

export default function FooterSections() {

    const sections = sectionList.map(section => (
        <FooterSection 
            key={section.id} 
            section={section} 
        />
    ))

    return (
        <div className="footer-section-container">
            {sections}
        </div>
    )
}