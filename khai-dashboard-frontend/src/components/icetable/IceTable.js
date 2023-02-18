import React, { useEffect, useState } from "react";

import {
  Table,
  TextField,
  TableRow,
  TableCell,
  TableBody,
  Box,
  TableHead,
  TableSortLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataTableLoader, RepeatableTableRows } from "../Loaders";
// import Pagination from "../Pagination";
import { Pagination } from "@mui/material";
import { genericService } from "../../api/generic/generic.service";
import { Link } from "react-router-dom";
import ActionEdit from "./custom_components/ActionEdit";
import ActionDelete from "./custom_components/ActionDelete";
import { helpers } from "../../utils/helpers";
import ActionLink from "./custom_components/ActionLink";
import Badge from "./custom_components/Badge";
import ActionRestore from "./custom_components/ActionRestore";

const FilterColumns = (props) => {
  return (
    <TableRow className="filter-row">
      {props.columns.map((element, index) => {
        if (!element.filtrable) {
          return (
            <TableCell className="border-0" key={`filter-${index}`}></TableCell>
          );
        }

        return (
          <TableCell
            className="border-0"
            key={`filter-${index}`}
            data-field={element.field}
          >
            {element.filter_options ? (
              <Select
                id={element.field}
                name={element.field}
                value={element.value}
                // onChange={() =>
                //   props.handleFilterChange({
                //     e: { target: { value: "", name: "" } },
                //   })
                // }

                onChange={props.handleFilterChange}
                displayEmpty
                inputProps={{ "aria-label": element.field }}
              >
                {element.filter_options[""] && (
                  <MenuItem value="">{element.filter_options[""]}</MenuItem>
                )}
                {Object.keys(element.filter_options)
                  .filter((i) => i !== "")
                  .map((key, index) => {
                    return (
                      <MenuItem key={key} value={key}>
                        {element.filter_options[key]}
                      </MenuItem>
                    );
                  })}
              </Select>
            ) : (
              <TextField
                variant="standard"
                id={element.field}
                type="text"
                name={element.field}
                size="sm"
                onChange={props.handleFilterChange}
                value={element.value}
              />
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

const IceTable = (props) => {
  const {
    columns = [],
    data = null,
    url = "",
    showsearch = true,
  } = { ...props };

  const [_data, setData] = useState(data);
  const [_columns, setColumns] = useState(columns);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(
    sessionStorage.getItem(`filter_${url}`)
      ? JSON.parse(sessionStorage.getItem(`filter_${url}`))
      : []
  );
  const [sort, setSort] = useState({ column: null, order: "asc" });
  const [update, setUpdate] = useState("first");
  const [, setAdditionalProperties] = useState(null);

  /** set custom components */
  const custom_components = {
    edit: ActionEdit,
    delete: ActionDelete,
    restore: ActionRestore,
    link: ActionLink,
    badge: Badge,
    ...(props.custom_components || {}),
  };

  const [t, setT] = useState(null);

  useEffect(() => {
    setDataLoading(true);
    getDataFromAPI();

    return () => {
      clearTimeout(t);
      //setFilters([]);
    };
  }, [page, update]);

  useEffect(() => {
    if (props.shouldUpdate) {
      setDataLoading(true);
      getDataFromAPI();
      props.onUpdateDone();

      return () => {
        clearTimeout(t);
        //setFilters([]);
      };
    }

    return () => {};
  }, [props.shouldUpdate]);

  // useEffect(() => {
  //   console.log("loding saved data");

  //   setFilters();
  // }, [url]);

  useEffect(() => {
    if (update === "first") {
      return () => {};
    }

    console.log("storing filters");

    sessionStorage.setItem(`filter_${url}`, JSON.stringify(filters));
  }, [update, url]);

  const getDataFromAPI = () => {
    genericService.getTable(url, page, filters, sort).then((response) => {
      if (!columns.length && !_columns.length) {
        //console.log("Setting columns");
        setColumns(response.data.columns);
      }

      setFilters(
        response.data.columns.map((item, index) => {
          //debugger;
          return {
            field: item.field,
            label: item.label,
            value: (
              filters.filter((f) => f.field === item.field)[0] || { value: "" }
            ).value,
            filtrable: item.filtrable,
            sortable: item.sortable,
            filter_key: item.filter_key,
            filter_options: item.filter_options || null,
          };
        })
      );

      setData(response.data.data);
      setAdditionalProperties(response.data.additional_properties);
      setDataLoading(false);
      setLoading(false);
    });
  };

  /** SUB COMPONENTS */
  const TableColumns = () => {
    return (
      <TableRow>
        {_columns.map((item, index) => {
          return (
            <TableCell
              key={index}
              data-field={item.field}
              sortDirection={
                item.sortable &&
                sort.column === item.field &&
                item.field != null
                  ? sort.order
                  : false
              }
              // onClick={() => handleSortColumn(item)}
            >
              <>
                {item.sortable && item.field != null ? (
                  <TableSortLabel
                    active={sort.column === item.field && item.field != null}
                    direction={sort.order}
                    onClick={() => handleSortColumn(item)}
                  >
                    {item.label}
                  </TableSortLabel>
                ) : (
                  item.label
                )}
              </>
            </TableCell>
          );
        })}
        <th className="border-0"></th>
      </TableRow>
    );
  };

  const DataRows = ({ showDeleted, withRestore }) => {
    const formatField = (item, field) => {
      if (!field || !item) {
        return;
      }
      const key = field.split(".")[0];
      const subkey = field.split(".")[1]; // può ritornare undefined!!

      return subkey ? item[key][subkey] : item[key];
    };

    if (dataLoading || !_data) {
      return (
        <tr>
          <td colSpan="100%">
            <RepeatableTableRows />
          </td>
        </tr>
      );
    }

    return _data.data.map((item, row_num) => {
      return (
        <TableRow
          key={`row-${row_num}`}
          hover
          className={`row-${item.deleted_at ? "deleted" : "enabled"}`}
        >
          {_columns.map((col, col_num) => {
            if (col.type === "link") {
              const [link_to] = helpers.getLink(col.properties.link_to, item);
              return (
                <TableCell key={`item-${row_num}-${col_num}`} align="left">
                  <Link to={link_to}>{item[col.field]}</Link>
                </TableCell>
              );
            }

            if (col.type === "badge") {
              const BadgeComponent = custom_components[col.type] || null;

              if (BadgeComponent != null) {
                return (
                  <TableCell key={`item-${row_num}-${col_num}`} align="left">
                    <BadgeComponent
                      item={item}
                      index={`${row_num}-${col_num}`}
                      {...col.properties}
                    />
                  </TableCell>
                );
              }
            }

            if (col.type === "actions") {
              return (
                <TableCell
                  style={{
                    minWidth: "110px",
                    ...((col.properties && col.properties.style) || {}),
                  }}
                  padding="none"
                  align="right"
                  key={`item-${row_num}-${col_num}`}
                >
                  <Box mr={2}>
                    <Actions
                      index={`${row_num}-${col_num}`}
                      actions={col.actions}
                      item={item}
                      onClick={props.handleClick}
                      showDeleted={props.showDeleted}
                      withRestore={props.withRestore}
                    />
                  </Box>
                </TableCell>
              );
            }

            if (col.type === "progressbar") {
              const CustomComponent = custom_components[col.type] || null;

              return (
                <TableCell
                  style={{
                    minWidth: "110px",
                    ...((col.properties && col.properties.style) || {}),
                  }}
                  padding="none"
                  key={`item-${row_num}-${col_num}`}
                >
                  <CustomComponent
                    {...col}
                    item={item}
                    progress_bar={col.properties.progress_bar || ""}
                    onClick={() => props.handleClick(col.type, item, col)}
                  />
                </TableCell>
              );
            }

            /** custom component */
            if (custom_components.hasOwnProperty(col.type)) {
              const CustomComponent = custom_components[col.type] || null;

              return (
                <TableCell
                  style={{
                    minWidth: "110px",
                    ...((col.properties && col.properties.style) || {}),
                  }}
                  padding="none"
                  key={`item-${row_num}-${col_num}`}
                >
                  <CustomComponent
                    {...col}
                    item={item}
                    onClick={() => props.handleClick(col.type, item, col)}
                  />
                </TableCell>
              );
            }

            // debugger;
            return (
              <TableCell key={`item-${row_num}-${col_num}`}>
                {formatField(item, col.field)}
              </TableCell>
            );
          })}
        </TableRow>
      );
    });
  };

  const Actions = (props) => {
    // debugger;
    return (
      <>
        {props.actions
          .filter(
            (action) => action.type !== "delete" || !!!props.item?.deleted_at
          )
          .filter(
            (action) =>
              action.type !== "restore" ||
              (props.withRestore && !!props.item?.deleted_at)
          )

          .map((action, index) => {
            const CustomComponent = custom_components[action.type] || null;
            if (CustomComponent != null) {
              return (
                <CustomComponent
                  key={`custom-${props.index}-${index}`}
                  {...props}
                  action={action}
                  index={index}
                  handleCallback={handleCallback}
                  onClick={props.onClick}
                />
              );
            } else {
              return null;
            }
          })}
      </>
    );
  };

  /** EVENTS */
  const handleFilterChange = (e) => {
    //e.persist();
    //console.log(e.target.name, e.target.value)
    setFilters((oldFilters) => {
      return [...oldFilters].map((element) => {
        return element.field === e.target.name
          ? { ...element, value: e.target.value }
          : element;
      });
    });

    clearTimeout(t);
    setT(
      setTimeout(() => {
        setUpdate(genericService.makeid());
      }, 500)
    );
  };

  const handleSortColumn = (column) => {
    if (!column.sortable) {
      return;
    }
    setSort((prevSort) => {
      //debugger;
      return {
        column: column.field,
        order:
          prevSort.column === column.field
            ? prevSort.order === "asc"
              ? "desc"
              : "asc"
            : "asc",
      };
    });

    setUpdate(genericService.makeid());
  };

  const handleCallback = (cb) => {
    cb(_data, setData);
  };

  // const handleRefresh = () => {
  //   setUpdate(genericService.makeid());
  // };

  /** RETURNS */
  if (loading) {
    return <DataTableLoader />;
  }

  return (
    <>
      <Table className="table-centered table-nowrap rounded mb-0 icetable">
        <TableHead>
          <TableColumns />
          {showsearch && (
            <FilterColumns
              columns={filters}
              handleFilterChange={handleFilterChange}
            />
          )}
        </TableHead>
        <TableBody>
          <DataRows
            showDeleted={props.showDeleted}
            withRestore={props.withRestore}
          />
        </TableBody>
      </Table>
      {_data && _data.meta.current_page === 1 && _data.meta.last_page === 1 ? (
        <></>
      ) : (
        <Pagination
          color="primary"
          count={_data.meta.last_page}
          onChange={(event, value) => setPage(value)}
          page={page}
        />
      )}

      {/* {additionalProperties && additionalProperties.exportable && (
        <Button
          ml={4}
          my={6}
          variant="contained"
          color="primary"
          onClick={handleDownload}
        >
          <CloudDownload />
          &nbsp;&nbsp;Download
        </Button>
      )} */}
    </>
  );
};

export default IceTable;
