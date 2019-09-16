import React from 'react';
import {Route} from 'react-router-dom';

import CollectionOverview from '../../components/collections-overview/collections-overview.component'

const ShopPage = ({collections}) => (
    <div className='shop-page'> 
        <Route component={CollectionOverview} />
    </div>
)

export default ShopPage;

