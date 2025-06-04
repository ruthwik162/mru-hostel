import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaSpinner } from "react-icons/fa"; // Import the spinner icon

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // New state to track loading

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      fullname: formData.name,
      email: formData.email,
      message: formData.message,
    };

    setLoading(true); // Set loading to true before sending the request

    try {
      // Sending the POST request to your backend
      const response = await axios.post('http://localhost:8087/user/contactus', contactData, {
        headers: {
          'Content-Type': 'application/json', // Ensure the backend receives the request in JSON format
        },
      });

      if (response.status === 200) {
        setSubmitted(true);  // Set submitted to true to display success message
        setFormData({ name: '', email: '', message: '' });  // Clear the form after submission
        toast.success("Submitted Successfully!");
      } else {
        console.error('Failed to send message:', response.data);
        toast.error("Failed to submit! Please try again.");
      }
    } catch (err) {
      console.error('Error submitting contact form:', err);
      toast.error("Error submitting! Please try again.");
    } finally {
      setLoading(false); // Set loading to false once the request is complete
    }
  };

  return (
    <div className="container mx-auto max-w-full py-30 px-4 sm:px-8 lg:px-24 bg-[#EAECC6]">
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">Contact Us</h2>

      <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
        We're here to help! Whether you have questions about our hostel facilities, mess services, or need assistance with admissions, feel free to reach out to us using the details below or send us a message.
      </p>

      {/* Contact Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div className="border p-6 rounded-2xl shadow-md bg-blue-50">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">Girls' Hostel</h3>
          <p><strong>Warden:</strong> Mrs. Priya Sharma</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Email:</strong> girls.hostel@example.com</p>
          <p><strong>Location:</strong> Block A, East Campus</p>
        </div>
        <div className="border p-6 rounded-2xl shadow-md bg-blue-50">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">Boys' Hostel</h3>
          <p><strong>Warden:</strong> Mr. Rajesh Verma</p>
          <p><strong>Phone:</strong> +91 98765 12345</p>
          <p><strong>Email:</strong> boys.hostel@example.com</p>
          <p><strong>Location:</strong> Block B, West Campus</p>
        </div>
      </div>

      <div className="text-center mb-16">
        <h4 className="text-xl font-semibold mb-2 text-blue-600">General Contact</h4>
        <p><strong>Address:</strong> XYZ College Hostel Campus, Near Main Gate, City Name, PIN 123456</p>
        <p><strong>Email:</strong> info@hostelportal.edu.in</p>
        <p><strong>Phone:</strong> +91 99999 88888</p>
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-xl shadow-lg">
        <h4 className="text-2xl font-bold text-center text-blue-700 mb-6">Send Us a Message</h4>

        {/* Success Message */}
        {submitted && (
          <div className="text-green-600 font-semibold text-center mb-4 animate__animated animate__fadeIn">
            Your message has been sent successfully!
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
              placeholder="Your full name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          {/* Submit Button with Spinner */}
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md transition duration-300 ease-in-out ${loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} text-white flex items-center justify-center`}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <FaSpinner className="animate-spin mr-2" /> // Show spinner when loading
            ) : (
              'Submit'
            )}
            {loading && ' Sending...'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
