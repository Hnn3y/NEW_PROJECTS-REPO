import React, { useState } from "react"; 

const ContactForm = () => {
    const [formData, setFormData] = useState ({
        fullName: '',
        email: '',
        service: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name] : value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', formData);
        alert('Sent!'); 
        setFormData({
            fullName: '',
            email: '',
            service: 'Web design',
            message: '',
        });
    };

    return (
        <form
        onSubmit = {handleSubmit}
        className = "bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-5"
        >
            <h2 className="text-center text-xl font-semibold">Contact Us</h2>

            <input 
            type= "text"
            name="fuLLName"
            placeholder="Enter full Name"
            value={ formData.fullName }
            onChange={ handleChange }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
            /> 

            <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            />
        </form>
    )
} 

export default ContactForm;