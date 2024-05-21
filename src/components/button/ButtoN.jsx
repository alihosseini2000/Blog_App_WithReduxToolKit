import { Box, Modal } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #701a75",
  boxShadow: 24,
  p: 4,
};

function ButtoN({ children , modalContent }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        onClick={handleOpen}
        className="text-5xl hover:bg-white hover:text-fuchsia-950 bg-fuchsia-950 rounded-2xl border border-fuchsia-950 text-white py-3 px-4">
        {children}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
          <Box sx={style}>
            {modalContent(handleClose)}
          </Box>
        </Modal>
    </>
  );
}

ButtoN.propTypes = {
  children: PropTypes.any,
  modalContent: PropTypes.any,
};
export default ButtoN;
