import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

// Configure axios defaults
axios.defaults.timeout = 5000; // 5 seconds timeout
axios.defaults.baseURL = 'http://localhost:3001';

const BirthRegistration = () => {
  const [formData, setFormData] = useState({
    childName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    gender: '',
    fatherName: '',
    motherName: '',
    address: '',
    phoneNumber: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.phoneNumber.match(/^[0-9]{10}$/)) {
      return 'Please enter a valid 10-digit phone number';
    }
    if (new Date(formData.dateOfBirth) > new Date()) {
      return 'Date of birth cannot be in the future';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear any existing messages
    
    // Validate all required fields
    const requiredFields = ['childName', 'dateOfBirth', 'placeOfBirth', 'gender', 'fatherName', 'motherName', 'address', 'phoneNumber'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      setMessage(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Validate phone number and date
    const validationError = validateForm();
    if (validationError) {
      setMessage(validationError);
      return;
    }

    try {
      // Show loading message
      setMessage('Submitting form...');

      // Try to ping the server first
      try {
        await axios.get('/');
      } catch (error) {
        throw new Error('Backend server is not running. Please ensure the server is started.');
      }

      // Proceed with form submission
      const response = await axios.post('/api/birth', {
        ...formData,
        dateOfBirth: new Date(formData.dateOfBirth).toISOString() // Ensure proper date format
      });

      if (response.data.success) {
        setMessage('Birth registration successful!');
        // Clear form after successful submission
        setFormData({
          childName: '',
          dateOfBirth: '',
          placeOfBirth: '',
          gender: '',
          fatherName: '',
          motherName: '',
          address: '',
          phoneNumber: ''
        });
      } else {
        setMessage(response.data.message || 'Error submitting form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Handle different types of errors
      if (error.response) {
        // The server responded with an error status
        setMessage(error.response.data.message || 'Server error. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        setMessage('Could not connect to the server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request
        setMessage('Error submitting form. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Birth Registration</h2>
      {message && (
        <div className={`alert ${message.includes('Error') || message.includes('Please') ? 'alert-danger' : 
                                message.includes('Submitting') ? 'alert-info' : 'alert-success'}`}>
          {message}
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Child's Name</Form.Label>
          <Form.Control
            type="text"
            name="childName"
            value={formData.childName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Place of Birth</Form.Label>
          <Form.Control
            type="text"
            name="placeOfBirth"
            value={formData.placeOfBirth}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Father's Name</Form.Label>
          <Form.Control
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mother's Name</Form.Label>
          <Form.Control
            type="text"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            pattern="[0-9]{10}"
            placeholder="10 digit phone number"
            title="Please enter a valid 10-digit phone number"
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">Submit</Button>
      </Form>
    </div>
  );
};

export default BirthRegistration;