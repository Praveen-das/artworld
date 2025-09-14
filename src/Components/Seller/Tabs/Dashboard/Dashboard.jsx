import { Box, Grid, Pagination, Skeleton, Typography } from "@mui/material";
import { blue, green, orange, purple, red } from "@mui/material/colors";
import { CheckCircle, Clock, FileText, RotateCcw, Truck, X } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { hidden } from "../../../../const";
import useMediaQuery from "../../../../Hooks/useMediaQuery";
import useSalesOrders from "../../../../Hooks/useSalesOrders";
import { CopyToClipboard } from "../../../../lib/CopyToClipboard";
import Card from "../../../Ui/Card";
import Status from "../../../Ui/OrderStatus/Status";
import TableHead from "../Components/TableHead";
import Td from "../Components/Td";
import "./dashboard.css";
import StatCard from "./StatCard";
import { ViewSalesOrder } from "./ViewSalesOrder";

const skeleton = new Array(5).fill(null);

function Dashboard() {
  const lg = useMediaQuery("sm");
  const [searchParams, setSearchParams] = useState(new URLSearchParams({ p: 1 }));
  const [selectedOrder, setSelectedOrder] = useState(null);
  const query = searchParams.toString();
  const salesOrders = useSalesOrders(query);

  const orders = salesOrders.data?.orders || [];
  const totalOrders = salesOrders.data?.total_orders || 0;
  const total = salesOrders.data?.total || 0;
  const statsRecord = salesOrders.data?.stats;

  const pandingOrders = statsRecord?.["pending"] || 0;
  const ordersShipped = statsRecord?.["shipped"] || 0;
  const ordersDelivered = statsRecord?.["delivered"] || 0;
  const ordersCancelled = statsRecord?.["cancelled"] || 0;
  const ordersRefunded = statsRecord?.["refunded"] || 0;

  const stats = [
    {
      bgcolor: purple[100],
      iconColor: purple[400],
      label: "TOTAL ORDERS",
      value: totalOrders,
      Icon: FileText,
    },
    {
      bgcolor: orange[100],
      iconColor: orange[400],
      label: "ORDERS PENDING",
      value: pandingOrders,
      query: "pending",
      Icon: Clock,
    },
    {
      bgcolor: blue[100],
      iconColor: blue[400],
      label: "ORDERS SHIPPED",
      value: ordersShipped,
      query: "shipped",
      Icon: Truck,
    },
    {
      bgcolor: green[100],
      iconColor: green[400],
      label: "ORDERS DELIVERED",
      value: ordersDelivered,
      query: "delivered",
      Icon: CheckCircle,
    },
    {
      bgcolor: red[100],
      iconColor: red[400],
      label: "ORDERS CANCELLED",
      value: ordersCancelled,
      query: "cancelled",
      Icon: X,
    },
    {
      bgcolor: purple[100],
      iconColor: purple[400],
      label: "ORDERS REFUNDED",
      value: ordersRefunded,
      query: "refunded",
      Icon: RotateCcw,
    },
  ];

  const handlePagination = (_, value) => {
    searchParams.set("p", value);
    setSearchParams(new URLSearchParams(searchParams));
  };

  const handleQuery = (query) => {
    if (!query || searchParams.get("status") === query) searchParams.delete("status");
    else searchParams.set("status", query);
    setSearchParams(new URLSearchParams(searchParams));
  };

  return (
    <>
      <ViewSalesOrder
        open={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        orderId={selectedOrder?.id}
        queryKey={query}
      />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h5">Dashboard</Typography>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              display: "grid",
              width: "100%",
              gridTemplateColumns: {
                xs: "repeat(auto-fit, minmax(150px, 1fr))",
                md: "repeat(auto-fit, minmax(300px, 1fr))",
              },
              gap: 2,
            }}
          >
            {stats.map((stat, index) => (
              <StatCard onClick={handleQuery} key={index} {...stat} />
            ))}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <Box id="dashboard_table" component="table" width="100%">
              <Box component="thead" textAlign="justify" mb={4}>
                <Box color="white" bgcolor="primary.main" component="tr">
                  <TableHead>Order Id</TableHead>
                  <TableHead sx={{ textAlign: "start" }} noWrap>
                    Order date
                  </TableHead>
                  <TableHead sx={hidden.sm}>Customer</TableHead>
                  <TableHead sx={hidden.sm} textAlign="center">
                    Quantity
                  </TableHead>
                  <TableHead textAlign="center">Status</TableHead>
                  {/* <TableHead sx={hidden.md} textAlign="end">
                    Actions
                  </TableHead> */}
                </Box>
              </Box>

              <Box sx={{ fontSize: "0.85em" }} component="tbody">
                {salesOrders.isLoading ? (
                  skeleton.map((_, i) => (
                    <tr key={i}>
                      <Td colSpan={lg ? 10 : 3}>
                        <Skeleton animation="wave" />
                      </Td>
                    </tr>
                  ))
                ) : !!orders.length ? (
                  orders.map((sales_order) => {
                    let order = sales_order.order;

                    return (
                      <Box
                        onClick={() => setSelectedOrder(sales_order)}
                        sx={{ "&:hover": { bgcolor: "var(--brandLight50) !important" }, cursor: "pointer", height: 70 }}
                        component="tr"
                        key={sales_order.id}
                      >
                        <Td>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography variant="inherit" sx={{ maxWidth: "100px" }} noWrap>
                              {sales_order.id}
                            </Typography>
                            {lg && <CopyToClipboard name="Order id" value={sales_order.id} />}
                          </Box>
                        </Td>
                        <Td>{moment(sales_order?.createdAt).format("MMMM Do YYYY")}</Td>
                        <Td sx={hidden.sm}>{order?.user.displayName}</Td>
                        <Td sx={hidden.sm} textAlign="center">
                          {sales_order?.quantity}
                        </Td>
                        <Td>
                          <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Status status={sales_order?.status} />
                          </Box>
                        </Td>
                        {/* <Td sx={hidden.md}>
                          <Box sx={{ display: "flex", justifyContent: "end" }}>
                            <Button
                              onClick={() => setSelectedOrder(sales_order)}
                              size="small"
                              startIcon={<Eye style={{ width: "1em", height: "1em" }} />}
                            >
                              View
                            </Button>
                          </Box>
                        </Td> */}
                      </Box>
                    );
                  })
                ) : (
                  <tr>
                    <Td style={{ paddingLeft: 0 }} colSpan={lg ? 10 : 3}>
                      <Box
                        sx={{
                          display: "grid",
                          placeItems: "center",
                          p: { xs: 3, lg: 6 },
                        }}
                      >
                        <Typography whiteSpace="normal" textAlign="center">
                          No orders found. Your orders will appear here once customers start purchasing your artworks.
                        </Typography>
                      </Box>
                    </Td>
                  </tr>
                )}
              </Box>
            </Box>

            {total > 10 && (
              <Pagination
                page={Number(searchParams.get("p"))}
                color="primary"
                sx={{ mt: "auto" }}
                onChange={handlePagination}
                count={Math.ceil(total / 10)}
              />
            )}
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
