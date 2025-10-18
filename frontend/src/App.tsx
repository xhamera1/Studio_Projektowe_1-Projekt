import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [backendMessage, setBackendMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Test połączenia z backendem
        fetch('http://localhost:8080/')
            .then(response => response.text())
            .then(data => {
                setBackendMessage(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Błąd połączenia z backendem:', error);
                setBackendMessage('Nie można połączyć z backendem');
                setLoading(false);
            });
    }, []);

    return (
        <div className="App">
            <h1>Health Prediction System - Frontend</h1>

            <div className="card">
                <h2>Status połączenia z backendem:</h2>
                {loading ? (
                    <p>Łączenie...</p>
                ) : (
                    <p>{backendMessage}</p>
                )}
            </div>

            <div className="card">
                <p>Frontend działa poprawnie na porcie 5173</p>
                <p>Backend działa na porcie 8080</p>
            </div>
        </div>
    );
}

export default App;
