import { Link, Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { helpers } from "../../../utils/helpers";

const ActionLink = (props) => {
  const { item = {}, action = {} } = { ...props };
  const navigate = useNavigate();
  if (action.properties.link_to == null) {
    console.warn("No link provided");
    return <></>;
  }
  const [link_to] = helpers.getLink(action.properties.link_to, item);

  return (
    <IconButton
      aria-label="details"
      size="large"
      onClick={() => navigate(link_to)}
      disabled={item.deleted_at ? true : false}
    >
      <Search />
    </IconButton>
  );
};

export default ActionLink;
