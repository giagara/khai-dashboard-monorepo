import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import axiosClient from "../../../utils/axios";
import { helpers } from "../../../utils/helpers";
import { notification } from "../../../utils/notification";

const ActionDelete = (props) => {
  const { t } = useTranslation();

  const { item = {}, action = {} } = { ...props };
  if (action.properties.link_to == null) {
    console.warn("No link provided");
    return <></>;
  }
  const [link_to, delete_key, delete_val] = helpers.getLink(
    action.properties.link_to,
    item
  );

  const handleDelete = () => {
    if (
      !action.properties.confirm ||
      (action.properties.confirm &&
        window.confirm(
          action.properties.confirm_message || t("Delete this entry?")
        ))
    ) {
      console.log("Procedo alla cancellazione");

      axiosClient
        .delete(link_to)
        .then((response) => {
          notification.show(
            t("Delete"),
            `${t("Operation complete")}`,
            "success"
          );

          //reload table
          props.handleCallback((data, setData) => {
            setData((oldData) => {
              return {
                ...oldData,
                data: oldData.data.filter((row, i) => {
                  return row[delete_key] !== delete_val;
                }),
              };
            });
          });
        })
        .catch((err) => {});
    } else {
      console.log("Deleteion aborted");
    }
  };

  return (
    <Tooltip title={t("Delete")}>
      <span>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={handleDelete}
          disabled={item.deleted_at ? true : false}
        >
          <Delete />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default ActionDelete;
