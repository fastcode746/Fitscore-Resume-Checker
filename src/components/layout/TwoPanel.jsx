import React from 'react';

const TwoPanel = React.memo(function TwoPanel({ leftContent, rightContent }) {
  return (
    <>
      <style>{`
        .two-panel {
          display: flex;
          margin-top: 56px;
          min-height: calc(100vh - 56px);
        }
        .two-panel__left {
          width: 420px;
          min-width: 420px;
          background: #fff;
          border-right: 1px solid #E5E7EB;
          overflow-y: auto;
          padding: 24px;
          position: sticky;
          top: 56px;
          height: calc(100vh - 56px);
        }
        .two-panel__right {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          background: #F8F8F7;
        }
        @media (max-width: 767px) {
          .two-panel {
            flex-direction: column;
          }
          .two-panel__left {
            width: 100%;
            min-width: 100%;
            position: relative;
            top: auto;
            height: auto;
            border-right: none;
            border-bottom: 1px solid #E5E7EB;
          }
        }
      `}</style>

      <div className="two-panel">
        <aside className="two-panel__left">
          {leftContent}
        </aside>
        <main className="two-panel__right">
          {rightContent}
        </main>
      </div>
    </>
  );
});

export default TwoPanel;
