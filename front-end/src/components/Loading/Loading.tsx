import { Spinner } from "react-bootstrap";
import "./Loading.css";

function Loading() {
  return (
    <div className="loading">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default Loading;
