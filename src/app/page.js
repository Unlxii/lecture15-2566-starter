"use client";

import { TermsAndCondsModal } from "@/components/TermsAndCondsModal";
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Radio,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { runningPlans } from "../libs/runningPlans";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

const schema = z.object({
  Firstname: z.string().min(3, { message: "Required at last 3 characters" }),
  Lastname: z.string().min(3, { message: "Required at last 3 characters" }),
  Email: z.string().email({ message: "Invalid email format" }),
  plan: z.enum(["funrun", "mini", "half", "full"], {
    errorMap: () => ({ message: "Invalid plan" }),
  }),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Please choose a gender" }),
  }),
  acceptTermsAndConds: z.literal(true, {
    errorMap: () => ({
      message: " You must accept terms and conditions",
    }),
  }),
});
export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      Firstname: "",
      Lastname: "",
      Email: "",
      plan: null,
      gender: null,
      acceptTermsAndConds: false,
    },
    validate: zodResolver(schema),
  });

  console.log(form.values);
  return (
    <div>
      <Container size="500px">
        <Title italic align="center" color="pink">
          Register CMU Marathon 🥈
        </Title>
        <form onSubmit={form.onSubmit()}>
          <Stack spacing="sm">
            <Group grow align="start">
              <TextInput
                label="First Name"
                {...form.getInputProps("Firstname")}
              />
              <TextInput
                label="Last Name"
                {...form.getInputProps("Lastname")}
              />
            </Group>
            <TextInput label="Email" {...form.getInputProps("Email")} />
            <Select
              label="Plan"
              data={runningPlans}
              placeholder="Please select plan..."
              {...form.getInputProps("plan")}
            />
            <Radio.Group label="Gender" {...form.getInputProps("gender")}>
              <Radio value="male" label="Male 👨" mb="xs" />
              <Radio value="female" label="Female 👧" />
            </Radio.Group>

            <Checkbox
              {...form.getInputProps("acceptTermsAndConds")}
              label={
                <Text>
                  I accept{" "}
                  <Anchor onClick={open} href="#">
                    terms and conditions
                  </Anchor>
                </Text>
              }
            />
            <Button type="submit">Register</Button>
          </Stack>
        </form>
      </Container>

      <TermsAndCondsModal opened={opened} close={close} />
    </div>
  );
}
