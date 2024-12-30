import { reactModalCustomStylesDark } from "@/styles/reactModal";
import { Dispatch, SetStateAction } from "react";
import Modal from "react-modal";

interface EmailModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onFinishOrder: () => void;
  finishOrderButtonDisabled: boolean;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}

export default function EmailModal({
  isOpen,
  onRequestClose,
  onFinishOrder,
  finishOrderButtonDisabled,
  email,
  setEmail,
}: EmailModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={reactModalCustomStylesDark}
    >
      <h2 className="text-xl md:text-2xl ml-3 font-bold mt-2 text-white">
        Inform your email to confirm order
      </h2>
      <input
        type="text"
        className="w-full border-2 rounded-md border-primary px-4 py-2 flex items-center my-3"
        value={email}
        placeholder="Type your email"
        onChange={(val) => setEmail(val.target.value)}
      />
      <button
        className="w-full h-12 flex flex-col justify-center items-center p-4 font-bold rounded-md bg-primaryLight text-textWhite text-sm lg:text-[14px] disabled:opacity-50"
        onClick={onFinishOrder}
        disabled={finishOrderButtonDisabled}
      >
        Finish order
      </button>
    </Modal>
  );
}
