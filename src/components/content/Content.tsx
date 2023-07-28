import * as React from "react";
import { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import { Box, Button, Grid, Input } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";

import "./Content.css";

type Timestamp = {
  date: Date;
  order: number;
};

const VirtuosoTableComponents: TableComponents<Timestamp> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => (
    <TableRow {...props} sx={{ height: "2px" }} />
  ),
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

type Column = {
  dataKey: number;
  label: string;
};

const columns: Column[] = [
  { dataKey: 3, label: "Order" },
  { dataKey: 0, label: "Date" },
  { dataKey: 1, label: "ISO" },
  { dataKey: 2, label: "UNIX" },
];

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align="center"
          sx={{
            backgroundColor: "background.paper",
            width: column.dataKey === 3 ? "5%" : "inherit",
            height: "2px",
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default function Content() {
  const [timestamp, setTimestamp] = useState<Date>();

  const validateStringTimestamp = (timestamp: string) => {
    const timestampRegex = new RegExp("^[0-9]{13}$");
    return timestampRegex.test(timestamp);
  };

  const convertTimestamp = (timestamp: string) => {
    const date = new Date(parseInt(timestamp));

    return date;
  };

  const [timestampList, setTimestampList] = useState<Timestamp[]>([]);

  useEffect(() => {
    const timestampList = localStorage.getItem("timestampList");
    if (timestampList) {
      const rawData = JSON.parse(timestampList);
      if (rawData.length > 0) {
        const parsedData = rawData.map((data: any) => {
          return {
            date: new Date(data.date),
            order: data.order,
          };
        });
        setTimestampList(parsedData);
      }
    }
  }, []);

  function rowContent(_index: number, row: Timestamp) {
    return (
      <React.Fragment>
        {columns.map((column) => {
          const str =
            column.dataKey === 0
              ? row.date.toLocaleString()
              : column.dataKey === 1
              ? row.date.toISOString()
              : column.dataKey === 2
              ? row.date.getTime()
              : column.dataKey === 3
              ? row.order
              : "";
          return (
            <TableCell key={column.dataKey} align="center">
              {str}
            </TableCell>
          );
        })}
      </React.Fragment>
    );
  }

  return (
    <div className="content">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Input
              className="input-timestamp"
              placeholder="Enter a UNIX timestamp"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  if (validateStringTimestamp(e.currentTarget.value)) {
                    const convertedTimestamp = convertTimestamp(
                      e.currentTarget.value
                    );
                    if (convertedTimestamp) {
                      setTimestamp(convertedTimestamp);
                      const newTimestampList = [
                        ...timestampList,
                        {
                          date: convertedTimestamp,
                          order: timestampList.length,
                        },
                      ];
                      setTimestampList(newTimestampList);
                      localStorage.setItem(
                        "timestampList",
                        JSON.stringify(newTimestampList)
                      );
                    } else {
                      alert("Invalid timestamp");
                    }
                  } else {
                    alert("Invalid string provided");
                  }
                }
              }}
            />
          </Grid>
          <Grid xs={12}>
            <Typography
              variant="h4"
              component="div"
              gutterBottom
              className="current-timestamp"
            >
              {timestamp
                ? `Inserted Timestamp ${timestamp?.toLocaleString()}`
                : ""}
            </Typography>
          </Grid>
          <Grid xs={12} sx={{ marginBottom: "2%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Typography variant="h6" component="div" gutterBottom>
                  Timestamp History List
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setTimestampList([]);
                    localStorage.setItem("timestampList", JSON.stringify([]));
                  }}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Paper
              style={{
                height: 400,
                width: "70%",
                alignContent: "center",
                justifyContent: "center",
                margin: "auto",
              }}
            >
              <TableVirtuoso
                reversed={true}
                data={[...timestampList].sort((a, b) => b.order - a.order)}
                components={VirtuosoTableComponents}
                fixedItemHeight={20}
                // firstItemIndex={timestampList.length - 1}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
