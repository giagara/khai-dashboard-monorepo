import { Chip } from "@mui/material";

const Badge = (props) => {
  const { item = {} } = { ...props };

  let color = "success";
  let size = "small";
  if (item.operation === "Login") {
    color = "warning";
    size = "large";
  }

  //debugger;

  return (
    <Chip label={item[props.field]} color={color} m={1} mb={1} size={size} />
  );
};

export default Badge;
