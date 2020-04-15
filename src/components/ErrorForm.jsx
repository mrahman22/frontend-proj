import React from "react";

const ErrorForm = (props) => {
  const { status, msg } = props;
  return (
    <section className="error">
      <p>
        {status} {msg}
      </p>
    </section>
  );
};

export default ErrorForm;
