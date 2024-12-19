import React, {useState, useEffect} from 'react'
import Alert from 'react-bootstrap/Alert';

function SubmissionAlert({variant, displayMessage}) {
  return (
    <>
        <Alert key = 'primary' variant= {variant}>
          {displayMessage}
        </Alert>
    </>
  );
}

export default SubmissionAlert;