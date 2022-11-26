import * as React from 'react';
import { useParams } from 'react-router-dom';
import { TestContext } from 'src/components/test/context';
import { testService } from 'src/services/test';
import ModalContainer from 'src/components/common/modal/ModalContainer';
import Modal from 'src/components/common/modal';
import TestHeader from 'src/components/test/header';
import TestForm from 'src/components/test/form';
import './test.scss';

const TEST_DEFAULT_VALUE = { questions: [], title: '' };

export default function Test() {
	const [test, setTest] = React.useState(TEST_DEFAULT_VALUE);
	const [selectedOptions, setSelectedOptions] = React.useState([]);
	const [showResults, setShowResults] = React.useState(false);
	const { episodeId, testId } = useParams();

	React.useEffect(() => {
		Promise.all([testService.getOne(episodeId), testService.getResults(testId)]).then((response) => {
			const [test, results] = response;

			setTest(test);
			if (!results) {
				setSelectedOptions(test.questions.map((question) => ({ id: question.options[0]._id })));
			}

			if (results) {
				setSelectedOptions(results.selectedOptions);
				setShowResults(true);
			}
		});
	}, [episodeId]);

	const contextValue = {
		test,
		setTest,
		selectedOptions,
		setSelectedOptions,
		showResults,
		setShowResults,
	};
	return (
		<TestContext.Provider value={contextValue}>
			<div className="test-page">
				<ModalContainer show>
					<Modal close={false}>
						<TestHeader />
						<TestForm />
					</Modal>
				</ModalContainer>
			</div>
		</TestContext.Provider>
	);
}
