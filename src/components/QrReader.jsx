import { useEffect, useRef, useState } from "react";
import "./QrReader.css";
import QrScanner from "qr-scanner";
import QrFrame from "../assets/qr-frame.svg";
import { Navigate } from "react-router-dom";
import ProductAdd from "./ProductAdd";

function QrReader() {
  const scanner = useRef(null);
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const [product, setProduct] = useState(null);
  const [scannedResult, setScannedResult] = useState("");

  const onScanSuccess = (result) => {
    fetch(result.data)
    .then(res => res.json())
    .then(out => {
      setProduct({title: out.fields.title.stringValue, desc: out.fields.desc.stringValue, price: out.fields.price.integerValue, id: out.fields.id.stringValue});
    })
    .catch(err => { throw err })
    scanner.current.stop()
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
    <div>
     
    {product ?  ( <Navigate to='/add' state={product} />) : 
    (<div className="qr-reader">
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
      </div>)
    }
      </div>
  );
}

export default QrReader;