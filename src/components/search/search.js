import React, { useState } from 'react'
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Pagination, Hits, SearchBox, RefinementList, RangeInput, ClearRefinements, Configure, PoweredBy } from 'react-instantsearch-dom';
import { orderBy } from 'lodash';
import { SearchHit, FilterOverlay, FilterToggle } from './components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const client = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_API_KEY
  );

const SearchPage = () => {

    const [filterOpen, setFilterOpen] = useState(false);

    return(

        <div className="w-full">

            <InstantSearch searchClient={client} indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}>

                <div className="m-3 pb-2 flex flex-row flex-auto items-center border-b-2 border-primary-600">

                    <h1 className="text-2xl md:text-4xl font-medium sm:w-2/5">Product Search</h1>

                    <SearchBox className="hidden sm:block mx-auto" translations={{placeholder: 'Type your search here...'}}/>

                    <FilterToggle open={filterOpen} setOpen={setFilterOpen} className="flex flex-row items-center ml-auto sm:w-2/5 cursor-pointer"/>
                        
                </div>

                <div className="flex flex-col items-center sm:p-2">

                        <SearchBox className="sm:hidden px-2" translations={{placeholder: 'Type your search here...'}}/>
                
                        <FilterOverlay className="hidden absolute left-0 z-20 shadow-lg rounded-sm border-2 bg-white p-3 flex flex-col" open={filterOpen} setOpen={setFilterOpen}>
                            
                            <div className="w-full border-b-2 border-primary-600 mb-2">
                                <span className="text-2xl sm:text-3xl font-medium">Search Filters</span>
                                <FontAwesomeIcon icon={faTimesCircle} onClick={() => setFilterOpen(!filterOpen)} className="text-primary-600 text-xl md:text-2xl m-1 absolute right-2 cursor-pointer"/>
                            </div>  

                            <span className="text-xl font-medium">Vendor</span>
                            <RefinementList attribute="vendor" limit={5} showMore={true} transformItems={items => orderBy(items, "label", "asc")}/>
                            
                            <span className="text-xl font-medium">Product Type</span>
                            <RefinementList attribute="productType" limit={5} showMore={true} transformItems={items => orderBy(items, "label", "asc")}/> 
                            
                            <span className="text-xl font-medium">Price</span>
                            <RangeInput attribute="price" precision={2}   translations={{ submit: 'Set Price Range',}}/>
                            
                            <Configure hitsPerPage={4} />
                            
                            <ClearRefinements />
                            
                            <PoweredBy/>

                        </FilterOverlay>

                    <div>

                        <Hits className="w-full pt-2" hitComponent={SearchHit} />
                        
                    </div>            

                </div>

                <Pagination/>

            </InstantSearch>

        </div>
    )
}

export default SearchPage