import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const DeathRegistration = () => {
  const [formData, setFormData] = useState({
    deceasedName: '',
    dateOfDeath: '',
    placeOfDeath: '',
    causeOfDeath: '',
    age: '',
    gender: '',
    address: '',
    informantName: '',
    informantRelation: '',
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
      const response = await axios.post('http://localhost:3001/api/death', formData);
      if (response.data.success) {
        setMessage('Death registration successful!');
      } else {
        setMessage(response.data.message || 'Error submitting form. Please try again.');
      }
      setMessage('Death registration successful!');
      setFormData({
        deceasedName: '',
        dateOfDeath: '',
        placeOfDeath: '',
        causeOfDeath: '',
        age: '',
        gender: '',
        address: '',
        informantName: '',
        informantRelation: '',
        phoneNumber: ''
      });
    } catch (error) {
      setMessage('Error submitting form. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Death Registration</h2>
      {message && (
        <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
          {message}
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name of Deceased</Form.Label>
          <Form.Control
            type="text"
            name="deceasedName"
            value={formData.deceasedName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date of Death</Form.Label>
          <Form.Control
            type="date"
            name="dateOfDeath"
            value={formData.dateOfDeath}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Place of Death</Form.Label>
          <Form.Control
            type="text"
            name="placeOfDeath"
            value={formData.placeOfDeath}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cause of Death</Form.Label>
          <Form.Control
            type="text"
            name="causeOfDeath"
            value={formData.causeOfDeath}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Age at Death</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={formData.age}
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
          <Form.Label>Informant Name</Form.Label>
          <Form.Control
            type="text"
            name="informantName"
            value={formData.informantName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Informant Relationship</Form.Label>
          <Form.Control
            type="text"
            name="informantRelation"
            value={formData.informantRelation}
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
            required
          />
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default DeathRegistration;
