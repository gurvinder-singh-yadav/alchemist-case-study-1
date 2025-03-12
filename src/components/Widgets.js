import React, { useEffect, useRef, useState } from "react";
import widgetData from "../data/widgetData";
import "./Widgets.css";

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
  const [visibleWidgets, setVisibleWidgets] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            setVisibleWidgets((prev) => [...prev, index]);
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );

    const elements = containerRef.current.querySelectorAll(".widget-card");
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="row g-3" ref={containerRef}>
      {widgetData.map((widget, index) => (
        <div
          key={index}
          data-index={index}
          className="col-md-4 col-sm-6 mb-4 widget-card"
        >
          {visibleWidgets.includes(index) && <WidgetCard {...widget} />}
        </div>
      ))}
    </div>
  );
}

export default Widgets;
