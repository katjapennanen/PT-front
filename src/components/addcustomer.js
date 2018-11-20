import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SkyLight from "react-skylight";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import "../App.css";

class addcustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: ""
    };
    this.addModal = React.createRef();
  }

  // Get input values
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Save input data to states, save them to a variable 'customer' and send that variable to the saveCustomer function in customerlist.js
  // or get the function saveCustomer from customerlist.js as a prop
  saveCustomer = () => {
    const customer = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      streetaddress: this.state.streetaddress,
      postcode: this.state.postcode,
      city: this.state.city,
      email: this.state.email,
      phone: this.state.phone
    };
    this.props.saveCustomer(customer);
    // This clears the previously inputted values from the textfields
    this.setState({
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: ""
    });
    this.addModal.current.hide();
  };

  render() {
    const addDialog = {
      width: "250px",
      height: "250px",
      marginLeft: "-15%"
    };
    
    return (
      <div>
        <Button
          style={{ position: "relative", right: "100px" }}
          variant="contained"
          color="primary"
          onClick={() => this.addModal.current.show()}
        >
          <AddIcon /> New customer
        </Button>
        <SkyLight
          dialogStyles={addDialog}
          hideOnOverlayClicked
          ref={this.addModal}
          title="Add a new customer"
        >
          <TextField
            placeholder="First name"
            name="firstname"
            onChange={this.handleChange}
            value={this.state.firstname}
          />
          <br />
          <TextField
            placeholder="Last name"
            name="lastname"
            onChange={this.handleChange}
            value={this.state.lastname}
          />
          <TextField
            placeholder="Street address"
            name="streetaddress"
            onChange={this.handleChange}
            value={this.state.streetaddress}
          />
          <br />
          <TextField
            placeholder="Postal code"
            name="postcode"
            onChange={this.handleChange}
            value={this.state.postcode}
          />
          <br />
          <TextField
            placeholder="City"
            name="city"
            onChange={this.handleChange}
            value={this.state.city}
          />
          <br />
          <TextField
            placeholder="Email address"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <br />
          <TextField
            placeholder="Phone number"
            name="phone"
            onChange={this.handleChange}
            value={this.state.phone}
          />
          <Button
            style={{ margin: 10 }}
            variant="contained"
            color="primary"
            onClick={this.saveCustomer}
          >
            <SaveIcon />
            Save
          </Button>
        </SkyLight>
      </div>
    );
  }
}

export default addcustomer;
