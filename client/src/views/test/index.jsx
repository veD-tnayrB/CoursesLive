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
	const { episodeId } = useParams();

	React.useEffect(() => {
		testService.getOne(episodeId).then((response) => setTest(response));
	}, [episodeId]);

	const contextValue = {
		test,
		setTest,
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
