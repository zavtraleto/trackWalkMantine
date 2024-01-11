import { useRef, useEffect, useState, FC, useCallback } from "react";
import cn from "classnames";
import styles from "./TurnApp.module.css";
import { useResizeObserver } from "@mantine/hooks";
import BrakeIcon from "@assets/icons/pins/red_pin.svg?react";
import ApexIcon from "@assets/icons/pins/orange_pin.svg?react";
import ExitIcon from "@assets/icons/pins/blue_pin.svg?react";
import EntryIcon from "@assets/icons/pins/green_pin.svg?react";
import NoteIcon from "@assets/icons/pins/white_pin.svg?react";
import { Box } from "@mantine/core";

type TurnAppProps = {
  src: string;
  turnNumber: number;
  turnPinpoints: Record<string, any>;
  setTurnPinpoints: (pinpoints: Record<string, any>) => void;
};

const iconMap = {
  brake: BrakeIcon,
  apex: ApexIcon,
  exit: ExitIcon,
  entry: EntryIcon,
  note: NoteIcon,
};

export const TurnApp: FC<TurnAppProps> = ({
  src,
  turnNumber,
  turnPinpoints,
  setTurnPinpoints,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef(new Image());
  const [containerRef, rect] = useResizeObserver();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ x: 0, y: 0 });
  const [selectedColor, setSelectedColor] = useState("red");

  const adjustCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }
  }, [containerRef]);

  const drawImageAndMarkers = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      imageRef.current,
      position.x,
      position.y,
      imageRef.current.width * zoom,
      imageRef.current.height * zoom
    );

    turnPinpoints[turnNumber]?.forEach((marker) => {
      const img = new Image();
      img.onload = () => {
        context.drawImage(
          img,
          marker.x * zoom + position.x,
          marker.y * zoom + position.y,
          30,
          30
        );
      };
      img.src = marker.icon;
    });
  }, [position, zoom, turnPinpoints, turnNumber]);

  useEffect(() => {
    imageRef.current.src = src;
    imageRef.current.onload = drawImageAndMarkers;
    window.addEventListener("resize", adjustCanvasSize);
    return () => {
      window.removeEventListener("resize", adjustCanvasSize);
    };
  }, [src, adjustCanvasSize, drawImageAndMarkers]);

  const handleTypeSelect = useCallback(
    (type) => {
      const icon = iconMap[type];
      setShowPicker(false);
      setTurnPinpoints((pinpoints) => ({
        [turnNumber]: [
          ...(pinpoints[turnNumber] || []),
          { x: pickerPosition.x, y: pickerPosition.y, icon, type },
        ],
      }));
      drawImageAndMarkers();
    },
    [pickerPosition, drawImageAndMarkers, turnNumber]
  );

  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left - position.x) / zoom;
      const mouseY = (e.clientY - rect.top - position.y) / zoom;
      const zoomFactor = 0.1;
      const newZoom = e.deltaY > 0 ? zoom - zoomFactor : zoom + zoomFactor;
      const boundedZoom = Math.max(1, Math.min(5, newZoom));

      setPosition((prevPosition) => ({
        x: prevPosition.x - mouseX * (boundedZoom - zoom),
        y: prevPosition.y - mouseY * (boundedZoom - zoom),
      }));
      setZoom(boundedZoom);
    },
    [zoom, position]
  );

  const handleMouseMove = useCallback((e) => {
    if (e.buttons === 1) {
      setPosition((prevPosition) => ({
        x: prevPosition.x + e.movementX,
        y: prevPosition.y + e.movementY,
      }));
      setIsDragging(true);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    setTimeout(() => setIsDragging(false), 0);
  }, []);

  const handleCanvasClick = useCallback(
    (e) => {
      if (!isDragging) {
        const rect = canvasRef.current.getBoundingClientRect();
        setPickerPosition({
          x: (e.clientX - rect.left - position.x) / zoom,
          y: (e.clientY - rect.top - position.y) / zoom,
        });
        setShowPicker(true);
      }
    },
    [isDragging, position, zoom]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("wheel", handleWheel);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [handleWheel, handleMouseMove, handleMouseUp, handleCanvasClick]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", position: "relative", height: "100%" }}
      className={cn(styles.container, { [styles.darken]: showPicker })}
    >
      <canvas ref={canvasRef} height={rect.height - 10} width={rect.width} />
      {turnPinpoints[turnNumber]?.map((marker, index) => {
        const IconComponent = iconMap[marker.type];
        return (
          <IconComponent
            key={index}
            style={{
              position: "absolute",
              left: marker.x * zoom + position.x,
              top: marker.y * zoom + position.y,
              transform: "translate(-50%, -50%)", // Center the icon on the coordinates
              width: 40,
              height: 70,
            }}
          />
        );
      })}

      {showPicker && (
        <div
          style={{
            position: "absolute",
            top: pickerPosition.y,
            left: pickerPosition.x,
            zIndex: 10,
          }}
        >
          <div className={styles.point}></div>
        </div>
      )}
      {showPicker && (
        <Box className={styles.buttonContainer}>
          <button
            className={styles.brake}
            onClick={() => handleTypeSelect("brake")}
          >
            Brake
          </button>
          <button
            className={styles.apex}
            onClick={() => handleTypeSelect("apex")}
          >
            Apex
          </button>
          <button
            className={styles.exit}
            onClick={() => handleTypeSelect("exit")}
          >
            Exit
          </button>
          <button
            className={styles.entry}
            onClick={() => handleTypeSelect("entry")}
          >
            Entry
          </button>
          <button
            className={styles.note}
            onClick={() => handleTypeSelect("note")}
          >
            Note
          </button>
        </Box>
      )}
    </div>
  );
};
