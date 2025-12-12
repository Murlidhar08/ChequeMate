// Packages
import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Draggable from "react-draggable";
import { Button } from "@/components/ui/button";

const chequeSizes = {
    DL: { width: "22cm", height: "11cm" },
    STANDARD: { width: "21cm", height: "9cm" },
    PERSONAL: { width: "20.3cm", height: "8.6cm" },
    CUSTOM: null // user inputs
};

export default function ChequeDesigner() {
    const contentRef = useRef(null);
    const outerRef = useRef(null);

    // separate refs ONLY for draggable wrappers
    const nameRef = useRef(null);
    const amountRef = useRef(null);
    const amountWordsRef = useRef(null);
    const dateRef = useRef(null);

    const [selected, setSelected] = useState("PERSONAL");

    const reactToPrintFn = useReactToPrint({
        contentRef,
        pageStyle: `
            @page {
                size: ${chequeSizes[selected].width} ${chequeSizes[selected].height};
                margin: 0;
            }
            @media print {
                html, body { margin: 0; padding: 0; }
                .no-print { display: none !important; }
            }
        `,
    });

    return (
        <div className="absolute">
            <Button variant="default" onClick={reactToPrintFn}>Print</Button>

            <Draggable className="" nodeRef={outerRef} cancel=".inner-draggable">
                <div
                    ref={outerRef}
                    className="bg-red-200 opacity-90 relative cheque-area"
                    style={{
                        width: chequeSizes[selected].width,
                        height: chequeSizes[selected].height,
                        maxWidth: "100%",
                        position: "relative"
                    }}
                >
                    <div ref={contentRef}>

                        {/* Name */}
                        <Draggable
                            nodeRef={nameRef}
                            bounds=".cheque-area"
                            defaultPosition={{ x: 50, y: 40 }}
                        >
                            <div
                                ref={nameRef}
                                className="inner-draggable bg-blue-200 p-2 absolute cursor-move"
                            >
                                <input type="text" className="w-full" defaultValue="John Doe" />
                            </div>
                        </Draggable>

                        {/* Amount */}
                        <Draggable
                            nodeRef={amountRef}
                            bounds=".cheque-area"
                            defaultPosition={{ x: 400, y: 40 }}
                        >
                            <div
                                ref={amountRef}
                                className="inner-draggable bg-green-200 p-2 absolute cursor-move"
                            >
                                <input type="text" className="w-full" defaultValue="1000" />
                            </div>
                        </Draggable>

                        {/* Amount in Words */}
                        <Draggable
                            nodeRef={amountWordsRef}
                            bounds=".cheque-area"
                            defaultPosition={{ x: 50, y: 80 }}
                        >
                            <div
                                ref={amountWordsRef}
                                className="inner-draggable bg-yellow-200 p-2 absolute cursor-move"
                            >
                                <input type="text" className="w-full" defaultValue="One Thousand" />
                            </div>
                        </Draggable>

                        {/* Date */}
                        <Draggable
                            nodeRef={dateRef}
                            bounds=".cheque-area"
                            defaultPosition={{ x: 400, y: 10 }}
                        >
                            <div
                                ref={dateRef}
                                className="inner-draggable bg-purple-200 p-2 absolute cursor-move"
                            >
                                <input type="text" className="w-full" defaultValue="2025-01-01" />
                            </div>
                        </Draggable>

                    </div>
                </div>
            </Draggable>

        </div>
    );
}
