import React from 'react';
import { Card, Row, Col, Image, Container } from 'react-bootstrap';
import './Home.css';

const Home = ({ setPage }) => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section text-center mb-5">
        <Image
          src="https://tse3.mm.bing.net/th/id/OIP.ZRhhnsaBHFjm5sXEbnaY5gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
          fluid
          className="hero-image"
        />
        <div className="hero-overlay">
          <h1 className="hero-title">Welcome to e-Government Registration</h1>
          <p className="hero-subtitle">Register Birth, Death, and Marriage certificates easily online</p>
        </div>
      </div>

      {/* Cards Section */}
      <Container>
        <Row>
          <Col md={4}>
            <Card 
              className="mb-4 shadow hover-shadow registration-card"
              onClick={() => setPage('birth')}
            >
              <Card.Img
                variant="top"
                src="https://th.bing.com/th/id/OIP.m2PfPmj33Q1ZvkPzfCo1BgHaE8?w=262&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
                className="card-image"
              />
              <Card.Body>
                <Card.Title>Birth Registration</Card.Title>
                <Card.Text>Register a new birth certificate online easily.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card 
              className="mb-4 shadow hover-shadow registration-card"
              onClick={() => setPage('death')}
            >
              <Card.Img
                variant="top"
                src="https://th.bing.com/th/id/OIP.uLQGDycySEyaBJmMmuCCZwHaE6?w=235&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                className="card-image"
              />
              <Card.Body>
                <Card.Title>Death Registration</Card.Title>
                <Card.Text>Report a death and get the certificate online.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card 
              className="mb-4 shadow hover-shadow registration-card"
              onClick={() => setPage('marriage')}
            >
              <Card.Img
                variant="top"
                src="https://th.bing.com/th/id/OIP.WTyQ43kwuKdMMKI6rBi-yQHaDZ?w=312&h=160&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                className="card-image"
              />
              <Card.Body>
                <Card.Title>Marriage Registration</Card.Title>
                <Card.Text>Register your marriage and get legal documentation.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Info Section */}
      <div className="mt-5 p-5 bg-light rounded shadow">
        <Container>
          <h3>About e-Government Services</h3>
          <p>
            Our e-Government portal provides online registration for Birth, Death, and Marriage certificates.
            You can register records, download certificates, and track applications conveniently from home.
          </p>
          <p>
            This system ensures transparency, accessibility, and efficiency for all citizens. By digitizing records,
            we save time and improve record-keeping accuracy.
          </p>
        </Container>
      </div>
    </div>
  );
}

export default Home;
