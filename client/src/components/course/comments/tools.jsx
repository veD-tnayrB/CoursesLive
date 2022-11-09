import * as React from 'react';
import { useCommentsContext } from './context';

export default function Tools() {
	const { setComments } = useCommentsContext();

	function remove() {}

	return (
		<article className="tools">
			<button>Remove</button>
			<button>Edit</button>
		</article>
	);
}
