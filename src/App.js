import './App.css';
import React, { useState, useEffect } from "react";
import './css/bootstrap.min.css';

function App() {
  const [img, setImg] = useState("");
  const [res, setRes] = useState([]);
  const Access_Key = "fhibLw3qC0peSdT2w7J6lSDXqiH5KziFT4HNrrm4cLk";

  const Submit = () => {
    fetchRequest();
    setImg("");
  };

  const fetchRequest = async () => {
    if (img.trim() === "") return; // Add a check to prevent empty search
    const data = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${Access_Key}&per_page=20`
    );
    const dataJ = await data.json();
    const result = dataJ.results;
    console.log(result);
    setRes(result);
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center input">
            <input
              className="col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 border-dark"
              type="text"
              placeholder="Search Anything..."
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
            <button
              type="submit"
              onClick={Submit}
              className="btn bg-dark text-white fs-3 mx-3"
            >
              Search
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-evenly flex-wrap">
            {res.map((val) => (
              <img
                key={val.id}
                className="col-3 img-fluid img-thumbnail"
                src={val.urls.small}
                alt={val.alt_description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
