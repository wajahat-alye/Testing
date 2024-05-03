import  Card  from '@mui/material/Card';
import  MDBox  from 'components/MDBox';
import  MDTypography  from 'components/MDTypography';
import Grid from '@mui/material/Grid';


export const Template = ({title, children}:any) => {

    return <Card>
    <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
      <MDBox>
        <MDTypography variant="h6" gutterBottom>
          {title}
        </MDTypography>
        
      </MDBox>
   
    </MDBox>
    <MDBox>
   
            
           {children}
  
    </MDBox>
  </Card>
  }


  export const Wrapper = ({ children }: any) => {
    return (
      <Grid item xs={12} md={12} lg={6} spacing={3}>
        <Card>
          <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <MDTypography variant="h6" gutterBottom>
              Projects
            </MDTypography>
          </MDBox>
  
          <MDBox>{children}</MDBox>
        </Card>{" "}
      </Grid>
    );
  };
  