import React, { Suspense, lazy } from 'react';
const Desktop = lazy(() => import('./Desktop'));

const Ui = () => {
    return (
        <div id='Ui'>
            <Suspense>
                <Desktop/>
            </Suspense>
        </div>
    )
}

export default Ui;
