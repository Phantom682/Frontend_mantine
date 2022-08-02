import React , { useState } from 'react';
import { Stepper, Button, Group, Card } from '@mantine/core';
import {
    UserCheck,
    MailOpened,
    CircleCheck,
    ShieldCheck
} from "tabler-icons-react";
import ResetPassword from "../Forget/ResetPassword.js";
import VerifyEmail from "../Forget/VerifyEmail.js";
import VerifyOtp from "../Forget/VerifyOtp.js";

function Stepper2() {
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));

    return (
        <>
            <div className="step">
                <Stepper active={active} onStepClick={setActive} completedIcon={<CircleCheck />} styles={{
                    content: { fontWeight: "bold", textAlign: "center" },
                }} breakpoint="sm">
                    <Stepper.Step icon={<UserCheck size={18} />} label="First step" description="Enter Email">
                        Step 1 content: Enter Email
                        <br />
                        <br />
                        <VerifyEmail nextStep={nextStep} />
                    </Stepper.Step>
                    <Stepper.Step icon={<MailOpened size={18} />} label="Second step" description="Verify email">
                        Step 2 content: Verify email
                        <br />
                        <br />
                        <VerifyOtp nextStep={nextStep} />
                    </Stepper.Step>
                    <Stepper.Step icon={<ShieldCheck size={18} />} label="Final step" description="Reset Password">
                        Step 3 content: Reset Password
                        <br />
                        <br />
                        <ResetPassword nextStep={nextStep} />
                    </Stepper.Step>
                    <Stepper.Completed>
                        Password is Changed
                    </Stepper.Completed>
                </Stepper>
            </div>

            <Group position="center" mt="xl">

                <Button onClick={nextStep}>Next step</Button>
            </Group>
        </>
    );
}

export default Stepper2;