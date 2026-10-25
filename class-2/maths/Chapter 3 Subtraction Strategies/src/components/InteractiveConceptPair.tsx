import React, { useState } from 'react';
import { ConceptCheckQuestion } from '../data/chapter3Content';

interface Props {
  title: string;
  q1: ConceptCheckQuestion;
  q2: ConceptCheckQuestion;
}

export function InteractiveConceptPair({ title, q1, q2 }: Props) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const handleSelect = (qId: number, optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    setChecked((prev) => ({ ...prev, [qId]: false }));
  };

  const handleCheck = (qId: number) => {
    if (answers[qId] === undefined) return;
    setChecked((prev) => ({ ...prev, [qId]: true }));
  };

  const renderCard = (q: ConceptCheckQuestion) => {
    const isChecked = checked[q.id];
    const userAns = answers[q.id];
    const isCorrect = userAns === q.ans;

    let cardClass = 'pair-card';
    if (isChecked) cardClass += isCorrect ? ' correct' : ' wrong';

    return (
      <div className={cardClass} key={q.id}>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '12.5px', marginBottom: '2px', color: '#111827' }}>
            {q.q}
          </div>
          <div className="font-hi" style={{ fontSize: '11px', color: '#475569', marginBottom: '6px' }}>
            👉 {q.hi}
          </div>
          <div className="choices-sm">
            {q.opts.map((opt, idx) => {
              let optClass = 'choice-sm';
              if (userAns === idx) optClass += ' selected';
              if (isChecked) {
                if (idx === q.ans) optClass += ' right-choice';
                else if (userAns === idx) optClass += ' wrong-choice';
              }
              return (
                <div key={idx} className={optClass} onClick={() => handleSelect(q.id, idx)}>
                  <span className="choice-badge-sm">{String.fromCharCode(65 + idx)}</span>
                  <span>{opt}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
          <button
            className="quiet-btn"
            type="button"
            onClick={() => handleCheck(q.id)}
            disabled={userAns === undefined}
            style={{ opacity: userAns === undefined ? 0.6 : 1 }}
          >
            {isChecked ? (isCorrect ? '✓ Correct' : '✕ Re-try') : 'Check Answer ✓'}
          </button>
          {isChecked && (
            <span
              style={{
                fontSize: '11px',
                fontWeight: 'bold',
                color: isCorrect ? '#15803d' : '#b91c1c'
              }}
            >
              {isCorrect ? 'Well done!' : `Explanation: ${q.expl}`}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="concept-pair-box">
      <div className="pair-header">
        <span>⚡ Interactive Concept Check: {title}</span>
        <span>2 Quick Check Questions</span>
      </div>
      <div className="pair-grid">
        {renderCard(q1)}
        {renderCard(q2)}
      </div>
    </div>
  );
}
