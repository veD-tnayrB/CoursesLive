import * as React from 'react';

export default function useDocumentTitle(documentTitle) {
    React.useEffect(() => {
        document.title = documentTitle;
    }, [documentTitle]);
};