import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SkyLight from "react-skylight";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";

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
    this.addCustomerModal = React.createRef();
  }

  // Get input values
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Save input data to states, save them to a variable 'customer' and send that variable to the saveCustomer function in customerlist.js
  // or get the function saveCustomer from customerlist.js as a prop
  saveCustomer = event => {
    event.preventDefault();
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
    this.setState({
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: ""
    });
    this.addCustomerModal.current.hide();
  };

  render() {
    const newCustomerModalStyle = {
      margin: "auto -250px",
      width: "500px",
      top: "10%"
    };

    return (
      <div>
        <div className="menuButtons">
          <Button
            style={{ width: "150px", marginBottom: "10%" }}
            variant="contained"
            color="primary"
            onClick={() => this.addCustomerModal.current.show()}
          >
            <AddIcon />New customer
          </Button>
        </div>
        <SkyLight
          dialogStyles={newCustomerModalStyle}
          hideOnOverlayClicked
          ref={this.addCustomerModal}
          title="Add a new customer"
        >
          <form onSubmit={this.saveCustomer}>
            <TextField
              required={true}
              style={{ margin: "5px" }}
              label="First name"
              name="firstname"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.firstname}
            />
            <TextField
              required={true}
              style={{ margin: "5px" }}
              label="Last name"
              name="lastname"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.lastname}
            />
            <TextField
              required={true}
              style={{ margin: "5px" }}
              label="Street address"
              name="streetaddress"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.streetaddress}
            />
            <TextField
              required={true}
              style={{ margin: "5px" }}
              label="Postal code"
              name="postcode"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.postcode}
            />
            <TextField
              required={true}
              style={{ margin: "5px" }}
              label="City"
              name="city"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.city}
            />
            <TextField
              required={true}
              type="email"
              style={{ margin: "5px" }}
              label="Email address"
              name="email"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <TextField
              required={true}
              style={{ margin: "5px" }}
              label="Phone number"
              name="phone"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.phone}
            />
            <Button
              type="submit"
              style={{ margin: "5px", width: "197px", height: "55px" }}
              variant="contained"
              color="primary"
            >
              <SaveIcon />Save
            </Button>
          </form>
        </SkyLight>
      </div>
    );
  }
}

export default addcustomer;
