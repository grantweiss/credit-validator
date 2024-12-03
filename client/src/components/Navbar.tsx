import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import useCollapseOnResize from "../hooks/useCollapse";
import getValidCards, {
  StoreValidationResponse,
} from "../routes/getValidCards";
import Cards from "./Cards";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, error, isLoading } = useQuery<StoreValidationResponse, Error>({
    queryKey: ["validatedCards"],
    queryFn: getValidCards,
  });

  const handleModalClose = () => setIsModalOpen(false);
  useCollapseOnResize({ isOpen, setIsOpen });

  return (
    <>
      <nav className="bg-gray-800 text-white relative">
        <div className="mx-auto px-4 flex justify-between items-center h-16">
          <div className="text-2xl font-bold">creditVal</div>

          <div className="hidden md:flex space-x-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="hover:text-gray-400"
            >
              Cards
            </button>
          </div>

          <button
            className="md:hidden text-gray-400 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <IoMdClose className="size-6" />
            ) : (
              <RxHamburgerMenu className="size-6" />
            )}
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-gray-800 z-50">
            <button
              onClick={() => setIsModalOpen(true)}
              className="block py-2 px-4 hover:bg-gray-700 w-full text-start"
            >
              Cards
            </button>
          </div>
        )}
      </nav>

      <Cards
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
        isLoading={isLoading}
        error={error}
        data={data}
      />
    </>
  );
};

export default Navbar;
