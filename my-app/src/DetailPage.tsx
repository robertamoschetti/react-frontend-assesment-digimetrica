import { useParams, Link } from "react-router-dom";
import { Container, Button, Alert, Row, Col, Card } from "react-bootstrap";

function DetailPage({ data=[] }) {
  const { id } = useParams(); // Ottieni l'ID dalla URL
  const result = data.find((item) => item.idsummary === id); // Trova il risultato corrispondente

  if (!result) {
    return (
      <Container className="text-center mt-5">
        <h3>Dettagli non trovati</h3>
        <Link to="/">
          <Button variant="secondary">Torna indietro</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1>Dettagli per {result.domain_name}</h1>
      <p>
        <strong>ID Summary:</strong> {result.idsummary}
      </p>
      <p>
        <strong>Creazione:</strong> {result.creation_date}
      </p>
      <Alert variant={result.risk_score < 20 ? "success" : result.risk_score < 40 ? "warning":"danger"}>
        <h5>Rischio Totale: {result.risk_score}/100</h5>
        <pre className="custom-alert">{result.summary_text}</pre>
      </Alert>


      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Vulnerabilità</Card.Title>
              <ul>
                <li>Critiche Attive: {result.n_vulns.total.critical}</li>
                <li>Alto Livello Passive: {result.n_vulns.passive.high}</li>
                <li>Medium Livello Attive: {result.n_vulns.active.medium}</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Esposizione dei Servizi</Card.Title>
              <ul>
                <li>Porte più esposte: 80, 443, 8800, 53</li>
                <li>Asset totali esposti: {result.n_asset}</li>
                <li>Indirizzi IPv4 unici: {result.unique_ipv4}</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Sicurezza Email</Card.Title>
              <ul>
                <li>Spoofing possibile: {result.email_security.spoofable}</li>
                <li>Politica DMARC: {result.email_security.dmarc_policy}</li>
                <li>Blacklist detections: {result.email_security.blacklist_detections}</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-center mt-4">
        <Button variant="primary" href={`mailto:${result.domain_name}`}>
          Contatta l'Amministratore
        </Button>
        <p className="mt-3 text-muted">Ultima modifica: {result.last_edit}</p>
      </div>
      
      <Link to="/">
        <Button variant="secondary">Torna alla Tabella</Button>
      </Link>
    </Container>
  );
}

export default DetailPage;