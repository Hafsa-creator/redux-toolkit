import React from 'react';
// material ui
import { Container, Typography, Box, Grid2, Paper } from '@mui/material';
import MissionIcon from '@mui/icons-material/Flag';


const AboutPage = () => {

    return (
        <Container sx={{ my: 5 }}>

            {/* Hero Section */}
            <Box
                sx={{
                    backgroundImage: `url('https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',

                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                    height: 450,
                    borderRadius: 2,

                    mb: 5,
                    textAlign: 'center'
                }}
            >
                <Typography variant="h3"
                    sx={{
                        backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', p: 2,
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.8rem' },
                    }}
                >
                    About Our E-commerce Web Store
                </Typography>
            </Box>

            {/* Content Section */}
            <Grid2 container spacing={4}>
                <Grid2 item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Typography variant="h4" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We are dedicated to providing the best products at competitive prices. Our journey began in 2019 with a vision to create an enjoyable, reliable online shopping experience. We value quality, customer satisfaction, and sustainability.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We are proud to support local artisans and ensure sustainability through our carefully curated selection of items.
                            Our team is passionate about delivering high-quality products. We carefully select every product to ensure it meets our high standards.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <b>**Our Values**</b>
                            <ul>
                                <li> <b>Quality:</b> We prioritize high standards in all our products.</li>
                                <li> <b>Sustainability:</b> We care for our planet and community.</li>
                                <li> <b>Customer Satisfaction:</b> Your happiness is our priority.</li>
                            </ul>
                        </Typography>
                    </Paper>
                </Grid2>
            </Grid2>

            {/* Mission Section */}
            <Box sx={{ mt: 3 }}>
                <Paper elevation={3} sx={{ p: 4, display: 'flex', alignItems: 'center' }}>
                    <MissionIcon sx={{ fontSize: 50, mr: 4 }} color="primary" />
                    <Box>
                        <Typography variant="h5">Our Mission</Typography>
                        <Typography variant="body1" sx={{ my: 1.5 }}>
                            To provide a seamless shopping experience and offer the highest quality products that resonate with our customers' needs.
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default AboutPage;
