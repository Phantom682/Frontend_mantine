import { useState } from 'react';
import { PasswordInput, Progress, Text, Popover, Box } from '@mantine/core';
import "./Login.css";

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }, props) {
  return (
    <Text
      color={meets ? 'teal' : 'red'}
      sx={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export function PasswordStrength() {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [password, setPassword] = useState('');
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(password)} />
  ));

  const strength = getStrength(password);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      placement="start"
      withArrow
      styles={{ popover: { width: '100%' } }}
      trapFocus={false}
      transition="pop-top-left"
      onFocusCapture={() => setPopoverOpened(true)}
      onBlurCapture={() => setPopoverOpened(false)}
      target={
        <PasswordInput
          required
          className="pass"
          description="Password must include at least one letter, number and special character"
          label="Password"
          placeholder="Password"
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      }
    >
      <Progress color={color} value={strength} size={5} style={{ marginBottom: 10 }} />
      <PasswordRequirement label="Includes at least 6 characters and atmost 100 characters" meets={password.length > 5 && password.length <100} />
      {checks}
    </Popover>
  );
}
export default PasswordStrength;