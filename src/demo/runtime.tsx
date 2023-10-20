import React from "react";

export default function ({ id, title, data, slots, inputs, outputs, env }) {
  return (
    <div
      style={{
        width: 375,
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        borderRadius: 4,
        backgroundColor: "white",
        color: "black",
        fontSize: 16,
        fontWeight: 600,
        fontFamily: "sans-serif"
      }}
    >
      demo
    </div>
  );
}
