import { Badge, Box, Button, Grid, Stack, styled, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ArrowLeft, FileText, QrCode, Truck } from "lucide-react";
import moment from "moment";
import QRCode from "qrcode";
import { useMemo } from "react";
import { toast } from "react-toastify";
import useSales from "../../../../Hooks/useSales";
import useSalesOrders from "../../../../Hooks/useSalesOrders";
import Card from "../../../Ui/Card";
import Status from "../../../Ui/OrderStatus/Status";
import Modal from "../../../Ui/Modal";
import Title from "../../../Ui/Title";
import { CopyToClipboard } from "../../../../lib/CopyToClipboard";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "black",
    boxShadow: `0 0 0 2px ${(theme.vars ?? theme).palette.background.paper}`,
  },
}));

export function ViewSalesOrder({ open, queryKey, onClose, orderId }) {
  return (
    <Modal open={Boolean(open)} onAnimationEnd={() => !open && onClose()} onClose={onClose}>
      {open && <ModalContent queryKey={queryKey} orderId={orderId} onClose={onClose} />}
    </Modal>
  );
}

const handleGenerateLabel = async (salesOrder) => {
  const order = salesOrder.order;

  try {
    const qrData = `ORDER:${salesOrder.id}|CUSTOMER:${order.user.displayName}|STATUS:${salesOrder.status}`;
    const qrCodeDataURL = await QRCode.toDataURL(qrData, { width: 120 });
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      printWindow.document.write(`
      <html>
        <head>
          <title>Label</title>
          <title>Shipping Label - ${salesOrder.id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .label { box-sizing: border-box; width: 100%; border: 3px solid #000; padding: 25px; height: 6.5in; position: relative; background: white; }
            .header { text-align: center; margin-bottom: 25px; border-bottom: 2px solid #000; padding-bottom: 15px; }
            .qr-section { position: absolute; top: 25px; right: 25px; text-align: center; }
            .address-section { margin: 30px 0; padding: 15px; border: 1px solid #ccc; }
            .from-address { margin-bottom: 20px; font-size: 12px; }
            .to-address { font-size: 14px; font-weight: bold; }
            .order-info { position: absolute; bottom: 25px; width: calc(100% - 50px); border-top: 2px solid #000; padding-top: 15px; }
            .tracking { font-size: 18px; font-weight: bold; text-align: center; margin: 15px 0; }
            @media print { body { margin: 0; padding: 0; } }
          </style>
        </head>
        <body>
          <div class="label">
            <div class="header">
              <h2>SHIPPING LABEL</h2>
              <div class="tracking">Order: ${salesOrder.id}</div>
            </div>
            <div class="qr-section">
              <img src="${qrCodeDataURL}" alt="QR Code" width="120" height="120">
              <div style="font-size: 10px; margin-top: 5px;">Scan for details</div>
            </div>
            <div class="from-address">
              <strong>FROM:</strong><br>
              Your Company<br>
              123 Business Street<br>
              City, State 12345
            </div>
            <div class="address-section">
              <div style="font-size: 12px; color: #666; margin-bottom: 10px;">SHIP TO:</div>
              <div class="to-address">
                ${order.user.address.name}<br>
                ${order.user.address.address}
                ${order.user.address.city}
                ${order.user.address.state} ${order.user.address.pincode}<br>
                ${order.user.address.mobile}
              </div>
            </div>
            <div class="order-info">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span><strong>Date:</strong> ${new Date(salesOrder.createdAt).toLocaleDateString()}</span>
                <span><strong>Items:</strong> ${salesOrder.quantity}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span><strong>Weight:</strong> ${salesOrder.quantity * 0.5} lbs</span>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
    }

    printWindow.document.close();
    printWindow.print();
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to generate shipping label",
      variant: "destructive",
    });
  }
};

const handleGenerateInvoice = async (salesOrder) => {
  const order = salesOrder.order;
  try {
    const qrData = `INVOICE:${salesOrder.id}|TOTAL:${salesOrder.price}|DATE:${salesOrder.createdAt}`;
    const qrCodeDataURL = await QRCode.toDataURL(qrData, { width: 100 });
    const subtotal = salesOrder.price;
    const tax = subtotal * 0.08;

    const printWindow = window.open("", "_blank");
    const html = `
          <html>
            <head>
              <title>Invoice - ${salesOrder.id}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 30px; max-width: 8.5in; background: white; }
                .invoice-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #007bff; padding-bottom: 25px; margin-bottom: 35px; }
                .company-info h1 { color: #007bff; margin: 0 0 10px 0; font-size: 32px; }
                .company-info h2 { margin: 0 0 15px 0; color: #333; }
                .invoice-info { text-align: right; }
                .invoice-info h3 { color: #007bff; margin: 0 0 15px 0; font-size: 24px; }
                .bill-to { margin-bottom: 35px; padding: 20px; background: #f8f9fa; border-radius: 8px; }
                .bill-to h3 { color: #007bff; margin: 0 0 15px 0; }
                .items-table { width: 100%; border-collapse: collapse; margin-bottom: 35px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                .items-table th, .items-table td { border: 1px solid #ddd; padding: 15px; text-align: left; }
                .items-table th { background: linear-gradient(135deg, #007bff, #0056b3); color: white; font-weight: bold; }
                .items-table tr:nth-child(even) { background-color: #f8f9fa; }
                .items-table tr:hover { background-color: #e3f2fd; }
                .total-section { float: right; width: 350px; background: #f8f9fa; padding: 25px; border-radius: 8px; }
                .total-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #ddd; }
                .total-row.final { border-top: 3px solid #007bff; border-bottom: none; font-weight: bold; font-size: 20px; color: #007bff; margin-top: 10px; padding-top: 15px; }
                .footer { clear: both; margin-top: 60px; text-align: center; color: #666; font-size: 14px; border-top: 2px solid #eee; padding-top: 25px; }
                .qr-code { margin-top: 15px; }
                @media print { body { margin: 0; padding: 20px; } }
              </style>
            </head>
            <body>
              <div class="invoice-header">
                <div class="company-info">
                  <h1>INVOICE</h1>
                  <h2>Your Company</h2>
                  <p>123 Business Street<br>
                  City, State 12345<br>
                  Phone: (555) 123-4567<br>
                  Email: info@company.com<br>
                  Website: www.company.com</p>
                </div>
                <div class="invoice-info">
                  <h3>Invoice #${salesOrder.id}</h3>
                  <p><strong>Invoice Date:</strong> ${new Date().toLocaleDateString()}</p>
                  <p><strong>Order Date:</strong> ${new Date(salesOrder.createdAt).toLocaleDateString()}</p>
                  <img src="${qrCodeDataURL}" alt="QR Code" class="qr-code" width="100" height="100">
                </div>
              </div>

              <div class="bill-to">
                <h3>Bill To:</h3>
                <p><strong>${order.user.address.name}</strong><br>
                ${order.user.address.mobile}
                ${order.user.address.city}, ${order.user.address.state} ${order.user.address.pincode}<br>
                India</p>
              </div>

              <table class="items-table">
                <thead>
                  <tr>
                    <th style="width: 50%;">Item Description</th>
                    <th style="width: 15%;">Quantity</th>
                    <th style="width: 20%;">Unit Price</th>
                    <th style="width: 15%;">Total</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td><strong>${salesOrder.product.name}</strong></td>
                      <td style="text-align: center;">${salesOrder.quantity}</td>
                      <td style="text-align: right;">$${salesOrder.price / salesOrder.quantity}</td>
                      <td style="text-align: right; font-weight: bold;">$${salesOrder.price}</td>
                    </tr>
                </tbody>
              </table>

              <div class="total-section">
                <div class="total-row final">
                  <span>TOTAL:</span>
                  <span>$${salesOrder.price}</span>
                </div>
              </div>

              <div class="footer">
                <h3 style="color: #007bff; margin-bottom: 15px;">Thank you for your business!</h3>
                <p>Questions about this invoice? Contact us at info@company.com or (555) 123-4567</p>
                <p style="margin-top: 20px; font-size: 12px;">Terms: Payment due within 30 days. Late payments subject to 1.5% monthly service charge.</p>
              </div>
            </body>
          </html>
        `;
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.print();
    }
  } catch (error) {
    console.log(error);
    toast({
      title: "Error",
      description: "Failed to generate invoice",
      variant: "destructive",
    });
  }
};

function ModalContent({ orderId, queryKey, onClose }) {
  const { updateStatus } = useSales();
  const salesOrders = useSalesOrders(queryKey).data?.orders || [];

  const order = useMemo(() => salesOrders.find((o) => o.id === orderId), [salesOrders, orderId]);
  const otherOrders = useMemo(() => salesOrders.filter((o) => o.id !== orderId), [salesOrders, orderId]);
  const price = order.price;

  async function handleShipping() {
    await updateStatus.mutateAsync({ orderId: order.id, status: "shipped" });
  }

  return (
    <Grid container spacing={{ xs: 4, md: 6 }}>
      <Grid container item xs={12} spacing={{ xs: 2, md: 2 }}>
        <Grid item xs={12}>
          <Modal.Title title={`Order Details - ${order.id.split("-")[0]}`} mainPage="Dashboard" onClose={onClose} />
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ p: 4, width: "100%" }}>
            <Grid container columnSpacing={{ xs: 2, md: 2 }}>
              <Grid container item xs={12} spacing={4}>
                <Grid item xs={6} md={3}>
                  <Container>
                    <Typography variant="caption" color={grey[800]} fontWeight={600}>
                      Order Date
                    </Typography>
                    <Typography fontWeight={700}>{moment(order?.createdAt).format("DD-MM-YYYY")}</Typography>
                  </Container>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Container>
                    <Typography variant="caption" color={grey[800]} fontWeight={600}>
                      Status
                    </Typography>
                    <Box>
                      <Status status={order.status} />
                    </Box>
                  </Container>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Container>
                    <Typography variant="caption" color={grey[800]} fontWeight={600}>
                      Quantity
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
                      {order.quantity}
                    </Typography>
                  </Container>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Container>
                    <Typography variant="caption" color={grey[800]} fontWeight={600}>
                      Total
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
                      ₹{price}
                    </Typography>
                  </Container>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12}>
          <Title>Item</Title>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ overflow: { xs: "visible", md: "hidden" } }}>
            <Box sx={{ display: "flex", gap: 2, px: { md: 2 }, py: { xs: 1, md: 2 } }}>
              <StyledBadge badgeContent={order.quantity} color="primary">
                <Box
                  component="img"
                  sx={{ width: 80, height: 80, borderRadius: 2 }}
                  src={order.product.images[0].url + "/tr:w-100"}
                />
              </StyledBadge>
              <Box display="grid" flex="1 1 0" alignContent="center" width="100%" p={1} gap={1}>
                <Typography fontWeight={600}>{order.product.name}</Typography>
                <Box display='flex' alignItems='center' gap={1} >
                  <Typography color={grey[600]} variant="subtitle2">
                    Id: {order.product.id}
                  </Typography>
                  <CopyToClipboard name='Product Id' value={order.product.id} />
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12}>
          <Title>Actions</Title>
        </Grid>
        <Grid item xs={12} md="auto">
          <Button
            sx={{ whiteSpace: "nowrap" }}
            disabled={updateStatus.isLoading}
            startIcon={<Truck style={{ width: "0.8em", height: "0.8em" }} />}
            onClick={handleShipping}
            variant="contained"
            size="large"
            fullWidth={{ xs: true, sm: false }}
          >
            {order.status === "shipped" ? "Re-Confirm Shipment" : "Confirm Shipment"}
          </Button>
        </Grid>

        <Grid item xs={12} md="auto">
          <Button
            onClick={() => handleGenerateLabel(order)}
            startIcon={<QrCode style={{ width: "0.8em", height: "0.8em" }} />}
            variant="contained"
            size="large"
            fullWidth={{ xs: true, sm: false }}
          >
            Print Label
          </Button>
        </Grid>
        <Grid item xs={12} md="auto">
          <Button
            onClick={() => handleGenerateInvoice(order)}
            startIcon={<FileText style={{ width: "0.8em", height: "0.8em" }} />}
            variant="contained"
            size="large"
            fullWidth={{ xs: true, sm: false }}
          >
            Print Invoice
          </Button>
        </Grid>
      </Grid>

      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12}>
          <Title>Other items in this order</Title>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {otherOrders.map((item) => {
              let product = item.product;
              return (
                <Card key={item.id} sx={{ overflow: { xs: "visible", md: "hidden" } }}>
                  <Box sx={{ display: "flex", gap: 2, px: { md: 2 }, py: { xs: 1, md: 2 } }}>
                    <StyledBadge badgeContent={item.quantity} color="primary">
                      <Box
                        component="img"
                        sx={{ width: 80, height: 80, borderRadius: 2 }}
                        src={product.images[0].url + "/tr:w-100"}
                      />
                    </StyledBadge>
                    <Box
                      display="grid"
                      gridTemplateColumns="1fr 1fr"
                      flex="1 1 0"
                      alignContent="center"
                      width="100%"
                      p={1}
                      gap={1}
                    >
                      <Typography fontWeight={600}>{product.name}</Typography>
                      <Box display="flex" alignItems="baseline" gap={1} ml="auto">
                        <Typography>Total:</Typography>
                        <Typography fontWeight={600}>₹{item.price}</Typography>
                      </Box>
                      <Box>
                        <Status status={item.status} />
                      </Box>
                      <Typography variant="caption" color={grey[800]} ml="auto">
                        ₹{item.price / item.quantity} each
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              );
            })}
          </Box>
        </Grid>
      </Grid>

      {/* <Grid container item xs={12} spacing={{ xs: 4, md: 2 }}>
        <Grid item xs={12}>
          <Typography variant="title.secondary" fontWeight={600} whiteSpace="nowrap">
            Actions
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <Grid container columnSpacing={2} rowSpacing={1}>
              <Grid item xs={12}>
                <Typography variant="caption" color={grey[800]} fontWeight={600}>
                  Tracking Number
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput size="small" />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button fullWidth variant="contained">
                  Update
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid> */}

      {/* Product Details Section */}
      {/* <Grid item xs={12} lg={6}>
        <Box display="flex" flexDirection="column" gap={3}>
          <Box sx={{ display: "grid", gap: 2 }}>
            <Typography variant="h4" fontWeight="bold">
              {product?.name}
            </Typography>
            <Box display="flex" alignItems="center" gap={2} mt={2}>
              {product.discount > 0 ? (
                <>
                  <Typography sx={{ textDecoration: "line-through" }} color="text.secondary">
                    ${price}
                  </Typography>
                  <Chip size="small" color="error" label={`${product.discount}% OFF`} />
                </>
              ) : (
                <Typography variant="h5" fontWeight="bold">
                  ₹{product.price}
                </Typography>
              )}
            </Box>

            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Package size={16} />
              <Typography variant="body2">
                Remaining Stock: <b>{product.inventory.availableQty} units</b>
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Box display="grid" gap={1} pt={2}>
            <Button
              size="large"
              variant="contained"
              onClick={() => setModel((s) => ({ ...s, modal: "update_product" }))}
              sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}
            >
              Print Label
            </Button>
            <Button
              size="large"
              variant="contained"
              onClick={() => setModel((s) => ({ ...s, modal: "update_product" }))}
              sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}
            >
              Print Invoice
            </Button>
          </Box>
        </Box>
      </Grid> */}
    </Grid>
  );
}

function Wrapper({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        gap: 2,
        p: 2,
        borderRadius: 4,
        bgcolor: "var(--brandLight50)",
      }}
    >
      {children}
    </Box>
  );
}

function Container({ children }) {
  return (
    <Box display="grid" gap={2} gridTemplateRows="1fr 1fr" alignItems="center" height="100%">
      {children}
    </Box>
  );
}

function IconBox({ children, bgcolor }) {
  return (
    <Box
      sx={{
        p: 1.5,
        bgcolor: "var(--brandLight)",
        color: "primary.main",
        borderRadius: 2,
      }}
    >
      {children}
    </Box>
  );
}

function ActionCard({ Icon, title, desc, BtnIcon, btnLabel, onClick }) {
  return (
    <Card keepBorder>
      <Box
        display="grid"
        height="100%"
        gridTemplateRows="auto auto 1fr"
        gap={2}
        px={{ xs: 3, md: 3 }}
        py={{ xs: 4, md: 4 }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Icon size={20} />
          <Typography variant="title.secondary">{title}</Typography>
        </Box>
        <Typography variant="caption" color={grey[800]} mt={1}>
          {desc}
        </Typography>
        <Button
          onClick={onClick}
          startIcon={<BtnIcon style={{ width: "0.8em", height: "0.8em" }} />}
          variant="contained"
          sx={{ mt: "auto" }}
        >
          {btnLabel}
        </Button>
      </Box>
    </Card>
  );
}
