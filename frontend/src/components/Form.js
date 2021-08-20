import React, { useState, useEffect } from "react";


function Form({ totalDevices }) {
  const [state, setState] = useState({});



  function addDevice(e) {
    fetch("http://localhost:5000/device", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data==", data);
      })
      .catch((err) => console.error(err));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  }
  return (
    <div>
      <form className="needs-validation">
        <div className="form-group">
          <label htmlFor="device">Device</label>
          <input
            type="text"
            className="form-control"
            id="device"
            placeholder="Enter device name"
            value={state.device}
            name="device"
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">
            Please provide a valid Device name
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="os">OS</label>
          <input
            type="text"
            className="form-control"
            id="os"
            placeholder="OS"
            value={state.os}
            name="os"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="manufacturer">Manufacturer</label>
          <input
            type="text"
            className="form-control"
            id="os"
            placeholder="Manufacturer"
            value={state.manufacturer}
            name="manufacturer"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={addDevice}
          disabled={totalDevices === 10 ? true : false}
        >
          Add Device
        </button>
        {totalDevices === 10 && (
          <div style={{ color: "red" }}>You can't add more than 10 devices</div>
        )}
      </form>
    </div>
  );
}

export default Form;
