// components/ChequeDesigner.js
import React, { useRef, useState } from "react";
import "./ChequeDesigner.css";

export default function ChequeDesigner() {
    const containerRef = useRef(null);

    // Designer fields
    const [fields, setFields] = useState([
        { id: 1, label: "Payee Name", x: 60, y: 60 },
        { id: 2, label: "Amount (₹)", x: 300, y: 60 },
        { id: 3, label: "Date", x: 450, y: 20 },
    ]);

    // Active drag field
    const dragRef = useRef({ id: null, offsetX: 0, offsetY: 0 });

    // --- Handle Drag Start ---
    const handlePointerDown = (e, field) => {
        const rect = containerRef.current.getBoundingClientRect();
        dragRef.current = {
            id: field.id,
            offsetX: e.clientX - rect.left - field.x,
            offsetY: e.clientY - rect.top - field.y,
        };
        containerRef.current.setPointerCapture(e.pointerId);
    };

    // --- Handle Drag Move ---
    const handlePointerMove = (e) => {
        if (!dragRef.current.id) return;
        const rect = containerRef.current.getBoundingClientRect();

        const x = e.clientX - rect.left - dragRef.current.offsetX;
        const y = e.clientY - rect.top - dragRef.current.offsetY;

        setFields((prev) =>
            prev.map((f) =>
                f.id === dragRef.current.id ? { ...f, x, y } : f
            )
        );
    };

    // --- Stop Drag ---
    const handlePointerUp = () => {
        dragRef.current.id = null;
    };

    // --- Add New Field ---
    const addField = () => {
        const label = prompt("Enter field label:");
        if (!label) return;

        setFields((prev) => [
            ...prev,
            {
                id: Date.now(),
                label,
                x: 100,
                y: 100,
            },
        ]);
    };

    // --- Edit Label ---
    const editField = (field) => {
        const newLabel = prompt("Edit label:", field.label);
        if (!newLabel) return;

        setFields((prev) =>
            prev.map((f) =>
                f.id === field.id ? { ...f, label: newLabel } : f
            )
        );
    };

    // --- Delete Field ---
    const deleteField = (field) => {
        if (!window.confirm("Delete this field?")) return;
        setFields((prev) => prev.filter((f) => f.id !== field.id));
    };

    // --- PRINT Cheque ---
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="designer-wrapper">

            {/* HEADER TOOLS (not printed) */}
            <div className="designer-tools no-print">
                <button onClick={addField}>➕ Add Field</button>
                <button onClick={handlePrint}>🖨 Print Cheque</button>
            </div>

            {/* CHEQUE CANVAS */}
            <div
                ref={containerRef}
                className="cheque-container"
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
            >
                {fields.map((field) => (
                    <div
                        key={field.id}
                        className="field-item"
                        style={{
                            left: field.x,
                            top: field.y,
                        }}
                        onPointerDown={(e) => handlePointerDown(e, field)}
                        onDoubleClick={() => editField(field)}
                    >
                        {field.label}

                        {/* Delete Button (only visible in designer mode) */}
                        <button
                            className="delete-btn no-print"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteField(field);
                            }}
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
