import { Box, Fab, IconButton, Input, InputAdornment, Typography, useTheme, Grid, TextField } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import { useEffect, useReducer, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import LinearProgress from '@mui/material/LinearProgress';
import { useMediaQuery } from "@mui/material";
import { FaRobot } from "react-icons/fa6";
import chatWithGpt from "./chatWithGpt ";



const chatOriginEnum = {
  AI: 'ai',
  CUSTOMER: 'customer'
};

const RenderMessage = ({ message }) => {
  const theme = useTheme();

  return <Box
    sx={{
      position: "relative",
      padding: "16px 6px",
      background: "#c8686b",
      margin: "14px 40px 14px 4px",
      boxShadow: theme.shadows[2],
      borderRadius: "1px 10px 20px 10px",
    }}
  >
    <Typography>{message.text}</Typography>
  </Box>
}

const RenderResponse = ({ message }) => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          position: "relative",
          padding: "16px 6px",
          background: "rgb(160 44 47)",
          margin: "14px 8px 14px 40px",
          boxShadow: theme.shadows[2],
          borderRadius: "8px 1px 8px 20px",
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            right: "-8px",
            bottom: "-8px",
            color: "#fff",
            background: "#000",
            height: "28px",
            width: "28px",
            padding: "4px",
            borderRadius: "50%",
            textAlign: "center",
          }}
        >
          <FaRobot />
        </Typography>
        <Typography>{message.text}</Typography>
      </Box>
    </>
  )
}

export default function AiChat() {

  const [user, setUser] = useState("")

  const ref = useRef();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [chatWindowHeight, setChatWindowHeight] = useState(Math.max(Math.min(window.innerHeight - 150, 600), 400)); // Ensure minHeight of 400 and maxHeight of 700
  const [chatWindowWidth, setChatWindowWidth] = useState(Math.max(Math.min(window.innerWidth - 400, 400), 300)); // Ensure minWidth of 300 and maxWidth of 1000

  useEffect(() => {
    const handleResize = () => {
      setChatWindowHeight(Math.max(Math.min(window.innerHeight - 150, 700), 400)); // Adjust minHeight and maxHeight on resize
      setChatWindowWidth(Math.max(Math.min(window.innerWidth - 400, 400), 300)); // Adjust minWidth and maxWidth on resize
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [state, updateState] = useReducer((state, params) => {
    if (state.chatopen === false) state.chatminimize = false;
    return { ...state, ...params }
  }, {
    messages: [{
      id: Date.now(),
      origin: chatOriginEnum.AI,
      text: "Hey, tell me what you are looking for",
    }],
    chatopen: false,
    chatminimize: false,
    chatmessage: '',
    botbusy: false,
  });

  const sendChatMessage = async () => {
    console.log(state.chatmessage);

    updateState({
      botbusy: true
    });

    const existingMessages = state.messages;

    existingMessages.push({
      id: Date.now(),
      origin: chatOriginEnum.CUSTOMER,
      text: state.chatmessage
    });

    console.log(existingMessages);


    const gptResponse = await chatWithGpt(state.chatmessage, user);
    console.log(gptResponse);

    existingMessages.push({
      id: Date.now(),
      origin: chatOriginEnum.AI,
      text: Array.isArray(gptResponse) ? "This is what I found" : gptResponse,
      data: gptResponse
    });

    updateState({
      messages: existingMessages,
      chatmessage: '',
      botbusy: false,
    });

    // scroll to bottom
    ref.current.scrollTop = ref.current.scrollHeight;
  }

  const handleKeyDown = (e) => {

    if (e.key === 'Enter') {
      sendChatMessage();
    }
  }

  const handleChatMessageChange = (event) => {
    console.log(event.target.value)
    updateState({
      chatmessage: event.target.value
    });
  }

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 99999,
        bottom: matches ? 0 : "20px",
        right: matches ? 0 : "20px",
      }}
    >
      {state.chatopen ? (
        state.chatminimize ? (
          <Box
            sx={{
              height: "5%",
              width: `${chatWindowWidth}px`,

              background: "#a12c30",
              padding: "6px 8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography color={"#fff"} sx={{ padding: "50px" }}>AI Assistant</Typography>
            <Box>

              <IconButton
                onClick={() => updateState({ chatopen: false })}
                sx={{ color: "#fff" }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              height: `${chatWindowHeight}px`, // Set the height directly to chatWindowHeight
              width: `${chatWindowWidth}px`,
              margin: "30px",
              background: "#fff",
              boxShadow: "1px 1px 6px 2px rgba(0,0,0,0.25)",
            }}
            display={"flex"}
            flexDirection={"column"}
          >
            <Box
              sx={{
                height: "5%",
                background: "#a12c30",
                padding: "6px 8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{
              }} color={"#fff"} className="flex items-center justify-center min-h-10">
                <span className="">AI Assistant</span>
              </Typography>
              <Box>

                <IconButton
                  onClick={() => updateState({ chatopen: false })}
                  sx={{ color: "#fff" }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>

            {/* chat conversation */}
            <Box
              ref={ref}
              sx={{
                height: "90%",
                width: chatWindowWidth,
                overflowY: "scroll",

              }}
            >
              {
                state.messages.length > 0 &&
                state.messages.map(message => (

                  message.origin === chatOriginEnum.AI ?
                    <RenderResponse key={message.id} message={message} />
                    :
                    <RenderMessage key={message.id} message={message} />
                ))
              }
            </Box>

            {/* chat input */}
            {
              state.botbusy ?
                <Box sx={{ width: '100%' }}>
                  <LinearProgress />
                </Box>
                :
                <Box
                  sx={{ p: matches ? 2 : 1, height: "5%" }}
                  display={"flex"}
                  alignItems={"flex-end"}
                >
                  {/* <TextField
                    id="outlined-multiline-flexible"
                    label="Multiline"
                    multiline
                    maxRows={4}
                    onKeyDown={handleKeyDown}
                    onChange={handleChatMessageChange}
                    value={state.chatmessage}
                    fullWidth
                    sx={{ fontSize: '1.2rem' }}
                  />
                    <SendIcon /> */}
                  <Input
                    onKeyDown={handleKeyDown}
                    onChange={handleChatMessageChange}
                    value={state.chatmessage}
                    fullWidth
                    sx={{ fontSize: '1.2rem' }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={() => sendChatMessage()}>
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Box>
            }


          </Box >
        )
      ) : (
        // This is the small icon present at the bottom
        <Fab
          onClick={() => updateState({ chatopen: true })}
          sx={{
            backgroundColor: "#a12c30",
            '&:hover': {
              backgroundColor: "#a12c30", // Ensure the hover state has the same background color
            },
            ...matches && {
              bottom: '60px'
            }
          }}
        >
          <ChatIcon
            sx={{
              color: "white"
            }} />
        </Fab>
      )
      }
    </Box >
  );
}