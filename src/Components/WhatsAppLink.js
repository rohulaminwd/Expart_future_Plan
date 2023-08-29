import React from "react";
import { BsWhatsapp } from "react-icons/bs";

function WhatsAppLink({ phoneNumber, message, size }) {
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  return (
    <a
      href={url}
      className="flex item-center gap-x-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="font-bold">
        <BsWhatsapp size={size} />
      </span>
      <h2 className="text-xl">Contact Admin</h2>
    </a>
  );
}

export default WhatsAppLink;
