import { Checkbox, FormControlLabel } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";

import { Title } from "footer-templates-app/components/common/Title";
import { TemplatePreview } from "footer-templates-app/components/TemplatePreview/TemplatePreview";

export const TemplateFooter: FunctionComponent = () => {
  const { t } = useTranslation();
  const initialFormValues = {
    fullName: "",
    jobPosition: "",
    email: "",
    phoneNumber: ""
  };

  const [form, setFormValue] = useState(initialFormValues);
  const [isPhoneEnabled, handlePhoneEnabledChange] = useState(false);

  const handleFormChange = (formKey: keyof typeof initialFormValues) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormValue({ ...form, [formKey]: event.currentTarget.value });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePhoneEnabledChange(event.target.checked);
  };

  const { email, fullName, jobPosition, phoneNumber } = form;

  return (
    <Grid container direction="row" spacing={3}>
      <Grid item container justify="center">
        <Title color="secondary">{"Footer template"}</Title>
      </Grid>
      <Grid item container xs={12} md={4} spacing={3}>
        <Grid item xs={12}>
          <TextField
            value={fullName}
            onChange={handleFormChange("fullName")}
            label={t("fields.fullName")}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={jobPosition}
            onChange={handleFormChange("jobPosition")}
            label={t("fields.jobPosition")}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={email}
            onChange={handleFormChange("email")}
            label={t("fields.email")}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isPhoneEnabled}
                onChange={handleCheckboxChange}
              />
            }
            label={t("fields.phoneNumberEnable")}
          />
          <TextField
            value={phoneNumber}
            onChange={handleFormChange("phoneNumber")}
            label={t("fields.phoneNumber")}
            variant="outlined"
            fullWidth
            disabled={isPhoneEnabled === false}
          />
        </Grid>
      </Grid>
      <Grid item container justify="flex-end">
        <Button variant="contained" color="secondary" onClick={() => ({})}>
          {t("scenes.Profile.signOutButton")}
        </Button>
      </Grid>

      <Grid item container>
        <TemplatePreview />
      </Grid>
    </Grid>
  );
};
