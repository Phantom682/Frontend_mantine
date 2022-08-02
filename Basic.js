import { z } from "zod";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { TextInput, Text, Select, Group, Card, SimpleGrid } from "@mantine/core";
import Submit from "../Button/Button.js";
import { useNavigate } from "react-router-dom";
import { At } from "tabler-icons-react";
{/*import { OtpContext } from "./context.js";*/ }



const schema = z.object({
  name: z.string().max(20, { message: "Name should have atmost 20 letters" }),
  surname: z
    .string()
    .max(20, { message: "Name should have atmost 20 letters" }),
  email: z.string().email({ message: "Invalid email" }),
  birthDate: z.date(),
  gender: z.string(),
  password: z
    .string()
    .min(6, { message: "Password length should be min 6 characters" }),
});

function Basic({ nextStep }) {
  let Navigate = useNavigate();


  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: "",
      surname: "",
      email: "",

      gender: "",
      number: "",

    },
  });

  async function signUp(values) {
    // console.log(values);
    const result = await fetch(
      process.env.REACT_APP_API_URL + "/user/create_user",
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await result.json();
    // console.log(data);
    // setUserId({
    //   userId: data.data.userId,
    // });
    nextStep(1);
  }


  return (
    <div style={{ width: 400, margin: "auto", marginTop: 50 }}>
      <Card shadow="xl">
        <Text size="xl" align="center" weight={600}>
          Basic Details
        </Text>
        <form
          className="form"
          onSubmit={form.onSubmit((values) => console.log(values))}
        >

          <SimpleGrid cols={2}>

            <TextInput
              required
              className="input "
              label="First Name"
              placeholder="Enter your First Name"

              {...form.getInputProps("name")}
            />
            <TextInput
              required
              className="input"
              label="Last Name"
              placeholder="Enter your Last Name"
              {...form.getInputProps("surname")}
            />
          </SimpleGrid>
          <SimpleGrid cols={2}>


            <Select
              searchable
              clearable
              required
              label="Gender"
              placeholder="Pick one"
              className="input "
              data={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "transgender", label: "Transgender" },
              ]}
              {...form.getInputProps("gender")}

            />
            <TextInput
              required
              className="input "
              label="Phone Number"
              placeholder="Enter your Number"
              type="number"
              {...form.getInputProps("number")}
            />
          </SimpleGrid>


          <SimpleGrid cols={1}>
            <TextInput
              required
              icon={<At size={19} />}
              label="Email"
              className="input"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />
          </SimpleGrid>


          <Group mt="xl" position="center">
            <Submit name="Submit" />
          </Group>
        </form>
      </Card>
    </div>

  );
}


export default Basic;
