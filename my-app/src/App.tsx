import { useEffect, useState } from "react";
import './App.css';
import { Container, Button, Table, Alert, Spinner } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import DetailPage from "./DetailPage";
import VulnerabilityChart from "./VulnerabilityChart";
import RiskPieChart from "./RiskPieChart";
import { Report } from "./types/report";
import DownloadButton from "./DownloadButton";
import config from "./config";

function App() {
  const [data, setData] = useState<Report[]>([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch(config.REPORT_API)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (data.status == "success") {
            setData(data.results);
          } else {
            console.log(data.message)
          }
          setStatus(data.status);
        }
      }
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
        setStatus("error")
      });
  }, []);

  if (status == "loading") {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <h3 className="mt-3">Caricamento dati...</h3>
      </Container>
    );
  }

  if (status != "success" || data.length === 0) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">
          <h5>Impossibile mostrare il report. Se il probema persiste contattare l'assistenza</h5>
        </Alert>
      </Container>
    );
  }

  return (
    <Router>
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="text-center mb-4">Summary sicurezza <DownloadButton></DownloadButton></h1>
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ID Summary</th>
                      <th>Dominio</th>
                      <th>Risk Score</th>
                      <th>Creazione</th>
                      <th>Ultima Modifica</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((result, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{result.idsummary}</td>
                        <td>{result.domain_name}</td>
                        <td>
                          <Alert className="text-center custom-alert-sm" variant={result.risk_score < 20 ? "success" : result.risk_score < 40 ? "warning" : "danger"}>{result.risk_score}</Alert>
                        </td>
                        <td>{result.creation_date}</td>
                        <td>{result.last_edit}</td>
                        <td>
                          {/* Pulsante con icona per navigare */}
                          <Link to={`/details/${result.idsummary}`}>
                            <Button variant="primary" className="btn-sm">
                              <i className="bi bi-info"></i>
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>



                {/* Grafico delle vulnerabilità */}
                <VulnerabilityChart results={data} />
                {/* Grafico dei rischi */}
                <RiskPieChart results={data} />
              </>
            }
          />

          {/* Route per la pagina di dettaglio */}
          <Route path="/details/:id" element={<DetailPage data={data} />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
