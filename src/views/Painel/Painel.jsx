import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { bugs, website, server } from "variables/general.jsx";

import * as axios from 'axios'

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import './Painel.css'

import PoluentesLabel from './PoluentesLabel/PoluentesLabel'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      analitycs: {},
      serverData: [],
      gearForm: false,
      sambleForRequest: 200
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeFormGear = (sambleForRequest = 200) => {
    this.setState({ sambleForRequest });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  
  dataChart =  (value= [1,2,3], columnName) =>{
    if(value != [1,2,3]){
      let series = []
      value.forEach( data => {
        series.push(data.sensor[columnName])
      });
    const labels = new Array(value.length) 
    
    return {series: [series], labels}
    }
     
    const     labels= ["M", "T", "W", "T", "F", "S", "S"]
    const     series= [[12, 17, 7, 17, 23, 18, 38]]
    return {series, labels}
  }
  analitycs = async (sample = 200) => {
    const analitycs  = await axios.get(`https://big-city-server.herokuapp.com/api/v1/ws/analytics/` + sample)
    const serverData = await axios.get('https://big-city-server.herokuapp.com/api/v1/ws/data/')
    this.setState({ analitycs: analitycs.data, serverData: serverData.data })
    console.log(analitycs)
  }

  handleSubmitAnalitycs = async () => {
    this.analitycs(this.state.sambleForRequest)
    this.setState({ gearForm: false })
  }

  componentWillMount = async () => {
    this.analitycs()
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="gear-build-right">
          <CardFooter>
            <div className="gear-build-right form-gear">
              {this.state.gearForm ? (
                <>
                  <TextField type="number" placeholder="200" variant="outlined" type="number" value={this.state.sambleForRequest} onChange={e => this.handleChangeFormGear(e.target.value)}></TextField>
                  <Button variant="outlined" size="small" onClick={_ => this.handleSubmitAnalitycs()}><Icon>save</Icon></Button>
                  <Button variant="outlined" size="small" onClick={_ => this.setState({ gearForm: false })}><Icon>cancel</Icon></Button>
                </>
              ) : <Button onClick={_ => this.setState({ gearForm: true })} variant="outlined" size="large"><Icon>build</Icon></Button>
              }
            </div>
          </CardFooter>
        </div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={this.dataChart(this.state.serverData, "temperature")}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Temperatura Diária</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 12%
                  </span>{" "}
                  acima, comparado ao dia de ontem 
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> data da ultima atualização 
                </div>
              </CardFooter>
            </Card>
          </GridItem>
         </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>opacity</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Umidade Relativa do Ar</p>
                <h3 className={classes.cardTitle}>
                  {(this.state.analitycs.humidity_ || 0).toFixed(2)} <small>%</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  {/* {(this.state.analitycs.humidity_ || 0).toFixed(2)}  */}

                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>whatshot</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Temperatura Ambiente</p>
                <h3 className={classes.cardTitle}>{(this.state.analitycs.temperature_ || 0).toFixed(2)} <small>°c</small></h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />



                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>

        <Divider variant="middle" />

        <h4>Poluentes</h4>

        <GridContainer>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>directions_car</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Monóxido de Carbono</p>
                <h3 className={classes.cardTitle}>{(this.state.analitycs.co_ || 0).toFixed(1)} <small><small>PPM</small></small></h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>


                  <PoluentesLabel value={this.state.analitycs.co_} />



                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon>brightness_low</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Fumaça</p>

                <h3 className={classes.cardTitle}>{(this.state.analitycs.smoke_ || 0).toFixed(2)} <small><small>PPM</small></small></h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>


                  <PoluentesLabel value={this.state.analitycs.smoke_} />

                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="rose">
                  <Icon>cloud_off</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>LPG</p>
                <h3 className={classes.cardTitle}>{(this.state.analitycs.lpg_ || 0).toFixed(2)} <small><small>PPM</small></small></h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                <PoluentesLabel value={this.state.analitycs.lpg_} />
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>

        <Divider variant="middle" />

        <h4>Fontes Externas</h4>

        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>opacity</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Umidade Relativa do Ar</p>
                <h3 className={classes.cardTitle}>
                  {(this.state.analitycs.humidity_c_ || 0).toFixed(2)} <small>%</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  <a href="https://www.climatempo.com.br/" target="blank">https://www.climatempo.com.br/</a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>whatshot</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Temperatura Ambiente</p>
                <h3 className={classes.cardTitle}>{(this.state.analitycs.temperature_c_ || 0).toFixed(2)} <small>°c</small></h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  <a href="https://www.climatempo.com.br/" target="blank">https://www.climatempo.com.br/</a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>

        </GridContainer>
        <a
          href="https://big-city-server.herokuapp.com/api/v1/ws/data/"
          target="blank"
        >
          <Button>Baixar Dados</Button>
        </a>

        {/* <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={this.dataChart(this.state.serverData, "temperature")}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Temperatura Diária</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  acima, comparado ao dia de ontem 
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          {/* <GridItem xs={12} sm={12} md={4}> 
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}> */}
            {/* <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem> */}
        {/* </GridContainer> */}
        {/* <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Bugs",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={bugs}
                    />
                  )
                },
                {
                  tabName: "Website",
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={website}
                    />
                  )
                },
                {
                  tabName: "Server",
                  tabIcon: Cloud,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={server}
                    />
                  )
                }
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  New employees on 15th September, 2016
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Salary", "Country"]}
                  tableData={[
                    ["1", "Dakota Rice", "$36,738", "Niger"],
                    ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                    ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                    ["4", "Philip Chaney", "$38,735", "Korea, South"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
       */}
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
