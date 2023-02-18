import { SettingsBackupRestore } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import axiosClient from "../../../utils/axios";
import { helpers } from "../../../utils/helpers";
import { notification } from "../../../utils/notification";

const ActionRestore = (props) => {
  const { t } = useTranslation();

  const { item = {}, action = {} } = { ...props };
  if (action.properties.link_to == null) {
    console.warn("No link provided");
    return <></>;
  }
  const [link_to, restore_key, restore_val] = helpers.getLink(
    action.properties.link_to,
    item
  );

  const handleRestore = () => {
    if (
      !action.properties.confirm ||
      (action.properties.confirm &&
        window.confirm(
          action.properties.confirm_message || t("Restore this entry?")
        ))
    ) {
      console.log("Procedo al restore");

      axiosClient
        .post(link_to)
        .then((response) => {
          notification.show(
            t("Restore"),
            `${t("Operation complete")}`,
            "success"
          );

          //reload table
          props.handleCallback((data, setData) => {
            setData((oldData) => {
              return {
                ...oldData,
                data: oldData.data.map((row, i) => {
                  // debugger;
                  return row[restore_key] !== restore_val
                    ? row
                    : { ...row, deleted_at: null };
                }),
              };
            });
          });
        })
        .catch((err) => {});
    } else {
      console.log("Restoration aborted");
    }
  };

  return (
    <Tooltip title={t("Restore")}>
      <span>
        <IconButton
          aria-label={t("Restore")}
          size="large"
          onClick={handleRestore}
          disabled={!!!item.deleted_at ? true : false}
        >
          <SettingsBackupRestore />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default ActionRestore;
