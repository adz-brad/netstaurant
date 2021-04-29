import React, { useState } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import Countdown from 'react-countdown'
import { useQuery, useMutation, gql } from '@apollo/client'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

    const BID_QUERY = gql`
    query BidsQuery($id: ID!) {
        bids(where: { auctionItem: {id: $id}}, orderBy: bidAmount_DESC, first: 2) {
        name
        bidAmount
        id
        }
    }`;

    const ADD_BID = gql`
    mutation {
       bids{
           bidAmount
       } 
    }
    `;

    const AuctionItem = ({ pageContext: { item } }) => {

        const { data, error: bidsError, loading: bidsLoading }  = useQuery(BID_QUERY, {
            variables: { id: item.remoteId },
        });

        const [createBid] = useMutation(ADD_BID);

        const currentBid = data?.bids ? ( data.bids.slice(0,1).map((bid) => ( bid.bidAmount + bidIncrement )) ) : null;
        const [bidValue, setBidValue] = useState(currentBid);
        const bidIncrement = item.bidIncrement
        const auctionEnd = item.auctionEnd;

        const CompletionList = () => <span className="text-3xl font-bold text-primary-700 p-5">This Auction Has Closed</span>;

        const renderer = ({ days, hours, minutes, seconds, completed }) => {
            if (completed) {
                return <CompletionList />;
              } else {
              return (
                <React.Fragment>

                    <div className="border-2 border-primary-700 rounded-md shadow-md m-2 p-5">

                        <div className="flex flex-col px-5 py-2">

                            <span className="text-2xl font-semibold">Time Remaining In This Auction:</span>

                            <div className="flex flex-row items-end ml-1">
                                <span className="countdown-number">{days}</span>
                                <span className="countdown-label">Days</span>
                                <span className="countdown-number">{hours}</span>
                                <span className="countdown-label">Hours</span>
                                <span className="countdown-number">{minutes}</span>
                                <span className="countdown-label">Minutes</span>
                                <span className="countdown-number">{seconds}</span>
                                <span className="countdown-label">Seconds</span>                   
                            </div>

                        </div>

                        <div className="flex flex-row items-center px-5 py-2">
                            <span className="text-3xl font-semibold mr-2">Current Bid:</span>
                            <span className="text-2xl font-medium">{bidsLoading ? ' Loading Current Bid' : null}</span>
                            <span className="text-2xl font-medium">{bidsError ? 'Error Loading Bid' : null}</span>

                            {data?.bids ? (
                                <React.Fragment>           
                                    {data.bids.slice(0,1).map((bid) => ( <span className="text-3xl font-medium">$ {bid.bidAmount}</span> ))}
                                </React.Fragment> 
                            ) : null }

                        </div>

                    </div>

                    <form className="p-5 flex flex-row items-center border-2 border-primary-700 rounded-md shadow-md m-2" onSubmit={(e) => {e.preventDefault();}}>

                        <div className="flex flex-col w-3/4">

                            <div className="flex flex-row items-center w-full">

                                <span className="font-medium mr-1">$</span>

                                <input 
                                    required
                                    className="p-2 border-b border-primary-700 focus:border-opacity-0 mr-2 w-2/3"
                                    placeholder="Your Bid"
                                    type="number"
                                    min={currentBid}
                                    step="25"
                                    value={bidValue}
                                    onChange={e => (setBidValue(e.target.value))}
                                />

                            </div>

                            <div className="flex flex-row items-center font-medium text-lg ml-5">
                                <span className="mr-1">Current Bid Increment:</span>
                                <span>${bidIncrement}</span>
                            </div>

                        </div>

                        <button className="button px-2 py-1 text-2xl font-medium w-1/4" type="submit">Submit Bid</button>

                    </form>

                </React.Fragment>
              );
            };
        };

    return(

        <div className="flex flex-col m-2 m-2 shadow-md rounded-md">

            <div className="shadow-md rounded-sm py-2 w-3/4 mx-auto">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold w-full text-center py-2">{item.productName}</h1>
            </div>

            <div className="flex flex-row w-3/4 mx-auto">         

                <div className="w-1/3 p-2 m-0">
                    <GatsbyImage image={item.productImage.localFile.childImageSharp.gatsbyImageData} className="w-full cursor-pointer rounded-sm shadow-md" alt={`${item.title} Image`} />
                </div>

                <div className="flex flex-col w-2/3 shadow-md rounded-sm m-3 p-2">

                    <div className="flex flex-col text-3xl">
                        <Countdown date={auctionEnd} renderer={renderer}/>
                    </div>
                 
                </div>
      
            </div>

            <Tabs className="product-tabs flex flex-col text-center md:text-left md:p-3 w-3/4 mx-auto">

                    <TabList className="md:border-b-2 md:border-primary-700 mb-5 shadow-md rounded-sm text-3xl font-bold flex flex-col md:flex-row">

                        <Tab className="flex flex-grow cursor-pointer"><h4 className="m-auto text-xl font-medium p-2">Item Description</h4></Tab>
                        <Tab className="flex flex-grow cursor-pointer"><h4 className="m-auto text-xl font-medium p-2">Taxes & Fees</h4></Tab>
                        <Tab className="flex flex-grow cursor-pointer"><h4 className="m-auto text-xl font-medium p-2">Shipping & Payment</h4></Tab>
                        <Tab className="flex flex-grow cursor-pointer"><h4 className="m-auto text-xl font-medium p-2">Terms & Conditions</h4></Tab>

                    </TabList>
         
                    <TabPanel className="tab-panel text-xl flex flex-col shadow-lg rounded-sm p-4">
                            {item.productDescription.text}      
                    </TabPanel>

                    <TabPanel className="tab-panel text-xl flex flex-col shadow-md rounded-sm p-4">
                            Taxes / Fees
                    </TabPanel>

                    <TabPanel className="tab-panel text-xl flex flex-col shadow-md rounded-sm p-4">
                            Shipping / Payment
                    </TabPanel>

                    <TabPanel className="tab-panel text-xl flex flex-col shadow-md rounded-sm p-4">
                            Terms
                    </TabPanel>

                </Tabs>

        </div>

    )

}

export default AuctionItem