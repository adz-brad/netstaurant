import React, { useState }  from 'react'
import emailjs from 'emailjs-com';

const Contact = () => {

    const [name, setName ] = useState("");
    const [email, setEmail ] = useState("");
    const [subject, setSubject ] = useState("");
    const [message, setMessage ] = useState("");

    const clearForm = () => {
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
    }

    const handleChange = ({ target }) => {
        switch(target.name){
            case "name":
                setName(target.value);
                break;
            case "email":
                setEmail(target.value);
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

    const handleSubmit = (e) => {

        e.preventDefault();

        emailjs.sendForm('adrenalize_mailer', 'adrenalize_contact', e.target, 'user_PRn0RHoZKrcxSEqpdWiYy')
        .then(clearForm())
        .then(
            (result) => {console.log(result.text);}, 
            (error) => {console.log(error.text);}
            );
    }

    return(

        <form className="contact-form" onSubmit={handleSubmit}>

        <input type="hidden" name="contact_number" />

        <div className="form-input">
            <h3 htmlFor="name">Name</h3>
            <input placeholder="My name is Jeff..." required type="text" name="name" value={name} onChange={handleChange}/>
        </div>

        <div className="form-input">
            <h3 htmlFor="name">Email</h3>
            <input placeholder="Cool. How can we get in touch?" required type="email" name="email" value={email} onChange={handleChange}/>
        </div>

        <div className="form-input">
            <h3 htmlFor="name">Subject</h3>
            <input placeholder="What is it you want to talk about?" required type="text" name="subject" value={subject} onChange={handleChange} />
        </div>

        <div className="message-input">
            <h3 htmlFor="name">Message</h3>
            <textarea placeholder="Well then, tell us about it!" required name="message" value={message} onChange={handleChange} />
        </div>

        <button disabled type="submit">Send</button>

    </form>

    )
}

export default Contact