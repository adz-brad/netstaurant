import React from 'react'
import { Link } from 'gatsby'
import Button from '../button/button'
import { GatsbyImage } from 'gatsby-plugin-image'
import Countdown from 'react-countdown'
import { useQuery, useMutation, gql } from '@apollo/client'

const BID_QUERY = gql`
query BidsQuery($id: ID!) {
    bids(where: { auctionItem: {id: $id}}, orderBy: bidAmount_DESC, first: 2) {
    name
    bidAmount
    id
    }
}`;

const AuctionCard = ({ itemName, itemImage, itemLink, itemID, auctionEnd }) => {

    const { data, error: bidsError, loading: bidsLoading }  = useQuery(BID_QUERY, {
        variables: { id: itemID },
    });

    const CompletionList = () => <span className="text-3xl font-bold text-primary-700 p-5">This Auction Has Closed</span>;

        const renderer = ({ days, hours, minutes, seconds, completed }) => {
            if (completed) {
                return <CompletionList />;
              } else {
              return (
                <React.Fragment>

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

                </React.Fragment>
              );
            };
        };

    return(

        <div key={itemID} className="flex flex-row shadow-md rounded-md m-2">

            <Link className="w-2/5 m-auto" to={`/auction/${itemLink}`} alt={itemName}>
                <GatsbyImage image={itemImage} alt={itemName}/>
            </Link>

            <div className="flex flex-col w-3/5">

                <span className="py-2 mt-auto font-semibold text-2xl lg:text-3xl leading-tight text-center">{itemName}</span>

                    <div className="flex flex-col text-3xl m-auto">
                        <Countdown date={auctionEnd} renderer={renderer}/>
                    </div>

                <Button
                    className="mx-auto mb-4 px-2 py-1 text-lg md:text-xl md:px-3 md:py-2"
                    text="View Item"
                    url={`/auction/${itemLink}`}
                />

            </div>
        
        </div>

    )
}

export default AuctionCard