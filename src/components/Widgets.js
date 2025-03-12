import React from "react";
import "./Widgets.css";
import widgetData from "../data/widgetData";

const WidgetCard = ({ title, value, change, trend }) => {
  const getTrendClass = () => {
    switch (trend.toLowerCase()) {
      case "up":
        return "trend-up";
      case "down":
        return "trend-down";
      default:
        return "trend-neutral";
    }
  };

  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="widget-card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <div className="display-6">{value}</div>
          <p className={`trend-indicator ${getTrendClass()}`}>
            <small>
              {change}{" "}
              {trend === "up"
                ? "increase"
                : trend === "down"
                ? "decrease"
                : "no change"}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

function Widgets() {
  

  return (
    <div className="row g-3">
      {widgetData.map((widget, index) => (
        <WidgetCard key={index} {...widget} />
      ))}
    </div>
  );
}

export default Widgets;
