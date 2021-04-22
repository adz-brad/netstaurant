import React from 'react'
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Pagination, Hits, SearchBox, RefinementList, ClearRefinements, Configure, PoweredBy } from 'react-instantsearch-dom';
import { orderBy } from 'lodash';
import SearchHit from './searchHit'

const client = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_API_KEY
  );

const SearchPage = () => {

    return(

        <div className="w-full">

            <InstantSearch searchClient={client} indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}>

            <div className="m-3 pb-2 flex flex-row items-center border-b-2 border-primary-600">
                <h1 className="text-5xl font-medium">Product Search</h1><SearchBox translations={{placeholder: 'Search for products by typing search parameters here'}}/>
            </div>

            <div className="flex flex-row">
            
                <div className="flex flex-col w-1/5 p-3">
                    <span className="text-2xl font-semibold">Filters</span>

                    <span className="text-xl font-medium">Product Type</span>
                    <RefinementList attribute="productType"/> 
                    <span className="text-xl font-medium">Vendor</span>
                    <RefinementList attribute="vendor"/>

                </div>

                <Hits className="w-4/5" hitComponent={SearchHit} />

            </div>

            <PoweredBy className="p-2"/>


            </InstantSearch>

        </div>
    )
}

export default SearchPage