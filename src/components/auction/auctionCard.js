import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import Button from '../button/button'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useQuery, gql } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const BID_QUERY = gql`
query BidsQuery($id: ID!) {
    bids(where: { auctionItem: {id: $id}}, orderBy: bidAmount_DESC, first: 2) {
    name
    bidAmount
    id
    }
}`;

const AUCTION_END = gql`
query AuctionEnd($id: ID!){
    auctionItem(where: {id: $id}) {
      auctionEnd
    }
}`;

const AuctionCard = ({ itemName, itemImage, itemLink, itemID }) => {

    const { data: bidsData, error: bidsError, loading: bidsLoading }  = useQuery(BID_QUERY, {
        context: { clientName: "graphCms" },
        variables: { id: itemID },
        pollInterval: 500,
    });

    const { data: timeData, error: timeError, loading: timeLoading } = useQuery(AUCTION_END, {
        context: { clientName: "graphCms" },
        variables: { id: itemID },
        pollInterval: 500,
    });

    const currentBid = bidsData?.bids ? parseInt(( bidsData.bids.slice(0,1).map((bid) => bid.bidAmount ) )) : 'No Bids Yet';
    
    const [ bid, setBid ] = useState();

    useEffect(()=>{

        if (isNaN(currentBid)) {
            setBid (0)
        }
        else {
            setBid( currentBid )
        }; 
    }, [currentBid, bid])

    const auctionEnd = timeData?.auctionItem ? new Date(timeData.auctionItem.auctionEnd).toISOString() : null;
    const auctionEndTime = new Date(auctionEnd).getTime();
    const formattedDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    const auctionEndDate = new Date(auctionEnd).toLocaleDateString(undefined,formattedDateOptions);

    const [ timeRemaining, setTimeRemaining ] = useState();
    const [ lotClosed, setLotClosed ] = useState(false);

    useEffect(() => {

        var auctionTimer = setInterval(function() {

            var now = new Date().getTime();
            var timeleft = auctionEndTime - now;

            if (timeleft > 0) {
                setLotClosed(false);
                setTimeRemaining(parseInt(timeleft * 0.001));
            }
            if (timeleft < 0) {
                clearInterval(auctionTimer);
                setLotClosed(true)
                setTimeRemaining(null)
            }

        }, 1000);

    });

        var days = Math.floor((timeRemaining * 1000) / (1000 * 60 * 60 * 24));
        var hours = Math.floor(((timeRemaining * 1000) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor(((timeRemaining * 1000) % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor(((timeRemaining * 1000) % (1000 * 60)) / 1000);
    
        let countdown;

        if(days === 0 && hours === 0 && minutes === 0 && seconds === 2){
            countdown = 2;
        }
        else if(days === 0 && hours === 0 && minutes === 0 && seconds === 1){
            countdown = 1;
        }

    return(

        <div key={itemID} className="border m-1 flex flex-col sm:flex-row items-center shadow-lg rounded-md sm:m-2 p-1 sm:p-0">

            <span className="sm:hidden pt-2 sm:pb-2 mt-auto font-bold text-3xl leading-tight text-center tracking-tight">{itemName}</span>

            <Link className="w-2/3 sm:w-1/4 m-auto" to={`/auction/${itemLink}`} alt={itemName}>
                <GatsbyImage image={itemImage} alt={itemName}/>
            </Link>

            <div className="flex flex-col items-center w-full sm:w-3/4">

                <span className="hidden sm:flex sm:py-2 mt-auto font-bold text-3xl leading-tight text-center tracking-tight">{itemName}</span>

                <div className="flex flex-col m-2 sm:p-2 w-full">

                    <div className="flex flex-col text-3xl sm:h-full">

                    {timeLoading ? 

                        <div className="m-auto pb-10">
                            <FontAwesomeIcon icon={faSpinner} spin size="3x" color="red" />
                        </div> 
                    : null}

                    {timeError ? 
                        <div className="">
                            Error Loading
                        </div> 
                    : null}

                    {timeData?.auctionItem ? (

                    <React.Fragment>

                    {lotClosed === true ?  
                                            
                        <React.Fragment>
                            <span className="text-3xl font-bold text-primary-700 p-5 font-content m-auto">This Lot Is Closed</span>
                        </React.Fragment>

                    : 

                                <React.Fragment>

                                <div className="border-2 border-primary-700 rounded-md shadow-md p-2 sm:m-2 sm:p-5">

                                    <div className="flex flex-col sm:px-5 py-2 font-content">

                                        <div className="flex flex-col sm:flex-row sm:items-center">
                                            <span className="text-lg font-semibold mx-1">Lot Closing Date:</span>
                                            <span className="text-lg ml-1">{auctionEndDate}</span>
                                        </div>
                                    
                                        <div className="flex flex-col sm:flex-row sm:items-center ml-1">                                      
                                            <span className="text-lg font-semibold mr-2 mt-2">Last Call In:</span>
                                            <div className="flex flex-row items-center">
                                                <span className="countdown-number">{days}</span>
                                                <span className="countdown-label">Days</span>
                                                <span className="countdown-number">{hours}</span>
                                                <span className="countdown-label">Hours</span>
                                                <span className="countdown-number">{minutes}</span>
                                                <span className="countdown-label">Minutes</span>
                                                <span className="countdown-number">{seconds}</span>
                                                <span className="countdown-label">Seconds</span>
                                            </div>      
                                            <div id="lotClosed"><span className="text-3xl font-bold text-primary-700 font-content"></span></div>
                                        </div>

                                    </div>

                                    <div className="flex flex-row items-center px-1 sm:px-5 py-2 sm:pt-2 sm:pb-4">
                                        <span className="text-xl sm:text-3xl font-semibold mr-2">Current Bid:</span>
                                        <span className="text-xl sm:text-2xl font-medium font-content">{bidsLoading ? ' Loading Current Bid' : null}</span>
                                        <span className="text-xl sm:text-2xl font-medium font-content">{bidsError ? 'Error Loading Bid' : null}</span>

                                        {bidsData?.bids ? (
                                            <React.Fragment>           
                                            <span className="text-xl sm:text-3xl font-medium font-content"><b className="text-green-700">${bid}</b></span>
                                            </React.Fragment> 
                                        ) : null }

                                    </div>

                                    {countdown === 2 ? <span>Going...</span> : null}
                                    {countdown === 1 ? <span>Going, going...</span> : null}
                                    
                                    <div className="flex flex-col items-center">
                                    <Button
                                        className="my-5 px-2 py-1 text-lg md:text-xl md:px-3 md:py-2"
                                        text="View Item"
                                        url={`/auction/${itemLink}`}
                                    />
                                    </div>
                                </div>

                                </React.Fragment> 

                            }
                            </React.Fragment>

                    ): null }
                                                    
                    </div>

                </div>

            </div>
        
        </div>

    )
}

export default AuctionCard