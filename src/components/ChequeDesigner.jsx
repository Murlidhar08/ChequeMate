// Packages
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Draggable from "react-draggable";
import { Button } from "@/components/ui/button";

export default function ChequeDesigner() {
    const contentRef = useRef(null); // for printing
    const nodeRef = useRef(null);    // for draggable

    const reactToPrintFn = useReactToPrint({
        content: nodeRef,
        pageStyle: `
        @page {
            size: DL landscape;
            margin: 0;
        }
        @media print {
            html, body {
                padding: 0;
                margin: 0;
            }
            .no-print {
                display: none !important;
            }
        }
        `,
    });

    return (
        <div className='absolute'>
            <Button variant="default" onClick={reactToPrintFn}>Print</Button>

            <Draggable nodeRef={nodeRef}>
                <div
                    ref={nodeRef}  // IMPORTANT for react-draggable
                    className="bg-red-200"
                    style={{
                        width: "21cm",
                        height: "9cm",
                        maxWidth: "100%",
                    }}
                >
                    {/* Printable area wrapper */}
                    <div ref={contentRef}>
                        This is cheque designer
                        {/* Everything inside this div will be printed */}
                    </div>
                </div>
            </Draggable>
        </div>
    );
}
