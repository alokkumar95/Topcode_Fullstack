import React, { useEffect, useState } from "react";
import "./device.css";
import Form from "./Form";
import { useHistory } from "react-router";

function Devices() {
  const [state, setState] = useState([]);

  const [canCheckout, setCanCheckout] = useState(true);
  const history = useHistory();

  useEffect(() => {
    var startTime = "09:00:00";
    var endTime = "17:00:00";
    var currentDate = new Date();

    var startDate = new Date(currentDate.getTime());
    startDate.setHours(startTime.split(":")[0]);
    startDate.setMinutes(startTime.split(":")[1]);
    startDate.setSeconds(startTime.split(":")[2]);

    var endDate = new Date(currentDate.getTime());
    endDate.setHours(endTime.split(":")[0]);
    endDate.setMinutes(endTime.split(":")[1]);
    endDate.setSeconds(endTime.split(":")[2]);

    var valid = startDate < currentDate && endDate > currentDate;
    setCanCheckout(valid);
    
  });

  useEffect(() => {
    fetch("http://localhost:5000/", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {setState(data)})
      .catch((err) => console.error("err", err));
      history.push("/")
  }, []);

  function getDevices() {
    fetch("http://localhost:5000/", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setState(data))
      .catch((err) => console.error("err", err));
  }

  function deleteDevice(data) {
    console.log("data to be deleted", data);
    fetch(`http://localhost:5000/delete/${data._id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        getDevices();
        console.log("msg==", data);
      })
      .catch((err) => console.error(err));
  }
  return (
    <div>
      <div className="form__section">
        <Form totalDevices={state.length} />
      </div>

      <div className="h1" />

      <div>
        <p style={{ textAlign: "center", display: "block" }}>
          Total No of Devices: {state.length}
        </p>
        {state.map((data) => (
          <div className="device">
            <div className="img__container">
              <img src="mobile.jpeg" onClick={() => console.log(data)} />
            </div>
            <div>
              <div className="device__info">
                <p>Device</p>
                <p className="device__attr">{data.device}</p>
              </div>
              <div className="device__info">
                <p>OS</p>
                <p className="device__attr">{data.os}</p>
              </div>
              <div className="device__info">
                <p>Manufacturer</p>
                <p className="device__attr">{data.manufacturer}</p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  deleteDevice(data);
                }}
                disabled={!canCheckout}
              >
                {console.log(
                  "canchecllll000000000----------------",
                  canCheckout
                )}
                Remove Device
              </button>
              {!canCheckout && (
                <div style={{ color: "red" }}>
                  You can checkout only between 9:00am-17:00pm
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Devices;
