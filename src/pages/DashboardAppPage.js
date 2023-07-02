import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

// sections
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const app = JSON.parse(localStorage.getItem('app'));
  const subscription = JSON.parse(localStorage.getItem('subscription'));
  const visit = JSON.parse(localStorage.getItem('visit'));
  const newUser = JSON.parse(localStorage.getItem('newUser'));
  const bugReport = JSON.parse(localStorage.getItem('bugReport'));
  const activeRooms = JSON.parse(localStorage.getItem('activeRooms'));

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Subscription" total={subscription.count} icon={'mdi:account-payment'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={newUser.count} color="info" icon={'heroicons:users-solid'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Active Rooms" total={activeRooms.count} color="warning" icon={'ant-design:message-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={bugReport.count} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={visit.newVisitByDate.dates || []}
              chartData={[
                {
                  name: app.appName[0].toUpperCase() + app.appName.slice(1),
                  type: 'area',
                  fill: 'gradient',
                  data: visit.newVisitByDate.counts
                }
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={visit.visitByContinentArray}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={subscription.subByCountryArray}
            />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
