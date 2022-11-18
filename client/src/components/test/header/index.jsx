import { useTestContext } from '../context';
import TestBackButton from './back-button';
import './header.scss';

export default function TestHeader() {
	const { test } = useTestContext();

	return (
		<header className="test-header">
			<div className="title">
				<h1>Welcome to the {test.title}</h1>
				<TestBackButton />
			</div>
			<p>Please answer the questions by selecting the correct answer and when you have the test ready send it by pressing the "Submit" button at the bottom of the page.</p>
		</header>
	);
}
