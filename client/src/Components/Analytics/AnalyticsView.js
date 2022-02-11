import React, { useContext } from "react";
import { GlobalContext } from "../../Contexts/GlobalContext";

const AnalyticsView = () => {
  const { setIsAnalyticsFocused } = useContext(GlobalContext);

  return (
    <>
      <h1>Enjoy playing with this abadi, and get some sleep!</h1>

      <div className="buttons">
        <button
          className="btn cancel"
          onClick={() => setIsAnalyticsFocused(false)}
        >
          <span>Cancel</span>
        </button>
      </div>
    </>
  );
};

export default AnalyticsView;
