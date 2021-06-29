import React, { useState, useEffect } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useQuery, useMutation, gql } from '@apollo/client'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { toast } from 'react-toastify';
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

    const ADD_BID = gql`
    mutation CreateBids($id: ID!, $bidAmount: Int){
        createBid(data: {auctionItem: {connect: {id: $id}}, bidAmount: $bidAmount}) {
          id
          bidAmount
        },
        publishManyBidsConnection(where: {auctionItem: {id: $id}}) {
            edges {
              node {
                id
              }
            }
          }
      }`;

      const AUCTION_END = gql`
      query AuctionEnd($id: ID!){
          auctionItem(where: {id: $id}) {
            auctionEnd
          }
      }`;

      const ADD_TIME = gql`
      mutation AddTime($id: ID!, $auctionEnd: DateTime){
        updateAuctionItem(where: {id: $id}, data: {auctionEnd: $auctionEnd }) {
            id
            auctionEnd
          },
        publishAuctionItem(where: { id: $id}, to: PUBLISHED){
            auctionEnd
        }
      }`;

      const PRODUCTS = gql`
      query{
        products(first:10) {
          edges {
            node {
              id
              title
            }
          }
        }
      }`;

    const AuctionItem = ({ pageContext: { item } }) => {

        const { data: productData, error:productError, loading: productLoading } = useQuery(PRODUCTS, {
            context: { clientName: "shopify" },
            pollInterval: 60000,
        });

        const { data: bidsData, error: bidsError, loading: bidsLoading }  = useQuery(BID_QUERY, {
            context: { clientName: "graphCms" },
            variables: { id: item.remoteId },
            pollInterval: 500,
        });

        const { data: timeData, error: timeError, loading: timeLoading } = useQuery(AUCTION_END, {
            context: { clientName: "graphCms" },
            variables: { id: item.remoteId },
            pollInterval: 500,
        });

        const currentBid = bidsData?.bids ? parseInt(( bidsData.bids.slice(0,1).map((bid) => bid.bidAmount ) )) : 'No Bids Yet';

        const [ bid, setBid ] = useState();
        const [ bidInput, setBidInput ] = useState();
        const [ bidIncrement, setBidIncrement ] = useState();
        const [ maxBid, setMaxBid ] = useState();
        const [ nextBid, setNextBid ] = useState(bid + bidIncrement);

        useEffect(()=>{

            if (isNaN(currentBid)) {
                setBid (0)
                setBidInput(5)
                setNextBid(5)
            }
            else {
                setBidInput(currentBid + bidIncrement);
                setBid( currentBid )
                setNextBid(bid + bidIncrement);
            };

            if (bid < 100) {
                setBidIncrement(5);
            }
            else if (bid >= 100 && bid < 250) {
                setBidIncrement(10);
            }
            else if (bid >= 250 && bid < 1000) {
                setBidIncrement(25);
            }
            else if (bid >= 1000) {
                setBidIncrement(50);
            };
            
        }, [currentBid, bid, bidInput, bidIncrement])
        
        const bidSubmitted = () => {  
            toast("Your Bid Has Been Submitted", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              className: "custom-toast",
            });
          }

        const [ addBid ] = useMutation(ADD_BID, {
            context: { clientName: "graphCms" },
            variables: { id: item.remoteId, bidAmount: parseInt(bidInput) },
        });

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

        var originalEndTime = new Date (auctionEnd),
        newEndTime = new Date ( originalEndTime );
        newEndTime.setMinutes ( originalEndTime.getMinutes() + 3 );

        const extendTime = newEndTime.toISOString();

        const [ addTime ] = useMutation(ADD_TIME, {
            variables: { id: item.remoteId, auctionEnd: extendTime },
        });

        const submitBid = () => {

            if(days === 0 && hours === 0 && minutes === 2 && seconds === 0){
                addBid();
                bidSubmitted();
                addTime();
            }
            else if(days === 0 && hours === 0 && minutes <= 1 && seconds <= 59){
                addBid();
                bidSubmitted();
                addTime();
            }
            else {
                addBid();
                bidSubmitted();
            }

        }

        let countdown;

        if(days === 0 && hours === 0 && minutes === 0 && seconds === 2){
            countdown = 2;
        }
        else if(days === 0 && hours === 0 && minutes === 0 && seconds === 1){
            countdown = 1;
        }
        else if(days === 0 && hours === 0 && minutes === 0 && seconds === 0){
            countdown = 0;
        }


    return(

        <div className="flex flex-col m-1 sm:m-2 shadow-md rounded-md">

            <div className="shadow-md rounded-sm py-2 w-full sm:w-3/4 mx-auto">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold w-full text-center py-2 tracking-tighter font-headers">{item.productName}</h1>
            </div>

            <div className="flex flex-col sm:flex-row w-full sm:w-3/4 mx-auto">         

                <div className="w-full sm:w-1/3 p-2 m-0">
                    <GatsbyImage image={item.productImage.localFile.childImageSharp.gatsbyImageData} className="w-full cursor-pointer rounded-sm shadow-md" alt={`${item.title} Image`} />
                </div>

                <div className="flex flex-col w-full sm:w-2/3 shadow-md rounded-sm m-1 sm:m-3 p-2">

                    <div className="flex flex-col text-3xl h-full">
                
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

                                <div className="border-2 border-primary-700 rounded-md shadow-md m-1 sm:m-2 p-2 sm:p-5">

                                    <div className="flex flex-col p-1 sm:px-5 sm:py-2 font-content">

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
                                    {countdown === 0 ? <span>Going, going... GONE!</span> : null}

                                    <div className="flex flex-row items-center sm:pl-5">
                                        <span className="text-base">Current Bid Increment: <b>${bidIncrement}</b> </span>
                                    </div>

                                    <div className="flex flex-row items-center sm:pl-5">
                                        <span className="text-base">Next Bid: <b>${nextBid}</b> </span>
                                    </div>
                                    
                                <div className="pt-2 sm:pt-0">

                                    <form onSubmit={(e) => {e.preventDefault();submitBid()}}>

                                    <span className="">$</span>

                                    <input
                                        className="border-b-2 border-primary-600 w-32 text-center focus:outline-none m-2"
                                        type="number"
                                        min={nextBid}
                                        max={maxBid}
                                        step={bidIncrement}
                                        value={bidInput}
                                        onChange={e => (setBidInput(e.target.value))}
                                    />

                                    <button 
                                        className="button text-xl font-semibold py-1 px-2"
                                        type="submit">
                                            Submit Bid
                                    </button>

                                    </form>

                                </div>

                            </div>

                            }
                            
                        </React.Fragment> 

                    ) : null }



                                                    
                    </div>
                 
                </div>
      
            </div>

            <Tabs className="product-tabs flex flex-col text-center md:text-left p-2 md:p-3 w-full sm:w-3/4 mx-auto">

                    <TabList className="md:border-b-2 md:border-primary-700 mb-5 shadow-md rounded-sm text-3xl font-bold flex flex-col md:flex-row">

                        <Tab className="flex flex-grow cursor-pointer"><h4 className="m-auto text-xl font-medium p-2 font-headers">Item Description</h4></Tab>
                        <Tab className="flex flex-grow cursor-pointer"><h4 className="m-auto text-xl font-medium p-2 font-headers">Taxes & Fees</h4></Tab>
                        <Tab className="flex flex-grow cursor-pointer"><h4 className="m-auto text-xl font-medium p-2 font-headers">Shipping & Payment</h4></Tab>
                        <Tab className="flex flex-grow cursor-pointer"><h4 className="m-auto text-xl font-medium p-2 font-headers">Terms & Conditions</h4></Tab>

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