import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import {
  Text,
  PasswordInput,
  TextInput,
  Card,
  Group,
  Divider,
  SimpleGrid,
} from "@mantine/core";
import Submit from "../Button/Button.js";
import { At, Lock } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import React from "react";

const schema = z.object({
  email: z.string().min(2, { message: "Name should have at least 2 letters" }),
  password: z.string().min(6, {
    message:
      "Password length should be min 6 characters and max 100 characters",
  }),
});

function Login() {
  let Navigate = useNavigate();

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  async function login(values) {
    // console.log(values);
    document.getElementById("nextbtn").click();

    const result = await fetch(
      process.env.REACT_APP_API_URL + "/user/login_user",
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
    Navigate("/login", { replace: true });
  }

  return (
    <>
      <div style={{ width: 350, margin: "auto", marginTop: 100 }}>
        <Card shadow="xl">
          <Text size="xl"  align= "center" weight={600}>
            User Login
          </Text>
          <form onSubmit={form.onSubmit((values) => login(values))}>
            <div style={{ marginTop: 10 }}>
              <TextInput
                required
                icon={<At size={19} />}
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps("email")}
              />

              <PasswordInput
                placeholder="Password"
                icon={<Lock size={19} />}
                style={{ marginTop: 5 }}
                label="Password"
                required
                {...form.getInputProps("password")}
              />
            </div>

            <Group mt="xl" position="center">
              <Submit name="Login"/>
            </Group>
            <br />
            <div class="base">
            
              <Text  variant="link">
                Forgot your password?
              </Text>
              <Divider sx={{ height: "50px" }} orientation="vertical"/>
              <Text variant="link">
                Sign in
              </Text>
              
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}

export default Login;
