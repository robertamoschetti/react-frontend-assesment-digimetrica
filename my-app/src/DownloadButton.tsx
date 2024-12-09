import { useState } from "react";
import { Toast, ToastContainer } from 'react-bootstrap';
import config from "./config";

function DownloadButton() {
    const [error, setError] = useState<string | null>(null);
    const [show, setShow] = useState(false);
    const handleDownload = () => {
        setError(null)
        fetch(config.DOWNLOAD_CSV_API)
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((error) => {
                        throw new Error(error.detail || "Errore sconosciuto dal server");
                    });
                }
                return response.blob();
            })
            .then((blob) => {
                const now = new Date();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `report_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}.csv`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch((error) => {
                console.error("Errore durante il download del file:", error);
                setError("Errore durante il download del file. " + error);
                setShow(true)
            });
    };


    return (
        <>
            <button onClick={handleDownload} className="btn btn-primary">
                <i className="bi bi-filetype-csv"></i>
            </button>
            {error &&
                <ToastContainer
                    className="p-3"
                    position="top-end"
                    style={{ zIndex: 1 }}
                >
                    <Toast bg="danger" onClose={() => setShow(false)} show={show} delay={3000} autohide>
                        <Toast.Body>{error}</Toast.Body>
                    </Toast>
                </ToastContainer>
            }
        </>
    );
}

export default DownloadButton;
