const mail_subject_verify = "OTP: For Email Verification";

const message_subject_verify = (otp) => {
    return `Dear User, \n\n`
        + 'OTP for your email verification is : \n\n'
        + `${otp}\n\n`
        + 'This is a auto-generated email. Please do not reply to this email.\n\n'
        + 'Regards\n'
        + 'Login Team\n\n';
};