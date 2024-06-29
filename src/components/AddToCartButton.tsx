import { useSendMetaEvent } from "../hooks";

export const AddToCartButton = ({ product }) => {
  const { sendEvent, isLoading, error } = useSendMetaEvent();

  const handleAddToCart = () => {
    const userData = {
      emails: ["mtrigo1434@gmail.com"],
      phones: ["123456789"],
    };

    const customData = {
      content_ids: [product.id],
      content_name: product.name,
      content_type: "product",
    };

    const eventData = {
      userData,
      customData,
    };

    sendEvent("ADD_TO_CART", eventData);
  };

  return (
    <div>
      <button onClick={handleAddToCart} disabled={isLoading}>
        {isLoading ? "Agregando..." : "Agregar al Carrito"}
      </button>
      {error && <p>Error al enviar el evento: {error.message}</p>}
    </div>
  );
};
