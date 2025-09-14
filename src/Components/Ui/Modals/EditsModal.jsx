import { Box } from "@mui/material";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { Address } from "../../Form/Address";
import { SocialMediaLinks } from "../../Form/SocialMediaLinks";
import { PersonalInfo } from "../../Form/PersonalInfo";
import { ChangePassword } from "../../Form/ChangePassword";
import { ChangeEmail } from "../../Form/ChangeEmail";
import { AddBio } from "../../Form/AddBio";
import Modal from "../Modal";

function EditsModal({ open, onClose }) {
  const {
    currentUser: { data: user },
  } = useCurrentUser();

  const forms = {
    personalInfo: <PersonalInfo data={user} onClose={onClose} />,
    updateEmail: <ChangeEmail data={user} onClose={onClose} />,
    updateBio: <AddBio data={user} onClose={onClose} />,
    "address.add": <Address onClose={onClose} />,
    "address.update": <Address data={user?.address} onClose={onClose} />,
    socialMediaLinks: <SocialMediaLinks data={user} onClose={onClose} />,
    changePassword: <ChangePassword data={user} onClose={onClose} />,
  };

  return (
    <>
      <Modal open={Boolean(open)} onClose={() => onClose(false)}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            display: "grid",
            gap: 4,
          }}
        >
          {forms?.[open]}
        </Box>
      </Modal>
    </>
  );
}

export default EditsModal;
