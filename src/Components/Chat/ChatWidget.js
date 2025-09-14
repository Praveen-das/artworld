import React from "react";
import { useStore } from "../../Store/Store";
import { Collapse, List, Slide } from "@mui/material";
import { ChatBox } from "./Components/ChatBox";
import { ChatButton } from "./Components/ChatButton";
import { ChatBoxHeader } from "./Components/ChatBoxHeader";

export default function ChatWidget() {
  const setChatWidget = useStore(s => s.setChatWidget);
  const { open, expanded, user } = useStore(s => s.chatWidget);
  const connectedUsers = useStore(s => s.connectedUsers);

  let chatUser = connectedUsers.find(({ user_id }) => user_id && user_id === user?.user_id)

  return (
    <>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <List
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            display: 'grid',
            gap: 1,
            zIndex: 100
          }}
          component="div"
          aria-labelledby="nested-list-subheader"
          disablePadding
        >
          <Collapse in={expanded}>
            <List
              sx={{
                borderRadius: '10px',
                boxShadow: '-10px -10px 30px #0000002e',
                bgcolor: 'white',
                width: 300,
                height: 400,
                display: 'flex',
                flexDirection: 'column'
              }} component="div"
              disablePadding
            >
              <ChatBoxHeader user={chatUser} />
              <ChatBox data={{ ...chatUser, product_id: user?.product_id }} />
            </List>
          </Collapse>
          <ChatButton onClick={() => setChatWidget(true, !expanded)} roomId={chatUser?.room?.id} expanded={expanded} />
        </List>
      </Slide>
    </>
  );
}
