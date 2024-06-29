import { useSendMetaEvent } from "../hooks";

export const AddToCartButton = ({ product }) => {
  const { sendEvents, isLoading, error } = useSendMetaEvent();

  const handleAddToCart = () => {
    const userData = {
      email: "user@example.com",
      phone: "1234567890",
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

    sendEvents([eventData]);
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
