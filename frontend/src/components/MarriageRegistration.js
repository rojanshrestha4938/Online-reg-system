import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const MarriageRegistration = () => {
  const [formData, setFormData] = useState({
    groomName: '',
    groomDateOfBirth: '',
    groomAddress: '',
    brideName: '',
    brideDateOfBirth: '',
    brideAddress: '',
    dateOfMarriage: '',
    placeOfMarriage: '',
    witnessName1: '',
    witnessName2: '',
    phoneNumber: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/marriage', formData);
      if (response.data.success) {
        setMessage('Marriage registration successful!');
      } else {
        setMessage(response.data.message || 'Error submitting form. Please try again.');
      }
      setMessage('Marriage registration successful!');
      setFormData({
        groomName: '',
        groomDateOfBirth: '',
        groomAddress: '',
        brideName: '',
        brideDateOfBirth: '',
        brideAddress: '',
        dateOfMarriage: '',
        placeOfMarriage: '',
        witnessName1: '',
        witnessName2: '',
        phoneNumber: ''
      });
    } catch (error) {
      setMessage('Error submitting form. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Marriage Registration</h2>
      {message && (
        <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
          {message}
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Groom's Full Name</Form.Label>
          <Form.Control
            type="text"
            name="groomName"
            value={formData.groomName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Groom's Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="groomDateOfBirth"
            value={formData.groomDateOfBirth}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Groom's Address</Form.Label>
          <Form.Control
            type="text"
            name="groomAddress"
            value={formData.groomAddress}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bride's Full Name</Form.Label>
          <Form.Control
            type="text"
            name="brideName"
            value={formData.brideName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bride's Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="brideDateOfBirth"
            value={formData.brideDateOfBirth}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bride's Address</Form.Label>
          <Form.Control
            type="text"
            name="brideAddress"
            value={formData.brideAddress}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date of Marriage</Form.Label>
          <Form.Control
            type="date"
            name="dateOfMarriage"
            value={formData.dateOfMarriage}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Place of Marriage</Form.Label>
          <Form.Control
            type="text"
            name="placeOfMarriage"
            value={formData.placeOfMarriage}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Witness 1 Name</Form.Label>
          <Form.Control
            type="text"
            name="witnessName1"
            value={formData.witnessName1}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Witness 2 Name</Form.Label>
          <Form.Control
            type="text"
            name="witnessName2"
            value={formData.witnessName2}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contact Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">Submit</Button>
      </Form>
    </div>
  );
};

export default MarriageRegistration;