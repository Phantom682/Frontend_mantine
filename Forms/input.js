import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { TextInput, Button, Group, Box } from "@mantine/core";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-number-input/style.css";
import { DatePicker } from "@mantine/dates";
import React, { useState } from "react";
import PasswordRequirement from "./password.js";

const schema = z.object({
  fName: z.string().min(2, { message: "Name should have atmost 2 letters" }),
  lName: z.string().min(2, { message: "Name should have atleat 2 letters" }),
  phoneNumber: z
    .string()
    .max(13, { message: "Name should have atmost 20 letters" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, {
    message:
      "Password length should be min 6 characters and max 100 characters",
  }),
  birthDate: z.date(),
});

function Demo() {
  // const [fName, setfName] = useState();
  // const [lName, setlName] = useState();
  // const [phoneNumber, setPhoneNumber] = useState();
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  // const [birthDate, setBirthDate] = useState();

  // const isValid = fName && lName && phoneNumber && email 

  async function login(values) {
    console.log(values);
    const result = await fetch("http://localhost:5000/user/create_user", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await result.json();
    console.log(data);
  }

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      fName: "",
      lName: "",
      phoneNumber: "",
      email: "",
      password: "",
      birthDate: "",
      validate: {
        email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      },
    },
  });

  return (
    <Box className="form" sx={{ maxWidth: 350 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => login(values))}>
        <div className="row">
          <TextInput
            className=" col-md-6"
            required
            label="First Name"
            placeholder="First Name"
            // onChange={(event) => {
            //   setfName(event.target.value);
            // }}
            {...form.getInputProps("fName")}
          />
          <TextInput
            className="col-md-6"
            required
            label="Last Name"
            placeholder="Last Name"
            // onChange={(event) => {
            //   setlName(event.target.value);
            // }}
            {...form.getInputProps("lName")}
          />
        </div>
        <TextInput
          required
          label="Phone Number"
          placeholder="Phone Number"
          type="text"
          // onChange={(event) => {
          //   setPhoneNumber(event.target.value);
          // }}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          maxLength="10"
          {...form.getInputProps("phoneNumber")}
        />

        {/* <ReactPhoneInput
          inputExtraProps={{
            name: "phone",
            required: true,
            autoFocus: true,
          }}
          defaultCountry={"sg"}
          value={this.state.phone}
          onChange={this.handleOnChange}
        /> */}
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          // onChange={(event) => {
          //   setEmail(event.target.value);
          // }}
          {...form.getInputProps("email")}
        />

        <PasswordRequirement
          // onChange={(event) => {
          //   setPassword(event.target.value);
          // }}
        />

        <DatePicker
          placeholder="Birth Date"
          label="Birth Date"
          // onChange={(event) => {
          //   setBirthDate(event.target.value);
          // }}
          {...form.getInputProps("birthDate")}
        />

        <div className="flex ">
          <input id="remember" type="checkbox" />
          <label for="remember">Remember</label>
          <div className="forgot ">
            <a href="/">Forgot your password?</a>
          </div>
        </div>

        <Group>
          <Button
            className="btn"
            type="submit"
            value="Submit"
            // disabled={!isValid}
          >
            Submit
          </Button>
        </Group>

        <p className="para">
          Don't have an account?
          <a href="/" className="reg">
            Register here
          </a>
        </p>
      </form>
    </Box>
  );
}

export default Demo;
