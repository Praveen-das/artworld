import React, { useMemo } from "react";
import { Badge, Fab, SpeedDialIcon } from "@mui/material";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useStore } from "../../../Store/Store";

export function ChatButton({ onClick, expanded, roomId }) {
  const unreadMessages = useStore(s => s.unreadMessages);
  const uum = useMemo(() => unreadMessages.get(roomId), [unreadMessages, roomId]) || [];
  const setMessages = useStore(s => s.setMessages);

  function handleClick() {
    setMessages(roomId, uum);
    onClick();
  }

  return <Fab onClick={handleClick} sx={{ marginLeft: 'auto' }} color='default' size="medium">
    <Badge badgeContent={expanded ? 0 : uum?.length} color={"primary"}>
      <SpeedDialIcon
        icon={<ChatBubbleIcon fontSize='medium' />}
        openIcon={<ExpandMoreIcon />}
        open={expanded} />
    </Badge>
  </Fab>;
}
