import React from 'react';
import { Typography, TextField, Button, Paper } from '@mui/material';


const ContactPage = () => {

    return (
        <div style={{ padding: '40px 0', height: '100vh' }}>
            <Paper elevation={3} sx={{ maxWidth: '88%', p: 3, mx: { xs: 2, md: 'auto'}, borderRadius: '7px' }}>
                
                <Typography variant="h4">
                    Contact Us
                </Typography>

                <Typography variant="body1" sx={{ mt: 1, mb: 5 }}>
                    If you have any questions, feedback, or need assistance, feel free to reach out to us.
                    We are here to help you!
                </Typography>

                <form>
                    <TextField
                        required
                        label="Name"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 1.5 }}
                    />
                    <TextField
                        required
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 1.5 }}
                    />
                    <TextField
                        label="Message"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ mb: 2.5 }}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </Paper>
        </div>
    );
}

export default ContactPage;