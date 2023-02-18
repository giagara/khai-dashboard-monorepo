import { Edit } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { helpers } from "../../../utils/helpers";

const ActionEdit = (props) => {
  const { t } = useTranslation();
  const { item = {}, action = {} } = { ...props };
  const navigate = useNavigate();
  if (action.properties.link_to == null) {
    console.warn("No link provided");
    return <></>;
  }
  const [link_to] = helpers.getLink(action.properties.link_to, item);

  return (
    <Tooltip title={t("Edit")}>
      <span>
        <IconButton
          aria-label="details"
          size="large"
          onClick={() => navigate(link_to)}
          disabled={item.deleted_at ? true : false}
        >
          <Edit />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default ActionEdit;
