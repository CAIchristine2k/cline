import React from 'react';

export function ComparisonTable() {
  const rows = [
    {
      label: 'Marque',
      good: 'Marque française engagée',
      bad: 'Souvent basés à l\'étranger',
    },
    {
      label: 'Livraison',
      good: '24–48h, suivi en temps réel',
      bad: 'Délais plus longs, peu transparents',
    },
    {
      label: 'Confort & respirabilité',
      good: 'Cap ultra-léger et respirant',
      bad: 'Cap souvent lourd ou inconfortable',
    },
    {
      label: 'Rendu visuel',
      good: 'Effet ultra-naturel, finition soignée',
      bad: 'Aspect parfois artificiel',
    },
    {
      label: 'Adaptation à toutes les têtes',
      good: 'Taille ajustable, maintien parfait',
      bad: 'Tailles limitées, pas toujours adaptées',
    },
  ];

  return (
    <section className="py-16 px-4 relative z-[2] bg-white">
      {/* Pink overlay */}
      <div className="absolute inset-0 bg-primary/10"></div>

      <div className="max-w-[1000px] mx-auto text-center relative z-10">
        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 text-black">
            Nous vs Concurrents
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Pourquoi <strong>C'Line Hair</strong> fait la différence.
          </p>
        </div>

        {/* Card */}
        <div className="compare-card">
          {/* Header */}
          <div className="compare-header">
            <div className="compare-col compare-col--left">
              <div className="compare-avatar">
                <img src="/images/logo.png" alt="C'Line Hair" />
              </div>
              <h3>C'Line Hair</h3>
            </div>

            <div className="compare-vs">VS</div>

            <div className="compare-col compare-col--right">
              <h3>Concurrents</h3>
            </div>
          </div>

          {/* Rows */}
          <div className="compare-rows">
            {rows.map((row, idx) => (
              <div key={idx} className="compare-row">
                <div className="compare-label">{row.label}</div>
                <div className="compare-cell good">
                  <span className="icon">✓</span>
                  <span>{row.good}</span>
                </div>
                <div className="compare-cell bad">
                  <span className="icon">✗</span>
                  <span>{row.bad}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <p className="mt-4 text-sm text-gray-600">
          C'Line Hair, pensée comme une perruque mais vécue comme vos vrais cheveux.
        </p>
      </div>

      {/* CSS Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .compare-card {
          max-width: 960px;
          margin: 0 auto;
          background: linear-gradient(90deg, #ffe0ea 0%, #fff5f9 50%, #ffe0ea 100%);
          border-radius: 24px;
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.06);
          padding: 28px 24px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .compare-header {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          text-align: center;
          margin-bottom: 20px;
          padding-left: 19rem;
        }

        .compare-col h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-top: 8px;
        }

        .compare-avatar {
          width: 70px;
          height: 70px;
          border-radius: 999px;
          overflow: hidden;
          margin: 0 auto;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .compare-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .compare-col--left h3 {
          color: #12805c;
        }

        .compare-col--right h3 {
          color: #c0392b;
        }

        .compare-vs {
          width: 48px;
          height: 48px;
          border-radius: 999px;
          background: #000;
          color: #fff;
          font-weight: 600;
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .compare-rows {
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
        }

        .compare-row {
          display: grid;
          grid-template-columns: 1.1fr 1.1fr 1.1fr;
          align-items: stretch;
          font-size: 0.9rem;
        }

        .compare-row:nth-child(odd) {
          background: #fff9fb;
        }

        .compare-row:nth-child(even) {
          background: #ffeef5;
        }

        .compare-label {
          padding: 12px 14px;
          font-weight: 500;
          color: #444;
          border-right: 1px solid rgba(255, 255, 255, 0.7);
        }

        .compare-cell {
          padding: 12px 14px;
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .compare-cell span {
          color: #000;
        }

        .compare-cell.good {
          background: rgba(210, 250, 230, 0.9);
        }

        .compare-cell.bad {
          background: rgba(255, 230, 230, 0.9);
        }

        .compare-cell.good .icon {
          color: #1e9c5b;
          font-weight: 700;
        }

        .compare-cell.bad .icon {
          color: #e74c3c;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .compare-card {
            padding: 20px 12px;
          }

          .compare-header {
            padding-left: 0;
            grid-template-columns: 1fr auto 1fr;
            gap: 8px;
          }

          .compare-avatar {
            width: 50px;
            height: 50px;
          }

          .compare-col h3 {
            font-size: 0.75rem;
          }

          .compare-vs {
            width: 36px;
            height: 36px;
            font-size: 0.75rem;
          }

          .compare-row {
            grid-template-columns: 1fr;
            font-size: 0.8rem;
          }

          .compare-label {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.7);
            font-weight: 600;
            background: #f0f0f0;
          }

          .compare-cell {
            justify-content: flex-start;
            padding: 10px 12px;
          }

          .compare-cell span {
            font-size: 0.8rem;
          }
        }
      `}} />
    </section>
  );
}
