import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { accountDetailsSchema, userDetailSchema } from "../../../Schema/userSchema";

import AccountBalanceIcon from "@mui/icons-material/AccountBalanceOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useQueryClient } from "@tanstack/react-query";
import "../style.css";

import useCurrentUser from "../../../Hooks/useCurrentUser";
import { createLinkedAccount, updateLinkedAccount } from "../../../Services/rzp.api";
import { gap, spacing } from "../../../const";
import Card from "../../Ui/Card";
import BankDetailsForm from "./BankDetailsForm";
import OnboardingStatus from "./OnboardingStatus";
import SellerDetailsForm from "./SellerDetailsForm";
import useRzp from "../../../Hooks/useRzp";
import { useNavigate } from "react-router-dom";

function SellerOnbording() {
  const currentUser = useCurrentUser().currentUser.data;
  const queryClient = useQueryClient();
  const { createBankAccount } = useRzp();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const userDetails = useFormik({
    initialValues: initialValues.userDetail,
    validationSchema: userDetailSchema,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: handleSubmittingSellerDetails,
  });

  const bankAccount = useFormik({
    initialValues: initialValues.bankAccount,
    // validationSchema: accountDetailsSchema,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: handleSubmittingBankAccount,
  });

  async function handleSubmittingSellerDetails(payload, { setStatus, setFieldError }) {
    try {
      const accountId = currentUser.linked_account?.accountId;
      if (accountId) {
        await updateLinkedAccount(accountId, payload);
      } else await createLinkedAccount(payload);

      queryClient.invalidateQueries(["currentUser"]);
      setStatus({ submitted: true });
      handleNext();
    } catch (error) {
      const errorResponse = error.response.data;
      if (errorResponse.code === "BAD_REQUEST_ERROR") {
        setFieldError(errorResponse.field, errorResponse.description);
      }
    }
  }

  async function handleSubmittingBankAccount(payload, { setStatus, setFieldError }) {
    try {
      const res = await createBankAccount.mutateAsync(payload);
      setStatus({ submitted: true });
      navigate("/dashboard", { state: { status: "success" }, replace: true });
      queryClient.invalidateQueries(["currentUser"]);
    } catch (error) {
      const errorResponse = error.response.data;
      if (errorResponse.code === "BAD_REQUEST_ERROR") {
        setFieldError(errorResponse.field, errorResponse.description);
      }
    }
  }

  const accountLinked = currentUser?.linked_account?.status === "created";

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Grid container spacing={spacing} px={gap} pt={2} pb={6}>
        <Grid item xs={12} md={8} textAlign="start">
          <Box sx={{ display: "grid", gap: 4 }}>
            <Box sx={{ display: "grid", gap: 2 }}>
              <Typography variant="h5">Onboarding Status</Typography>
              <Typography variant="h10">Complete your seller registration to start selling on our platform</Typography>
            </Box>

            <Box sx={{ display: "grid", gap: 2, mt: 2 }}>
              <OnboardingStatus
                title="Store Details"
                active={activeStep + 1 === 1}
                completed={Boolean(accountLinked)}
                icon={PersonOutlineIcon}
                index={1}
              />
              <OnboardingStatus
                title="Bank Account"
                active={activeStep + 1 === 2}
                completed={Boolean(bankAccount.status?.submitted)}
                icon={AccountBalanceIcon}
                index={2}
              />
            </Box>

            <Card>
              <Box sx={{ display: "grid", gap: 2, px: { sm: 4 }, pt: 5, pb: 8 }}>
                <Grid item container xs={12} height="fit-content" spacing={4} textAlign="start">
                  <SellerDetailsForm formData={userDetails} open={!accountLinked} />
                  <BankDetailsForm formData={bankAccount} open={!!accountLinked} onBack={handleBack} />
                </Grid>
              </Box>
            </Card>
          </Box>
        </Grid>

        <Grid item xs={12} md={4} textAlign="start">
          <Box sx={{ display: "grid", gap: 4 }}>
            <Card sx={{ display: { xs: "none", md: "unset" } }}>
              <Box sx={{ display: "grid", gap: 2, p: { sm: 3 } }}>
                <a href="https://razorpay.com/" target="_blank" rel="noreferrer">
                  <img
                    referrerPolicy="origin"
                    src="https://badges.razorpay.com/badge-light.png "
                    style={{ height: "45px", width: "113px" }}
                    alt="Razorpay | Payment Gateway | Neobank"
                  />
                </a>
                <Typography variant="subtitle2" lineHeight={2}>
                  Our seller onboarding and payments are securely powered by Razorpay, ensuring fast KYC verification,
                  smooth payouts, and complete compliance — so you can focus on selling, while we take care of the rest.
                </Typography>
              </Box>
            </Card>

            <Card>
              <Box sx={{ display: "grid", gap: 3, p: { sm: 3 } }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <HelpOutlineOutlinedIcon color="primary" />
                  <Typography variant="title.colored">Frequently Asked Questions</Typography>
                </Box>
                {sellerFAQs.map(({ question, answer }, i) => (
                  <Accordion key={i} defaultExpanded={i === 0}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                      sx={{ p: 0 }}
                    >
                      <Typography variant="subtitle2" fontWeight={600}>
                        {question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0, m: 0 }}>
                      <Typography variant="subtitle2">{answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

const sellerFAQs = [
  {
    question: "Who can sell on our platform?",
    answer:
      "Anyone with a valid business or individual identity and the necessary documents (GST, PAN, Bank Account, etc.) can register as a seller.",
  },
  {
    question: "What documents are required to register as a seller?",
    answer:
      "You will typically need:\n- PAN Card\n- GSTIN (for taxable goods)\n- Bank account details\n- Business address proof\n- Identity proof (for individuals or authorized signatories)",
  },
  {
    question: "How long does it take to get my seller account approved?",
    answer:
      "Typically, seller verification and account activation take 24 to 48 hours after successful submission of all required documents.",
  },
  {
    question: "Are there any registration or setup fees?",
    answer:
      "No, registering as a seller on our platform is completely free. You only pay a commission on each successful sale.",
  },
];

const initialValues = {
  userDetail: {
    name: "",
    email: "",
    phone: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    country: "IN",
    postal_code: "",
  },
  bankAccount: {
    account_number: "",
    pan: "ABCDE1234k",
    ifsc_code: "",
    beneficiary_name: "",
    tnc_accepted: false,
  },
};

export default SellerOnbording;
