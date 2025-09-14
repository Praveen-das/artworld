import { AddItem } from "./AddItem";
import { ViewProduct } from "./ViewProduct";
import Modal from "../../../Ui/Modal";

function ProductModal({ open, modal, setModel, product, onClose }) {
  const modals = {
    add_product: <AddItem onClose={onClose} />,
    update_product: <AddItem previousData={product} onClose={onClose} />,
    view_product: <ViewProduct product={product} onClose={onClose} setModel={setModel} />,
  };

  return (
    <Modal open={Boolean(open)} onClose={onClose} onAnimationEnd={() => !open && setModel(null)}>
      {modals[modal]}
    </Modal>
  );
}

export default ProductModal;
