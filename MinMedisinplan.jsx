import { useState } from 'react';

export default function MinMedisinplan() {
  const [taken, setTaken] = useState({
    elvanse: false,
    lisinopril: false,
    lercanidipin: false,
    propranolol: false,
  });
  const [log, setLog] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCheck = (med) => {
    setTaken((prev) => ({ ...prev, [med]: !prev[med] }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#003366' }}>Min Medisinplan</h1>

      <h2>1. Medisiner når jeg står opp:</h2>
      {['elvanse', 'lisinopril', 'lercanidipin'].map((med) => (
        <label key={med} style={{ display: 'block', marginBottom: '8px' }}>
          <input
            type="checkbox"
            checked={taken[med]}
            onChange={() => handleCheck(med)}
          />{' '}
          {med.charAt(0).toUpperCase() + med.slice(1)}
        </label>
      ))}

      <h2 style={{ marginTop: '20px' }}>2. Etter 30–60 minutter:</h2>
      <label>
        <input
          type="checkbox"
          checked={taken.propranolol}
          onChange={() => handleCheck('propranolol')}
        />{' '}
        Propranolol 10 mg
      </label>

      <h2 style={{ marginTop: '20px' }}>Logg effekt/bivirkninger:</h2>
      <textarea
        value={log}
        onChange={(e) => setLog(e.target.value)}
        placeholder="Hvordan føles det i dag?"
        rows={4}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <button onClick={handleSubmit} style={{ backgroundColor: '#990000', color: 'white', padding: '10px 20px' }}>
        Lagre logg
      </button>

      {submitted && <p style={{ color: 'green' }}>Logg lagret!</p>}
    </div>
  );
}