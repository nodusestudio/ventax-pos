// Este componente muestra un recibo digital profesional listo para imprimir, con logo, datos del local, cliente, productos, totales y botón de impresión.
// El logo se debe ubicar en public/logo-receipt.png (guárdalo ahí para impresión correcta)
import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

export default function ReceiptPrint({ ticket, onClose, configRecibo }) {
  const printRef = useRef();

  // Generar PDF del recibo visual
  const handleDownloadPDF = async () => {
    const input = printRef.current;
    if (!input) return;
    const canvas = await html2canvas(input, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a6" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
    pdf.save(`recibo_${ticket.id}.pdf`);
  };

  // Generar PDF y abrir WhatsApp Web con mensaje y archivo (solo descarga, el usuario debe adjuntar manualmente)
  const handleSendWhatsapp = async () => {
    await handleDownloadPDF();
    // Intentar abrir WhatsApp Web con mensaje prellenado
    let phone = ticket.cliente?.telefono || "";
    if (!phone) {
      alert("No hay número de teléfono del cliente para WhatsApp.");
      return;
    }
    // Formato internacional sin + ni espacios
    phone = phone.replace(/[^\d]/g, "");
    const url = `https://wa.me/${phone}?text=Te%20env%C3%ADo%20tu%20recibo%20de%20compra%20adjunto%20en%20PDF.`;
    window.open(url, "_blank");
  };

  const handlePrint = () => {
    window.print();
  };

  if (!ticket) return null;

  // Preferir logo impreso si existe, si no, fallback
  const logo = configRecibo?.logoImpreso || "/logo-receipt.png";
  // Cabecera personalizada o datos por defecto
  const header = configRecibo?.header?.trim()
    ? configRecibo.header
    : `${configRecibo?.brand || ""}\n${configRecibo?.tagline || ""}\nNIT: ${configRecibo?.nit || ""}\n${configRecibo?.address || ""}\n${configRecibo?.phone || ""}`;
  // Pie de página personalizado o por defecto
  const footer = configRecibo?.footerMsg?.trim()
    ? configRecibo.footerMsg
    : "Gracias por preferirnos\nRoal Burger\nFast & Food";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 print:bg-transparent print-only">
      <div ref={printRef} className="bg-[#23232b] rounded-2xl shadow-2xl w-full max-w-[410px] min-w-[320px] border border-[#23232b] relative flex flex-col items-center overflow-hidden p-0 print:bg-white print:shadow-none print:rounded-none print:p-0 print-only">
        {/* Barra superior */}
        <div className="w-full flex items-center justify-between px-6 pt-4 pb-2 bg-[#18181F] border-b border-[#23232b] relative print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-white">🧾 Recibo</span>
          </div>
          <button
            className="text-gray-500 hover:text-orange-500 text-xl font-bold"
            onClick={onClose}
            title="Cerrar"
          >×</button>
        </div>
        {/* Mensaje de pago exitoso */}
        <div className="w-full bg-[#18332b] flex flex-col items-center py-3 print:hidden">
          <div className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center mb-1">
            <span className="text-white text-2xl">✔</span>
          </div>
          <div className="text-green-400 font-black text-lg">¡Pago exitoso!</div>
          <div className="text-green-200 font-bold text-sm">${ticket.total.toLocaleString('es-CO')} · {ticket.payments && ticket.payments[0]?.method === 'cash' ? 'Efectivo' : ticket.payments[0]?.method?.charAt(0).toUpperCase() + ticket.payments[0]?.method?.slice(1)}</div>
        </div>
        {/* Recibo centrado */}
        <div className="flex flex-col items-center w-full px-0 py-0 bg-white print:bg-white overflow-y-auto max-h-[70vh]">
          <div className="flex flex-col items-center mb-2 mt-2">
            <img src={logo} alt="Logo" className="w-16 h-16 object-contain mb-1" />
            <div className="font-black text-lg text-gray-800 leading-tight text-center whitespace-pre-line">{header}</div>
          </div>
          <div className="text-center text-orange-500 font-black text-3xl mb-0">${ticket.total.toLocaleString('es-CO')}</div>
          <div className="text-center text-gray-400 text-xs mb-2">Total pagado</div>
          <hr className="my-2 border-gray-300 w-11/12 mx-auto" />
          {/* Info pedido */}
          <div className="text-xs text-gray-700 mb-1 w-11/12 mx-auto">
            {configRecibo?.mostrarCliente !== false && (
              <div><b>Pedido:</b> {ticket.cliente?.name || "Sin cliente"} - {ticket.fecha?.split(",")[1] || ""}</div>
            )}
            {/* Aquí podrías mostrar comentarios si existen y está activo */}
            {configRecibo?.mostrarComentarios && ticket.comentarios && (
              <div className="mt-1"><b>Comentarios:</b> {ticket.comentarios}</div>
            )}
          </div>
          <hr className="my-2 border-gray-300 w-11/12 mx-auto" />
          {/* Productos */}
          <div className="mb-2 w-11/12 mx-auto">
            {ticket.productos.map((prod, idx) => (
              <div key={idx} className="flex justify-between items-center text-base text-gray-800 font-bold bg-[#fff7f0] rounded-lg px-3 py-2 mb-2 border border-orange-200">
                <span className="flex items-center gap-2">{prod.name}</span>
                <span className="text-orange-500 font-black">${(prod.price * prod.qty).toLocaleString("es-CO")}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center w-11/12 mx-auto">
            <div className="flex justify-between font-black text-base text-gray-900 border-t border-gray-300 pt-2 mb-1 w-full">
              <span>Total</span>
              <span>${ticket.total.toLocaleString("es-CO")}</span>
            </div>
            {/* Pagos */}
            {ticket.payments && ticket.payments.length > 0 && (
              <div className="text-xs text-gray-700 mb-1 w-full">
                {ticket.payments.map((p, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{p.method === "cash" ? "Efectivo" : p.method === "card" ? "Tarjeta" : p.method === "nequi" ? "Nequi" : p.method}</span>
                    <span>${p.amount.toLocaleString("es-CO")}</span>
                  </div>
                ))}
                {ticket.payments[0]?.cashIn && (
                  <div className="flex justify-between">
                    <span>Cambio</span>
                    <span>${(ticket.payments[0].cashIn - ticket.total).toLocaleString("es-CO")}</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <hr className="my-2 border-gray-300 w-11/12 mx-auto" />
          <div className="text-center text-xs text-gray-700 mb-1 whitespace-pre-line">{footer}</div>
          <div className="text-center text-[10px] text-gray-400">{ticket.fecha} &nbsp; #{ticket.id}</div>
        </div>
        {/* Botones inferiores */}
        <div className="flex gap-2 mt-4 w-full px-6 pb-5 print:hidden">
          <button className="flex-1 bg-[#23232b] text-gray-300 py-3 rounded-lg font-bold hover:bg-gray-700 transition-all border border-[#23232b]" onClick={onClose} type="button">Listo</button>
          {configRecibo?.habilitarWhatsapp && (
            <button className="flex-1 bg-green-500 text-white py-3 rounded-lg font-black hover:bg-green-600 transition-all border border-green-500" type="button" onClick={handleSendWhatsapp}>WhatsApp</button>
          )}
          <button className="flex-1 bg-[#1fcfc1] text-white py-3 rounded-lg font-black hover:bg-[#17b3a7] transition-all border border-[#1fcfc1]" type="button">Cocina</button>
          {configRecibo?.habilitarPDF && (
            <button className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-black hover:bg-orange-600 transition-all border border-orange-500" onClick={handleDownloadPDF} type="button">Descargar PDF</button>
          )}
        </div>
      </div>
    </div>
  );
}
