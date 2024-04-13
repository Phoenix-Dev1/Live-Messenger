import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-center items-center w-full h-full">
        <div className="max-w-4/5 h-4/5">
          <Image
            alt="Image"
            className="object-cover w-full h-full"
            src={src}
            width={800}
            height={600}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
