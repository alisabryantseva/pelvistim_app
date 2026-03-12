import { useState, useCallback, useRef } from "react";

// Nordic UART Service (NUS) — the standard BLE serial profile used by most
// Arduino BLE sketches (HM-10, HC-08, SparkFun BLE, Adafruit BLE, etc.)
const NUS_SERVICE = "6e400001-b5a9-11e8-8d11-025e0d85a8d1";
const NUS_RX_CHAR = "6e400002-b5a9-11e8-8d11-025e0d85a8d1"; // app → Arduino
const NUS_TX_CHAR = "6e400003-b5a9-11e8-8d11-025e0d85a8d1"; // Arduino → app

// Commands sent to the Arduino:
//   START\n          — session started
//   STOP\n           — session ended
//   PAUSE\n          — session paused
//   RESUME\n         — session resumed
//   I:5.0\n          — set intensity (0.0–10.0)
//   F:10\n           — set frequency in Hz
//   PING\n           — connection keepalive test

export function useBluetooth() {
  const [status, setStatus] = useState("disconnected");
  // status values: "disconnected" | "connecting" | "connected" | "error" | "unsupported"
  const [deviceName, setDeviceName] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);

  const rxCharRef = useRef(null);
  const deviceRef = useRef(null);

  const isSupported = typeof navigator !== "undefined" && "bluetooth" in navigator;

  const connect = useCallback(async () => {
    if (!isSupported) {
      setStatus("unsupported");
      return;
    }
    setStatus("connecting");
    try {
      const device = await navigator.bluetooth.requestDevice({
        // Accept any BLE device that advertises the NUS service.
        // You can also add { namePrefix: "PelviStim" } to filter by name.
        filters: [{ services: [NUS_SERVICE] }],
        optionalServices: [NUS_SERVICE],
      });

      deviceRef.current = device;

      // Auto-update status when device physically disconnects
      device.addEventListener("gattserverdisconnected", () => {
        setStatus("disconnected");
        setDeviceName(null);
        rxCharRef.current = null;
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(NUS_SERVICE);

      // RX characteristic — we write commands to the Arduino here
      const rxChar = await service.getCharacteristic(NUS_RX_CHAR);
      rxCharRef.current = rxChar;

      // TX characteristic — Arduino sends data back to us (optional but useful)
      try {
        const txChar = await service.getCharacteristic(NUS_TX_CHAR);
        await txChar.startNotifications();
        txChar.addEventListener("characteristicvaluechanged", (e) => {
          const text = new TextDecoder().decode(e.target.value).trim();
          if (text) setLastMessage(text);
        });
      } catch {
        // TX notifications are optional — device may not support them
      }

      setDeviceName(device.name || "Arduino BLE");
      setStatus("connected");
    } catch (err) {
      if (err.name === "NotFoundError") {
        // User dismissed the browser picker — treat as cancelled, not an error
        setStatus("disconnected");
      } else {
        console.error("Bluetooth connection error:", err);
        setStatus("error");
      }
    }
  }, [isSupported]);

  const disconnect = useCallback(() => {
    if (deviceRef.current?.gatt?.connected) {
      deviceRef.current.gatt.disconnect();
    }
    rxCharRef.current = null;
    deviceRef.current = null;
    setStatus("disconnected");
    setDeviceName(null);
  }, []);

  // sendCommand writes a plain-text command string to the Arduino.
  // The Arduino sketch should read via Serial1 (BLE serial) and parse commands.
  const sendCommand = useCallback(async (cmd) => {
    const char = rxCharRef.current;
    if (!char) return;
    try {
      const bytes = new TextEncoder().encode(cmd);
      // writeValueWithoutResponse is faster and fine for one-way commands
      await char.writeValueWithoutResponse(bytes);
    } catch {
      // Swallow silently — device may have disconnected between status update
    }
  }, []);

  return {
    status,        // "disconnected" | "connecting" | "connected" | "error" | "unsupported"
    deviceName,    // string | null
    lastMessage,   // last string received from Arduino, or null
    isSupported,   // bool — false in Safari/Firefox/iOS
    connect,       // () => Promise<void>
    disconnect,    // () => void
    sendCommand,   // (cmd: string) => Promise<void>
  };
}
