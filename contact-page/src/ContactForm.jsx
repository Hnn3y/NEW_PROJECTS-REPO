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
        })
    }
}