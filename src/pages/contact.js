import React, { useState }  from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import Seo from '../components/seo/SEO'

const Contact = () => {

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

    const sharingUrl = typeof window !== 'undefined' ? window.location.href : '';

    const [name, setName ] = useState("");
    const [email, setEmail ] = useState("");
    const [subject, setSubject ] = useState("");
    const [message, setMessage ] = useState("");
    const [business, setBusiness ] = useState("");
    const [phone, setPhone ] = useState("");

    const clearForm = () => {
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setBusiness("");
        setPhone("");
    }

    const handleChange = ({ target }) => {
        switch(target.name){
            case "name":
                setName(target.value);
                break;
            case "email":
                setEmail(target.value);
                break;
            case "business":
                setBusiness(target.value);
                break;
            case "phone":
                setPhone(target.value);
                break;
            case "subject":
                setSubject(target.value);
                break;
            case "message":
                setMessage(target.value);
                break;
            default:
                return;
        }
    }

    const messageError = () => {  
        toast("Unable To Send Your Message", {
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

      const messageSent = () => {  
        toast("Your Message Has Been Sent", {
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

    const handleSubmit = (e) => {

        e.preventDefault();

        emailjs.sendForm('adrenalize_mailer', 'adrenalize_contact', e.target, 'user_PRn0RHoZKrcxSEqpdWiYy')
        .then(clearForm())
        .then(
            (result) => {
                console.log(result.text);
                messageSent();
            }, 
            (error) => {
                console.log(error.text);
                messageError();
            }
            );
    }

    return(

        <div className="p-2 lg:p-4 mx-auto w-full h-full">

            <Seo
                pageTitle="Contact"
                pageDescription="Contact Page for Adrenalize e-Commerce"
                pageKeywords="Contact, Adrenalize e-Commerce"
                pageImage={data.siteID.logo.localFile.url}
                pageUrl={sharingUrl}
            />   

            <div className="pb-1 border-b-2 border-primary-700">
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-medium pb-2">Contact Us</h1>
                <p className="text-base md:text-lg leading-snug">Need a custom quote? Curious about one of our products? Just need to get in touch with a company representative? Fill out the contact form below and we'll be in touch with you as soon as we can!</p>
            </div>

            <div className="flex flex-row items-center justify-center rounded-md shadow-lg md:m-2 mt-5">
                
            <form className="contact-form w-full sm:p-2" onSubmit={handleSubmit}>

                <input type="hidden" name="contact_number" />

                <div className="personal">

                    <div className="form-input">
                        <h3 htmlFor="name">Name</h3>
                        <input placeholder="Your Full Name" required type="text" name="name" value={name} onChange={handleChange}/>
                    </div>

                    <div className="form-input">
                        <h3 htmlFor="business">Business</h3>
                        <input placeholder="Your Business Name (optional)" type="name" name="business" value={business} onChange={handleChange}/>
                    </div>

                </div>

                <div className="personal">

                    <div className="form-input">
                        <h3 htmlFor="name">Email</h3>
                        <input placeholder="Your Email Address" required type="email" name="email" value={email} onChange={handleChange}/>
                    </div>

                    <div className="form-input">
                        <h3 htmlFor="name">Phone</h3>
                        <input placeholder="Your Phone Number (optional)" type="tel" name="phone" value={phone} onChange={handleChange} />
                    </div>

                </div>

                <div className="form-input w-full xl:w-1/2">
                    <h3 htmlFor="name">Subject</h3>
                    <input placeholder="Your Message Subject " required type="text" name="subject" value={subject} onChange={handleChange} />
                </div>

                <div className="form-input">
                    <h3 htmlFor="name">Message</h3>
                    <textarea rows="5" placeholder="How can we help you today?" required name="message" value={message} onChange={handleChange} />
                </div>

                
                <div className="w-full text-center">
                    <button className="button px-2 py-1 text-2xl mb-4" type="submit">Send</button>
                </div>
                

            </form>
            </div>
        </div>

    )
}

export default Contact