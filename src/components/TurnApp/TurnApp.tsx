import { useRef, useEffect, useState } from "react";
import cn from "classnames";
import styles from "./TurnApp.module.css";
import { useResizeObserver } from "@mantine/hooks";

export const TurnApp = ({ src }) => {
  const canvasRef = useRef(null);
  // const containerRef = useRef(null);
  const imageRef = useRef(new Image()); // Ref for the image
  const [containerRef, rect] = useResizeObserver();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [markers, setMarkers] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ x: 0, y: 0 });
  const [selectedColor, setSelectedColor] = useState("red");

  const adjustCanvasSize = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (canvas && container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }
  };

  const drawImageAndMarkers = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Clear canvas and draw image
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      imageRef.current,
      position.x,
      position.y,
      imageRef.current.width * zoom,
      imageRef.current.height * zoom
    );

    // Draw markers
    markers.forEach((marker) => {
      context.fillStyle = marker.color; // Use the color from the marker object
      context.beginPath();
      context.arc(
        marker.x * zoom + position.x,
        marker.y * zoom + position.y,
        5,
        0,
        2 * Math.PI
      );
      context.fill();
    });
  };

  useEffect(() => {
    // Load the image once
    imageRef.current.src = src;
    imageRef.current.onload = () => {
      drawImageAndMarkers(); // Draw image and markers when image loads
    };
  }, [src]);

  // useEffect(() => {
  //   adjustCanvasSize();
  //   window.addEventListener("resize", adjustCanvasSize);
  //   return () => {
  //     window.removeEventListener("resize", adjustCanvasSize);
  //   };
  // }, []);

  const handleColorSelect = (color) => {
    setShowPicker(false); // Hide picker
    setSelectedColor(color); // Set selected color
    // Add marker with selected color
    setMarkers([
      ...markers,
      { x: pickerPosition.x, y: pickerPosition.y, color },
    ]);
    drawImageAndMarkers();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = src;

    const drawImage = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        image,
        position.x,
        position.y,
        image.width * zoom,
        image.height * zoom
      );

      markers.forEach((marker) => {
        // Use the color from the marker object
        context.fillStyle = marker.color;
        context.beginPath();
        context.arc(
          marker.x * zoom + position.x,
          marker.y * zoom + position.y,
          5,
          0,
          2 * Math.PI
        );
        context.fill();
      });
    };

    image.onload = drawImage;

    const handleWheel = (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left - position.x) / zoom;
      const mouseY = (e.clientY - rect.top - position.y) / zoom;
      const zoomFactor = 0.1;
      const newZoom = e.deltaY > 0 ? zoom - zoomFactor : zoom + zoomFactor;
      const boundedZoom = Math.max(1, newZoom);

      const newPosition = {
        x: position.x - mouseX * (boundedZoom - zoom),
        y: position.y - mouseY * (boundedZoom - zoom),
      };

      setPosition(newPosition);
      setZoom(boundedZoom);
      drawImageAndMarkers();
    };
    const handleMouseMove = (e) => {
      if (e.buttons === 1) {
        setPosition({
          x: position.x + e.movementX,
          y: position.y + e.movementY,
        });
        setIsDragging(true);
        drawImage();
      }
      drawImageAndMarkers();
    };

    const handleMouseUp = () => {
      setTimeout(() => setIsDragging(false), 0);
    };

    const handleCanvasClick = (e) => {
      if (!isDragging) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - position.x) / zoom;
        const y = (e.clientY - rect.top - position.y) / zoom;

        // Set position for color picker
        setPickerPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        setShowPicker(true);

        // Comment out adding marker immediately
        // setMarkers([...markers, { x, y }]);
        // drawImageAndMarkers();
      }
    };

    canvas.addEventListener("wheel", handleWheel);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("click", handleCanvasClick);

    drawImageAndMarkers();

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [src, position, zoom, markers]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", position: "relative" }}
      className={cn(styles.container, { [styles.darken]: showPicker })}
    >
      <canvas ref={canvasRef} height={rect.height - 100} width={rect.width} />
      {showPicker && (
        <div
          style={{
            position: "absolute",
            top: pickerPosition.y,
            left: pickerPosition.x,
            zIndex: 10,
          }}
        >
          <div className={styles.buttonContainer}>
            <button
              className={styles.break}
              onClick={() => handleColorSelect("#ff5656")}
            >
              Break
            </button>
            <button
              className={styles.apex}
              onClick={() => handleColorSelect("#fa881e")}
            >
              Apex
            </button>
            <button
              className={styles.exit}
              onClick={() => handleColorSelect("#59ebff")}
            >
              Exit
            </button>
            <button
              className={styles.entry}
              onClick={() => handleColorSelect("#8bde6e")}
            >
              Entry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
