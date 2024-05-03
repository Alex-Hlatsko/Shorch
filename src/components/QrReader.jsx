import { useContext, useEffect, useRef, useState } from "react";
import "./QrReader.css";
import QrScanner from "qr-scanner";
import QrFrame from "../assets/qr-frame.svg";
import { Navigate } from "react-router-dom";
import Product from "./ProductClass";
import ProductContext from "../ProductContext";

function QrReader() {
  const scanner = useRef(null);
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  let product = null;
  const {list, addToList} = useContext(ProductContext);

  const [scannedResult, setScannedResult] = useState("");

  const onScanSuccess = (result) => {
    setScannedResult(result.data)
    fetch(result.data)
    .then(res => res.json())
    .then(out => {
      product = new Product(out.fields.title.stringValue, out.fields.desc.stringValue, out.fields.price.integerValue)
      addToList(product);
    })
    .catch(err => { throw err });
  };


  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl.current) {
        scanner.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    <div className="qr-reader">
      {/* QR */}
      <video ref={videoEl}></video>
      <div ref={qrBoxEl} className="qr-box">
        <img
          src={QrFrame}
          alt="Qr Frame"
          width={256}
          height={256}
          className="qr-frame"
        />
        
      </div>
      {scannedResult && <Navigate to='/cart'/>}
    </div>
  );
}

export default QrReader;