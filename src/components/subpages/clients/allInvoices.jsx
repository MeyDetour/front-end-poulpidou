import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {useToast} from '../../../hooks/useToast';

import {useParams} from 'react-router-dom';

const AllInvoices = () => {
    const {id} = useParams();

    const toast = useToast();


    const [invoices, setInvoices] = useState([
        {
            "projectName": "OSIMI Project",
            "date": "28/08/2024",
            "reason": "The client wants to change the homepage of their website and add a reservation option."
        },{
            "projectName": "GreenTech Initiative",
            "date": "12/09/2024",
            "reason": "The company needs a new e-commerce platform to expand their product range."
        },{
            "projectName": "EduPlus Learning Portal",
            "date": "22/10/2024",
            "reason": "The educational institute wants to integrate a new online learning management system."
        },{
            "projectName": "HealthCare Connect",
            "date": "05/11/2024",
            "reason": "The healthcare provider aims to develop a patient portal for easier appointment scheduling."
        },{
            "projectName": "TravelMate App",
            "date": "15/12/2024",
            "reason": "The startup wants to create a mobile app for travel bookings and itinerary management."
        },{
            "projectName": "FitLife Wellness",
            "date": "30/01/2025",
            "reason": "The fitness center wants to enhance their website with a new class booking system and blog.  with a new class booking system  with a new class booking system  with a new class booking system "
        }





    ]);


    /*	useEffect(() => {
            if (id == undefined) return;

            getClientInvoices(id)
            .then(res => setInvoices(res.value))
            .catch(res => toast(res.state, res.value));
        }, [id]);*/

    return (
        <>
        <div className="scroll-container" style={{height: "100%"}}>
            <div className="flex-col" style={{gap: "10px"}}>
                <div className="flex-col invoice redButton" style={{gap: "5px"}}>
                    This is just an example to show you what the invoice list will look like. Please note that the functionality is still in development and not yet available. <a  href="/pdf/example.pdf"   style={{ textDecoration: 'underline' , color:'#de4918'}}  download="example.pdf">
                    Click here</a> to download a sample invoice.</div>


            {

                invoices.length !== 0 ?
                    invoices.map((invoice) => {
                        return (
                            <Link to={``}>
                                <div className="flex-col invoice" style={{gap: "5px"}}>
                                    <div className="flex-row-between">
                                        <div className="flex-row" style={{gap: "10px"}}>
                                            <p className="invoice__id">#{invoice.id}</p>
                                            <p className="invoice__project-name">{invoice.projectName}</p>
                                        </div>
                                        <p className="invoice__date">{invoice.date}</p>
                                    </div>
                                    <p className="invoice__reason">{invoice.reason}</p>
                                </div>
                            </Link>
                        )
                    }) : null
            }
        </div>  </div>
</>
)
    ;
}

export default AllInvoices;