import React from 'react'
import { useQuery, gql } from '@apollo/client'

    const BID_QUERY = gql`
    query BidsQuery($id: ID!) {
        bids(where: { auctionItem: {id: $id}}, orderBy: bidAmount_DESC, first: 2) {
        name
        bidAmount
        id
        }
    }`

    const AuctionItem = ({ pageContext: { item } }) => {

        const { data }  = useQuery(BID_QUERY, {
            variables: { id: item.remoteId },
            pollInterval: 500,
        });

        console.log(data)

        const winningBidAmount = data.bids.slice(0,1).map((bid) => bid.bidAmount);
        const winningBidName = data.bids.slice(0,1).map((bid) => bid.name);

    return(

        <div className="flex flex-col">

            <div className="flex flex-row items-center text-3xl">
                Item Name:{item.productName}
            </div>

            <div>
            {winningBidAmount}
            {winningBidName}

            </div>

        </div>

    )

}

export default AuctionItem