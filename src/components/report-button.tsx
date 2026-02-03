"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { getReportData } from "@/lib/record-actions";

export function ReportButton() {
    const [isGenerating, setIsGenerating] = useState(false);

    const generatePDF = async () => {
        setIsGenerating(true);
        try {
            const result = await getReportData();
            if (!result || "error" in result) {
                alert(result?.error || "Failed to fetch report data");
                return;
            }

            const { production, sales, feed, mortality } = result;

            const doc = new jsPDF();
            const timestamp = new Date().toLocaleString();

            // Header Section
            doc.setFillColor(45, 90, 39); // #2d5a27
            doc.rect(0, 0, 210, 40, "F");

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(24);
            doc.setFont("helvetica", "bold");
            doc.text("PESEZ FARMS", 15, 25);

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text("MANAGEMENT SUMMARY REPORT", 15, 33);
            doc.text(`Generated on: ${timestamp}`, 195, 33, { align: "right" });

            let yPos = 55;

            // Summary Totals
            const totalRevenue = sales.reduce((sum: number, s: any) => sum + s.amount, 0);
            const totalQuantity = sales.reduce((sum: number, s: any) => sum + s.quantity, 0);
            const totalFeedCost = feed.reduce((sum: number, f: any) => sum + (f.cost || 0), 0);
            const totalProduction = production.reduce((sum: number, p: any) => sum + p.quantity, 0);
            const totalMortality = mortality.reduce((sum: number, m: any) => sum + m.count, 0);

            doc.setTextColor(45, 90, 39);
            doc.setFontSize(14);
            doc.text("Executive Summary", 15, yPos);
            yPos += 10;

            autoTable(doc, {
                startY: yPos,
                head: [['Metric', 'Value']],
                body: [
                    ['Total Egg Production (Pieces)', totalProduction.toString()],
                    ['Total Egg Sales (Crates)', totalQuantity.toString()],
                    ['Total Revenue (GHC)', `GHC ${totalRevenue.toLocaleString()}`],
                    ['Total Feed Expenses (GHC)', `GHC ${totalFeedCost.toLocaleString()}`],
                    ['Net Profit/Loss (GHC)', `GHC ${(totalRevenue - totalFeedCost).toLocaleString()}`],
                    ['Total Mortality (Count)', totalMortality.toString()]
                ],
                theme: 'striped',
                headStyles: { fillColor: [45, 90, 39] },
                margin: { left: 15, right: 15 }
            });

            yPos = (doc as any).lastAutoTable.finalY + 20;

            // Detailed Sales
            doc.text("Recent Egg Sales", 15, yPos);
            autoTable(doc, {
                startY: yPos + 5,
                head: [['Date', 'Quantity (Crates)', 'Amount (GHC)']],
                body: sales.slice(0, 15).map((s: any) => [
                    new Date(s.date).toLocaleDateString(),
                    s.quantity.toString(),
                    `GHC ${s.amount.toFixed(2)}`
                ]),
                headStyles: { fillColor: [45, 90, 39] },
                margin: { left: 15, right: 15 }
            });

            yPos = (doc as any).lastAutoTable.finalY + 15;
            if (yPos > 240) { doc.addPage(); yPos = 20; }

            // Production Log
            doc.text("Production Records", 15, yPos);
            autoTable(doc, {
                startY: yPos + 5,
                head: [['Date', 'Quantity (Pieces)']],
                body: production.slice(0, 15).map((p: any) => [
                    new Date(p.date).toLocaleDateString(),
                    p.quantity.toString()
                ]),
                headStyles: { fillColor: [45, 90, 39] },
                margin: { left: 15, right: 15 }
            });

            yPos = (doc as any).lastAutoTable.finalY + 15;
            if (yPos > 240) { doc.addPage(); yPos = 20; }

            // Mortality Records
            doc.text("Mortality Records", 15, yPos);
            autoTable(doc, {
                startY: yPos + 5,
                head: [['Date', 'Count', 'Cause']],
                body: mortality.slice(0, 15).map((m: any) => [
                    new Date(m.date).toLocaleDateString(),
                    m.count.toString(),
                    m.cause || "N/A"
                ]),
                headStyles: { fillColor: [200, 30, 30] }, // Red for mortality
                margin: { left: 15, right: 15 }
            });

            // Footer info
            const pageCount = (doc as any).internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(150);
                doc.text(`Pesez Farms Digital Report - Page ${i} of ${pageCount}`, 105, 285, { align: "center" });
            }

            doc.save(`Pesez_Farms_Report_${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
            console.error("PDF generation error:", error);
            alert("An error occurred while generating the PDF. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <button
            onClick={generatePDF}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-3 bg-[#2d5a27] text-white rounded-xl font-bold hover:bg-[#1a3317] transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <span>{isGenerating ? "⏳" : "📄"}</span>
            {isGenerating ? "Generating Report..." : "Generate PDF Report"}
        </button>
    );
}
