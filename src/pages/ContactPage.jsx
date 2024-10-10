import React from 'react';
import { Container, Typography, TextField, Button, Grid2, Paper } from '@mui/material';


const ContactPage = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Message submitted!');
    };


    return (
        <Container sx={{ my: 5 }}>

            <Typography variant="h4">
                Contact Us
            </Typography>

            <Typography variant="body1" sx={{ mt: 1, mb: 3 }}>
                If you have any questions, feedback, or need assistance, feel free to reach out to us. 
                We are here to help you!
            </Typography>

            <Grid2 container spacing={2}>
                <Grid2 item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            Get in Touch
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                required
                                label="Name"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                required
                                label="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                required
                                label="Message"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                sx={{ mb: 2 }}
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </form>
                    </Paper>
                </Grid2>

                <Grid2 item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            Our Address
                        </Typography>
                        <Typography variant="body1" paragraph>
                            123 E-commerce St.<br />
                            City, Country 12345<br />
                            <strong>Email:</strong> support@example.com<br />
                            <strong>Phone:</strong> +1 (123) 456-7890
                        </Typography>
                    </Paper>
                </Grid2>
            </Grid2>
        </Container>
    );
}

export default ContactPage;