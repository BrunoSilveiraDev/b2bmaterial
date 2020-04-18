import React from "react";

import "./card-loading.scss";

export default function CardLoading() {
  return (
    <div className="card-loader card-loader--tabs">
      <div className="skeleton-content-coumn">
        <div className="skeleton-header-line">
          <div className="skeleton-title"></div>
          <div className="skeleton-type-icon"></div>
        </div>
        <div className="skeleton-content-1"></div>
        <div className="skeleton-content-2"></div>
        <div className="skeleton-content-3"></div>
        <div className="skeleton-content-4"></div>
        <div className="skeleton-footer-line">
          <div className="skeleton-stars"></div>
          <div className="skeleton-stars"></div>
          <div className="skeleton-stars"></div>
          <div className="skeleton-stars"></div>
          <div className="skeleton-stars"></div>
        </div>
      </div>
    </div>
  );
}
