export const slackMessage = (email: string, name: string, dateTime: string) => `
    
    ------ NEW SIGNUP ------
    
    _email sent for verification_
    
    *Email    :* ${email}
    *Name     :* ${name}
    *Added on :* ${dateTime}
    
`;