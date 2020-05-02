import React from "react";

const Field = ({label="",name,value,type = "text",placeholder="",onChange,error = ""}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        className={"form-control" + (error && " is-invalid")}
        onChange={onChange}
        value={value}
        name={name}
        placeholder={placeholder}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Field;
