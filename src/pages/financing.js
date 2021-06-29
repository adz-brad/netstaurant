import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Seo from '../components/seo/SEO'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faLaptop, faMoneyCheckAlt, faShippingFast } from '@fortawesome/free-solid-svg-icons'

const Financing = () => {

    const data = useStaticQuery(graphql`
    {
        siteID: graphCmsSiteId {
            logo {
            localFile {
                url
                }
            }
        }
    }
	`)
 
    const [ financingAmount, setFinancingAmount] = useState(0);
    const [ variables, setVariables ] = useState('');
    const [ monthlyPayment, setMonthlyPayment ] = useState(0);
    const [ weeklyPayment, setWeeklyPayment ] = useState(0);
    const [ rentalAmount, setRentalAmount ] = useState(0);
    const numMonths = parseInt(variables.slice(0,2));
    const interestRate = parseFloat(variables.slice(3,10));
    const rentalRate = 0.66

    const calculateRental = (e) => {
        e.preventDefault();
        const formValid =
            rentalAmount >= 2000;
        if (!formValid) {
            alert('Equipment Cost must be $2000 or greater')
            setWeeklyPayment(0);
        }
        else{
            setWeeklyPayment((rentalAmount * rentalRate) / 52 );
        }
        
    };

    const calculate = (e) => {
        e.preventDefault();
        const formValid =
            +financingAmount >= 0 &&
            0 <= +interestRate &&
            interestRate <= 100 &&
            numMonths > 0;
        if (!formValid) {
            return;
        }
        setMonthlyPayment((financingAmount * (1 + interestRate )) / numMonths);
    };

    const sharingUrl = typeof window !== 'undefined' ? window.location.href : '';

    return(

        <div>
            
            <Seo
                pageTitle="Financing"
                pageDescription="Financing Options for Adrenalize e-Commerce Products"
                pageKeywords="Financing, Adrenalize e-Commerce"
                pageImage={data.siteID.logo.localFile.url}
                pageUrl={sharingUrl}
            />
            
            <div className="border-b-2 border-primary-700 m-2 pb-1">
                <h1 className="text-3xl lg:text-5xl font-bold tracking-tight pb-2 font-headers">Restaurant Equipment Financing</h1>
                <p className="text-base md:text-lg leading-snug font-content">If you need a little help funding your restaurant business, don't worry, we can help! Check out our financing options to help you on your way today!</p>
            </div>

            <div className="p-2 border rounded-md m-2">

                <h1 className="font-bold text-2xl">Rent-Try-Buy</h1>

                <p className="py-2">The Rent-Try-Buy option is a perfect solution for restaurant / hospitality businesses that are looking for a way to reduce the potential risk of their investment while increasing their access to multiple new equipment types. The Rent-Try-Buy program gives you the flexibility that other financing options simply don't. </p>

                <Accordion className="py-2" preExpanded="1">

                <AccordionItem uuid="1">
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                What is the Rent-Try-Buy program?
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                            Rent-Try-Buy is a 12-month rental agreement, allowing you to try equipment in your business before you decide whether to buy it. Enjoy unrivalled flexibility when it comes to owning and managing your commercial hospitality equipment.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                How does Rent-Try-Buy work?
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <ul>
                                <li className="text-base">Purchase the equipment at any time during the 12 month period and your payout will simply be the original purchase price less 60% of the rent paid.</li>
                                <li className="text-base">Upgrade your equipment at any time in order to better suit your needs.</li>
                                <li className="text-base">If you no longer need the equipment after the 12 month period, simply return it, or if you want to continue renting, you may do so without any obligation.</li>
                                <li className="text-base">After 12 months, you can reduce your rental payments by 30% over 36 months and choose to own your equipment at the end of the term for just $1.</li>
                            </ul>
                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                What types of equipment can I finance through the Rent-Try-Buy program?
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                If it exists, you can rent it! Simply calculate the total for your equipment from Netstaurant and apply for the Rent-Try-Buy program to find out what you're pre-approved for.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                How much does it cost to rent equipment through the Rent-Try-Buy program?
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="flex flex-col border rounded-md">

                                <h1 className="bg-primary-600 text-white text-lg font-bold rounded-t-md p-2">Rent-Try-Buy Calculator</h1>
                                <p className="p-2">Find out how much it will cost to rent your restaurant equipment using our handy calculator.</p>

                                <form onSubmit={calculateRental}>

                                    <div className="flex flex-row items-center p-2">
                                        <label htmlFor="Financing Amount" className="font-semibold pr-4">What is the total value of your equipment?</label>
                                        <span className="text-lg pr-1">$</span><input className="p-1 border-b-2" name="Rental Amount" value={rentalAmount} onChange={ (e) => setRentalAmount(e.target.value) } />
                                    </div>
                                    
                                    <p className="text-xs italic p-2">* Rates may vary. For more information, refer to the <a target="_blank" rel="noreferrer" href="https://www.silverchef.ca/pages/equipment-finance-calculator">SilverChef</a> website.</p>


                                    <button className="m-2 py-2 px-3 text-white font-semibold text-lg rounded-md shadow-sm bg-primary-600 hover:bg-primary-700" type="submit">Calculate Rental Cost</button>
                                    
                                </form>

                                <div className="flex flex-row items-center">
                                    <p className="font-semibold text-lg p-2">Your Weekly Payment:</p> <span className="pl-2 font-semibold text-xl text-green-700">$ {weeklyPayment.toFixed(2)}</span>
                                </div> 

                            </div>

                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                How can I learn more about the Rent-Try-Buy program?
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p className="p-2">
                                If you want to learn more about renting or purchasing your restaurant equipment through the Rent-Try-Buy program, just push play on this video from our partners at SilverChef to see how they can help you!
                            </p>

                            <iframe className="video-embed" src="https://www.youtube.com/embed/s8Y2mYzNd90" title="Rent-Try-Buy Restaurant Equipment with Nestaurant & SilverChef Today!" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>      
                        
                        </AccordionItemPanel>
                    </AccordionItem>

                </Accordion>

                <h1 className="font-bold text-3xl text-center py-5">Get started in just 3 easy steps!</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 mx-5">

                    <div className="flex flex-col items-center m-5">
                    <span className="font-semibold text-xl font-headers pb-5">Apply Online Today</span>
                    <Icon icon={faLaptop} className="card-icon transform hover:scale-105"/>
                    <span className="font-content pt-5">Fill out the simple and easy application and receive instant approval up to $25,000.</span>
                    </div>

                    <div className="flex flex-col items-center m-5">
                    <span className="font-semibold text-xl font-headers pb-5">Purchase Equipment From Netstaurant</span>
                    <Icon icon={faMoneyCheckAlt} className="card-icon transform hover:scale-105"/>
                    <span className="font-content pt-5">Choose any equipment you need from Netstaurant and we'll complete the purchase for you.</span>
                    </div>

                    <div className="flex flex-col items-center m-5">
                    <span className="font-semibold text-xl font-headers pb-5">Get Cookin'!</span>
                    <Icon icon={faShippingFast} className="card-icon transform hover:scale-105"/>
                    <span className="font-content pt-5">Your equipment will be delivered direct to your business, ready to start making you money!</span>
                    </div>

                </div>

                <div className="flex flex-row justify-center py-5">
                    <a target="_blank" rel="noreferrer" className="py-2 px-3 text-white font-semibold text-xl rounded-md shadow-sm bg-primary-600 hover:bg-primary-700" href="https://www.silverchef.ca/pages/apply">Apply Today</a>   
                </div>

                </div>

            <div className="p-2 border rounded-md m-2">

                <h1 className="font-bold text-2xl">Leasing / Financing</h1>

                <p className="py-2">Leasing or financing your restaurant equipment allows you to free up cash flow that can be allocated to your day-to-day expenses or other, more urgent needs. Depending on your business situation, leasing or financing your restaurant equipment may just be the perfect option for you.</p>

                <Accordion className="py-2" preExpanded="1">

                    <AccordionItem uuid="1">
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                What are some advantages to leasing?
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <ul>
                                <li className="text-base">You can lease or finance to own your equipment</li>
                                <li className="text-base">Lower upfront costs allow you to get your business up and running faster</li>
                                <li className="text-base">Lower monthly expenditures allow you to focus on immediate business needs and provide you some wiggle room for unexpected emergencies</li>
                                <li className="text-base">You can lease or finance all types of equipment</li>
                            </ul>
                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                How does leasing / financing my equipment work?
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                The process for leasing or financing your restaurant equipment is super simple! First, you need to select the equipment you're interested in leasing or financing. Next, fill out the application. That's it! Once you're approved, you'll sign a contract and like clockwork your equipment will be delivered to your business. It really is that easy!
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                What types of equipment can I lease / finance?
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                If it exists, you can finance it. Financiers exist to help businesses get started, so they allow for all types of equipment, from ranges to walk-in freezers, right to your menu boards and seating, to be financed.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                How much does it cost to lease / finance equipment?
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="flex flex-col border rounded-md">

                                <h1 className="bg-primary-600 text-white text-lg font-bold rounded-t-md p-2">Leasing / Financing Calculator</h1>
                                <p className="p-2">Find out how much it will cost you to lease or finance your restaurant equipment using our handy calculator.</p>

                                <form onSubmit={calculate}>

                                    <div className="flex flex-row items-center p-2">
                                        <label htmlFor="Financing Amount" className="font-semibold pr-4">How much will your equipment cost?</label>
                                        <span className="text-lg pr-1">$</span><input className="p-1 border-b-2" name="Financing Amount" value={financingAmount} onChange={ (e) => setFinancingAmount(e.target.value) } />
                                    </div>

                                    <div className="flex flex-row items-center p-2">
                                        <label htmlFor="Term Length" className="font-semibold pr-4">Lease Term:</label>
                                        <select value={variables} onBlur={e => setVariables(e.currentTarget.value)}>
                                            <option>Choose your term length...</option>
                                            <option value={[24,0.2215]}>24 Months</option>
                                            <option value={[36,0.2882]}>36 Months</option>
                                            <option value={[48,0.3571]}>48 Months</option>
                                            <option value={[60,0.42827]}>60 Months</option>
                                        </select>

                                    </div>

                                    
                                    <p className="text-xs italic p-2">* Interest rates vary based on credit approval, business history and length of term. For more information, refer to the <a target="_blank" rel="noreferrer" href="https://www.econolease.com/lease/">EconoLease</a> website.</p>

    
                                    <button className="m-2 py-2 px-3 text-white font-semibold text-lg rounded-md shadow-sm bg-primary-600 hover:bg-primary-700" type="submit">Calculate Payment</button>
                                    
                                </form>

                                <div className="flex flex-row items-center">
                                    <p className="font-semibold text-lg p-2">Your Monthly Payment:</p> <span className="pl-2 font-semibold text-xl text-green-700">$ {monthlyPayment.toFixed(2)}</span>
                                </div> 

                            </div>

                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                How can I learn more about leasing or financing my equipment?
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p className="p-2">
                                If you want to learn more about leasing or financing your restaurant equipment, just push play on this video from our partners at EconoLease to see how they can help you!
                            </p>

                        <iframe className="video-embed" src="https://www.youtube.com/embed/I1vHdbbU3t8" title="Lease / Finance Restaurant Equipment with Nestaurant & EconoLease Today!" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>    

                        </AccordionItemPanel>
                    </AccordionItem>

                </Accordion>

                <h1 className="font-bold text-3xl text-center py-5">Get started in just 3 easy steps!</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 mx-5">

                    <div className="flex flex-col items-center m-5">
                    <span className="font-semibold text-xl font-headers pb-5">Apply Online Today</span>
                    <Icon icon={faLaptop} className="card-icon transform hover:scale-105"/>
                    <span className="font-content pt-5">Fill out the simple and easy application and receive instant approval up to $25,000.</span>
                    </div>

                    <div className="flex flex-col items-center m-5">
                    <span className="font-semibold text-xl font-headers pb-5">Purchase Equipment From Netstaurant</span>
                    <Icon icon={faMoneyCheckAlt} className="card-icon transform hover:scale-105"/>
                    <span className="font-content pt-5">Choose any equipment you need from Netstaurant and we'll complete the purchase for you.</span>
                    </div>

                    <div className="flex flex-col items-center m-5">
                    <span className="font-semibold text-xl font-headers pb-5">Get Cookin'!</span>
                    <Icon icon={faShippingFast} className="card-icon transform hover:scale-105"/>
                    <span className="font-content pt-5">Your equipment will be delivered direct to your business, ready to start making you money!</span>
                    </div>

                </div>

                <div className="flex flex-row justify-center py-5">
                    <a target="_blank" rel="noreferrer" className="py-2 px-3 text-white font-semibold text-xl rounded-md shadow-sm bg-primary-600 hover:bg-primary-700" href="https://app.econolease.com/apply/">Apply Today</a>   
                </div>

            </div>
    
        </div>
    )
}

export default Financing