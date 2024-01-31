import { useRef, useEffect, useState, FC, useCallback } from "react";
import cn from "classnames";
import styles from "./TurnApp.module.css";
import { useResizeObserver } from "@mantine/hooks";
import BrakeIcon from "@assets/icons/pins/red_pin.svg?react";
import ApexIcon from "@assets/icons/pins/orange_pin.svg?react";
import ExitIcon from "@assets/icons/pins/blue_pin.svg?react";
import EntryIcon from "@assets/icons/pins/green_pin.svg?react";
import NoteIcon from "@assets/icons/pins/white_pin.svg?react";
import { v4 as uuidv4 } from "uuid";

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

const buttonConfig = [
  { label: "Brake", color: "red", icon: BrakeIcon },
  { label: "Apex", color: "orange", icon: ApexIcon },
  { label: "Exit", color: "blue", icon: ExitIcon },
  { label: "Entry", color: "green", icon: EntryIcon },
  { label: "Note", color: "grey", icon: NoteIcon },
];

const iconImages = {};
const loadIcons = async () => {
  for (const [key, IconComponent] of Object.entries(iconMap)) {
    const img = new Image();
    img.onload = () => {
      iconImages[key] = img;
    };
    img.src = IconComponent;
  }
};

loadIcons();

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
  const pickerRef = useRef(null);
  const [isTouching, setIsTouching] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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
      const img = iconImages[marker.type];
      if (img) {
        context.drawImage(
          img,
          marker.x * zoom + position.x - 15,
          marker.y * zoom + position.y - 15,
          30,
          30
        );
      }
    });
  }, [position, zoom, turnPinpoints, turnNumber]);

  const redraw = useCallback(() => {
    requestAnimationFrame(drawImageAndMarkers);
  }, [drawImageAndMarkers]);

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
          {
            x: pickerPosition.x,
            y: pickerPosition.y,
            icon,
            type,
            id: uuidv4(),
          },
        ],
      }));
      redraw();
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

      let newX = position.x - mouseX * (boundedZoom - zoom);
      let newY = position.y - mouseY * (boundedZoom - zoom);

      const imageWidth = imageRef.current.width * boundedZoom;
      const imageHeight = imageRef.current.height * boundedZoom;
      const canvasWidth = canvasRef.current.width;
      const canvasHeight = canvasRef.current.height;

      newX = Math.min(newX, 0);
      newX = Math.max(newX, canvasWidth - imageWidth);
      newY = Math.min(newY, 0);
      newY = Math.max(newY, canvasHeight - imageHeight);

      setPosition({ x: newX, y: newY });
      setZoom(boundedZoom);
    },
    [zoom, position]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (activeMarker) {
        const mouseX =
          e.clientX - canvasRef.current.getBoundingClientRect().left;
        const mouseY =
          e.clientY - canvasRef.current.getBoundingClientRect().top;

        const newMarkerPosition = {
          x: (mouseX - position.x) / zoom,
          y: (mouseY - position.y) / zoom,
        };

        setTurnPinpoints((prevPinpoints) => {
          const updatedPinpoints = { ...prevPinpoints };
          updatedPinpoints[turnNumber] = updatedPinpoints[turnNumber].map(
            (marker) => {
              if (marker.id === activeMarker.id) {
                return { ...marker, ...newMarkerPosition };
              }
              return marker;
            }
          );
          return updatedPinpoints;
        });
        redraw();
      } else if (e.buttons === 1) {
        setPosition((prevPosition) => {
          let newX = prevPosition.x + e.movementX;
          let newY = prevPosition.y + e.movementY;

          const imageWidth = imageRef.current.width * zoom;
          const imageHeight = imageRef.current.height * zoom;
          const canvasWidth = canvasRef.current.width;
          const canvasHeight = canvasRef.current.height;

          newX = Math.min(newX, 0);
          newX = Math.max(newX, canvasWidth - imageWidth);
          newY = Math.min(newY, 0);
          newY = Math.max(newY, canvasHeight - imageHeight);

          return {
            x: newX,
            y: newY,
          };
        });
        setIsDragging(true);
      }
    },
    [zoom, activeMarker, position, turnNumber, setTurnPinpoints]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (!isTouching) return;
      const touch = e.touches[0];
      const canvasRect = canvasRef.current.getBoundingClientRect();
      if (activeMarker) {
        const newMarkerPosition = {
          x: (touch.clientX - canvasRect.left - position.x) / zoom,
          y: (touch.clientY - canvasRect.top - position.y) / zoom,
        };
        setTurnPinpoints((prevPinpoints) => {
          const updatedPinpoints = { ...prevPinpoints };
          updatedPinpoints[turnNumber] = updatedPinpoints[turnNumber].map(
            (marker) => {
              if (marker.id === activeMarker.id) {
                return { ...marker, ...newMarkerPosition };
              }
              return marker;
            }
          );
          return updatedPinpoints;
        });
        redraw();
      } else {
        setPosition((prevPosition) => {
          let newX = prevPosition.x + (touch.clientX - prevPosition.x);
          let newY = prevPosition.y + (touch.clientY - prevPosition.y);

          const imageWidth = imageRef.current.width * zoom;
          const imageHeight = imageRef.current.height * zoom;
          const canvasWidth = canvasRef.current.width;
          const canvasHeight = canvasRef.current.height;

          newX = Math.min(newX, 0);
          newX = Math.max(newX, canvasWidth - imageWidth);
          newY = Math.min(newY, 0);
          newY = Math.max(newY, canvasHeight - imageHeight);

          return {
            x: newX,
            y: newY,
          };
        });
        setIsDragging(true);
      }
    },
    [isTouching, zoom, activeMarker, position]
  );

  const handleTouchStart = useCallback(() => {
    setIsTouching(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsTouching(false);
  }, []);

  const handleMouseUp = useCallback(() => {
    setTimeout(() => setIsDragging(false), 0);
  }, []);

  const handleCanvasClick = useCallback(
    (e) => {
      if (activeMarker) {
        setActiveMarker(null);
        e.preventDefault();
        e.stopPropagation();
      } else if (!isDragging) {
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

    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });

    canvas.addEventListener("wheel", handleWheel, { passive: true });
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);

      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [
    handleTouchMove,
    handleTouchStart,
    handleTouchEnd,
    handleWheel,
    handleMouseMove,
    handleMouseUp,
    handleCanvasClick,
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showPicker &&
        pickerRef.current &&
        !pickerRef.current.contains(event.target)
      ) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  useEffect(() => {
    const handleMouseUp = () => {
      if (activeMarker) {
        setActiveMarker(null);
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [activeMarker, offset, zoom, turnNumber, setTurnPinpoints]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        position: "relative",
        height: "100%",
        minHeight: "50vh",
      }}
      className={cn(styles.container, { [styles.darken]: showPicker })}
    >
      <canvas ref={canvasRef} height={rect.height - 15} width={rect.width} />
      {turnPinpoints[turnNumber]?.map((marker, index) => {
        const IconComponent = iconMap[marker.type];
        return (
          <div
            onMouseDown={(e) => {
              e.stopPropagation();
              setActiveMarker(marker);
            }}
            key={marker.id}
            className={cn(
              {
                [styles.markerHl]: activeMarker?.id == marker?.id,
              },
              styles.marker
            )}
            style={{
              left: marker.x * zoom + position.x,
              top: marker.y * zoom + position.y,
            }}
          >
            <IconComponent style={{ display: "block" }} />
          </div>
        );
      })}
      {showPicker && (
        <div
          style={{
            position: "absolute",
            top: pickerPosition.y * zoom + position.y,
            left: pickerPosition.x * zoom + position.x,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className={styles.pickerContainer}
          ref={pickerRef}
        >
          <div className={styles.point}></div>
          <div style={{ position: "absolute" }}>
            {buttonConfig.map((button, index) => {
              const angle = (index / buttonConfig.length) * Math.PI * 2;
              const distance = 70;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              return (
                <button
                  key={button.label}
                  className={cn(
                    styles[button.label.toLowerCase()],
                    styles.button
                  )}
                  style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    transform: `translate(-50%, -50%)`,
                    borderRadius: "50%",
                  }}
                  onClick={() => handleTypeSelect(button.label.toLowerCase())}
                >
                  {button.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
