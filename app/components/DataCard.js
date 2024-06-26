export default function DataCard() {
    return (
      <div className="dashboard-card">
        <a href="/tables" className="ontario-card__container">
          <div className="ontario-card-li">
            <div className="ontario-card__text-container">
              <h2 className="ontario-card__heading">Data</h2>
              <div className="ontario-card__description">
                <p>Your saved and processed SQL tables.</p>
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  }
  