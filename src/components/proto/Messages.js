import MessageDisplay from "./MessageDisplay";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";

const MessagesWrapper = styled("div")`
  /* border: 1px solid darkcyan;
  padding: 0.125rem; */
  margin-bottom: 0.5rem;
`;
let Messages = ({ messages }) => {
  return (
    <MessagesWrapper>
      {messages ? (
        messages.map((m) => <MessageDisplay message={m} key={m.name} />)
      ) : (
        <em>No message classes</em>
      )}
    </MessagesWrapper>
  );
};

Messages = observer(Messages);

export default Messages;
