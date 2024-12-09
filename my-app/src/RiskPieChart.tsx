import { Container, Row, Col } from "react-bootstrap";
import { useRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Report } from "./types/report";
// Registrazione esplicita degli elementi necessari
ChartJS.register(ArcElement, Tooltip, Legend);

function RiskPieChart({ results }: { results: Report[] }) {
  const chartRef = useRef(null);

  // Prepara i dati per il grafico
  const data = {
    labels: results.map((result) => result.domain_name),
    datasets: [
      {
        label: "Risk Score",
        data: results.map((result) => result.risk_score),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h4>Distribuzione dei Risk Score</h4>
          <Pie ref={chartRef} data={data} options={options} />
        </Col>
      </Row>
    </Container>
  );
}

export default RiskPieChart;
