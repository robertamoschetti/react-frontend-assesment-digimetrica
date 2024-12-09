import { useParams, Link } from "react-router-dom";
import { Container, Button, Alert, Row, Col, Card, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Report } from "./types/report";
import { useState } from "react";
import PortList from "./PortList";

function DetailPage({ data }: { data: Report[] }) {
  const { id } = useParams(); // Ottieni l'ID dalla URL
  const result = data.find((item) => item.idsummary === id); // Trova il risultato corrispondente
  const [showModalV, setShowModalV] = useState(false);
  const [showModalDL, setShowModalDL] = useState(false);

  const handleShowV = () => setShowModalV(true);
  const handleCloseV = () => setShowModalV(false);

  const handleShowDL = () => setShowModalDL(true);
  const handleCloseDL = () => setShowModalDL(false);

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
      <h1>Dettagli report per {result.domain_name}</h1>
      <p>
        <strong>ID Summary:</strong> {result.idsummary}
      </p>
      <p>
        <strong>Creazione:</strong> {result.creation_date}
      </p>
      <p>
        <strong>Dominio:</strong> {result.domain_name}
      </p>
      <Alert variant={result.risk_score < 20 ? "success" : result.risk_score < 40 ? "warning" : "danger"}>
        <h5>Rischio Totale: {result.risk_score}/100</h5>
        <pre className="custom-alert">{result.summary_text}</pre>
      </Alert>


      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>
                Vulnerabilità totali
                <Button variant="primary" className="btn-sm ms-2" onClick={handleShowV}>
                  <i className="bi bi-info-circle"></i>
                </Button>
              </Card.Title>
              <ul>
                <li>Critiche: {result.n_vulns.total.critical}</li>
                <li>Livello Alto: {result.n_vulns.total.high}</li>
                <li>Livello Medio: {result.n_vulns.total.medium}</li>
                <li>Livello Basso: {result.n_vulns.total.low}</li>
                <li>Info: {result.n_vulns.total.info}</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>
                Data leak total
                <Button variant="primary" className="btn-sm ms-2" onClick={handleShowDL}>
                  <i className="bi bi-info-circle"></i>
                </Button>
              </Card.Title>
              <ul>
                <li>Vip: {result.n_dataleak.total.vip}</li>
                <li>Domain stealer: {result.n_dataleak.total.domain_stealer}</li>
                <li>Potential stealer: {result.n_dataleak.total.potential_stealer}</li>
                <li>Other stealer: {result.n_dataleak.total.other_stealer}</li>
                <li>General leak: {result.n_dataleak.total.general_leak}</li>
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
                <li>Blacklist totali: {result.email_security.blacklist_total_list}</li>
                <li>Blacklist: {result.email_security.blacklist_detected_list?.length
                  ? result.email_security.blacklist_detected_list.join('; ')
                  : 'No entries detected'}</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>
                Punteggi
              </Card.Title>
              <ul>
                <li>Servizi esposti: {result.servizi_esposti_score}</li>
                <li>Data leak: {result.dataleak_score}</li>
                <li>Rapporto leak email: {result.rapporto_leak_email_score}</li>
                <li>Spoofing: {result.spoofing_score}</li>
                <li>Open ports: {result.open_ports_score}</li>
                <li>Blacklist: {result.blacklist_score}</li>
                <li>Vulnerabilità attive: {result.vulnerability_score_active}</li>
                <li>Vulnerabilità passive: {result.vulnerability_score_passive}</li>
                <li>Certificate: {result.certificate_score}</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>
                Altri Dettagli
              </Card.Title>
              <ul>
                <li>Certificati attivi: {result.n_cert_attivi}</li>
                <li>Certificati scaduti: {result.n_cert_scaduti}</li>
                <li>Asset: {result.n_asset}</li>
                <li>Domini simili: {result.n_similar_domains}</li>
                <li>Unique_ipv4: {result.unique_ipv4}</li>
                <li>Unique_ipv6: {result.unique_ipv6}</li>
                <li>WAF: {result.waf.count}
                  {result.waf.count > 0 && (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-waf">
                          {result.waf.assets?.join("; ")}
                        </Tooltip>
                      }
                    >
                      <span className="ms-2 text-primary">
                        <i className="bi bi-info-circle"></i>
                      </span>
                    </OverlayTrigger>
                  )}
                </li>
                <li>CDN: {result.cdn.count}
                  {result.cdn.count > 0 && (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-cnd">
                          {result.cdn.assets?.join("; ")}
                        </Tooltip>
                      }
                    >
                      <span className="ms-2 text-primary">
                        <i className="bi bi-info-circle"></i>
                      </span>
                    </OverlayTrigger>
                  )}

                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>
                N Port
              </Card.Title>
              <PortList n_port={result.n_port} />
            </Card.Body>
          </Card>
        </Col>

      </Row>
      <div className="text-center mt-4">
        <Button variant="primary" href={`mailto:info@mailditest.test`}>
          Contatta l'Amministratore
        </Button>
        <p className="mt-3 text-muted">Ultima modifica: {result.last_edit}</p>
      </div>

      <Link to="/">
        <Button variant="secondary">Torna alla Tabella</Button>
      </Link>

      {/* Modal con dettagli vulnerabilità */}
      <Modal show={showModalV} onHide={handleCloseV} centered>
        <Modal.Header closeButton>
          <Modal.Title>Dettagli delle Vulnerabilità</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Vulnerabilità Attive</h5>
          <ul>
            <li>Critiche: {result.n_vulns.active.critical}</li>
            <li>Alte: {result.n_vulns.active.high}</li>
            <li>Medie: {result.n_vulns.active.medium}</li>
            <li>Basse: {result.n_vulns.active.low}</li>
            <li>Info: {result.n_vulns.active.info}</li>
          </ul>
          <h5>Vulnerabilità Passive</h5>
          <ul>
            <li>Critiche: {result.n_vulns.passive.critical}</li>
            <li>Alte: {result.n_vulns.passive.high}</li>
            <li>Medie: {result.n_vulns.passive.medium}</li>
            <li>Basse: {result.n_vulns.passive.low}</li>
            <li>Info: {result.n_vulns.passive.info}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseV}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Modal con dettagli data leak */}
      <Modal show={showModalDL} onHide={handleCloseDL} centered>
        <Modal.Header closeButton>
          <Modal.Title>Dettagli data leak</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Data Leak Risolti</h5>
          <ul>
            <li>Vip: {result.n_dataleak.resolved.vip}</li>
            <li>Domain stealer: {result.n_dataleak.resolved.domain_stealer}</li>
            <li>Potential stealer: {result.n_dataleak.resolved.potential_stealer}</li>
            <li>Other stealer: {result.n_dataleak.resolved.other_stealer}</li>
            <li>General leak: {result.n_dataleak.resolved.general_leak}</li>
          </ul>
          <h5>Data Leak Non Risolti</h5>
          <ul>
            <li>Vip: {result.n_dataleak.unresolved.vip}</li>
            <li>Domain stealer: {result.n_dataleak.unresolved.domain_stealer}</li>
            <li>Potential stealer: {result.n_dataleak.unresolved.potential_stealer}</li>
            <li>Other stealer: {result.n_dataleak.unresolved.other_stealer}</li>
            <li>General leak: {result.n_dataleak.resolved.general_leak}</li>
          </ul>
          <h5>Enumerations: {result.n_dataleak.enumeration}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDL}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DetailPage;